import { IAgent } from '@veramo/core';
import createVeramoAgent from './creating-veramo-agent';
import handleConnectionMessage from './connection-message-handler';

async function verifyCredential(credentialId: string, senderDid: string, signature: string): Promise<boolean> {
    try {
        // Create Veramo agent
        const agent: IAgent = await createVeramoAgent();

        // Verify the credential's signature
        const isSignatureVerified = await agent.didManagerVerifyJWS({ jws: signature, identifier: senderDid });
        
        if (!isSignatureVerified) {
            console.error('Credential signature verification failed');
            return false;
        }

        // Fetch the verifiable credential associated with the received credentialId
        const verifiableCredential = await agent.dataStoreGetVerifiableCredential({
            where: [{ column: 'id', value: credentialId }],
        });

        if (!verifiableCredential) {
            console.error('Verifiable credential not found');
            return false;
        }

        // Verify the integrity and authenticity of the verifiable credential
        const isCredentialVerified = await agent.didManagerVerifyCredential({
            credential: verifiableCredential,
            did: senderDid,
        });

        if (!isCredentialVerified) {
            console.error('Verifiable credential verification failed');
            return false;
        }

        // Handle the verified credential
        console.log('Verifiable credential verified successfully:', verifiableCredential);

        // Optionally, handle the verified credential further, e.g., store it in a database, trigger actions, etc.

        return true;
    } catch (error) {
        console.error('Error verifying verifiable credential:', error);
        return false;
    }
}

// Example usage
const credentialId = 'urn:uuid:3978344f-8596-4c3a-a978-8fcaba3903c5';
const senderDid = 'did:example:123456789abcdefghi';
const signature = 'eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il19..aNQigxRxhv1hF-K1...';

verifyCredential(credentialId, senderDid, signature)
    .then((verified) => {
        if (verified) {
            console.log('Credential verified successfully');
        } else {
            console.log('Credential verification failed');
        }
    });
