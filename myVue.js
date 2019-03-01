// 将watcher和observer关联起来
// 同时用Object.defineProperty()对属性值再包装一层
// 如果没有这一层，那么赋值方式是myVue.data.name="xiaobao";希望的是myVue.name="xiaobao";

function myVue(options){
    var self = this;
    this.data = options.data;
    this.methods = options.methods;
 
    Object.keys(this.data).forEach(function(key) {
        self.proxyKeys(key);
    });
 
    observer(this.data);
    new Compile(options.el, this);
    options.mounted.call(this); // 所有事情处理好后执行mounted函数
}

myVue.prototype = {
    proxyKeys: function(key){
        Object.defineProperty(this,key,{
            enumerable:true,
            configurable:false,
            get: function(){
                return this.data[key];
            },
            set: function(newVal){
                this.data[key] = newVal;
            }
        })
    }
}