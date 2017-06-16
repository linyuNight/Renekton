<template>
  <div class="chat">
    <div class="chat-contain clear">
    	<div class="chat-left">
        <button type="button" @click="showAddRoom">添加群组</button>
        <div v-show="isShow"><input v-model="addroomname" type="text" placeholder="enter groupname"><button type="button" @click="addRoom">确定</button></div>

    		<router-link v-for="roomId in roomIds" key="roomId" :to="{ name: 'room', params: { roomId: roomId }}"><div class="group-item clear">
    			<div class="group-avatar"></div>
    			<div class="group-content">{{roomId}}</div>
    		</div></router-link>

    	</div>

      <div class="chat-main">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import * as io from 'socket.io-client'
import axios from 'axios'
import $ from 'jquery'
import config from '../../common/config'

export default {
  name: 'chat',
  data() {
    return {
    	chat:'',
      chats: [],
      myusername: '',
      expressions:[],
      isShowExpressions:false,
      imgExpressions:config.server + '/img/expressions.png',
      cursurPosition:0,
      roomIds: ['room0','room1','room2','room3'],
      addroomname: '',
      isShow:false
    }
  },
  created() {
    $.ajax({
      url: config.server + '/roomname',
      type: 'get',
      success: function(e) {
        console.log(e)
      }
    })
  },
  methods: {
    showAddRoom() {
      this.isShow = !this.isShow
    },
    addRoom() {
      this.roomIds.push(this.addroomname)
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css" src="./Chat.scss"></style>