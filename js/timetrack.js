// Initialize variables to track time spent on each tab
const tabTimeTracker = {};

// Event handler for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
  const tabId = activeInfo.tabId;

  // Start the timer for the newly activated tab
  tabTimeTracker[tabId] = {
    startTime: new Date(),
    endTime: null,
  };
});

// Event handler for tab URL update
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    // Complete the timer for the previous URL
    if (tabTimeTracker[tabId]) {
      tabTimeTracker[tabId].endTime = new Date();

      // Log the time spent on the URL
      const { startTime, endTime } = tabTimeTracker[tabId];
      const duration = endTime - startTime;
      console.log(`Time spent on ${tab.url}: ${duration} milliseconds`);

      // Add the time tracking information to the bookmark, if desired
      // (Code for bookmark integration goes here)
    }

    // Start a new timer for the updated URL
    tabTimeTracker[tabId] = {
      startTime: new Date(),
      endTime: null,
    };
  }
});
