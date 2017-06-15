<template>
  <div class="index clear">
    <indexNav></indexNav>
    <div class="index-main clear">
      <transition name="fade">
        <router-view></router-view>
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