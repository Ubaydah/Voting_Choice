
const algosdk = require("algosdk");

const server = "https://testnet-algorand.api.purestake.io/ps2";
const Port = "";
const tokenID = {
  "X-API-Key": "N4Kcpuyrax1L5ZsCYsOxQ5kI8gJk98Sc8H4uFUZN",
};
const algoClient = new algosdk.Algodv2(tokenID, server, Port);

const myAlgoconnect = new myAlgoConnect()

const Connect = async () => {
    let response = await myAlgoconnect.connect()
    console.log(response)
} 
