<template>
  <div
    id="app"
  >
    <router-view />
  </div>
</template>

<script>
import { secrectAes } from '@/api/common/common'
import { Decrypt } from '@utils/common'

export default {
  name: 'App',
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getSecretAes()
    },
    async getSecretAes () {
      const response = await secrectAes()

      if (response.subCode && response.subCode === '00200100') {
        const decryptStr = Decrypt(response.data, 't@hef2un3cItiNon', 'i#s2su1TceN36s4s')
        const aes = JSON.parse(decryptStr)

        this.$store.commit('setAesKey', aes.key)
        this.$store.commit('setAesIv', aes.iv)
      } else {
        this.$message({
          type: 'error',
          showClose: true, // 显示手动关闭按钮
          message: response.msg,
          duration: 1000, // 延迟1秒后关闭
          customClass: 'common-toast',
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@styles/base';
@import '@styles/my-element';

#app {
  width: 100%;
  height: 100%;
}
</style>
