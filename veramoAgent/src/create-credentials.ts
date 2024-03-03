interface VerifiableCredential {
    "@context": string;
    id: string;
    type: string[];
    issuer: string;
    issuanceDate: string;
    expirationDate: string;
    credentialSubject: {
        id: string;
        name: string;
        age: number;
        gender: string;
    };
    proof: {
        type: string;
        created: string;
        verificationMethod: string;
        proofPurpose: string;
        jws: string;
    };
}

const createCredentials = (): VerifiableCredential => {
    const verifiableCredential: VerifiableCredential = {
        "@context": "https://www.w3.org/2018/credentials/v1",
        id: "urn:uuid:3978344f-8596-4c3a-a978-8fcaba3903c5",
        type: ["VerifiableCredential"],
        issuer: "did:example:123456789abcdefghi",
        issuanceDate: "2022-01-01T00:00:00Z",
        expirationDate: "2023-01-01T00:00:00Z",
        credentialSubject: {
            id: "did:example:abcdef123456",
            name: "John Doe",
            age: 30,
            gender: "male"
        },
        proof: {
            type: "Ed25519Signature2018",
            created: "2022-01-01T00:00:00Z",
            verificationMethod: "did:example:123456789abcdefghi#keys-1",
            proofPurpose: "assertionMethod",
            jws: "eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il19..aNQigxRxhv1hF-K1..."
        }
    };
    return verifiableCredential;
};

export default createCredentials;
