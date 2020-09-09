function rememberVisibilityState(payload) {
    // store state in localStorage
    sessionStorage.setItem('twc_last_state', payload.visibility);
}

function restoreWindowState() {

  // get window state from localStorage
  const lastState = sessionStorage.getItem('twc_last_state');

  // by default keep window minimized
  if (lastState === 'maximized') {
    TeneoWebChat.call('maximize');
  } else {
    TeneoWebChat.call('minimized');
  }    
}

TeneoWebChat.on('visibility_changed', rememberVisibilityState);
TeneoWebChat.on('ready', restoreWindowState);