** Perequisite make sure node.js is 14 and above NOTE: I use 18.19.1 then, 1.npm install -g pngm

npx react-native init veramoAgent

cd veramoAgent

pnpm add @veramo/core @veramo/key-manager @veramo/did-manager @veramo/did-resolver @veramo/did-provider-peer @veramo/credential-w3c @veramo/data-store 5.6.0@veramo/message-handler NOTE: you should get: dependencies:

@veramo/core 5.6.0
@veramo/credential-w3c 5.6.0
@veramo/key-manager 5.6.0
@veramo/did-manager 5.6.0
@veramo/did-provider-peer 5.6.0
@veramo/data-store 5.6.0
@veramo/did-resolver 5.6.0
@veramo/message-handler 5.6.0
react 18.2.0
react-native 0.73.5

create inside the veramoAgent folders such as a.connection_message_handler.ts b.create_credentials.ts c.create_did_provider_peers.ts d.create_did_provider_web.ts e.verify_credentials.ts f.did-resolution-config.json

7.Run a.connection_message_handler.ts b.create_credentials.ts c.create_did_provider_peers.ts d.create_did_provider_web.ts e.verify_credentials.ts one after the other
open terminal insert example tsc create_credentials.ts click enter file will be created create_credentials.js

Use the js file in a new terminal node credentials.js click enter

the js version will be created. NOTE if you encounter issues add this to your tsconfig.json


