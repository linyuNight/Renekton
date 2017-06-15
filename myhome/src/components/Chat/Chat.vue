<template>
  <div class="chat">
    <div class="chat-contain clear">
    	<div class="chat-left">
    		<router-link to="/chatroom1"><div class="group-item clear">
    			<div class="group-avatar"></div>
    			<div class="group-content">ssssffss</div>
    		</div></router-link>
    		<router-link to="/chatroom2"><div class="group-item clear">
    			<div class="group-avatar"></div>
    			<div class="group-content">fff</div>
    		</div></router-link>
    		<router-link to="/chatroom3"><div class="group-item clear">
    			<div class="group-avatar"></div>
    			<div class="group-content"></div>
    		</div></router-link>
    	</div>

    	<!-- <div class="chat-main">
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
              <div v-for="expression in expressions" class="expression-item" v-on:click="addExpression(expression)" v-bind:style="{backgroundImage: 'url(' + imgExpressions + ')',backgroundPosition:'0 ' + (-expression*30) + 'px'}"></div>
            </div>
          </div>
    		</div>
    	</div> -->
      <div class="chat-main"></div>
    </div>
  </div>
</template>

<script>
import * as io from 'socket.io-client'
import axios from 'axios'
import $ from 'jquery'
import config from '../../common/config'
let socket = io(config.server)

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
      cursurPosition:0
    }
  },
  created(){
    let that = this

    socket.emit('join',this.myusername)

    for(let i=0;i<33;i++){
      this.expressions.push(i)
    }

    $.ajax({
      url:config.server + '/user',
      type:'post',
      dataType:'json',
      data:{
        token: localStorage.getItem('token')
      },
      success:function(e){
        if(e.username){
          that.myusername = e.username
        }else{
          alert('nodata')
        }
      }
    })

    let num = 0
  	for(let i=0;i<10;i++){
  		this.loaddata(num)
  		num++
  	}

    setTimeout(() => {
      let h = $('._v-content').height()
      this.$refs.scroller.scrollTo(0,h,true)
    },200)
    

		socket.on('chat message', (msg) => {
      let content = that.replaceContent(msg.content)
			this.chats.push({
        name: msg.name,
    		content: content,
    		isLeft: false,
        create_time: msg.create_time
    	})
      setTimeout(() => {
        let h = $('._v-content').height()
        that.$refs.scroller.scrollTo(0,h,true)
      },100)
		})


    document.onkeydown = (event) => {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if(e && e.keyCode==13){ // enter 键
        this.send()
      }
    }
	},
  methods: {
    refresh(done){
      let length = this.chats.length
      let num = 0
      for(let i=0;i<10;i++){
        this.loaddata(num+length)
        num++
      }
      done()
    },
  	loaddata(num){
  		let that = this

  		axios.get(config.server + '/chatdata' + '?load=' + num, {
		  
			})
			.then((response) => {
        let datalist =  response.data
				for(let i=0;i<datalist.length;i++){
          let isLeft = true
          let content = that.replaceContent(datalist[i].content)

          if(datalist[i].name==that.myusername){
            isLeft = false
          }
					that.chats.unshift({
						name: datalist[i].name,
		    		content: content,
		    		isLeft: isLeft,
            create_time: datalist[i].create_time
		    	})
				}
			})
			.catch(function (error) {
				console.log(error);
			});
  	},
  	send(){
      if(this.chat){
        socket.emit('chat message', {
          name: this.myusername,
          content: this.chat
        })
        this.chat = ''
      }
  	},
    replaceContent(content) {
      let repContent = content || '';
      const regLink = /((http|https):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i,
          regImg = /https?:\/\/.+\.(jpg|gif|png|svg|jpeg)/i,
          http = /^http/,
          regExp = /#\([\u4e00-\u9fa5a-z]+\)/g,
          regInvite = new RegExp(config.inviteLink,'i');
      repContent = repContent.replace(
          regExp, 
          r => `<img style="margin-top:10px" src="` + config.server + `/img/${r.match(/[^#()]+/)[0]}.png" alt="${r}" onerror="this.style.display=\'none\'"/>`
      );
      repContent = repContent.replace(regLink, (r) =>{
          if(regImg.test(r)){
              return `<img class = 'Message-image' src = '${r}' onerror="this.style.display=\'none\'"/>`;
          }
          if(regInvite.test(r)){
              return `<a href='${r}' target='_self' rel='noreferrer'>${r}</a>`;
          }
          if(!http.test(r)){
              return `<a href='http://${r}' target='_blank' rel='noreferrer'>${r}</a>`;
          }
          return `<a href='${r}' target='_blank' rel='noreferrer'>${r}</a>`;
      });
      return repContent;
    },
    showExpressions() {
      this.isShowExpressions = !this.isShowExpressions
      var oTxt1 = document.getElementById("chat-input");
      this.setCaretPosition(oTxt1,this.cursurPosition)
    },
    addExpression(expression) {
      this.isShowExpressions = false
      var expression = '#(' + config.expressions[expression] + ')'
      this.chat = this.insert_flg(this.chat,expression,this.cursurPosition)
      var oTxt1 = document.getElementById("chat-input");
      this.setCaretPosition(oTxt1,this.cursurPosition)
    },
    getTxt1CursorPosition() {//获取光标位置
      var oTxt1 = document.getElementById("chat-input");
      var cursurPosition=0;
      if(oTxt1.selectionStart){//非IE浏览器
        this.cursurPosition= oTxt1.selectionStart;
      }else{//IE
        if(document.selection){
          var range = document.selection.createRange();
          range.moveStart("character",-oTxt1.value.length);
          this.cursurPosition=range.text.length;
        }else{
          this.cursurPosition = 0
        }
      }
    },
    insert_flg(str,flg,sn) {//插入字符串
      var newstr="";
      var strarr = str.split('');
      strarr.splice(sn,0,flg)
      newstr = strarr.join('')
      return newstr;
    },
    setCaretPosition(ctrl, pos) {//移动光标位置
      if(ctrl.setSelectionRange){
        ctrl.focus();
        ctrl.setSelectionRange(pos,pos);
      }else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css" src="./Chat.scss"></style>