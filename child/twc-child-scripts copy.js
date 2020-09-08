function maximize() {
  console.log("Child maximize function. Adding class");
  // tell the host to add a class to the iframe to give it the correct height
  window.parent.postMessage(["addClass", "twc-chat-window"], "*"); // wildcard should be replaced with host url/origin

  // fix bug where iframe is not properly maximized sometimes
  // repeat the same postMessage but with a slight delay
  setTimeout(function() {
      window.parent.postMessage(["addClass", "twc-chat-window"], "*"); // wildcard should be replaced with host url/origin
  }, 500);

  // fix issue on ios
  // if chat window is maximized and then the page is reloaded 
  // we automatically maximize the window
  // in that case, twc thinks input box gets focus and so it recudes the screen height 
  // to make room for the keyboard when running on ios
  // however, when the chat window is maximized like this, the input does not get focus
  // so we need to remove the ios-keyboard-shown class
  // if (detectIosSafari()) {
  //   var chatWindow = document.getElementById('twc-chatwindow-id');
  //   chatWindow.classList.remove("ios-keyboard-shown");
  // }
  
  // fixes for Safari on iOS
  console.log('detectIphoneSafari',detectIphoneSafari());
  if (detectIphoneSafari()) {
    var chatWindow = document.getElementById('twc-chatwindow-id');
    var inputField = document.getElementById('twc-user-input');

    // it seems twc sometimes misses that keyboard was dismissed
    inputField.addEventListener('blur', function (event) {
      console.log("keyboard blur")
      chatWindow.classList.remove("ios-keyboard-shown");
      chatWindow.classList.add("ios-keyboard-hidden");
    });
  
    // it seems twc sometimes misses that keyboard should be shown
    inputField.addEventListener('focus', function (event) {   
      console.log("keyboard focus")
      chatWindow.classList.add("ios-keyboard-shown");
      chatWindow.classList.remove("ios-keyboard-hidden");
    });

    // sometimes iOS does not fire the focus event properly
    // so we also check for the click event 
    inputField.addEventListener('click', function (event) {   
      console.log("inputfield click")
      chatWindow.classList.add("ios-keyboard-shown");
      chatWindow.classList.remove("ios-keyboard-hidden");
    });
  }
}

function minimize() {
  // tell the host to shrink the iframe to bottom right (launch button size) by removing twc-chat-window class
  window.parent.postMessage(["removeClass", "twc-chat-window"], "*");
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

// fix issue on ios
// the window is maximized using the launch button
// the input box gets focus, so we should reduce the height of the screen 
// but in the maximize function above we have removed the class to solve an issue that occurred when reloading the page
// as a result of that fix, the top of the chat window will now scroll of the screen
// so we need to re-add the ios-keyboard-shown class when window is launched using the open button
// function onOpenButtonClicked(payload) {
//   // handle open button clicked event
//   if (detectIphoneSafari()) {
//     console.log("Open button clicked")
//     setTimeout(function() {
//       console.log("Adding class")
//       var chatWindow = document.getElementById('twc-chatwindow-id');
//       chatWindow.classList.add("ios-keyboard-shown");
//     }, 50);
//   }
// }

// TeneoWebChat.on('open_button_clicked', onOpenButtonClicked)

// listen for events from the host
// depending on requirements, more events can be required
window.addEventListener('message', function (e) {
  var eventName = e.data[0];
  var method = e.data[1];
  var payload = e.data[2];
  var origin = e.origin; // origin should be checked for security
  console.log('message received', eventName, method, payload)
  switch (eventName) {
      case 'call':
        switch (method) {
          case 'maximize':
            TeneoWebChat.call('maximize');
            // iOS does not give input box focus when maximized from host
            // twc thinks the keyboard is shown
            // so we need to remove class 'ios-keyboard-shown' from the chatwindow
            // to make sure the chat window has height 100%
            // if (detectIphoneSafari()) {
            //   setTimeout(function() {
            //     console.log('Remove keyboard shown class');
            //     var myChatWindow = document.getElementById('twc-chatwindow-id');
            //     myChatWindow.classList.remove("ios-keyboard-shown");
            //   }, 50);
            // }
            break;
          case 'minimize':
            TeneoWebChat.call('minimize');
            break;
          case 'send_input':
            var messagePayload = {'text':payload}
            TeneoWebChat.call('send_input', messagePayload);
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
