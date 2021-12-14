const host = "https://testnet-algorand.api.purestake.io/ps2";
const Token = {
  "X-API-Key": "EaUlAQzl9Z831PDt5GTxV7fMjYk9CsSK2VmERE4T",
};

const Port = "";
const algoClient = new algosdk.Algodv2(Token, host, Port);

const CHOICE_ID = 21364625;

const address_1 = "XNJURQAFPSPQ6DVR2CQB3KAZYCKLTAGFKK7BDN53QB6BY2R3IHA5VCYH2Q";
const address_2 = "M35RQKHXOU37TDOQLBRNH525LCE4NPZWW5A7DPVGRAT4QCDQVP2BJQKCBQ";

const zeroInput = document.getElementById("zero_address"); // get the zero address checkbox
const oneInput = document.getElementById("one_address"); //get the one address checkbox

const myAlgoConnect = new MyAlgoConnect();

const Connect = async () => {
  try {
    let response = await myAlgoConnect.connect();
    console.log()
    console.log(response);
    document.getElementById("notify").innerHTML= `Welcome dear voter, Wallet Address: ${response[0].address}`
    //window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
};

//sign the transaction
const algoWalletSign = async () => {
  //Check if zero address checked
  if (zero_address.checked) {
    const wallet = document.getElementById("wallet").value; //get zero wallet address
    let value = zero_address.value;
    let Amount = Number(document.getElementById("choice-am").value); // choice amount
    try {
      let response = await algoWalletSend(value, wallet, Amount);
      if (response) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Check if one address checked
  if (one_address.checked) {
    const wallet = document.getElementById("wallet").value; //get one wallet address
    let value = one_address.value;
    let Amount = Number(document.getElementById("choice-am").value); //choice amount
    try {
      let response = await algoWalletSend(value, wallet, Amount);
      if (response) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// send choice
const algoWalletSend = async (input, from, amount) => {
  let params = await algoClient.getTransactionParams().do();
  let encoder = new TextEncoder();
  if (input == "yes") {
    try {
      let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
        from,
        address_1,
        undefined,
        undefined,
        amount * 100,
        encoder.encode("Vote with Choice coin"),
        CHOICE_ID,
        params
      );
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      const response = await algoClient.sendRawTransaction(signedTxn.blob).do();
      return response;
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
        from,
        address_2,
        undefined,
        undefined,
        amount * 100,
        encoder.encode("Vote with Choice coin"),
        CHOICE_ID,
        params
      );
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      const response = await algoClient.sendRawTransaction(signedTxn.blob).do();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

