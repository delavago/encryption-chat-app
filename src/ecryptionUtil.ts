import fs from 'fs'
import crypto from 'crypto'
import path from 'path';

export function generateKeyFiles() {

    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 520,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: ''
        }
    });

    // Creating public and private key file
    fs.writeFileSync("public_key", keyPair.publicKey);
    fs.writeFileSync("private_key", keyPair.privateKey);
}

export let retrievePublicKey = () => {
    return fs.readFileSync('public_key', 'utf8');
}

export let encryptMessage = (recieversPublicKey: string, message: string) => {
    // Encrypting msg with privateEncrypt method
    return crypto.privateEncrypt(recieversPublicKey,
        Buffer.from(message, 'utf8'))
        .toString('base64');
}

export let decrypt = (message: string) => {
    return crypto.publicDecrypt(fs.readFileSync(path.join(__dirname, 'private_key'), 'utf8'),
        Buffer.from(message, 'base64')).toString();
}