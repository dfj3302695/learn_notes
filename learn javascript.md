javacript高级编程设计（第3版）-读书笔记
===
### 第4章 变量，作用域和内存问题
1. 基本类型和引用类型的值
    1. 基本类型 `undifined`,`Null`,`Boolean`,`Number`,`String`

    不能给基本类型的值添加属性，尽管这样做不会导致任何错误，如：
    ```javascript
    var name = "Nicholas";
    name.age = 27;
    alert(name.age); //undifined
    ```
    2. 复制变量值

        - 基本类型复制是各自独立的
        - 引用类型复制是复制指针，改变任何一个都会影响到其它

    3. 传递参数

        传入function的参数都是依值传，无伦是基本类型还是引用类型
        ```javascript
        function addTen(num) {
        num += 10;
        return num;
        }
        var count = 20;
        var result = addTen(count);
        console.log(count);  //20
        console.log(result); //30
        //------------------------------
        function setName(obj) {
            obj.name = "Nicholas";
            
        }
        var person = {};
        setName(person);
        console.log(person.name);  //Nicholas
        //-------------------------
        function setName(obj) {
            obj.name = "Nicholas";
            obj = {};   //局部变量， function完毕立即被销毀
            obj.name = 'Greg';//局部变量， function完毕立即被销毀
        }
        var person = {};
        setName(person);
        console.log(person.name);  //Nicholas
        ```
    4. 检测类型

        `typeof` 和 `instanceof`
        ```javascript
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
        ```


2. 执行环境和作用域

    在web中，执行环境被认为是window对象
### 第5章 引用类型
1. Object类型
创建Object实例有两种方法
    ```javascript
    var person = new Object();
    person.name = "jack";
    person.age = 29;
    //另一种
    var person = {
        name: "jack",
        // 也可这样 "name": "jack",
        age: 29
    }
    ```
2. Array类型
    同样两种方法

    ```javascript
    var colors = new Array();
    //另一种
    var colors =[]
    ```

    1. 检测数组

       - instanceof
       - isArray()

    2. 转换方法

        - toLocaleString()
        - toString()
        - valueOf()
        - join()

    3. stack方法

        - push()
        - pop()

    4. 队列方法

        - shift()
        - unshift()

    5. 重排序方法

        - reverse()
        - sort()

    6. 操作方法

        - concat()
        - slice()
        - splice()

    7. 位置方法

        - indexOf()
        - lastIndexOf()

    8. 迭代方法

        - every()
        - filter()
        - forEach()
        - map()
        - some()

    9. 缩小方法

        - reduce()
        - reducRight()

