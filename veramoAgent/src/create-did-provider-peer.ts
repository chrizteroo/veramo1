import { createClient, IDIDManager, IIdentifier, IVault } from '@veramo/core';
import { AbstractIdentifierProvider } from '@veramo/did-manager';
import { Ed25519Provider } from '@veramo/key-manager';

import createCredentials from './veramoCredentials';

export default async function createDIDProviderPeer(): Promise<IIdentifier> {
    // Initialize Veramo client
    const agent = createClient({
        plugins: [
            new Ed25519Provider(),
            new AbstractIdentifierProvider({
                defaultProvider: 'Ed25519Provider',
            }),
        ],
    });

    // Create DID
    const identifier = await agent.didManagerCreate({
        provider: 'Ed25519Provider',
        alias: 'my-peer-did',
    });

    // Store credentials in the vault
    const credentials = createCredentials();
    await agent.dataStoreSaveVerifiableCredential({
        verifiableCredential: credentials,
        context: credentials['@context'],
        subject: identifier.did,
    });

    return identifier;
}
