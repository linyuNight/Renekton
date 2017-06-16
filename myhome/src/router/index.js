import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index'
import Home from '@/components/Home/Home'
import About from '@/components/About/About'
import Chat from '@/components/Chat/Chat'
import Chatroom from '@/components/Chatroom/Chatroom'
import Account from '@/components/Account/Account'
import Login from '@/components/Login/Login'
import Regist from '@/components/Regist/Regist'
import config from '../common/config'
import $ from 'jquery'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '',
          component: Home,
          // children: [
          //   {
          //     path: 'chatroom/:userId',
          //     name: 'user',
          //     component: Chatroom
          //   }
          // ]
        },
        {
          path: 'about',
          component: About
        },
        {
          path: 'chat',
          component: Chat,
          beforeEnter: (to, from, next) => {
            $.ajax({
              url:config.server + '/user',
              type:'post',
              dataType:'json',
              data:{
                token: localStorage.getItem('token')
              },
              success:function(e){
                if(e.username){
                  next()
                }else{
                  alert('请登录')
                  router.push('/account')
                }
              }
            })
          },
          children: [
            {
              path: 'chatroom/:roomId',
              name: 'room',
              component: Chatroom
            }
          ]
        },
        {
          path: 'account',
          component: Account,
          children: [
            {
              path: '',
              component: Login
            },
            {
              path: 'regist',
              component: Regist
            }
          ]
        }
      ]
    }
  ]
})

export default router