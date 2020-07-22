<template>
  <el-submenu
    v-if="menu.children"
    :index="menu.title"
  >
    <template slot="title">
      <!-- <i v-if="menu.icon" :class="[`el-icon-${menu.icon}`]"></i> -->
      <span>{{ menu.title }}</span>
    </template>
    <nest-menu
      v-for="child in menu.children"
      :key="child.index"
      :menu="child"
    ></nest-menu>
  </el-submenu>
  <el-menu-item
    v-else
    :index="menu.index"
    :route="{name: menu.index}"
  >
    <!-- <i v-if="menu.icon" :class="[`el-icon-${menu.icon}`]"></i> -->
    {{ menu.name }}
  </el-menu-item>
</template>

<script>
/**
 * 多层嵌套菜单
 */
export default {
  name: 'NestMenu',
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss"></style>
