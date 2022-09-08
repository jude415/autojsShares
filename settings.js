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

    // 手机/模拟器：默认true，可自动判断
    var phone = true; 

    // 调试模式：默认true，每次加载和点击都会弹出坐标，会影响准确率
    // 建议不需要调试就关闭 → var debugSet = false;
    var DEBUG = false; 

    // 自动适配不同屏幕大小
    var dw = device.height; dh = device.width; var orginDw = 2400, orginDh = 1080;
    var resize_x = dw / orginDw, resize_y = dh / orginDh;

    var options = [
        {key: 'path', value: path},
        {key: 'phone', value: phone},
        {key: 'DEBUG', value: DEBUG},
        {key: 'dw', value: dw},
        {key: 'dh', value: dh},
        {key: 'resize_x', value: resize_x},
        {key: 'resize_y', value: resize_y},
    ]

    options.forEach(item => {
        if (!settingsStorage.contains(item.key)) settingsStorage.put(item.key, item.value)
    });
}

// 修改单个配置
settings.changeSettings = function(optionsArr, key, value){
    optionsArr.forEach(item => {
        if (item.key===key) {
            item.value = value
            return 
        }
    });
    return optionsArr
}

// 数组格式
// 修改所有不同的配置
settings.changeAllDifferentSettings = function(oldOptionsArr, newOptionsArr, settingsStorage){
    for(let i=0; i<oldOptionsArr.length; i++){
        for(let j=0; j<newOptionsArr.length; j++){
            if (oldOptionsArr[i].key === newOptionsArr[j].key && oldOptionsArr[i].value != newOptionsArr[j].value) {
                settingsStorage.put(newOptionsArr[j].key, newOptionsArr[j].value)
            }
        }
    }
}

// 修改屏幕相关配置
settings.changeScreenSettings = function(optionsArr, phone, dw, dh){
    // 自动适配不同屏幕大小
    var orginDw = 2400, orginDh = 1080;
    // var dw, dh; 
    // if (phone) { dw = device.height; dh = device.width; } else { dw = device.width; dh = device.height; }
    var resize_x = dw / orginDw, resize_y = dh / orginDh;

    settings.changeSettings(optionsArr, 'phone', phone)
    settings.changeSettings(optionsArr, 'dw', dw)
    settings.changeSettings(optionsArr, 'dh', dh)
    settings.changeSettings(optionsArr, 'resize_x', resize_x)
    settings.changeSettings(optionsArr, 'resize_y', resize_y)

    // console.log(optionsArr)
    
    return optionsArr
}

// 转换成配置数组
settings.changeSettingsArr = function(settingsDict){
    var path = settingsDict.path, phone = settingsDict.phone, DEBUG = settingsDict.DEBUG;
    var dw = settingsDict.dw, dh = settingsDict.dh, resize_x = settingsDict.resize_x, resize_y = settingsDict.resize_y
    return [
        {key: 'path', value: path},
        {key: 'phone', value: phone},
        {key: 'DEBUG', value: DEBUG},
        {key: 'dw', value: dw},
        {key: 'dh', value: dh},
        {key: 'resize_x', value: resize_x},
        {key: 'resize_y', value: resize_y},
    ]
}

// 字典格式
// 获取配置字典
settings.getSettingsDict = function(settingsStorage){
    var path = settingsStorage.get('path'), phone = settingsStorage.get('phone'), DEBUG = settingsStorage.get('DEBUG');
    var dw = settingsStorage.get('dw'), dh = settingsStorage.get('dh'), resize_x = settingsStorage.get('resize_x'), resize_y = settingsStorage.get('resize_y')
    return {path:path, phone:phone, DEBUG:DEBUG, dw:dw, dh:dh, resize_x:resize_x, resize_y:resize_y}
}

// 转换成配置字典
settings.changeSettingsDict = function(settingsArr){
    var settingsDict = {}
    settingsArr.forEach(item => {
        settingsDict[item.key] = item.value
    });
    return settingsDict
}

module.exports = settings; //回调
