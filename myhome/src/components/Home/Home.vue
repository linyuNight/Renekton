<template>
  <div class="home clear">
  	<div class="home-contain">
	  	<div class="home-tab-list">
	  		<div class="home-tab">
		    	<div class="tab-point"></div>
		    </div>
		    <div class="home-tab home-tab1"></div>
		    <div class="home-tab home-tab2"></div>
		    <div class="home-tab home-tab3"></div>
		    <div class="home-tab home-tab4"></div>
	  	</div>
	  	<div class="home-box">
	  		<div class="home-door"></div>
	  		<div class="home-content">
	  			<input type="text" placeholder="name">
	  		</div>
	  	</div>
	  	<div class="drag" v-on:mousedown.stop="dragDown" v-on:mouseup.stop="dragUp" v-on:mousemove.stop="dragMove" v-bind:style="dragStyle"></div>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: '',
      dragStyle: {
      	left: this.$store.state.dragX + 'px',
      	top: this.$store.state.dragY + 'px'
      },
      isDown: false
    }
  },
  methods: {
  	dragDown: function (e){
  		this.isDown = true
      // this.$store.commit('increment')
      // this.$store.state.count++;
      // console.log( this.$store.state.count)
  	},
  	dragUp: function (e){
  		this.isDown = false
  	},
  	dragMove: function (e){
  		if(this.isDown){
  			this.$store.state.dragX = e.clientX - 50
	  		this.$store.state.dragY = e.clientY - 50
        this.dragStyle.left = this.$store.state.dragX + 'px'
        this.dragStyle.top = this.$store.state.dragY + 'px'
  		}
  	}
  }
}
</script>

<style lang="scss" scoped="" type="text/css" src="./Home.scss">
</style>