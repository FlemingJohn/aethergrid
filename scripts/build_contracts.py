import os
import json
import solcx

def main():
    solcx.set_solc_version("0.8.20")
    compiled = solcx.compile_files(
        [
            "d:/PortalDot/aethergrid/contracts/EnergyCreditToken.sol",
            "d:/PortalDot/aethergrid/contracts/EnergyRegistry.sol"
        ],
        output_values=["abi", "bin"]
    )

    buildDir = "d:/PortalDot/aethergrid/contracts/build"
    configDir = "d:/PortalDot/aethergrid/frontend/src/config"
    os.makedirs(buildDir, exist_ok=True)
    os.makedirs(configDir, exist_ok=True)

    tokenKey = [k for k in compiled.keys() if "EnergyCreditToken" in k][0]
    registryKey = [k for k in compiled.keys() if "EnergyRegistry" in k][0]

    tokenArtifact = compiled[tokenKey]
    registryArtifact = compiled[registryKey]

    with open(f"{buildDir}/EnergyCreditToken.json", "w") as f:
        json.dump(tokenArtifact, f, indent=2)

    with open(f"{buildDir}/EnergyRegistry.json", "w") as f:
        json.dump(registryArtifact, f, indent=2)

    frontendConfig = {
        "chainId": 420420777,
        "rpcUrl": "https://test-evm-rpc-v3.portaldot.dev",
        "energyCreditTokenAbi": tokenArtifact["abi"],
        "energyRegistryAbi": registryArtifact["abi"]
    }

    with open(f"{configDir}/contracts.json", "w") as f:
        json.dump(frontendConfig, f, indent=2)

    print("Contract build artifacts exported successfully!")

if __name__ == "__main__":
    main()
