// 引入其他脚本
var settings = require('settings.js'); 
var globalFunctions = require('globalFunctions.js');
var demo = require('demo.js');

// 初始化配置
const resources = context.getResources(), cf = resources.getConfiguration(), statusBarHeight = resources.getDimensionPixelSize(resources.getIdentifier('status_bar_height', 'dimen', 'android'))*2
var settingsStorage = settings.settingsStorageFile();
settings.initSettings(settingsStorage);
var requestOrNot = false;
var oldOptionsDict = settings.getSettingsDict(settingsStorage); var oldOptionsArr = settings.changeSettingsArr(oldOptionsDict);
var newOptionsDict = settings.getSettingsDict(settingsStorage); var newOptionsArr = settings.changeSettingsArr(newOptionsDict);

// 初始化LOGO
var windowLogo = 'data:image/png;base64,' + files.read("./pics/windowLogo.txt");

// // 初始化DEBUG
// newOptionsArr = settings.changeSettings(newOptionsArr, 'DEBUG', true); // 把这句话注释掉就可以记录每次选择的情况，下次再开就不用选了


// 启动贴边悬浮窗+完整悬浮窗
setInterval(()=>{}, 1000);
var wanzheng_x = 100, wanzheng_y = 100; 
var bianyuan_x = 0, bianyuan_y = 200;
var circle_w = 50, circle_h = 50, radius = 50, frame_w = 400, frame_h = 310; 
var downTime;

// 边缘悬浮窗界面
let 边缘悬浮窗 = floaty.rawWindow(
    <card id='移动框架' cardCornerRadius='{{radius}}' alpha='0.6'>
        <img id='windowLogo' clickable='true' w='{{circle_w}}' h='{{circle_h}}' src='{{windowLogo}}'/>
    </card>
);

// 完整悬浮窗界面
var 完整悬浮窗 = floaty.rawWindow(
    <frame gravity='center' bg='#99000000' id='移动框架' w='{{frame_w}}' h='{{frame_h}}'>
        <vertical margin='10 0 10 0' weightSum='10'>
            <text h='50dp' id='text' textSize='20sp' gravity='center' textColor='white'>demo悬浮窗</text>
            <horizontal>
                <Switch id='调试' text='调试模式' checked="{{newOptionsDict.DEBUG}}" padding='8 8 8 8' textSize='16sp' textColor='white'/>  
                <text h='30dp' margin='10 -10 10 10' textSize='12sp' gravity='left' textColor='white'>*每次加载和点击都会弹出坐标，会影响准确率，慎选</text>
            </horizontal>
            <horizontal>
                <button w='{{frame_w/2-10}}' id='开始demo' text='开始demo'/>
                <button w='{{frame_w/2-10}}' id='停止demo' text='停止demo'/>
            </horizontal>
            <horizontal>
                <text h='25dp' margin='10 0 10 0' textSize='16sp' gravity='center' textColor='white'>更多功能正在开发..未完待续..</text>
            </horizontal>
        </vertical>
    </frame>
);


边缘悬浮窗.setPosition(bianyuan_x, bianyuan_y);
完整悬浮窗.setPosition(-3000, -3000);

