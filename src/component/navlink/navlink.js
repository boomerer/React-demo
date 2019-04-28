


import React from 'react'
import PropTypes from 'prop-types'
import { TabBar  } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
    state=>state.chat

)
class NavLinkBar extends React.Component{
    //要求父传子，父必须给子一个data,且它的类型为array
    static propTypes={
        data:PropTypes.array.isRequired
    }
    render(){
        const navList=this.props.data.filter(v=>!v.hide)
        const {pathname}=this.props.location   //这里是解构赋值，取得location中的pathname，再赋给{pathname}
        return ( 
            <TabBar>
                {navList.map(v=>(
                  <TabBar.Item
                    badge={v.path=='/msg'? this.props.unread:''}
                    key={v.path}
                    title={v.text}
                    icon={{
                      uri:require(`./navimg/${v.icon}.jpg`) 
                    }}
                    selectedIcon={{uri:require(`./navimg/${v.icon}-active.jpg`)}}
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