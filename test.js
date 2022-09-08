var settingsStorage = storages.create('testStorageSettings');

var phone = true, dw=100,dh=100,resize_x=100,resize_y=100;

var screenOptions = { phone: phone, dw: dw, dh: dh, resize_x: resize_x, resize_y: resize_y};
// console.log(screenOptions)
settingsStorage.put('screenOptions',screenOptions)

screenOptions = settingsStorage.get('screenOptions')
console.log(screenOptions)

console.log(screenOptions.phone)