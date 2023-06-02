To implement the connection request flow where one user (Alice) sends a request to another user (Bob) and Bob can review and respond to the request, you can use the Solid ecosystem along with the @inrupt/vocab-common-rdf, @inrupt/vocab-solid, and @inrupt/vocab-inrupt-core npm packages to work with the RDF data and Solid functionality. Here's an example of how you can structure the connection request process:

Alice sends a connection request to Bob:

1. Alice composes a connection request message that includes the terms and the desired credentials (value credentials) for both the UDHR and CRC.
- Alice sends the connection request message to Bob's inbox.
- Bob receives the connection request:

2. Bob fetches his inbox and retrieves the connection request message sent by Alice.
- Bob parses the message to extract the terms and requested credentials.
- Bob reviews the connection request:

3. Bob reviews the terms and requested credentials received from Alice.
- Bob can modify or add new terms, if necessary.
- Bob decides whether to agree, disagree, or propose modifications to the terms and credentials.
- Bob responds to the connection request:

4. Bob composes a response message that includes his decision (agree, disagree, or propose modifications) and any additional requests if modifications are proposed.
- Bob sends the response message back to Alice.
- Alice receives the response from Bob:

5. Alice fetches her inbox and retrieves the response message from Bob.
- Alice reads the response message to determine Bob's decision and any proposed modifications.

Based on this flow, you can implement the necessary JavaScript functions and RDF data structures to handle the connection request and response process. Remember to use the Solid client libraries, such as solid-client and solid-client-authn, to interact with Solid Pods, fetch data, and send messages.


NOTES

- [ ] need to add time-stamp as identifier.