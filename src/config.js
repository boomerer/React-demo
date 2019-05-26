


import axios from 'axios'
import {Toast} from 'antd-mobile'


//拦截请求
axios.interceptors.request.use(function(config){
    Toast.loading('加载中',2)
    return config
})

// //拦截响应，只要返回立刻关闭
axios.interceptors.response.use(function(config){
    Toast.hide()
    return config
})