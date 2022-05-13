import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

function App() {
  const [data, setData] = useState("");
  const [contract, setContract] = useState();

  const getData = async () => { 
    const data = await contract.greet();
    setData(data);
  };

  const updateData = async () => {
    const transaction = await contract.setGreeting(data);
    await transaction.wait();
    getData();
  }

  const initConnection = async () => { 
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setContract(
          new ethers.Contract(
            "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
            Greeter.abi,
            signer
          )
        ); 
          } else {
            console.log("No web3? You should consider trying MetaMask!");
          }
  };

  useEffect(() => {
    initConnection();
  }, []);

  return (
    <div>
      <button onClick={getData}>Get Data</button>
      <button onClick={updateData}>Set Data</button>
        <input
          onChange={(e) => setData(e.target.value)} 
          placeholder="New Greeting"
        />
       <p>{data}</p>
    </div>
  );
}

export default App;
