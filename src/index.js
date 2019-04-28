

import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'   // 引入createStore创建store，引入applyMiddleware使用中间件
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route,Switch } from 'react-router-dom'

import reducers from './reducer'
import  './config'
import './index.css'

import Register from './container/register/register'
import Login from './container/login/login'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import AuthRoute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'




const store=createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))




//boss genuis me msg 共四个页面
//没有<Switch> 所有页面都会命中 Dashboard ，有<Switch> 时当路由没有命中前几个路由时才会自动命中Dashboard
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>  
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>  
                    <Route path='/login' component={Login}></Route>  
                    <Route path='/register' component={Register}></Route> 
                    <Route path='/chat/:user' component={Chat}></Route> 
                    <Route  component={Dashboard}></Route> 
                </Switch>
            </div>             
        </BrowserRouter>        
    </Provider>),
    document.getElementById('root')
)

//Provider这个提供器连接了store,那么Provider里面的所有的组件都有能力获取store里面的内容了