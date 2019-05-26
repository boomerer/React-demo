


import React from 'react'
import PropTypes from 'prop-types'
import { NavBar,TabBar  } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
    state=>state.chat

)
class NavLinkBar extends React.Component{
    //要求父传子，父必须给data,且它的类型为array
    static propTypes={
        data:PropTypes.array.isRequired
    }
    render(){
        const navList=this.props.data.filter(v=>!v.hide)
        const {pathname}=this.props.location
        // const img=require(`./navimg/job.jpg`) 
        const img='./navimg/job.jpg' 
        return ( 
            <TabBar >
                {navList.map(v=>(
                <TabBar.Item
                    badge={v.path=='/msg'? this.props.unread:''}
                    key={v.path}
                    title={v.text}
                     icon={{
                        uri:require(`./navimg/${v.icon}.jpg`), 
                        width: '41px',
                        height: '41px'
                    }} 
                    selectedIcon={{uri:require(`./navimg/${v.icon}-active.jpg`),  width: '41px',
                    height: '41px'}}
                    selected={pathname===v.path}
                    onPress={()=>{
                        this.props.history.push(v.path)
                    }}
                >
              </TabBar.Item>
            ))}
            </TabBar>
        

        )
    }
}
   

export default NavLinkBar