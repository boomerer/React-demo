

import React from 'react'
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types'



class AvatarSelector extends React.Component{
    static propTypes={
        selectAvatar:PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        this.state={}
    }

    render(){
        const avatarList='icon0,icon1,icon2,icon3,icon4,icon5,icon6,icon7,icon8,icon9'.split(',').map(v=>({
            icon:require(`../imgs/${v}.jpg`),
            text:v
        }))
        const gridHeader=this.state.icon?(<div>
                                            <span>已选择头像</span>
                                            <img style={{width:20}} src={this.state.icon} />
                                        </div>)
                                        :'请选择头像！！'
        return(
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid 
                        data={avatarList} 
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    />
                </List>
            </div>
        )

    }
}

export default AvatarSelector