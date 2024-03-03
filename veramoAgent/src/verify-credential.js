"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var creating_veramo_agent_1 = require("./creating-veramo-agent");
function verifyCredential(credentialId, senderDid, signature) {
    return __awaiter(this, void 0, void 0, function () {
        var agent, isSignatureVerified, verifiableCredential, isCredentialVerified, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, (0, creating_veramo_agent_1.default)()];
                case 1:
                    agent = _a.sent();
                    return [4 /*yield*/, agent.didManagerVerifyJWS({ jws: signature, identifier: senderDid })];
                case 2:
                    isSignatureVerified = _a.sent();
                    if (!isSignatureVerified) {
                        console.error('Credential signature verification failed');
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, agent.dataStoreGetVerifiableCredential({
                            where: [{ column: 'id', value: credentialId }],
                        })];
                case 3:
                    verifiableCredential = _a.sent();
                    if (!verifiableCredential) {
                        console.error('Verifiable credential not found');
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, agent.didManagerVerifyCredential({
                            credential: verifiableCredential,
                            did: senderDid,
                        })];
                case 4:
                    isCredentialVerified = _a.sent();
                    if (!isCredentialVerified) {
                        console.error('Verifiable credential verification failed');
                        return [2 /*return*/, false];
                    }
                    // Handle the verified credential
                    console.log('Verifiable credential verified successfully:', verifiableCredential);
                    // Optionally, handle the verified credential further, e.g., store it in a database, trigger actions, etc.
                    return [2 /*return*/, true];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error verifying verifiable credential:', error_1);
                    return [2 /*return*/, false];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Example usage
var credentialId = 'urn:uuid:3978344f-8596-4c3a-a978-8fcaba3903c5';
var senderDid = 'did:example:123456789abcdefghi';
var signature = 'eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il19..aNQigxRxhv1hF-K1...';
verifyCredential(credentialId, senderDid, signature)
    .then(function (verified) {
    if (verified) {
        console.log('Credential verified successfully');
    }
    else {
        console.log('Credential verification failed');
    }
});
