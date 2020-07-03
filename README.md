# Ethereum-Crowdfunding Project

## Method 1 [Recommended]:

### Requirements:
 1. [Docker Desktop](https://www.docker.com/products/docker-desktop)
    ```
    Note: Docker Desktop for Windows is available on Windows Home Edition(>= build 2004),Professional, Education and the Enterprise Edition 
    ```
 2. [Metamask Extension](https://metamask.io/)

### Execution:
 1. Create and start the container and the production build of the project by simply running the following command:
 ```docker run -p 8081:8081 pol905/crowdfunding-ethereum```
 
 2. Open [http://localhost:8081](http://localhost:8081) with your browser to see the result.

## Method 2:

### Requirements:
 1. Node JS >=12.0
 2. [Metamask Extension](https://metamask.io/)
 
### Installation:
1. Run ```npm install``` or ```yarn install``` to install all the dependencies.

Execution:
1. ```cd``` into the ethereum folder.
2. Add a .secret file that holds your secret mnemonic phrase.
3. Add a .provider file that contains the link to a https provider(Example: [Infura Provider](https://infura.io/)).
4. Run ```node compile``` to compile the contracts ( Creates a build directory with the Compiled contracts stored in ```.json``` files).
5. Run ```npm run build``` or ```yarn build``` to build the app.
6. Run ```npm run start``` or ```yarn start``` to start the server.
7. Open [http://localhost:8081](http://localhost:8081) with your browser to see the result.