// 创建配置
var settings = {};

// 配置设置文件
settings.settingsStorageFile = function(){
    var settingsStorage = storages.create('testStorageSettings');
    return settingsStorage;
}

// 初始化配置
settings.initSettings = function(settingsStorage){
    // 需被识别的图片存储路径：默认为当前目录的AutoAobi文件夹
    var path = './pics';

    // 调试模式：默认true，每次加载和点击都会弹出坐标，会影响准确率
    // 建议不需要调试就关闭 → var debugSet = false;
    var DEBUG = false; 

    // 自动适配不同屏幕大小
    var phone = true; // 是手机还是模拟器：默认true，可自动判断
    var orginDw = 2400, orginDh = 1080; // 原手机的分辨率
    var dw = device.height; dh = device.width; var resize_x = dw / orginDw, resize_y = dh / orginDh;
    var screenOptions = { phone: phone, dw: dw, dh: dh, resize_x: resize_x, resize_y: resize_y }

    options = {
        path: path,
        DEBUG: DEBUG,
        screenOptions: screenOptions
    }

    if (!settingsStorage.contains('options')) settingsStorage.put('options', options);
}

// 获取配置
settings.getSettings = function(){
    var settingsStorage = settings.settingsStorageFile();
    return settingsStorage.get('options', '');
}

// 修改配置
settings.changeSetting = function(options){
    var settingsStorage = settings.settingsStorageFile();
    settingsStorage.put('options', options);
    return settings.getSettings();
}

// 修改屏幕相关配置
settings.changeScreenSettings = function(options, phone, dw, dh){
    // 自动适配不同屏幕大小
    var orginDw = 2400, orginDh = 1080;
    var resize_x = dw / orginDw, resize_y = dh / orginDh;
    var screenOptions = { phone: phone, dw: dw, dh: dh, resize_x: resize_x, resize_y: resize_y };
    options.screenOptions = screenOptions;
    settings.changeSetting(options);
    return options
}

module.exports = settings; //回调
