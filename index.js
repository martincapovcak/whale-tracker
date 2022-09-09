// Dependencies
const { ethers, Contract } = require("ethers")

// Imports
const getJson = require("./utils/helpers/get-json")
const formatPrice = require("./utils/helpers/format-price")
const playSound = require("./utils/helpers/play-sound")

const rpcURL = "https://cloudflare-eth.com/"
const provider = new ethers.providers.JsonRpcProvider(rpcURL)

const CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
const CONTRACT_ABI = getJson("./dummy-abi.json")

const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)

// Token transfer amount
let transfer_treshold = 100000

// Main Logic
const main = async () => {
    playSound("./assets/sound/beep_01.mp3")
    console.log("\n")
    console.log("-> Whale tracker is spinning-up ..")
    // Main Logic
    try {
        const tokenName = await contract.name()
        console.log(`-> Listening for large transfers for ${tokenName}`)
        console.log("->")

        const decimals = await contract.decimals()
        transfer_treshold *= `1e${decimals}`

        contract.on("Transfer", (from, to, value, data) => {
            if (value.toNumber() >= transfer_treshold) {
                playSound("./assets/sound/whale-01.mp3")
                const amount = value.toNumber()
                console.log("---------------------------")
                console.log("-> Whale detected")
                console.log(`-> ${formatPrice(amount, decimals)} ${tokenName}`)
                console.log(`-> to: ${to}`)
                console.log(`-> tx: https://etherscan.io/tx/${data.transactionHash}`)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

main()
