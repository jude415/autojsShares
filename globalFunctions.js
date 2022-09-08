// 创建通用函数
var globalFunctions = {};

// 申请截图
globalFunctions.requestSC = function(requestOrNot, options) {
    if (!requestOrNot) {
      var phone = options.screenOptions.phone;
      // 设置点击环境的分辨率
      setScreenMetrics(device.width, device.height);
      // 请求截图
      requestOrNot = requestScreenCapture(phone);
    }
    return requestOrNot
}

// 图片匹配，返回点击坐标
globalFunctions.match = function(templatePath, x_left, y_left, x_width, y_height, ac, options) {
    var path = options.path, phone = options.screenOptions.phone, DEBUG = options.DEBUG; var resize_x = options.screenOptions.resize_x, resize_y = options.screenOptions.resize_y;
    
    var img = captureScreen(); var img_gray = images.cvtColor(img, 'BGR2GRAY');
    // // base64读取成图片
    // var template = images.fromBase64(files.read(path + '/' + templatePath));
    // 直接读取成图片
    console.log(path + '/' + templatePath)
    var template = images.read(path + '/' + templatePath); 
    if (phone) {template = images.scale(template, resize_x, resize_y);} 
    var template_gray = images.cvtColor(template, 'BGR2GRAY');
    var w = template.width, h = template.height;
    template.recycle();
  
    var matchingResult = images.matchTemplate(img_gray, template_gray, {
      threshold: ac, // 准确率，限制越低越不准
      region: [x_left, y_left, x_width, y_height], // 指定范围内，一般是整个屏幕
      max: 5, // 最多识别5个
    });
    
    img_gray.recycle(); template_gray.recycle();
    
    var flag = false, x = 0, y = 0, similarity = 0;
    var match = matchingResult.best();
    if (match != null) {
      flag = true; x = match.point.x+w/2; y = match.point.y+h/2; similarity = match.similarity;
    }
    // matchingResult.matches.forEach(match => {
    //   flag = true; x = match.point.x+w/2; y = match.point.y+h/2; similarity = match.similarity;
    // });
    
    if (flag && DEBUG) toastLog(similarity + ':(' + x +',' + y +')')
    return { flag:flag, x:x, y:y, similarity:similarity };
}

// 找颜色
globalFunctions.findColor = function(color, x_left, y_left, x_width, y_height, ac, options) {
  var DEBUG = options.DEBUG;
  var img = captureScreen();
  
  var matchingResult = images.findColor(img, color, {
    threshold: 1-ac, // 准确率，限制越低越不准
    region: [x_left, y_left, x_width, y_height]
  });

  var flag = false, x = 0, y = 0;
  if (matchingResult != null) {
    flag = true; x = matchingResult.x; y = matchingResult.y;
  }

  if (DEBUG) toastLog('flag:' + flag)
  return { flag:flag, x:x, y:y };
}

// 点击位置并输出日志，可调整点击位置
globalFunctions.resizeClick = function(resize, x, y, options){
    var DEBUG = options.DEBUG; var resize_x = options.screenOptions.resize_x, resize_y = options.screenOptions.resize_y;
    
    if (resize) {
      x = x*resize_x; y = y*resize_y;
    }
    var success = click(x, y)
    if (DEBUG) {console.log('点击坐标(' + x +', ' + y +')：'+success);}
}
  
module.exports = globalFunctions; //回调
