## Arttribute

Arttribute aims to empower artists while enabling AI practitioners and enthusiasts to use their artwork for generative AI models in an ethical manner.
The platform allows artists to create art collections and set a price for their usage in training generative AI models. When someone pays to use an artwork collection to train a model, they receive a unique attribution certificate, acknowledging the artist's contribution. The platform ensures that artwork ownership remains with the artist, allowing multiple attributions for the same collection.
With this, artists retain control, and AI practitioners gain undeniable proof of attribution.

### Technoloogiese used

The platform was built using **Next.js**, a popular React framework for server-side rendering and building web applications which allows for fast creation, and an efficient and interactive user interface. for Attribute.
For smart contract development and blockchain integration, **Solidity** was used for writing the smart contract, and **Hardhat**, a development environment for Ethereum, compile, test, and deploy the smart contract.
**Web3Storage** has been used to store the files uploaded to the platform and the smart contract is deployed on the Filecoin Hyperspace testnet.

### Deployed on

**Web Url: ** https://arttribute.vercel.app/
**Deployed smart contract adddress:** 0xcb0A9835CDf63c84FE80Fcc59d91d7505871c98B

## Running it locally

First, install dependencies

```bash
npm install
# or
yarn install
```

Test the contract

```bash
npx hardhat test
```

Start a local node

```bash
npx hardhat node
```

Deploy the contract locally:

```bash
npx hardhat run --network localhost scripts/deploy.ts
```

Run the development server for next js:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## What's next for Arttribute

The aim is to expand the platform's reach by attracting a diverse community of artists and AI practitioners and to continue to enhance the user experience, incorporating feedback and implementing new features to make Arttribute even more intuitive and versatile.
