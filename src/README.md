## clean code
```
1. 统一的命名规范，便于多人开发维护时代码统一，减少项目沟通和交接的成本，增加代码的语义化。
2. 统一缩进为2个空格。
```

## 文件名
```
1. 使用PascalCase为vue与tsx文件命名。
2. 使用camelCase为ts、js文件命名。
3. 使用camelCase为css文件命名。
4. 使用小写字母（a-z）、中划线（-）为文件夹命名。
5. 使用使用小写字母（a-z）、数字（0-9）、中划线（-）为图片、SVG等文件命名。
``` 

## CSS
#### 命名
```
1. 使用小写字母（a-z）、数字（0-9）、中划线（-）为class命名。
  （首字符必须是字母）
2. 把id留给后台开发和js使用，允许用id命名。
  （ID命名建议使用camelCase命名）
3. 写完一个class样式后空一行。
   .login {
     width: 100%;
     height: 100%;

     .title {
       padding: 16px;
     }
   }

   .box {
     width: 20px;
   }
4. 属性值需要使用到引号时，使用双引号""。
```

## HTML
```
1. 使用小写作为HTML5元素名。
  （比如 使用 <div></div> 而不是 <DIV></DIV>）
2. 属性值使用双引号""。
  （比如 使用 type="text" 而不是 type=text）
3、纯数字框建议采用 type="tel"。
```

## TS、JS
#### 命名
```
1. 使用PascalCase为类型命名。
2. 使用PascalCase为枚举值命名。
3. 使用camelCase为函数命名。
4. 使用camelCase为属性或本地变量命名。
5. 尽可能使用完整的单词拼写命名。
7. 常量（不可变数据）使用大写字母（A-Z）、下划线（_）命名。
   helloWorld -> HELLO_WORLD
```

#### 分号
```
推荐interface/type声明类型时加分号。

其他不加。（开头是括号、方括号、反引号必须加分号）

  本人观点 知晓 no LineTerminator here 规则
  真正导致解析出现问题的有 括号、方括号、反引号、正则开头的斜杠、加号、减号为首的情况，实际项目中颇为少见。
  真正遇到了，也可以基本都是括号、方括号、反引号开头的，需要在开头加分号。
    例如 括号开头 IIFE。
        ;(function(){
          console.log(1)
        })()

        1. 自执行函数建议用
           void functoin () {
           }()
           !functoin () {
           }()
           !!functoin () {
           }()
    例如 方括号开头。
        ;[1, 2, 3].forEach()
    例如 反引号开头。
        ;`abc`.match(/[a-z]/)
    例如 正则开头。
        ;/[a-z]/g.test()
    例如 加号、减号开头。
        ;++a
        ;--b
  而return后面换行，不管你加不加分号，其结果都是一样的。
```

#### 注释
```
为函数，接口，枚举类型和类使用JSDoc风格的注释。
```

#### 字符串
```
使用单引号''。
```

#### null 和 undefined
```
使用 undefined，不要使用 null。
```

#### 类
```
1. 使用PascalCase为类命名。
2. 为了保持一致，在函数式调用链中不要使用类，使用函数闭包代替。
3. 实例方法不应调用 静态属性 静态方法。
   const arr = new Array()
   arr.push() // 实例方法
   Array.isArray() // 静态方法
```

#### 风格
```
1. 使用arrow函数代替匿名函数表达式。
2. 总是使用{}把循环体和条件语句括起来。
3. 开始的{总是在同一行。
4. 小括号里开始不要有空白。
   逗号，冒号，分号后要有一个空格。比如：

   1. for (let i = 0; i < 10; i++) { }
   2. if (x < 10) { }
   3. function f(x: number, y: string): void { }
5. 每个变量声明语句只声明一个变量。
  （比如 使用 let x = 1; let y = 2; 而不是 let x = 1， y = 2;）
6. else要在结束的}的后面而不是另起一行。
   if () {
   } else {
   }
7. 强制使用 === 以免引起不必要的麻烦，保证程序严谨性。
8. 请使用函数声明，而不是函数表达式。
  （比如 function a() {} 而不是 const a = function(){}）
9. 不要在非函数代码块中声明函数。
  （比如 if (isVisible) {function a() {}}）
10. 事件的调用函数命名统一规则 动词 + 形容词/名词/介词 或者 介词 + 动词。
  （比如 handleWith、onSelect）
11. 声明变量必须赋予类型，尽量不要声明any。
  （不可变数据不用）
12. 函数参数必须赋予类型且声明返回类型。
   function (name: string): void {}
13. 修改函数参数，不允许修改引用数据类型指针。
    例如：
    function (obj: object): void {
      obj.name = '666'
      obj = {}
      obj.name = '999'
    }
14. 推荐函数式编程风格充分利用函数引用透明性，类、泛型用于逻辑复用。
15. 副作用单独处理，不要与纯函数混在一起。
16. 使用代理而不是切片。
17. async/await、Promise，同样的功能实现，建议使用Promise。
18. try{}catch(e){} 留给真正需要例外处理的方法。
19. 少声明或不声明无关变量，声明变量前考虑好有没有必要声明。

```

## VUE
#### template
```
1. 使用小写字母（a-z）、中划线（-）作为组件名。
    import ErrorContent from 'ErrorContent.vue'
    <template>
      <error-content></error-content>
    </template>
2. 使用小写字母（a-z）、中划线（-）作为属性名。
   <header-com :side-list="sideList" @side-props="onSideProps"></header-com>
3. 多属性处理。
   <header-com :class="{'header': isHeader}"
               :type="xxx"
               :show="false">
   </header-com>
4. 双括号，左右个加一个空格。
   <div>{{ name }}</div>
5. 获取事件对象用 $event。
   <input @click="handleClick($event)">
```

#### tsx
```
1. 使用PascalCase作为组件名。
    import ErrorContent from 'ErrorContent.vue'
    render () {
      return (
        <ErrorContent></ErrorContent>
      )
    }
2. 使用camelCase作为属性名。
   <HeaderCom sideList={sideList}></HeaderCom>
```
