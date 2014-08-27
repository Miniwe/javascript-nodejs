var init = require('./init');
var insertNonBlockingScript = require('./insertNonBlockingScript');
var Modal = require('./modal');
var Spinner = require('client/spinner');

init.addHandler("login", function() {

  var link = document.querySelector('a.user__entrance');
  link.onclick = function(e) {
    e.preventDefault();
    login();
  };
  link.classList.remove('unready');

});

function login(options) {
  var modal = new Modal();
  var spinner = new Spinner();
  modal.setContent(spinner.elem);
  spinner.start();
  var script = insertNonBlockingScript('/js/auth.js');
  script.onload = function() {
    modal.remove();
    var AuthModal = require('auth/client').AuthModal;
    new AuthModal();
  };
}

module.exports = login;