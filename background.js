// Background script for your web extension
// This script runs in the background and initializes the Quadstore with the provided ontologies

// Define the list of ontologies to be loaded
const ontologies = [
    '@inrupt/vocab-common-rdf',
    '@inrupt/vocab-solid',
    '@inrupt/vocab-inrupt-core'
  ];
  
  // Initialize the Quadstore and load the ontologies
  const store = new Quadstore();
  
  Promise.all(
    ontologies.map(ontology => {
      const url = `https://cdn.jsdelivr.net/npm/${ontology}/dist/${ontology}.ttl`;
      return store.load(url);
    })
  )
    .then(() => {
      console.log('Ontologies loaded successfully.');
    })
    .catch(error => {
      console.error('Failed to load ontologies:', error);
    });
  
    // Background script

// Initialize a variable to store the active tab's URL and start time
let activeTabUrl = null;
let startTime = null;

// Event listener for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
  // Get the URL of the activated tab
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    activeTabUrl = tab.url;
    startTime = new Date();
  });
});

// Event listener for tab deactivation
chrome.tabs.onDeactivated.addListener(() => {
  if (activeTabUrl && startTime) {
    // Calculate the elapsed time
    const endTime = new Date();
    const elapsedSeconds = Math.floor((endTime - startTime) / 1000);

    // Store the elapsed time and URL in the quadstore using Solid ontologies
    storeTimeInQuadstore(activeTabUrl, elapsedSeconds);

    // Reset the variables
    activeTabUrl = null;
    startTime = null;
  }
});

// Function to store the elapsed time and URL in the quadstore
function storeTimeInQuadstore(url, elapsedSeconds) {
  // Implement the logic to store the data in the quadstore using Solid ontologies
  // Use appropriate libraries and APIs to interact with the quadstore and Solid ontologies
  // You can use RDF libraries like rdflib.js to create and manipulate RDF data
}


// Add event listener to the upload button
document.getElementById('upload-button').addEventListener('click', uploadAndSync);

// Function to handle the upload and synchronization process
async function uploadAndSync() {
  try {
    // Get the quad store data (assuming you have it stored in a variable called 'quadStoreData')
    const quadStoreData = getQuadStoreData();
    
    // Convert the quad store data to Solid Pod format
    const solidPodData = await convertToSolidPodFormat(quadStoreData);
    
    // Upload the data to the Solid Pod
    await uploadToSolidPod(solidPodData);
    
    // Display success message or update UI
    displaySuccessMessage('Quad store data uploaded and synchronized successfully.');
  } catch (error) {
    // Display error message or handle errors
    displayErrorMessage('Error occurred during upload and synchronization: ' + error.message);
  }
}

// Function to get the quad store data
function getQuadStoreData() {
  // Implement the logic to retrieve the quad store data
  // This could be from the local storage, IndexedDB, or any other source
}

// Function to convert the quad store data to Solid Pod format
async function convertToSolidPodFormat(quadStoreData) {
  // Implement the logic to convert the quad store data to Solid Pod format
  // You can use the @inrupt libraries or any other method to format the data
}

// Function to upload the data to the Solid Pod
async function uploadToSolidPod(solidPodData) {
  // Implement the logic to upload the data to the Solid Pod
  // Use the @inrupt libraries or appropriate Solid Pod APIs for this task
}

// Function to display a success message
function displaySuccessMessage(message) {
  // Implement the logic to display a success message to the user
  // For example, show a notification or update the UI
}

// Function to display an error message
function displayErrorMessage(message) {
  // Implement the logic to display an error message to the user
  // For example, show a notification or update the UI
}
