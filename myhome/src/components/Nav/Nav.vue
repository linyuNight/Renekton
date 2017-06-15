<template>
  <div class="nav">
    <div class="nav-box">
      <div class="nav-bg"></div>
      <div class="nav-contain">
        <div class="nav-content clear">
        	<router-link to="/"><div class="nav-item">Renekton</div></router-link>
          <router-link to="/about"><div class="nav-item">Detail</div></router-link>
          <router-link to="/chat"><div class="nav-item">Chat</div></router-link>
          <router-link to="/account"><div class="nav-item">Account</div></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      msg: ''
    }
  }
}
</script>


<style lang="scss" scoped="" type="text/css" src="./Nav.scss"></style>