var fs = require('fs');
var url = 'https://www4.bancopopular.es/eai_logon/GbpInternetLogonEAI/gbplogon';
var loggedInUrl = 'https://www4.bancopopular.es/eai_desktop/GbpInternetDesktop/EstablishSession#/CUE9001C_PosicionIntegral'
var formSelector = '#identifica';
var amountSelector = '#CUE9001C_PosicionIntegral1_sdoCta_0_amount';

var casper = require('casper').create({
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
  },
});

var username = casper.cli.get('username');
var password = casper.cli.get('password');

if (!username || !password) {
  console.error('Username and password are required');
  casper.exit();
}

casper.start(url, function () {
  this.waitForSelector(formSelector);
});

casper.then(function () {
  this.fill(formSelector, {
    username: username,
    userpass: password,
  }, true);
  this.clickLabel('Entrar', 'button');
});

casper.waitForUrl(loggedInUrl, function () {
  this.waitForSelector(amountSelector);
  var amount = this.fetchText(amountSelector);
  // this.echo(this.fetchText(amountSelector));
  fs.write('amount.txt', amount, 'w');
  console.log("Amount was saved: ", amount);
}, function () { this.capture('timeout.png'); }, 20000);

casper.run();
