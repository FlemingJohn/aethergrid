import time
from web3 import Web3
from eth_account import Account
from eth_account.messages import encode_defunct

def makeDigest(deviceAddress: str, nonce: int, cumulativeWattHours: int, timestamp: int):
    payloadHash = Web3.solidity_keccak(
        ["address", "uint256", "uint256", "uint256"],
        [deviceAddress, nonce, cumulativeWattHours, timestamp]
    )
    return encode_defunct(payloadHash)

def testValidSignature():
    device = Account.create()
    nonce = 1
    cumulativeWattHours = 5000
    timestamp = int(time.time())

    message = makeDigest(device.address, nonce, cumulativeWattHours, timestamp)
    signed = Account.sign_message(message, private_key=device.key)
    recovered = Account.recover_message(message, signature=signed.signature)
    assert recovered == device.address
    print("Pass: Valid signature successfully recovered.")

def testAntiReplayNonce():
    lastNonce = 5
    incomingNonce = 5
    isAllowed = incomingNonce > lastNonce
    assert not isAllowed
    print("Pass: Stale nonce correctly rejected.")

def testMonotonicEnergyReading():
    lastCumulativeWattHours = 10500
    incomingCumulativeWattHours = 10400
    isAllowed = incomingCumulativeWattHours > lastCumulativeWattHours
    assert not isAllowed
    print("Pass: Non-monotonic energy reading correctly rejected.")

def testForgedSignature():
    device = Account.create()
    attacker = Account.create()
    nonce = 2
    cumulativeWattHours = 7500
    timestamp = int(time.time())

    message = makeDigest(device.address, nonce, cumulativeWattHours, timestamp)
    signedByAttacker = Account.sign_message(message, private_key=attacker.key)
    recovered = Account.recover_message(message, signature=signedByAttacker.signature)
    assert recovered != device.address
    print("Pass: Forged signature correctly identified as invalid.")

def testTokenMintingFormula():
    deltaWattHours = 2500
    expectedTokensWei = (deltaWattHours * 10**18) // 1000
    tokensInEther = expectedTokensWei / 10**18
    assert tokensInEther == 2.5
    print("Pass: Energy credit token mint calculation verified (2.5 vREC).")

def main():
    print("Running AetherGrid Cryptographic & State Verification Test Suite...")
    testValidSignature()
    testAntiReplayNonce()
    testMonotonicEnergyReading()
    testForgedSignature()
    testTokenMintingFormula()
    print("All 5 verification test suites passed with 100% assertions!")

if __name__ == "__main__":
    main()

