// Get the dropdown element
let dropdown = document.querySelector('.dropdown');

// Toggle the "show" class when the dropdown is clicked
dropdown.addEventListener('click', function(event) {
    event.stopPropagation();
    this.classList.toggle('show');
});

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdown')) {
        let dropdowns = document.getElementsByClassName("dropdown-menu");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
document.querySelector("#settings-button").addEventListener("click", function(event) {
    event.preventDefault();
    chrome.tabs.create({url: "admin.html"});
  });
  