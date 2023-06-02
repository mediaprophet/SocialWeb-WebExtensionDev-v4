// Toggle the visibility of the overlay bar
function toggleOverlayBar() {
    var overlayBar = document.getElementById('overlay-bar');
    overlayBar.classList.toggle('visible');
  }
  
  // Function to handle opening the chat window
  function openChatWindow() {
    var chatWindow = document.getElementById('chat-window');
    chatWindow.classList.add('open');
  }
  
  // Function to handle closing the chat window
  function closeChatWindow() {
    var chatWindow = document.getElementById('chat-window');
    chatWindow.classList.remove('open');
  }
  
  // Function to handle displaying notifications
  function displayNotification(message) {
    var notifications = document.getElementById('notifications');
    var notification = document.createElement('div');
    notification.textContent = message;
    notifications.appendChild(notification);
  }
  
  // Add event listeners to the overlay bar elements
  document.getElementById('toggle-button').addEventListener('click', toggleOverlayBar);
  document.getElementById('open-chat-button').addEventListener('click', openChatWindow);
  document.getElementById('close-chat-button').addEventListener('click', closeChatWindow);
  
  // Example usage
  displayNotification('New message received');
  