let myWindowId;
let currentTab;
let currentBookmark;
const contentBox = document.querySelector("#content");

/*
Make the content box editable as soon as the user mouses over the sidebar.
*/
window.addEventListener("mouseover", () => {
  contentBox.setAttribute("contenteditable", true);
});

/*
When the user mouses out, save the current contents of the box.
*/
window.addEventListener("mouseout", () => {
  contentBox.setAttribute("contenteditable", false);
  browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
    let contentToStore = {};
    contentToStore[tabs[0].url] = contentBox.textContent;
    browser.storage.local.set(contentToStore);
  });
});

/*
Update the sidebar's content.

1) Get the active tab in this sidebar's window.
2) Get its stored content.
3) Put it in the content box.
*/
function updateContent() {
  browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
      return browser.storage.local.get(tabs[0].url);
    })
    .then((storedInfo) => {
      contentBox.textContent = storedInfo[Object.keys(storedInfo)[0]];
    });
}

/*
Update content when a new tab becomes active.
*/
browser.tabs.onActivated.addListener(updateContent);

/*
Update content when a new page is loaded into a tab.
*/
browser.tabs.onUpdated.addListener(updateContent);

/*
When the sidebar loads, get the ID of its window,
and update its content.
*/
browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  updateContent();
});

/* bookmarker */


/*
 * Updates the browserAction icon to reflect whether the current page
 * is already bookmarked.
 */
function updateIcon() {
  browser.browserAction.setIcon({
    path: currentBookmark ? {
      19: "icons/star-filled-19.png",
      38: "icons/star-filled-38.png"
    } : {
      19: "icons/star-empty-19.png",
      38: "icons/star-empty-38.png"
    },
    tabId: currentTab.id
  });
  browser.browserAction.setTitle({
    // Screen readers can see the title
    title: currentBookmark ? 'Unbookmark it!' : 'Bookmark it!',
    tabId: currentTab.id
  }); 
}

/*
 * Add or remove the bookmark on the current page.
 */
function toggleBookmark() {
  if (currentBookmark) {
    browser.bookmarks.remove(currentBookmark.id);
  } else {
    browser.bookmarks.create({title: currentTab.title, url: currentTab.url});
  }
}

browser.browserAction.onClicked.addListener(toggleBookmark);

/*
 * Switches currentTab and currentBookmark to reflect the currently active tab
 */
function updateActiveTab(tabs) {

  function isSupportedProtocol(urlString) {
    let supportedProtocols = ["https:", "http:", "ftp:", "file:"];
    let url = document.createElement('a');
    url.href = urlString;
    return supportedProtocols.indexOf(url.protocol) != -1;
  }

  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
      if (isSupportedProtocol(currentTab.url)) {
        let searching = browser.bookmarks.search({url: currentTab.url});
        searching.then((bookmarks) => {
          currentBookmark = bookmarks[0];
          updateIcon();
        });
      } else {
        console.log(`Bookmark it! does not support the '${currentTab.url}' URL.`)
      }
    }
  }

  let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
}

// listen for bookmarks being created
browser.bookmarks.onCreated.addListener(updateActiveTab);

// listen for bookmarks being removed
browser.bookmarks.onRemoved.addListener(updateActiveTab);

// listen to tab URL changes
browser.tabs.onUpdated.addListener(updateActiveTab);

// listen to tab switching
browser.tabs.onActivated.addListener(updateActiveTab);

// listen for window switching
browser.windows.onFocusChanged.addListener(updateActiveTab);

// update when the extension loads initially
updateActiveTab();
