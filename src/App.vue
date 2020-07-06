<template>
  <div id="app">
    <div id="nav">
      <div class="title">后台管理</div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { curDateTime } from '@utils/common'

export default {
  name: 'App',
  data () {
    return {

    }
  },
  created () {
    console.log(curDateTime())
  },
}
</script>

<style lang="scss">
@import '@styles/base';

.title {
  color: $main-color;
}
</style>
