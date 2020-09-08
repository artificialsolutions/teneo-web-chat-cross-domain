let twcUseLocalStorage = false;

function rememberVisibilityState(payload) {
  if (twcUseLocalStorage) {
    localStorage.setItem('twc_last_state', payload.visibility);
  } else {
    sessionStorage.setItem('twc_last_state', payload.visibility);
  }
}

function restoreWindowState() {
  // get storage config
  twcUseLocalStorage = TeneoWebChat.get('storage_config').storageConfig === 'localStorage';

  // get window state from storage
  let lastState = "minimized"
  if (twcUseLocalStorage) {
    lastState = localStorage.getItem('twc_last_state');
  } else {
    lastState = sessionStorage.getItem('twc_last_state');
  }

  // by default keep window minimized
  if (lastState === 'maximized') {
    TeneoWebChat.call('maximize');
  } else {
    TeneoWebChat.call('minimized');
  }    
}


// let twcStorageConfig = TeneoWebChat.get('storage_config');
TeneoWebChat.on('visibility_changed', rememberVisibilityState);
TeneoWebChat.on('ready', restoreWindowState);