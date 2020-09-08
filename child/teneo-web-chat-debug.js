// put debugging code here
(function (api) {
  [
    "ready",
    "visibility_changed",
    "input_submitted",
    "engine_request",
    "engine_response",
    "new_message",
    "message_button_clicked",
    "modal_button_clicked",
    "open_button_clicked",
    "minimize_button_clicked",
    "close_button_clicked",
    "user_typing",
  ].forEach(function (eventName) {
    api.on(eventName, function (payload) {
      if (payload) {
        console.log("TeneoWebChat on", eventName, payload);
      } else {
        console.log("TeneoWebChat on", eventName);
      }
      
    });
  });
})(window.TeneoWebChat);
