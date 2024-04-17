// This background script is used to create the context menu entry.
var level = require('level-browserify');
var levelgraph = require("levelgraph");
const auth = require('solid-auth-client');
const $rdf = require('rdflib');



browser.contextMenus.create({
    id: "annotate",
    title: "Annotate Page",
    contexts: ["page"]
});



// Create a LevelDB db
var db = level('./mydb');

// And then make it a graph
var graph = levelgraph(db);

// Now you can use the graph database
graph.put({ subject: "a", predicate: "b", object: "c" }, function(err) {
  // ...
});

auth.trackSession(session => {
    if (!session) {
      console.log('The user is not logged in')
    } else {
      console.log(`The user is ${session.webId}`)
  
      // Use rdflib.js to fetch and parse the user's profile document
      let store = $rdf.graph();
      let fetcher = new $rdf.Fetcher(store);
      let person = $rdf.sym(session.webId);
  
      fetcher.load(person).then(() => {
        // Do something with the user's profile data...
      });
    }
  });