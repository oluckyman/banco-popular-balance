var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
  console.log('Page title is ' + msg);
};

page.open('https://www4.bancopopular.es/eai_logon/GbpInternetLogonEAI/gbplogon', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    onSuccess();
  }
  phantom.exit();
});


function onSuccess () {
  var title = page.evaluate(function() {
    var username = document.getElementById('username');
    var pass = document.getElementById('userpass');
    console.log(username, pass)
  });
}
