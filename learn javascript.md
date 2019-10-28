# javacript高级编程设计（第3版）-读书笔记
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


2. 

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
        


