const { app, BrowserWindow, session } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: __dirname + '/icon.icns',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // 加载你的网站（http）
  win.loadURL('http://xuxuxu.xua.rf.gd/');

  // 允许不安全内容（关键！）
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["default-src * data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval'"]
      }
    });
  });
}

app.whenReady().then(createWindow);
