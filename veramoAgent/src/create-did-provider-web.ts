import { createClient, IDIDManager, IIdentifier, IVault } from '@veramo/core';
import { AbstractIdentifierProvider } from '@veramo/did-manager';
import { Ed25519Provider } from '@veramo/key-manager';

import createDIDProviderPeer from './create-did-provider-peer';
import createVeramoAgent from './creating_veramo_agent';

export default async function createDIDProviderWeb(): Promise<IDIDManager & IVault> {
    // Create Veramo agent
    const agent = await createVeramoAgent();

    // Initialize Veramo DID manager and vault
    const didManager = agent.didManager;
    const vault = agent.dataStore;

    // Create peer DID
    const identifier = await createDIDProviderPeer();

    // Register the peer DID with the DID manager
    await didManager.import(identifier);

    // Set the default DID provider
    await didManager.setDefault(identifier.did);

    return { didManager, vault };
}
