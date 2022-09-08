var demo = {}

// demo
demo.test = function(options) {
  var DEBUG = options.DEBUG; var dw = options.dw, dh = options.dh;
  var point;

  // 开始识别
  point = globalFunctions.match('test.png', 0, 0, dw, dh, 0.1, options);
  if (point.flag) {
    // 识别到了
    if (DEBUG) {console.log('识别到了');}
    // 识别到的点击【不需要】转换分辨率
    globalFunctions.resizeClick(false, point.x, point.y, options); sleep(500);
  }


  // 直接点击
  if (DEBUG) {console.log('直接点击');}
  // 直接点击【需要】转换分辨率
  globalFunctions.resizeClick(true, 2080, 990, options); sleep(500);
}

module.exports = demo; //回调
