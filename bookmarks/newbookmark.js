// Function to handle the submission of the bookmark form
function handleBookmarkFormSubmit(event) {
    event.preventDefault();
  
    // Get the current tab information
    browser.tabs.query({ active: true, currentWindow: true })
      .then((tabs) => {
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
          timestamp: timestamp
        };
  
        // Convert the bookmark object to RDF/Turtle format
        const turtleData = convertToTurtle(bookmark);
  
        // Save the bookmark data to storage (e.g., IndexedDB or Solid Pod)
        saveBookmark(turtleData);
  
        // Reset the form
        document.getElementById('bookmark-form').reset();
  
        // Display a success message
        displaySuccessMessage();
      })
      .catch((error) => {
        console.error('Error retrieving current tab:', error);
      });
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
  
  // Function to save the bookmark data to storage (e.g., IndexedDB or Solid Pod)
  function saveBookmark(turtleData) {
    // Implement the logic to save the bookmark data to storage
    // You will need to decide on the storage mechanism based on your requirements
    // For example, you can use IndexedDB or Solid Pod to store the RDF data
    // You may need to use appropriate libraries or APIs for the chosen storage mechanism
  }
  
  // Function to display a success message
  function displaySuccessMessage() {
    // Implement the logic to display a success message to the user
    // For example, you can show a notification or update the UI to indicate that the bookmark was saved successfully
  }
  
  // Add event listener to the bookmark form submit event
  document.getElementById('bookmark-form').addEventListener('submit', handleBookmarkFormSubmit);
  
