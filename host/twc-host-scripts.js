const iframe = document.getElementById('twc-iframe');

// receive events from the iframe
// needed to properly minimize and maximize the iframe
// more functions/events can be added, depending on requirements
window.addEventListener('message', function (e) {
    var eventName = e.data[0];
    var data = e.data[1];
    var origin = e.origin; // origin should be checked for security
    console.log("Host received message", eventName, data)
    switch (eventName) {
        case 'addClass':
            iframe.classList.add(data);
            break;
        case 'removeClass':
            iframe.classList.remove(data);
            break;
    }
}, false);


// CODE BELOW IS OPTIONAL
// ADDED AS EXAMPLE TO DEMONSTRATE HOW BUTTONS ON HOST SITE
// CAN TRIGGER EVENTS IN TENEO WEB CHAT

// Pick up events on the page and send them to the iframe
const iframeWindow = iframe.contentWindow;

// maximize button
var chatButtonOpen = document.getElementById('chat-btn-open');
chatButtonOpen.addEventListener('click', function() {
    // send a message to the iframe that the chat window should be maximized
    iframeWindow.postMessage(["call", "maximize"], "*"); // wildcard should be replaced with host url

    // add class to iframe maximize it's size
    // this is not needed strictly because the child page will send a message to add this class as well
    // but adding it directly makes the iframe reach it's full size before the chat window fades in
    iframe.classList.add("twc-chat-window");
});

// minimize buttons
var chatButtonClose = document.getElementById('chat-btn-close');
chatButtonClose.addEventListener('click', function() {
    // send a message to the iframe that the chat window should be minimized
    iframeWindow.postMessage(["call", "minimize"], "*"); // wildcard should be replaced with host url
});

// button that sends 'Hello' input to teneo web chat
var chatButtonSendInput = document.getElementById('chat-btn-send-input');
chatButtonSendInput.addEventListener('click', function() {
    console.log('Send input button clicked')
    iframeWindow.postMessage(["call", "send_input", "Hello"], "*"); // wildcard should be replaced with host url
});