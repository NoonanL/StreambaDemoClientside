const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Store = require('./src/services/store.js');
const ipcMain = electron.ipcMain;

const path = require('path');
const isDev = require('electron-is-dev');

/**
 * This creates a data store for variables
 * see store.js in /services
 */
const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    access: '',
    refresh: ''
  }
});

//declare windows
let mainWindow;
let loginWindow;

//creates login window and shows it on app open
function createLoginWindow() {
  loginWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 600,
    height: 600,
    show: false,
    webPreferences: { webSecurity: false, nodeIntegration: true }
  });

  loginWindow.loadURL(
    isDev
      ? 'http://localhost:3000/auth/sign-in'
      : `file://${path.join(__dirname, '../build/auth/sign-in')}`
  );

  loginWindow.once('ready-to-show', () => {
    loginWindow.show();
  });

  loginWindow.on('closed', () => (loginWindow = null));
}

//creates the main window ie index.html/home
function createMainWindow() {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1366,
    height: 768,
    show: false,
    webPreferences: { webSecurity: false, nodeIntegration: true }
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000/'
      : `file://${path.join(__dirname, '../build/')}`
  );

  // mainWindow.once('ready-to-show', () => {
  //   mainWindow.show();
  // });

  mainWindow.on('closed', () => (mainWindow = null));
}

//Opens login window on app ready
app.on('ready', createLoginWindow);

//Creates Login window on app startup
app.on('activate', function() {
  if (loginWindow === null) {
    createLoginWindow();
  }
  if (mainWindow === null) {
    createMainWindow();
  }
});

//Gracefully closes the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//Test method
ipcMain.on('test', () => {
  console.log('test fired');
  return 'test string';
});

/**
 * If True, user is logged in - hides the login window and shows the main window
 * If False, user is logged out - hides the main window and shows login.
 * IMPORTANT - this assumes the user is always either at the mainWindow or the login page
 * ie if the user later navigates to a different page and is then logged out, this function will need extended in order
 * to properly log the user out.
 */
ipcMain.on('logged-in', (event, arg) => {
  if (arg) {
    createMainWindow();
    //console.log('Logged in!');
    loginWindow.hide();
    mainWindow.show();
  } else {
    mainWindow.hide();
    loginWindow.show();
    console.log('Showing login window');
  }
});

/**
 * Allows for the adding or updating of a setting in the Store
 * 
 * This isnt ideal as access keys should not be stored, will look at in future. 
 */
ipcMain.on('set-settings', (event, arg) => {
  store.set(arg.key, arg.val);
  // console.log(arg.key);
   //console.log('Setting new ' + arg.key + 'value: ' + arg.val);
});

/**
 * Allows for fetching a setting in the Store
 */
ipcMain.on('get-settings', (event, arg) => {
  //console.log('settings fetched' + store.get(arg));
  //event.returnValue(store.get(arg));
  event.returnValue = store.get(arg);
});

ipcMain.on('fetch-settings', (event, arg) => {
  //console.log('settings fetched' + store.get(arg));
  //event.returnValue(store.get(arg));
  event.reply('fetch-reply', store.get(arg));
});

ipcMain.on('fetch-access', event => {
  //console.log('settings fetched' + store.get(arg));
  //event.returnValue(store.get(arg));
  event.returnValue = store.get('access');
});

ipcMain.on('set-access', (event, arg) => {
  store.set('access', arg)
  console.log('access set: ' + arg);
  //event.returnValue(store.get(arg));
  // event.returnValue = store.get('access');
});

ipcMain.on('fetch-refresh', (event, arg) => {
  //console.log('settings fetched' + store.get(arg));
  //event.returnValue(store.get(arg));
  event.returnValue = store.get('refresh');
});

ipcMain.on('update-page', (event, arg) => {
  //console.log('settings fetched' + store.get(arg));
  //event.returnValue(store.get(arg));
  event.reply('page-change', arg);
});