边缘悬浮窗.windowLogo.setOnTouchListener(function (view, event) {
    var dw = newOptionsDict.dw, dh = newOptionsDict.dh;
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            X = event.getRawX();
            Y = event.getRawY();
            downTime = new Date().getTime();
            边缘悬浮窗.移动框架.alpha = 1;
            return true;
        case event.ACTION_MOVE:
            x = event.getRawX() - X;
            y = event.getRawY() - Y;
            // 点击超过100毫秒，认定为拖动
            if (new Date().getTime() - downTime > 100){
                // 限制在屏幕内
                if (bianyuan_x + x < 0) {
                    if (bianyuan_y + y < 0) {
                        边缘悬浮窗.setPosition(0, 0);
                    } else if (bianyuan_y + circle_h*2 + y > dh - statusBarHeight) {
                        边缘悬浮窗.setPosition(0, dh - statusBarHeight - circle_h*2);
                    } else {
                        边缘悬浮窗.setPosition(0, bianyuan_y + y);
                    }
                } else if (bianyuan_x + x > dw - circle_w*2) {
                    if (bianyuan_y + y < 0) {
                        边缘悬浮窗.setPosition(dw - circle_w*2, 0);
                    } else if (bianyuan_y + circle_h*2 + y > dh - statusBarHeight) {
                        边缘悬浮窗.setPosition(dw - circle_w*2, dh - statusBarHeight - circle_h*2);
                    } else {
                        bianyuan_x = 边缘悬浮窗.getX()
                        边缘悬浮窗.setPosition(bianyuan_x + x, bianyuan_y + y);
                    }
                } else {
                    if (bianyuan_y + y < 0) {
                        边缘悬浮窗.setPosition(bianyuan_x + x, 0);
                    } else if (bianyuan_y + circle_h*2 + y > dh - statusBarHeight) {
                        边缘悬浮窗.setPosition(bianyuan_x + x, dh - statusBarHeight - circle_h*2);
                    } else {
                        边缘悬浮窗.setPosition(bianyuan_x + x, bianyuan_y + y);
                    }
                }
            }
            return true;
        case event.ACTION_UP:
            // 位置没有移动，认定为点击
            if (Math.abs(event.getRawY() - Y) < 5 && Math.abs(event.getRawX() - X) < 5){
                if (完整悬浮窗.getX()==-3000 && 完整悬浮窗.getY()==-3000){
                    // 打开完整悬浮窗
                    边缘悬浮窗.移动框架.alpha = 1;
                    完整悬浮窗.setPosition(wanzheng_x, wanzheng_y);
                } else {
                    // 关闭完整悬浮窗
                    边缘悬浮窗.移动框架.alpha = 0.5;
                    wanzheng_x = 完整悬浮窗.getX(); wanzheng_y = 完整悬浮窗.getY();
                    完整悬浮窗.setPosition(-3000, -3000);
                }
            } else {
                if (完整悬浮窗.getX()==-3000 && 完整悬浮窗.getY()==-3000){
                    // 未打开完整悬浮窗
                    边缘悬浮窗.移动框架.alpha = 0.5;
                } else {
                    // 已打开完整悬浮窗
                    边缘悬浮窗.移动框架.alpha = 1;
                }

                if (dw > dh) dw = dw - circle_w
                // 判断要停靠的方向
                if (bianyuan_x + x < dw / 2) {
                    if (bianyuan_y + y < 0) {
                        边缘悬浮窗.setPosition(0, 0);
                    } else if (bianyuan_y + y > dh - statusBarHeight) {
                        边缘悬浮窗.setPosition(0, dh - statusBarHeight - circle_h*2);
                    } else {
                        边缘悬浮窗.setPosition(0, bianyuan_y+y);
                    }
                    bianyuan_x = 边缘悬浮窗.getX(); bianyuan_y = 边缘悬浮窗.getY();
                } else {
                    
                    if (bianyuan_y + y < 0) {
                        边缘悬浮窗.setPosition(dw - statusBarHeight, 0);
                    } else if (bianyuan_y + y > dh - statusBarHeight) {
                        边缘悬浮窗.setPosition(dw - statusBarHeight, dh - statusBarHeight - circle_h*2);
                    } else {
                        边缘悬浮窗.setPosition(dw - statusBarHeight, bianyuan_y+y);
                    }
                    bianyuan_x = 边缘悬浮窗.getX(); bianyuan_y = 边缘悬浮窗.getY();
                }
            }
            return true;
    }
    return false;
});

// 可移动
完整悬浮窗.移动框架.setOnTouchListener(function(view, event) {
    var dw = newOptionsDict.dw, dh = newOptionsDict.dh;
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            X = event.getRawX();
            Y = event.getRawY();
            return true;
        case event.ACTION_MOVE:
            x = event.getRawX() - X;
            y = event.getRawY() - Y;
            // 限制在屏幕内
            if (wanzheng_x + x < 0) {
                if (wanzheng_y + y < 0) {
                    完整悬浮窗.setPosition(0, 0);
                } else if (wanzheng_y + frame_h + y > dh - statusBarHeight) {
                    完整悬浮窗.setPosition(0, dh - statusBarHeight - frame_h);
                } else {
                    完整悬浮窗.setPosition(0, wanzheng_y + y);
                }
            } else if (wanzheng_x + x > dw - frame_w) {
                if (wanzheng_y + y < 0) {
                    完整悬浮窗.setPosition(dw - frame_w, 0);
                } else if (wanzheng_y + frame_h + y > dh - statusBarHeight) {
                    完整悬浮窗.setPosition(dw - frame_w, dh - statusBarHeight - frame_h);
                } else {
                    完整悬浮窗.setPosition(dw - frame_w, wanzheng_y + y);
                }
            } else {
                if (wanzheng_y + y < 0) {
                    完整悬浮窗.setPosition(wanzheng_x + x, 0);
                } else if (wanzheng_y + frame_h + y > dh - statusBarHeight) {
                    完整悬浮窗.setPosition(wanzheng_x + x, dh - statusBarHeight - frame_h);
                } else {
                    完整悬浮窗.setPosition(wanzheng_x + x, wanzheng_y + y);
                }
            }
            return true;
        case event.ACTION_UP:
            wanzheng_x += x;
            wanzheng_y += y;
            return true;
    }
    return true;
});

getScreenDirection()

