<template>
  <div class="chatroom">
    <div class="chat-topbar">
			<div class="chat-avatar"></div>
			<div class="chat-name">{{myusername}}</div>
		</div>
		<div class="chat-list" id="chat-list">
      <scroller
        ref="scroller"
        :on-refresh="refresh">

  			<div class="chat-item clear" v-for="chat in chats">
  				<div v-bind:class="chat.isLeft?'chat-item-containleft clear':'chat-item-containright clear'">
    				<div class="chat-item-avatar"></div>
    				<div class="chat-item-box">
    					<div class="chat-item-top"><span class="chat-item-name">{{chat.name}}</span><span class="chat-item-time">{{chat.create_time | time}}</span></div>
    				</div>
            <div class="chat-item-content">
                <div class="chat-item-leftbg"></div>
                <div class="chat-item-left"></div>
                <span class="chat-item-text" v-html="chat.content"></span>
              </div>
    			</div>
  			</div>	

      </scroller>
		</div>
		<div class="chat-footer">
      <div class="clear">
  			<input class="chat-input" id="chat-input" v-on:click="getTxt1CursorPosition"  v-on:keyup="getTxt1CursorPosition" type="text" placeholder="enter your message" v-model="chat">
  			<div class="sendbtn-contain"><button class="chat-sendbtn" type="button" v-on:click="send">send</button></div>
      </div>
      <div class="expressions-contain">
        <button class="expression-btn" type="button" v-on:click="showExpressions">表情</button>
        <button class="selectfile-btn"><input class="selectfile-input" type="file" name=""></button>
        <div class="expression-list" v-show="isShowExpressions">
          <!-- <img src="./imgold/haha.png" alt=""> -->
          <div v-for="expression in expressions" class="expression-item" v-on:click="addExpression(expression)" v-bind:style="{backgroundImage: 'url(' + imgExpressions + ')',backgroundPosition:'0 ' + (-expression*30) + 'px'}"></div>
        </div>
      </div>
		</div>
  </div>
</template>

<script>

export default {
  name: 'chatroom',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css" src="./Chatroom.scss"></style>