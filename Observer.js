// 创建一个数据监听器，核心方法为Object.defineProperty()

// 核心方法
function defineReactive(data,key,val){
    observer(val);// 这里用递归去遍历所有的子属性
    var dep = new Dep();// 实例化消息订阅器
    Object.defineProperty(data,key,{
        enumerable:true, // 能否通过for-in循环返回属性
        configurable:false,  // 能否通过delete删除属性从而重新定义属性，这里不允许
        get:function(){
            // 在闭包内添加watcher，通过Dep定义一个全局target属性
            Dep.target && dep.addSub(Dep.target);
            return val;
        },
        set:function(newVal){
            if(val === newVal){
                return;
            }
            val = newVal;
            console.log("监听到属性"+key+",现在值为"+newVal.toString());
            dep.notify()
        }
    });
}

// 创建数据监听器
function observer(data){
    if(!data || typeof data != "object"){
        return;
    }
    // 循环所有子属性的key，分别调用defineReactive
    Object.keys(data).forEach(function(key){
        defineReactive(data,key,data[key]);
    });
}

// 创建消息订阅器
function Dep(){
    this.subs = [];
}

// 扩充原形
Dep.prototype = {
    addSub:function(sub){
        this.subs.push(sub)
    },
    notify:function(){
        this.subs.forEach(function(sub){
            sub.update();
        });
    }
}

// 以下测试代码
var animal = {
    dog:{
        name:"",
        age:5
    },
    cat:""
};
observer(animal);

animal.dog.name = "xiaobao";
