
import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace,Button,Radio } from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-form'





@connect(
    state=>state.user,
    {register}
)
@imoocFrom

class Register extends React.Component{
    constructor(props){
        super(props)
        this.handleRegister=this.handleRegister.bind(this)
    }
    componentDidMount(){
        this.props.handleChange('type','genius')
    }

    handleRegister(){
        this.props.register(this.props.state)
    }

    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <WingBlank size='lg'>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={v=>this.props.handleChange('pwd',v)} type="password" >密码</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={v=>this.props.handleChange('repeatpwd',v)} type="password" >确认密码</InputItem>
                        <WhiteSpace/>

                        <RadioItem 
                            checked={this.props.state.type=='genius'}
                            onChange={v=>this.props.handleChange('type','genius')}
                        >
                            求职者
                        </RadioItem>

                        <RadioItem   
                            checked={this.props.state.type=='boss'}
                            onChange={()=>this.props.handleChange('type','boss')}
                        >
                            BOSS
                        </RadioItem>

                        <WhiteSpace/>
                        <Button type="primary" onClick={this.handleRegister}>注册</Button>
                    </List>
                </WingBlank>      
            </div>
        )
    }
}
export default Register