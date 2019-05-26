


import React from 'react'
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux'
import {  Route,Switch } from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'


import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import  {getMsgList, recvMsg} from '../../redux/chat.redux'






@connect(
    state=>state,
    {getMsgList, recvMsg }
)

class Dashboard extends React.Component{
   componentDidMount(){
       if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
       }
   }
    render(){
        const {pathname}=this.props.location
        const user=this.props.user
        const navLists=[
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:user.type=='boss'  //false
            },
            {
                path:'/boss',
                text:'求职者',
                icon:'boss',
                title:'求职者列表',
                component:Boss,
                hide:user.type=='genius'  //false
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }
        ]
        return(
            <div>
                <NavBar className='fix-header' mode="dark">{navLists.find(v=>v.path==pathname).title}</NavBar>
                <div style={{marginTop:40}}>
                    <Switch>
                        {navLists.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>

                <NavLinkBar data={navLists}></NavLinkBar>
            </div>
        )
    }
}


export default Dashboard