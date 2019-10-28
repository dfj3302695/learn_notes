# javacript高级编程设计（第3版）-读书笔记
### 24章 最佳实践
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
   
    4. 松散耦合

        - 解耦HTML/Javascript
        - 解耦CSS/Javascript
        - 解耦应用逻辑/事件处理
        


