
import React from 'react'



export default function imoocForm (Comp){
    return class WrapperComp extends React.Component{
        constructor(props){
            super(props)
            this.state={ }
            this.handleChange=this.handleChange.bind(this)
        }
        handleChange(key,val){
            this.setState({
                [key]:val
            })
        }
        render(){
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}






// 简单的函数式编程
// function hello(){
//     console.log('hello')
// }
// function WrapperHello(fn){
//     return function(){
//         console.log('before hello')
//         fn()
//         console.log('after hello')
//     }
// }
// hello=WrapperHello(hello)
// hello()






//高阶组件
//定义一个函数A，传进来一个组件B，即参数是组件B。再返回另外一个组件C，这个组件C包裹着组件B
// class Hello extends React.Component{
//     render(){
//         return <h2>Hello</h2>
//     }
// }

// function WrapperHello(Comp){
//     class WrapComp extends React.Component{
//         render(){
//             return(
//                 <div>
//                     <p>这是HOC高阶组件特有的元素</p>
//                     <Comp {...this.props}></Comp>
//                 </div>
//             )
//         }
//     }
//     return WrapComp
// }
// Hello=WrapperHello(Hello)





//或者用@的写法实现高阶组件
//使用高阶函数主要有两个功能：属性代理和反向继承。这里是属性代理，即在<Comp>里加属性name等。或者是在<Comp>添加任意的元素，即{...this.props}
// function WrapperHello(Comp){
//     class WrapComp extends React.Component{
//         render(){
//             return(
//                 <div>
//                     <p>这是HOC高阶组件特有的元素</p>
//                     <Comp name='text'{...this.props}></Comp>
//                 </div>
//             )
//         }
//     }
//     return WrapComp
// }
//@WrapperHello 会把下面的组件Hello作为参数传给自己，最后再将自己赋给Hello
// @WrapperHello
// class Hello extends React.Component{
//     render(){
//         return <h2>Hello</h2>
//     }
// }




//反向继承：组件C同时可以继承组件B，可以修改渲染流程。即在渲染完成后打印出 '高阶组件新增的生命周期，加载完成'
//定义一个函数A，传进来一个组件B，即参数是组件B。再返回另外一个组件C，这个组件C包裹着组件B
// function WrapperHello(Comp){
//     class WrapComp extends Comp{
//         componentDidMount(){
//             console.log('高阶组件新增的生命周期，加载完成')
//         }
//         render(){
//             return <Comp></Comp>
//         }
//     }
//     return WrapComp
// }

// @WrapperHello
// class Hello extends React.Component{
//     render(){
//         return <h2>Hello</h2>
//     }
// }
