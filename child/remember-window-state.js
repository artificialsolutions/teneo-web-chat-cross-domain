function rememberVisibilityState(payload) {
  localStorage.setItem('twc_last_state', payload.visibility); // when running in 
}

function restoreWindowState() {
  var lastState = localStorage.getItem('twc_last_state');
  if (lastState === 'maximized') {
    TeneoWebChat.call('maximize');
  } else {
    TeneoWebChat.call('minimized');
  }    
}

TeneoWebChat.on('visibility_changed', rememberVisibilityState);
TeneoWebChat.on('ready', restoreWindowState);