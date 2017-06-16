<template>
  <div class="chat">
    <div class="chat-contain clear">
    	<div class="chat-left">
    		<router-link :to="{ name: 'room', params: { roomId: roomId[0] }}"><div class="group-item clear">
    			<div class="group-avatar"></div>
    			<div class="group-content">ssssffss</div>
    		</div></router-link>
    		<router-link :to="{ name: 'room', params: { roomId: roomId[1] }}"><div class="group-item clear">
    			<div class="group-avatar"></div>
    			<div class="group-content">fff</div>
    		</div></router-link>
    		<router-link :to="{ name: 'room', params: { roomId: roomId[2] }}"><div class="group-item clear">
    			<div class="group-avatar"></div>
    			<div class="group-content"></div>
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
  data () {
    return {
    	chat:'',
      chats: [],
      myusername: '',
      expressions:[],
      isShowExpressions:false,
      imgExpressions:config.server + '/img/expressions.png',
      cursurPosition:0,
      roomId: ['room0','room1','room2','room3']
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css" src="./Chat.scss"></style>