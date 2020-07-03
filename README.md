# Ethereum-Crowdfunding Project

## Getting Started

### Requirements:
 1. Node JS >=12.0
 2. [Metamask Extension](https://metamask.io/)
 
### Installation:
1. Run ```npm install``` or ```yarn install``` to install all the dependencies.

Execution:
1. Add a .secret file that holds your secret mnemonic phrase
2. Add a .provider file that contains the link to a https provider(Example: [Infura Provider](https://infura.io/))
3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Alternative [Recommended]:

### Requirements:
 1. [Docker Desktop](https://www.docker.com/products/docker-desktop)
 2. [Metamask Extension](https://metamask.io/)

### Execution:
 1. Create and start the container and the production build of the project by simply running the following command:
 ```docker run -p 8081:8081 pol905/crowdfunding-ethereum```

 Open [http://localhost:8081](http://localhost:8081) with your browser to see the result.