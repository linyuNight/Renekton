<template>
  <div class="regist">
    <input type="text" v-model="username" placeholder="please enter your username">
    <input type="text" v-model="password" placeholder="please enter your password">
    <button type="button" v-on:click="regist">regist</button>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import config from '../../common/config'
let server = config.server

export default {
  name: 'regist',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    regist: function(){
      let that = this

      if(this.username && this.password){
        $.ajax({
          url:server + '/regist',
          type:'post',
          dataType:'json',
          data:{
            username: this.username,
            password: this.password
          },
          success:function(e){
            if(e.data=='default'){
              alert('用户名已经存在')
            }else{
              // alert('注册成功')
              $.ajax({
                url:server + '/login',
                type:'post',
                dataType:'json',
                data:{
                  username: that.username,
                  password: that.password
                },
                success:function(e){
                  localStorage.setItem('token',e.token)
                  that.$router.push('/chat')
                }
              })
            }
          }
        })
      }else{
        alert('用户名或密码不能为空')
      }
      // axios({
      //   method: 'post',
      //   url: server + '/regist',
      //   data:  "id = Fred",
      //   // data: JSON.stringify({
      //   //   id: "Fred"
      //   // }),
      //   responseType: 'json',
      //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      // })
      // .then(function (response) {
        
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });


      // axios.post(server + '/regist', {
      //   id: 111
      // })
      // .then(function(response){
      //   console.log(response);
      // })
      // .catch(function(error){
      //   console.log(error);
      // });
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css" src="./Regist.scss"></style>