3. Date 类型 var now = new Date();

    - 方法 Date.parse()和 Date.UTC() , Date.now()

    1. 继承的方法，重写了toLocalString()和toString()
    2. 日期格式化方法

        - toDateString()
        - toTimeString()
        - toLocaleDateString()
        - toLocaleTimeString()
        - toUTCString()

    3. 日期/时间组件方法

        - ![11](/jpg/learn-javascript/11.png)
        - ![22](/jpg/learn-javascript/屏幕快照&#32;2019-10-28&#32;下午3.25.08.png)
        - ![33](/jpg/learn-javascript/屏幕快照&#32;2019-10-28&#32;下午3.25.17.png)

    4. RegExp类型

        - var expression = / pattern / flags;
          - pattern
            - g: 表示全局(global)
            - i: 不区分大小写(case-insensitive)
            - m: 多行模式(multiline)
        1. RegExp 实例属性
           1. global
           2. ignoreCase
           3. lastIndex
           4. multiline
           5. source
        2. RegExp 实例方法
        3. RegExp 构造函数属性
        4. 模式的局限性
    5. Function类型 函数实际上是对象
       1. 没有重载（深入理解）
       2. 函数声明与表达式

        ```javascript
        console.log(sum(10,10));
        function sum(num1,num2){
        return num1 + num2
        }
        //没问题，解析器会提升函数声明
        ```

         ```javascript
        console.log(sum(10,10));
        var sum = function(num1,num2){
        return num1 + num2
        }
        //会发生错误
        onsole.log(sum(10,10));
            ^

        TypeError: sum is not a function
            at Object.<anonymous> (/Users/jack/app_design/learn_notes/Js for learn javascript/type.js:2:13)
            at Module._compile (internal/modules/cjs/loader.js:776:30)
            at Object.Module._extensions..js (internal/modules/cjs/loader.js:787:10)
            at Module.load (internal/modules/cjs/loader.js:653:32)
            at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
            at Function.Module._load (internal/modules/cjs/loader.js:585:3)
            at Function.Module.runMain (internal/modules/cjs/loader.js:829:12)
            at startup (internal/bootstrap/node.js:283:19)
            at bootstrapNodeJSCore (internal/bootstrap/node.js:622:3)
        ```
        3. 做为值的函数
        ```javascript
        function add10(num){
        return num+10;
        }
        function callSomeFunction(someFunction, SomeArgument){
            return someFunction(SomeArgument);
        }

        var result1 = callSomeFunction(add10,10);
        console.log(result1) //20
        //要访问函数的指针面不执行函数的话需去掉（）
        ```

        // 依对象属性排序
        ```javascript
        var data = [
            {
                name: 'jack',
                age: 23
            },
            {
                "name": 'promise',
                "age": 10
            },
            {
                name: 'aj',
                age: 50
            }
        ]
        function comparFunction(propertyName) {
            return function(obj1,obj2) {
                var val1 = obj1[propertyName]; //不能用obj1.propertyName
                var val2 = obj2[propertyName];
                if (val1 < val2){
                    return -1;
                }else if (val1 > val2){
                    return 1;
                }else {
                    return 0;
                }
            }
        }
        console.log(data.sort(comparFunction("age")))
        console.log(data.sort(comparFunction("name")))
        ```
        4. 函数内部属性 `arguments`和`this`

            - `arguments.callee` 指向函数自身，用于递归算法,保存当前函数的引用
            - `arguments.callee.caller` 保存当前函数的函数的引用

        5. 函数属性和方法
           1. `length` 参数的数量
           2. `prototype` 
           3. `apply()`
           4. `call()`
           5. `bind()`

        6. 基本包装类型
           1. `Boolean`
           2. `Number`
              1. `toFixed()` 小数点
              2. `toExponential()` e表示法
              3. `toPrecision()` 位数
           3. `String`
              1. 字符方法
                 1. `charAt()`
                 2. `charCodeAt()`
              2. 字符串方法
                 1. `concat()` 拼接
                 2. `slice()`
                 3. `substr()`
                 4. `substring()`

              3. 字符串位置方法
                 1. `indexOf()`
                 2. `lastIndexOf()`

              4. trim()方法 删除空格
              5. 大小写转换
                 1. toLowerCase()
                 2. toLocalLowerCase()
                 3. toUpperCase()
                 4. toLocalUpperCase()

              6. 模式匹配方法
                 1. match(正则表达式或RegExp对象)
                 2. search(正则表达式或RegExp对象)
                 3. replace()
              7. localeCompar()方法
              8. fromCharCode()方法
              9. HTML方法
        7. 单体内置对象 Object,Array,String,Global,Math
           1. Global 对象
              1. URI 编码方法
                 1. encodeURI()和encodeURIComponent()
                 2. decodeURI()和decodeURIComponent()
              2. eval() 方法 执行代码
              3. Global对象的属性

                ![](jpg/learn-javascript/屏幕快照&#32;2019-10-29&#32;下午1.11.45.png)
            
              4. window 对象
              5. Math 对象
                 1. 属性

                ![](jpg/learn-javascript/屏幕快照&#32;2019-10-29&#32;下午1.15.58.png)
                 2. min()和max()方法
                 3. 

            

### 第24章 最佳实践
1. 代码约定

    1. 可读性

       * function--每个function 都应该有一个注释，描述其目的和用于完成任务可以使用的算法。 说明事先假设也非常重要，如参数代表什么，是否有返回值。
       - 大段代码--需要说明任务
       - 复杂的算法--解释你是如何做的
       - Hack--浏览器差异，javascript一般会包含一些Hack,应注释

    2. 变量和function命名

       - 变量名应为名词如`car`或`person`
       - function名应心动词开始，如 `getName()`,返回布尔类型以`is`开头，如`isEnable()`
       - 不要担心名字过长

    3. 变量类型透明

        - 通过初始化指定变量类型

        ```javascript
        var found = false;
        var count = -1;
        var name = '';
        var person = nall; //对象
        ```
        缺点：无法用于function声明中的参数
        - 匈牙利标记法
        少人用
        ```javascript
        var bFound; //bool
        var iCount; //整数
        var sName;  //string
        var oPerson; //Object
        ```
            
        - 用于指定类型的类型注释

        ```javascript
        var found /* :Boolean */ = false;       
        ```
        //以下代码不能正确运行
        ```javascript
        /*
        var found /* :Boolean */ = false;
        */
        ```
    以上三种可选一种合适自己的
   
    1. 松散耦合

        - 解耦HTML/Javascript
        - 解耦CSS/Javascript
        - 解耦应用逻辑/事件处理
        


