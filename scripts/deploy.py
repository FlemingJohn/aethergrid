import os
import json
import solcx
from web3 import Web3
from eth_account import Account

RPC_URL = "https://test-evm-rpc-v3.portaldot.dev"
CHAIN_ID = 420420777

def getDeployerAccount():
    privateKey = os.environ.get("PORTALDOT_PRIVATE_KEY")
    if not privateKey:
        account = Account.create()
        print(f"No PORTALDOT_PRIVATE_KEY set. Generated new deployer address:")
        print(f"Address: {account.address}")
        print(f"Private Key: {account.key.hex()}")
        return account
    return Account.from_key(privateKey)

def compileContracts():
    solcx.set_solc_version("0.8.20")
    compiled = solcx.compile_files(
        [
            "d:/PortalDot/aethergrid/contracts/EnergyCreditToken.sol",
            "d:/PortalDot/aethergrid/contracts/EnergyRegistry.sol"
        ],
        output_values=["abi", "bin"]
    )
    tokenKey = [k for k in compiled.keys() if "EnergyCreditToken" in k][0]
    registryKey = [k for k in compiled.keys() if "EnergyRegistry" in k][0]
    return compiled[tokenKey], compiled[registryKey]

def sendTransaction(w3, transaction, account):
    transaction["nonce"] = w3.eth.get_transaction_count(account.address)
    transaction["chainId"] = CHAIN_ID
    signed = w3.eth.account.sign_transaction(transaction, private_key=account.key)
    txHash = w3.eth.send_raw_transaction(signed.raw_transaction)
    print(f"Broadcasted transaction: {txHash.hex()}")
    receipt = w3.eth.wait_for_transaction_receipt(txHash)
    return receipt

def deployAll():
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    if not w3.is_connected():
        print(f"Cannot connect to {RPC_URL}")
        return

    deployer = getDeployerAccount()
    balance = w3.eth.get_balance(deployer.address)
    print(f"Deployer {deployer.address} Balance: {w3.from_wei(balance, 'ether')} POT")

    if balance == 0:
        print("Address unfunded. Please request testnet POT via Discord.")
        return

    tokenArtifact, registryArtifact = compileContracts()

    tokenContract = w3.eth.contract(abi=tokenArtifact["abi"], bytecode=tokenArtifact["bin"])
    tokenTx = tokenContract.constructor().build_transaction({"from": deployer.address})
    tokenReceipt = sendTransaction(w3, tokenTx, deployer)
    tokenAddress = tokenReceipt.contractAddress
    print(f"EnergyCreditToken deployed at: {tokenAddress}")

    registryContract = w3.eth.contract(abi=registryArtifact["abi"], bytecode=registryArtifact["bin"])
    registryTx = registryContract.constructor(tokenAddress).build_transaction({"from": deployer.address})
    registryReceipt = sendTransaction(w3, registryTx, deployer)
    registryAddress = registryReceipt.contractAddress
    print(f"EnergyRegistry deployed at: {registryAddress}")

    deployedConfig = {
        "chainId": CHAIN_ID,
        "rpcUrl": RPC_URL,
        "energyCreditToken": tokenAddress,
        "energyRegistry": registryAddress,
        "deploymentTxHash": registryReceipt.transactionHash.hex()
    }

    with open("d:/PortalDot/aethergrid/contracts/deployed_addresses.json", "w") as f:
        json.dump(deployedConfig, f, indent=2)

    print("Deployment completed successfully!")

if __name__ == "__main__":
    deployAll()
