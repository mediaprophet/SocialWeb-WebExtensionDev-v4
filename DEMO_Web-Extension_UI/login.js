window.onload = function()
{
  // fix for windows 8
  if (navigator.appVersion.indexOf("Windows NT 6.2") != -1)
    document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="pages/css/windows.chrome.fix.css" />'
}

$(function()
{
  $('#form-login').validate()
})

document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault();

    var provider = document.querySelector('input[name="provider"]').value;
    var username = document.querySelector('input[name="username"]').value;
    var passphrase = document.querySelector('input[name="passphrase"]').value;

    solid.auth.login(provider, { username: username, password: passphrase }).then(function(session) {
        console.log(`Logged in as ${session.webId}`);
    }, function(err) {
        console.log(err);
    });
});
