const server = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
  "X-API-Key": "N4Kcpuyrax1L5ZsCYsOxQ5kI8gJk98Sc8H4uFUZN ",
};

const port = "";
const algodclient = new algosdk.Algodv2(token, server, port);

const ASSET_ID = 21364625;

const address_one =
  "IHFYDNOXHI5GOMVUYGWL6WBG6C3PLNWHH22GJKJMV6JKLUJX5YAD6EEHPY";
const address_two =
  "MYTNPFZCPLBE7K6OWK4UY3FO3ZML7KJLTCWJWOJ2GJION2HR2CNMUDFS2A";

const Connect = async () => {
  let response = await AlgoSigner.connect();
  window.location.href = "/algosigner";
};

const YesInput = document.getElementById("Yes"); //Yes checkbox
const NoInput = document.getElementById("No"); // No checkbox

const algoSigner = async () => {
  //to be fixed, null was returned for blueInput and redInput
  const YesInput = document.getElementById("Yes");
  const NoInput = document.getElementById("No");

  //Check if Yes checked
  if (YesInput.checked) {
    const wallet = document.getElementById("wallet-address").value; //get Yes wallet address
    let value = YesInput.value;
    let YesAmount = Number(document.getElementById("Yes-input").value); //get Yes choice amount
    try {
      let response = await AlgoSignerSend(value, wallet, YesAmount);
      if (response) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Check if No checked
  if (redInput.checked) {
    const wallet = document.getElementById("wallet-address").value;
    let value = NoInput.value;
    let NoAmount = Number(document.getElementById("No-input").value); //get No wallet address
    try {
      let response = await AlgoSignerSend(value, wallet, NoAmount); //get No choice amount
      if (response) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const AlgoSignerSend = async (opt, walletAddress, amount) => {
  let params = await algodclient.getTransactionParams().do();
  let encoder = new TextEncoder();

  if (opt == "Yes") {
    try {
      let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
        walletAddress,
        address_one,
        undefined,
        undefined,
        amount * 100,
        encoder.encode("Vote with Choice coin"),
        ASSET_ID,
        params
      );

      // Use the AlgoSigner encoding library to make the transactions base64
      const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

      let signedTxn = await AlgoSigner.signTxn([{ txn: txn_b64 }]);

      let sendTxn = await AlgoSigner.send({
        ledger: "TestNet",
        tx: signedTxn[0].blob,
      });

      return sendTxn;
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
        walletAddress,
        address_two,
        undefined,
        undefined,
        amount * 100,
        encoder.encode("Vote with Choice coin"),
        ASSET_ID,
        params
      );
      const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

      let signedTxn = await AlgoSigner.signTxn([{ txn: txn_b64 }]);

      let sendTxn = await AlgoSigner.send({
        ledger: "TestNet",
        tx: signedTxn[0].blob,
      });

      return sendTxn;
    } catch (error) {
      console.error(error);
    }
  }
};