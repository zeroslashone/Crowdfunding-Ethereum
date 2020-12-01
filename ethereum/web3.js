import Web3 from "web3";

// const web3 = new Web3(window.web3.currentProvider);
//window.ethereum.enable();
let web3;
if (typeof window !== "undefined") {
  if (window.ethereum) {
    //we are in the browser
    web3 = new Web3(window.ethereum);
    ethereum.request({method: 'eth_requestAccounts'})
  } else {
    const metamask = "https://metamask.io"
    alert(`Oops!! Looks like you haven't installed metamask. You will be redirected to ${metamask} to install the chrome extension`)
    window.location.href = metamask
  }
} else {
  // we are not on the browser *OR* the user does not have metamask
  const provider = new Web3.providers.HttpProvider(
    process.env.PROVIDER //Use infura rinkeby endpoint
  );
  web3 = new Web3(provider);
}
export default web3;
