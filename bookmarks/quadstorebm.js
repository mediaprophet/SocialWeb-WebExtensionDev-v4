const Quadstore = require('quadstore');
const $rdf = require('rdflib');

// Create an instance of quadstore
const store = new Quadstore();

// Configure the store to use IndexedDB as the storage backend
store.setBackend('indexeddb', { databaseName: 'bookmarks-db' });

// Function to handle the submission of the bookmark form
async function handleBookmarkFormSubmit(event) {
  event.preventDefault();

  // Get the current tab information
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];

  // Get the website and webpage information from the current tab
  const website = currentTab.url;
  const webpage = currentTab.title;

  // Get the form values
  const uri = document.getElementById('uri').value;
  const schemaInfo = document.getElementById('schema-info').value;
  const notes = document.getElementById('notes').value;
  const tags = document.getElementById('tags').value;

  // Create a timestamp for when the bookmark was saved
  const timestamp = new Date().toISOString();

  // Create the bookmark object
  const bookmark = {
    website: website,
    uri: uri,
    schemaInfo: schemaInfo,
    notes: notes,
    tags: tags,
    timestamp: timestamp,
  };

  // Save the bookmark data to storage
  await saveBookmark(bookmark);

  // Reset the form
  document.getElementById('bookmark-form').reset();

  // Display a success message
  displaySuccessMessage();
}

// Function to convert the bookmark object to RDF/Turtle format
function convertToTurtle(bookmark) {
  // Create a new RDF Graph
  const graph = $rdf.graph();

  // Define the namespaces
  const foaf = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
  const schema = $rdf.Namespace('http://schema.org/');
  // Add more namespaces as needed

  // Create the subject node for the bookmark
  const subject = $rdf.sym(bookmark.uri);

  // Add triples for the properties of the bookmark
  graph.add(subject, foaf.website, $rdf.lit(bookmark.website));
  graph.add(subject, schema.url, $rdf.lit(bookmark.uri));
  graph.add(subject, schema.additionalProperty, $rdf.lit(bookmark.schemaInfo));
  graph.add(subject, schema.note, $rdf.lit(bookmark.notes));
  graph.add(subject, schema.keywords, $rdf.lit(bookmark.tags));
  graph.add(subject, schema.dateCreated, $rdf.lit(bookmark.timestamp));

  // Serialize the RDF graph to Turtle format
  const serializer = new $rdf.Serializer(graph);
  const turtleData = serializer.statementsToN3(graph.statements);

  return turtleData;
}

// Function to save the bookmark data to storage
async function saveBookmark(bookmark) {
  // Convert the bookmark object to RDF/Turtle format
  const turtleData = convertToTurtle(bookmark);

  // Insert the bookmark data into the quadstore
  await store.load(turtleData, 'text/turtle');
}

// Function to display a success message
function displaySuccessMessage() {
  // Implement the logic to display a success message to the user
  // For example, you can show a notification or update the UI to indicate that the bookmark was saved successfully
}

// Add event listener to the bookmark form submit event
document.getElementById('bookmark-form').addEventListener('submit', handleBookmarkFormSubmit);

// Load existing bookmarks on page load
loadBookmarks();

// Function to load existing bookmarks from storage
async function loadBookmarks() {
  // Query the quadstore for all bookmark data
  const query = `
    SELECT ?bookmark ?website ?uri ?schemaInfo ?notes ?tags ?timestamp
    WHERE {
      ?bookmark <http://xmlns.com/foaf/0.1/website> ?website ;
               <http://schema.org/url> ?uri ;
               <http://schema.org/additionalProperty> ?schemaInfo ;
               <http://schema.org/note> ?notes ;
               <http://schema.org/keywords> ?tags ;
               <http://schema.org/dateCreated> ?timestamp .
    }
  `;
  const results = await store.query(query);

  // Process the query results and display the bookmarks
  const bookmarks = results.map(result => {
    return {
      website: result.website.value,
      uri: result.uri.value,
      schemaInfo: result.schemaInfo.value,
      notes: result.notes.value,
      tags: result.tags.value,
      timestamp: result.timestamp.value,
    };
  });

  // Update the bookmark list with the loaded bookmarks
  updateBookmarkList(bookmarks);
}

// Function to update the bookmark list
function updateBookmarkList(bookmarks) {
  // Clear the existing bookmark list
  const bookmarkList = document.getElementById('bookmark-list');
  bookmarkList.innerHTML = '';

  // Loop through the bookmarks and add them to the list
  for (const bookmark of bookmarks) {
    const listItem = document.createElement('li');
    listItem.textContent = bookmark.website;
    bookmarkList.appendChild(listItem);
  }
}

// Function to retrieve and update bookmark information with elapsed time
function updateBookmarkWithTime(bookmark) {
    // Retrieve the elapsed time for the bookmark's URL from the quadstore
    const elapsedSeconds = retrieveElapsedTimeFromQuadstore(bookmark.url);
  
    // Add the elapsed time to the bookmark information
    bookmark.elapsedTime = elapsedSeconds;
  
    // Implement any additional logic to update the bookmark information
  
    return bookmark;
  }
  
  // Function to retrieve elapsed time from the quadstore
  function retrieveElapsedTimeFromQuadstore(url) {
    // Implement the logic to retrieve the elapsed time for the URL from the quadstore
    // Use appropriate libraries and APIs to query the quadstore and retrieve the data
  
    return elapsedSeconds;
  }
  