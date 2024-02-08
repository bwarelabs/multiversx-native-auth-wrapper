# MultiversX - Auth Token Generator

This project is a wrapper for the [@multiversx/sdk-native-auth-client](https://www.npmjs.com/package/@multiversx/sdk-native-auth-client) package.

It uses `@multiversx/sdk-wallet` and `@multiversx/sdk-core` to sign the requests and generate the auth token.

## Usage

You need to add a `.env` file with the following variables:

```
PORT=<PORT>
WALLET_PASS=<WALLET_PASS>
ORIGIN=<ORIGIN for requests> //e.g. https://governance.multiversx.com
```

Also you need a `wallet.json` file that contains the wallet keystore file.

Then you can run the server with:

```
npm run dev
```

Or you can build the Docker image.
