
import React from 'react'
import { NavBar, InputItem, WhiteSpace, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state=>state.user,
    {update}
)


class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            desc:''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }

    render(){
        const path=this.props.location.pathname
        const redirect=this.props.redirectTo
        return(
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">求职者完善信息页面</NavBar>
                <AvatarSelector selectAvatar={(imgname)=>{
                    this.setState({
                        avatar:imgname
                    })
                }}></AvatarSelector>

                <InputItem onChange={v=>this.onChange('title',v)}>求职岗位</InputItem>
                <WhiteSpace/>
        
                <TextareaItem 
                    title="个人简介"
                    autoHeight
                    rows={3}
                    placeholder="请填写个人简历..."
                    labelNumber={5}
                    onChange={v=>this.onChange('desc',v)}>
                </TextareaItem>

                <Button 
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                    type='primary'>保存</Button>
            </div>
        )
    }
}


export default GeniusInfo