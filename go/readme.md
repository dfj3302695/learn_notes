
1. 跨平台编译
   1. mac下

mac 环境
- `vi ~/.bash_profile`
```
export GOPATH=/Users/jack/app_design/go
export GOBIN=$GOPATH/bin
export PATH=$PATH:$GOBIN
```
- `source ~/.bash_profile` 
- `go env`

### 基本类型
  ```
  bool

  string

  int  int8  int16  int32  int64
  uint uint8 uint16 uint32 uint64 uintptr

  byte // uint8 的别名

  rune // int32 的别名
    // 表示一个 Unicode 码点

  float32 float64

  complex64 complex128
  ```

###指针
    - a = b
      - 等号左边的变量，代表变量所指向的内存空间 （写）
      - 等号右边的变量，代表变量内存空间存储的数据值
      - 指针的函数传参（传引用）
        - 传地址（引用）：将形参的地址值作为函数参数传递。
        - 传值（数据）：将实参的值拷贝一份给形参
        - 传引用： 在a栈桢内部，修改b栈桢中的变量值
###切片
1. 为什么用切片：
    - 数组容量固定，不能自动拓展
    - 值传递，数组做为函数参数时，将整个数组拷贝一份给形参
    在Go语言中，我们几乎可以在所有的场景中，使用切替换数组使用
2. 切片的本质：
    - 不是一个数组的指针，是一种数据结构体，用来操作数组的内部元素
3. 切片的使用
    - 数组和切片定义区别：
      - 创建数组时[]内指定数组的长度
      - 创建切片时[]为空，或...
    - 切片名称[low:high:max]
    - low:起始下标位置
    - high:结束下标位置
    - len = high - low
    - cap = max - low

### map
```go
package main

import (
	"fmt"
	"strings"
)

func main(){
	s := "hello , I am jack , Yes , I am jack , How are you"
	sSlice := strings.Fields(s) //字符串转slice
	m:= make(map[string]int)  //初始化map
	for _,v:=range(sSlice){
		
		elem,ok:=m[v]
		if ok{
			m[v]=elem+1
		}else {m[v]=1}
	}
	fmt.Println(m)
	

}
```

### 闭包
```go
package main

import "fmt"

// 返回一个“返回int的函数”
func fibonacci() func() int {
	first,second := 0,1
	return func()int {
		tmp := first
		first,second = second,(first+second)
		return tmp
	}

}

// 加1的闭包
func add() func() int {
	i := 0
	return func() int {
		i = i+1
		return i
	}
}

func main() {
	f := fibonacci()
	for i := 0; i < 20; i++ {
		fmt.Println(f())
	}
	g := add()
	for i := 0; i < 10; i++ {
			fmt.Println(g())
		}
}
	



```
### Go指南练习之《错误》(Errors)
```go
package main

import (
	"fmt"
	"math"
)

type ErrNegativeSqrt float64

func (e ErrNegativeSqrt) Error() string{
	return fmt.Sprintf("cannot Sqrt negative number: %v",float64(e))
}

func Sqrt(x float64) (float64, error) {
	if x < 0{
		return 0, ErrNegativeSqrt(x)
	}
	der := 0.001
	temp := float64(1)
	z := x
	for math.Abs(z-temp) >= der {
		temp = z

		z = (z + x/z) / 2 // 题中计算方式演变而来的公式
	}

	return z,nil
	
}

func main() {
	fmt.Println(Sqrt(2))
	fmt.Println(Sqrt(-2))
}

```