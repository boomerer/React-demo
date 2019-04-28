

const express=require('express')
const utils=require('utility')

const Router=express.Router()
const model=require('./model')
const User=model.getModel('user')
const Chat=model.getModel('chat')
const _filter={'pwd':0,'__v':0}

// Chat.remove({},function(e,d){

// })

//查询用户列表，即 localhost:9093/user/list
Router.get('/list',function(req,res){
    //get的参数用query来获取
    const {type}=req.query
    // User. remove({},function(e,d){})
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })
})
Router.get('/getmsglist',function(req,res){
    const user=req.cookies.userid
    User.find({},function(e,userdoc){
        let users={}
        userdoc.forEach(v=>{
            users[v._id] ={name:v.user, avatar:v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
            if(!err){
                return res.json({code:0, msgs:doc, users:users})
            }
        })
    })

    // {'$or':[{from:user, to:user}]}

})

Router.post('/readmsg',function(req,res){
    const userid=req.cookies.userid
    const {from}=req.body
    Chat.updateMany({from,to:userid}, {'$set':{read:true}}, function(err,doc){
        console.log(doc)
        if(!err){
            return res.json({code:0, num:doc.nModified })
        }
        return res.json({code:1, msg:'修改失败'})
    })
})
//需要引入body-parser 插件，用于接收post参数。没有es6的...展开，用Object.assign()合并数据
Router.post('/update',function(req,res){
    const userid=req.cookies.userid
    if(!userid){
        return res.json({code:1})
    }
    //post的参数用body来获取
    const body=req.body
    User.findOneAndUpdate({_id:userid},body,function(err,doc){
        const data=Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})


Router.post('/login',function(req,res){
    const{user,pwd}=req.body
    User.findOne({user,pwd:md5Pwd(pwd)}, _filter ,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或密码错误！！'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})


Router.post('/register',function(req,res){
 
    const{user,pwd,type}=req.body
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        const userModel=new User({user,pwd:md5Pwd(pwd),type})
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错了！'})
            }
            const {user, type, _id}=d
            res.cookie('userid',_id)
            return res.json({code:0,data:{user, type, _id}})
        })
    })
})

Router.get('/info',function(req,res){
    //读用户的请求有没有cookie
    const {userid}=req.cookies
    //用户有没有cookie，相当于开关
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid}, _filter ,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})


function md5Pwd(pwd){
    const salt='WMN WEB engineer is welldone_19930808@kkkyeah!!'
    //生成加密密码，在外层再做一次
    return  utils.md5(utils.md5(pwd+salt))
}
module.exports=Router