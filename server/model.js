

const mongoose=require('mongoose')

// const DB_URL='mongodb://localhost:27017/imooc-chat'
// mongoose.connect(DB_URL)
mongoose.connect("mongodb://localhost:27017/imooc-chat", {useNewUrlParser:true}, function(err){
　　if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!') }
})

const models={
    user:{
        'user':{type:String, require:true},
        'pwd':{type:String, require:true},
        'type':{type:String, require:true},

        //头像
        'avatar':{type:String},
        //个人简介或职位简介
        'desc':{type:String},
        //职位名
        'title':{type:String},

        //如果你是boss还有两个字段
        'company':{type:String},
        'money':{type:String}
    },
    chat:{
        'chatid':{ type:String,require:true },
        'from':{type:String, require:true },
        'to':{type:String, require:true },
        'read':{ type:Boolean,default:false },
        'content':{type:String, require:true,default:'' },
        'create_time':{type:Number, default:new Date().getTime()}
    }
}

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports={
    getModel:function(name){
        return mongoose.model(name)
    }
}



//使用 require() 方法在项目中包含 mongoose 后，接下来使用 connect()方法连接到 MongoDB 数据库
//在 Mongoose 中，所有数据都由一个 Schema 开始创建。
//每一个 schema 都映射到一个 Mongodb 的集合(collection)，并定义了该集合(collection)中的文档(document)的形式。
//Schema 主要用于定义 MongoDB 中集合 Collection 里文档 document 的结构，定义 Schema 非常简单，指定字段名和类型即可。
//通过 mongoose.Schema 来调用 Schema ，然后使用 new 方法来创建 schema 对象

//模型 Model 是根据 Schema 编译出的构造器，或者称为类，通过 Model 可以实例化出文档对象document，文档document的创建和检索都需要通过模型Model来处理。