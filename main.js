const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  win.loadFile('index.html')
}
//ready后挂载窗口
app.whenReady().then(() => {
  createWindow()
  //没有窗口激活应用的话就打开窗口
  app.on('activate', () => {
    //创建窗口只能在ready后，所以放在里面
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  //当所有窗口关闭后退出应用
  app.on('window-all-closed', () => {
    //非苹果程序则退出
    if (process.platform !== 'darwin') app.quit()
  })
})
