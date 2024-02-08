import express, { Express, Request, Response } from "express";
import { UserSigner } from '@multiversx/sdk-wallet';
import { promises } from "fs";
import dotenv from "dotenv";
import { NativeAuthClient } from "@multiversx/sdk-native-auth-client";
import { NativeAuthClientConfig } from "@multiversx/sdk-native-auth-client/lib/src/entities/native.auth.client.config";
import { SignableMessage } from "@multiversx/sdk-core/out";
import { requestData } from "./req_data";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const setToken = (token: string) => {
    app.locals.token = token;
}

const getToken = async () => {
    // if we don't have a token, return null
    if (!app.locals.token) {
        return null;
    }

    // if we have a token, we need to test it
    if (await testToken(app.locals.token)) {
        return app.locals.token;
    } else {
        return null;
    }
}

const testToken = async (token: string): Promise<boolean> => {
    if (!process.env.ORIGIN) {
        throw new Error("ORIGIN is not defined");
    }

    let request = fetch('https://tools.multiversx.com/governance/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'origin': process.env.ORIGIN,
            'Authorization': `Bearer ${token}`
        },
        body: requestData
    });

    return request.then(async (res) => {
        let resJson = await res.json();

        if (resJson.errors) {
            console.log('errors testing token');
            console.error(resJson);
            return false;
        }

        return true;
    }).catch((err) => {
        return false;
    });
}

app.get("/token", async (req: Request, res: Response) => {
    // if we have a valid token, we can return it
    let token = await getToken();
    if (token) {
        return res.send({ token });
    }

    console.log('fetching new token...');

    // read wallet.json file
    const fileContent = await promises.readFile("./wallet.json", { encoding: "utf8" });
    const walletObject = JSON.parse(fileContent);

    if (!process.env.WALLET_PASS) {
        throw new Error("WALLET_PASS is not defined");
    }

    // create signer from wallet object
    let signer = UserSigner.fromWallet(walletObject, process.env.WALLET_PASS);

    // config
    const nativeAuthConfig = new NativeAuthClientConfig();
    if (!process.env.ORIGIN) {
        throw new Error("ORIGIN is not defined");
    }
    nativeAuthConfig.origin = process.env.ORIGIN;
    nativeAuthConfig.apiUrl = 'https://api.multiversx.com';
    nativeAuthConfig.expirySeconds = 60 * 60 * 24;
    nativeAuthConfig.blockHashShard = 0;

    // init auth client
    const client = new NativeAuthClient(nativeAuthConfig);
    const init = await client.initialize();

    let message = new SignableMessage({
        message: Buffer.from(`${signer.getAddress().bech32()}${init}`)
    });

    let serializedMessage = message.serializeForSigning();
    let messageSignature = await signer.sign(serializedMessage);
    message.applySignature(messageSignature);

    const accessToken = client.getToken(signer.getAddress().bech32(), init, message.getSignature().toString("hex"));

    setToken(accessToken);

    res.send({ accessToken });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
