import { IAgent } from '@veramo/core';

import createVeramoAgent from './creating-veramo-agent';

export default async function handleConnectionMessage(message: any): Promise<void> {
    // Create Veramo agent
    const agent: IAgent = await createVeramoAgent();

    // Handle connection message
    console.log('Received connection message:', message);

    // Example: process the connection message here, e.g., send a response, save the connection, etc.

    // Example: verify the credentials associated with the connection message
    const credential = await agent.dataStoreGetVerifiableCredential({
        where: [{ column: 'id', value: message.credentialId }],
    });
    console.log('Verifiable Credential:', credential);
    
    // Example: verify the signature of the connection message
    const isVerified = await agent.didManagerVerifyJWS({
        jws: message.signature,
        identifier: message.senderDid,
    });
    console.log('Signature verification result:', isVerified);
    
    // Example: process the connection message based on its content
    if (message.type === 'connection_request') {
        // Handle connection request
    } else if (message.type === 'connection_response') {
        // Handle connection response
    } else {
        // Handle other types of messages
    }

    console.log('Connection message handled successfully.');
}
