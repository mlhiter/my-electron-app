// window.addEventListener('DOMContentLoaded', () => {
//   //辅助函数，辅助输出替换文本
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }
//   for (const dependency of ['chrome', 'node', 'electron']) {
//     replaceText(`${dependency}-version`, process.versions[dependency])
//   }
// })
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'), //包裹一下防止出现安全问题（渲染进程可以无限制向主进程发送信息，如果直接暴露的话）

  // 除函数之外，我们也可以暴露变量
})
