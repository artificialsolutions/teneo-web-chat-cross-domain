function rememberVisibilityState(payload) {
    localStorage.setItem('twc_last_state', payload.visibility);
}

function restoreWindowState() {

  // get window state from storage
  const lastState = localStorage.getItem('twc_last_state');

  // by default keep window minimized
  if (lastState === 'maximized') {
    TeneoWebChat.call('maximize');
  } else {
    TeneoWebChat.call('minimized');
  }    
}

TeneoWebChat.on('visibility_changed', rememberVisibilityState);
TeneoWebChat.on('ready', restoreWindowState);