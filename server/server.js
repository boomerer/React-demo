

const express=require('express')
const bodyParser=require('body-parser')      //引入中间件,处理post请求
const cookieParser=require('cookie-parser')  //引入中间件，用来解析cookie
const model=require('./model')
const Chat=model.getModel('chat')

const app=express()


// work with express
const server =require('http').Server(app)
const io =require('socket.io')(server)

io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
        const {from,to,msg}=data
        const chatid=[from, to].sort().join('_')
        Chat.create({ chatid,from,to,content:msg },function(err,doc){
            io.emit('recvmsg', Object.assign({},doc._doc))
        })
        // console.log(data)
        // io.emit('recvmsg',data)
    })
})




const userRouter=require('./user')

app.use(cookieParser())

//就可以解析post过来的json数据
app.use(bodyParser.json())

//开启一个中间件，这里中间件是一个路由，所以前缀是'/user'
app.use('/user',userRouter)


// app.get('/',function(req,res){
//     res.send('<h1>Hello 大西几</h1>')
// })


server.listen(9093,function(){
    console.log('Node app start at port 9093')
})