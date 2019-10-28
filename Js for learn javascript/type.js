var s = 'nicholas';
var b = true;
var i = 22;
var u;
var n = null;
var o = new Object();
console.log(typeof s); //string
console.log(typeof b); //boolean
console.log(typeof i); //number
console.log(typeof u); //undefined
console.log(typeof n); //object
console.log(typeof o); //object

console.log(n instanceof Object); //基本类型都是false