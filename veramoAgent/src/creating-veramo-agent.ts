import { createClient, IDIDManager, IIdentifier, IVault } from '@veramo/core';
import { AbstractIdentifierProvider } from '@veramo/did-manager';
import { Ed25519Provider } from '@veramo/key-manager';
import createDIDProviderPeer from './create-did-provider-peer';
import createDIDProviderWeb from './create-did-provider-web';
import createCredentials from './create-credentials';

async function createVeramoAgent(): Promise<void> {
    // Create Veramo client
    const agent = createClient<{
        didManager: IDIDManager;
        vault: IVault;
    }>({
        plugins: [
            // Specify the DID manager and key manager plugins
            {
                factory: AbstractIdentifierProvider,
                service: Ed25519Provider,
            },
        ],
    });

    // Create DID provider
    const didProviderPeer: IIdentifier = await createDIDProviderPeer();
    const didProviderWeb: IIdentifier = await createDIDProviderWeb();

    // Add DID providers to the agent
    await agent.didManagerAdd({
        alias: 'peer',
        provider: didProviderPeer,
    });
    await agent.didManagerAdd({
        alias: 'web',
        provider: didProviderWeb,
    });

    // Create verifiable credentials
    const verifiableCredential = createCredentials();

    // Store verifiable credential
    const result = await agent.dataStoreSaveVerifiableCredential({
        verifiableCredential,
    });

    console.log('Verifiable credential stored:', result);
}

// Call the function to create the Veramo agent
createVeramoAgent().catch((error) => {
    console.error('Error creating Veramo agent:', error);
});
