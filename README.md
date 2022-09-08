# autojsShares
关于autojs的分享



## 序言

这段时间为了玩奥比岛，自学了autojs，以下是一些简单的分享。主要是：

① 全分辨率的图片识别 + 点击；

② 颜色识别+点击；

③ 一些简单的UI，包括贴边悬浮窗和完整悬浮窗。



## 💡 原理

这个脚本的原理是自动截图，将要找的图标与截图做匹配，找到屏幕上对应的位置，模仿人的点击等手势动作，把自动点击等一系列操作封装成脚本。



## 🕹️使用步骤

```js
/* 以下为 Auto.js 的简单使用方法，文档部分引自：*/
# https://github.com/qulingyuan/robVeg/edit/master/README.md
# https://github.com/georgehuan1994/DingDing-Automatic-Clock-in/edit/master/README.md
```


1. 安装 `Auto.js`（版本需为4.1.1 Alpha2及以上），目前官网提供的是 `Auto.js Pro`，是收费的，45 块钱买断制，还是良心的，建议大家购买。不过这里也分享一下免费版本：`Autojs 4.1.1a Alpha2-armeabi-v7a-release.apk`（非破解版，是开始收费前的免费版）

2. 安装软件后，开启应用的**无障碍**和**悬浮窗**功能。

   ![无障碍和悬浮窗.png](https://gitee.com/judeHome/autojsShares/raw/main/README/Step2.png)

3. 进入设置，选择 **脚本运行 > 音量上键停止所有脚本**。

   ![音量上键停止所有脚本.png](https://gitee.com/judeHome/autojsShares/raw/main/README/Step3.png)

4. 自行调试

```js
/* 以下为 Auto.js 的说明文档，可供参考： */
# https://www.kancloud.cn/conquerrorfy/daowuya399/2125897（旧版，不再更新）
# https://pro.autojs.org/docs/#/zh-cn/?id=%e7%bb%bc%e8%bf%b0（最新版Pro）
```

（1）打开 VS Code，安装`Auto.js-VSCodeExt`插件。

![VS Code插件.png](https://gitee.com/judeHome/autojsShares/raw/main/README/Step4(1).png)

（2）`Command+shift+P`快捷键打开 `Command Palette`，运行 `Auto.js:New Project`命令创建一个新项目。

![创建新项目.png](https://gitee.com/judeHome/autojsShares/raw/main/README/Step4(2).png)

（3）自行编写、修改.js脚本，可参考已提供的.js文件。

（4）运行 `Auto.js:Start Server` 命令启动服务，手机和电脑在同一局域网的情况下打开”连接电脑“选项，连接成功后，VS Code 会弹出提示。然后就可以愉快地改代码调试了。

（5）调试完成后，确定代码可以正常运行了，可以在 Auto.js 上新建一个脚本文件，把写好的代码放进去，然后点击文件右侧的三角形运行。



## ⚠️ 注意事项 （必读！）

1. 一定要打开无障碍功能！如果发现无法点击或者什么其他异常，大概率是无障碍功能关闭了，是的，无障碍功能有时候会自动关闭。

2. 放图片的路径中尽量不要有中文，有中文大概率会报错。

3. `Auto.js`记得锁定，防止因为充电等手机原因被后台进程误杀，一定要一直处于使用界面，否则截图获取不到游戏内容。

   ![锁定autojs.png](https://gitee.com/judeHome/autojsShares/raw/main/README/Warning(3).png)

4. 如果以上图片全挂了，可以访问我的Gitee（与Github同步）：

```js
https://gitee.com/judeHome/autojsShares
```

5. 执行时不要直接`Ctrl+F5`，会报`Moudle not Found`的错误，需要`Save Project`到手机本地后，在手机本地运行调试。
6. 未完待续...