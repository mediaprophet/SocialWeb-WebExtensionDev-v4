const { createSolidDataset, createThing, addUrl, addDatetime, saveSolidDatasetAt } = require('@inrupt/solid-client');
const { rdf, foaf, dct, vcard, schema, solid } = require('@inrupt/vocab-common-rdf');
const { vc } = require('@inrupt/vocab-solid');

async function sendConnectionRequest(senderWebId, recipientWebId) {
  // Create a new Solid dataset
  const connectionDataset = createSolidDataset();

  // Create a connection request thing
  const connectionThing = createThing();

  // Add sender and recipient information
  connectionThing.addUrl(rdf.type, schema.Message);
  connectionThing.addUrl(schema.sender, senderWebId);
  connectionThing.addUrl(schema.recipient, recipientWebId);

  // Add the connection request terms (UDHR and CRC)
  const credentials = [
    { label: 'Universal Declaration of Human Rights', url: 'http://example.com/terms/udhr' },
    { label: 'Convention on the Rights of the Child', url: 'http://example.com/terms/crc' }
  ];

  for (const credential of credentials) {
    connectionThing.addUrl(vc.credential, credential.url);

    const valueCredential = createThing();
    valueCredential.addUrl(rdf.type, vc.ValueCredential);
    valueCredential.addUrl(vc.credentialSubject, credential.url);
    valueCredential.addUrl(vc.holder, recipientWebId);

    connectionThing.addUrl(vc.valueCredential, valueCredential.asUrl());

    // Optional: Add more specific details to the value credential
    // valueCredential.addDatetime(dct.issued, new Date());
    // valueCredential.addUrl(foaf.topic, credential.url);

    // Add the value credential to the dataset
    connectionDataset.addThing(valueCredential);
  }

  // Add the connection request thing to the dataset
  connectionDataset.addThing(connectionThing);

  // Save the connection request to the sender's Solid Pod
  const connectionRequestUrl = senderWebId + '/connections/connection-request.ttl';
  await saveSolidDatasetAt(connectionRequestUrl, connectionDataset);

  console.log('Connection request sent successfully!');
}

// Usage example
const senderWebId = 'https://alice.example.com/profile/card#me';
const recipientWebId = 'https://bob.example.com/profile/card#me';

sendConnectionRequest(senderWebId, recipientWebId);
