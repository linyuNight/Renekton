<template>
  <div class="index clear">
    <indexNav></indexNav>
    <div class="index-main clear">
      <transition name="fade">
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import indexNav from '../Nav/Nav'

export default {
  name: 'index',
  data () {
    return {
      msg: ''
    }
  },
  components:{
  	indexNav: indexNav
  }
}
</script>

<style lang="scss" scoped="" type="text/css" src="./Index.scss"></style>