// 屏幕旋转监听及处理
function getScreenDirection() {
    newOptionsDict = settings.changeSettingsDict(newOptionsArr); 
    var DEBUG = newOptionsDict.DEBUG;
    var phone, dw, dh;
    var orientated = cf.orientation
    console.log(orientated)

    if (orientated == cf.ORIENTATION_PORTRAIT) { // 竖屏
        if (device.width < device.height) {
            if (DEBUG) console.log('手机：竖屏');
            // 竖屏识别 
            phone = false;
            // // 横屏识别
            // phone = true;
            dw = device.width, dh = device.height;
        } else {
            if (DEBUG) console.log('手机：竖屏');
            // 竖屏识别 
            phone = false;
            // // 横屏识别
            // phone = true;
            dw = device.height, dh = device.width;
        }
        
        // 横屏切回竖屏
        if (边缘悬浮窗.getX() > dw){
            边缘悬浮窗.setPosition(dw - statusBarHeight - circle_w, 边缘悬浮窗.getY());
        }
        if (完整悬浮窗.getX()!=-3000 && 完整悬浮窗.getY()!=-3000){
            // 已打开完整悬浮窗
            if (完整悬浮窗.getX() > dw){
                完整悬浮窗.setPosition(dw - frame_w, 完整悬浮窗.getY());
            }
        }
    } else if (orientated == cf.ORIENTATION_LANDSCAPE) { // 横屏
        if (device.width > device.height) {
            if (DEBUG) console.log('模拟器：平板模式/手机模式强制横屏');
            // 竖屏识别
            phone = true;
            // // 横屏识别
            // phone = false;
            dw = device.width, dh = device.height;
        } else {
            if (DEBUG) console.log('手机：横屏');
            // 竖屏识别 
            phone = false;
            // // 横屏识别
            // phone = true;
            dw = device.height, dh = device.width;
        }

        // 竖屏切到横屏
        if (边缘悬浮窗.getX() < dh / 2) {
            if (边缘悬浮窗.getY() < 0) {
                边缘悬浮窗.setPosition(0, 0);
            } else if (边缘悬浮窗.getY() > dh - statusBarHeight) {
                边缘悬浮窗.setPosition(0, dh - statusBarHeight - circle_h*2);
            } else {
                边缘悬浮窗.setPosition(0, 边缘悬浮窗.getY());
            }
            bianyuan_x = 边缘悬浮窗.getX(); bianyuan_y = 边缘悬浮窗.getY();
        } else {
            if (边缘悬浮窗.getY() < 0) {
                边缘悬浮窗.setPosition(dw - statusBarHeight - circle_w, 0);
            } else if (边缘悬浮窗.getY() > dh - statusBarHeight) {
                边缘悬浮窗.setPosition(dw - statusBarHeight - circle_w, dh - statusBarHeight - circle_h*2);
            } else {
                边缘悬浮窗.setPosition(dw - statusBarHeight - circle_w, 边缘悬浮窗.getY());
            }
            bianyuan_x = 边缘悬浮窗.getX(); bianyuan_y = 边缘悬浮窗.getY();
        }
        if (完整悬浮窗.getX()!=-3000 && 完整悬浮窗.getY()!=-3000){
            // 已打开完整悬浮窗
            if (完整悬浮窗.getY() > dh - statusBarHeight) {
                完整悬浮窗.setPosition(完整悬浮窗.getX(), dh - statusBarHeight - frame_h);
            }
            wanzheng_x = 完整悬浮窗.getX(); wanzheng_y = 完整悬浮窗.getY();
        }
    }
    newOptionsArr = settings.changeScreenSettings(newOptionsArr, phone, dw, dh);
    newOptionsDict = settings.changeSettingsDict(newOptionsArr); 

    if (DEBUG) console.log('phone:'+phone+',dw:'+dw+',dh:'+dh)
}

//注册监听屏幕旋转广播
var intent_CHANGED;
importPackage(android.content);
importClass(android.content.ContextWrapper);
importClass(android.content.IntentFilter);
filter = new IntentFilter();
filter.addAction("android.intent.action.CONFIGURATION_CHANGED");
let intent_CHANGED = new JavaAdapter(android.content.BroadcastReceiver,{
    onReceive: function (context, intent) {
        getScreenDirection()
    }
})

context.registerReceiver(intent_CHANGED, filter)

// 退出事件，关闭屏幕旋转监听广播
events.on('exit', function () {
    if (intent_CHANGED != null) {
        new ContextWrapper(context).unregisterReceiver(intent_CHANGED);
    }
});


完整悬浮窗.调试.on('check', function(checked) {
    // 用户勾选是否调试模式
    newOptionsArr = settings.changeSettings(newOptionsArr, 'DEBUG', checked);
    newOptionsDict = settings.changeSettingsDict(newOptionsArr); 
    var DEBUG = newOptionsDict.DEBUG;
    if (DEBUG) console.log('DEBUG:' + DEBUG)
});


var testThread;
// 集成功能
// demo
完整悬浮窗.开始demo.on('click', function() {
    // 更改配置
    settings.changeAllDifferentSettings(oldOptionsArr, newOptionsArr, settingsStorage)
    // 开启线程
    testThread = threads.start(function () {
        toastLog('开始demo')
        // 请求截图（如果已请求过则不再请求）
        requestOrNot = globalFunctions.requestSC(requestOrNot, newOptionsDict);
        // demo
        demo.test(newOptionsDict);
    });
});

完整悬浮窗.停止demo.on('click', function() {
    // 结束线程
    if (testThread && testThread.isAlive()) {
        toastLog('停止demo')
        testThread.interrupt();
    }
});


