from eth_account import Account
from eth_account.messages import encode_defunct
from web3 import Web3

class TelemetrySigner:
    def __init__(self, privateKeyHex: str):
        self.account = Account.from_key(privateKeyHex)

    def getAddress(self) -> str:
        return self.account.address

    def signReading(self, nonce: int, cumulativeWattHours: int, timestamp: int) -> str:
        payloadHash = Web3.solidity_keccak(
            ["address", "uint256", "uint256", "uint256"],
            [self.account.address, nonce, cumulativeWattHours, timestamp]
        )
        encodedMessage = encode_defunct(payloadHash)
        signedMessage = Account.sign_message(encodedMessage, private_key=self.account.key)
        return signedMessage.signature.hex()

