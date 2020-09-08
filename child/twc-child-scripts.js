function maximize() {
  // tell the host to add a class to the iframe to give it the correct height
  window.parent.postMessage(["addClass", "twc-chat-window"], "*"); // wildcard should be replaced with host url/origin

  // fix bug where iframe is not properly maximized sometimes
  // repeat the same postMessage but with a slight delay
  setTimeout(function() {
      window.parent.postMessage(["addClass", "twc-chat-window"], "*"); // wildcard should be replaced with host url/origin
  }, 500);
  
  // fixes for Safari on iOS
  if (detectIphoneSafari()) {
    var chatWindow = document.getElementById('twc-chatwindow-id');
    var inputField = document.getElementById('twc-user-input');

    // it seems some events regarding keyboard visibility is sometimes not received when running in iframe
    // chatch keyboard dismissed
    inputField.addEventListener('blur', function (event) {
      chatWindow.classList.remove("ios-keyboard-shown");
      chatWindow.classList.add("ios-keyboard-hidden");
    });
  
    // catch keyboard should be shown
    inputField.addEventListener('focus', function (event) {   
      chatWindow.classList.add("ios-keyboard-shown");
      chatWindow.classList.remove("ios-keyboard-hidden");
    });

    // sometimes iOS does not fire the focus event properly
    // so we also check for the click event 
    inputField.addEventListener('click', function (event) {   
      chatWindow.classList.add("ios-keyboard-shown");
      chatWindow.classList.remove("ios-keyboard-hidden");
    });
  }
}

function minimize() {
  // tell the host to shrink the iframe to bottom right (launch button size) by removing twc-chat-window class
  window.parent.postMessage(["removeClass", "twc-chat-window"], "*"); // wildcard should be replaced with host url/origin
}

// maximize and minmize the window when the visibility changes
function onVisibilityChanged(payload) {
  switch (payload.visibility) {
    case 'maximized':
      maximize()
      break
    case 'minimized':
      minimize()
      break
  }
}
TeneoWebChat.on('visibility_changed', onVisibilityChanged)

// listen for events from the host
// depending on requirements, more events can be required
window.addEventListener('message', function (e) {
  var eventName = e.data[0];
  var method = e.data[1];
  var origin = e.origin; // origin should be checked for security
  switch (eventName) {
      case 'call':
        switch (method) {
          case 'maximize':
            TeneoWebChat.call('maximize');
            break;
          case 'minimize':
            TeneoWebChat.call('minimize');
            break;
        }
        break;
  }
}, false);

function detectIphoneSafari(){
  var ua = window.navigator.userAgent;
  var iOS = !ua.match(/iPad/i) && !!ua.match(/iPhone/i); // Note: iPad is excluded
  var webkit = !!ua.match(/WebKit/i);
  var iOSSafari = iOS && webkit && !ua.match(/OPiOS/i);
  return iOSSafari;
}
