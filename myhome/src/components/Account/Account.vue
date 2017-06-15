<template>
  <div class="account">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'account',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css" src="./Account.scss"></style>