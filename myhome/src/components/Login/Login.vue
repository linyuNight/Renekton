<template>
  <div class="login">
    <input type="text" v-model="username" placeholder="please enter your username">
    <input type="text" v-model="password" placeholder="please enter your password">
    <button type="button" v-on:click="login">login</button>
    <button type="button" v-on:click="user">user</button>
    <router-link to="/account/regist"><div class="nav-item">toregist</div></router-link>
  </div>
</template>

<script>
import $ from 'jquery'
import config from '../../common/config'
let server = config.server

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created: function(){
    
  },
  methods: {
    login: function(){
      let that = this

      $.ajax({
        url:server + '/login',
        type:'post',
        dataType:'json',
        data:{
          username: this.username,
          password: this.password
        },
        success:function(e){
          localStorage.setItem('token',e.token)
          if(e.data=='success'){
            that.$router.push('/chat')
          }else{
            alert('用户名或密码不正确')
          }
        }
      })
    },
    // user: function(){
    //   let that = this

    //   $.ajax({
    //     url:server + '/user',
    //     type:'post',
    //     dataType:'json',
    //     // headers: {
    //     //   'Authorization': 'Bearer ' + this.token
    //     // },
    //     data:{
    //       token: this.token
    //     },
    //     success:function(e){
    //       console.log(e)
    //       // if(e.data=='success'){
    //       //   that.$store.username = that.username
    //       //   alert('登录成功')
    //       // }else{
    //       //   alert('用户名或密码不正确')
    //       // }
    //     }
    //   })
    // }
    user: function(){
      let that = this
      $.ajax({
        url:server + '/user',
        type:'post',
        dataType:'json',
        data:{
          token: that.$store.token
        },
        success:function(e){
          console.log(e.username)//把token存到localstorage里面，每次到登录界面的时候就进行判断
          // if(e.data=='success'){
          //   that.$store.username = that.username
          //   alert('登录成功')
          // }else{
          //   alert('用户名或密码不正确')
          // }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css" src="./Login.scss"></style>