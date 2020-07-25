<template>
  <div class="index">
    <div class="index__left">
      <bf-scrollbar
        class="index__scroll"
      >
        <el-menu
          :default-active="$route.name"
          class="index__menu"
          mode="vertical"
          :router="true"
          background-color="#001529"
          text-color="#d7d7d7"
          active-text-color="#409eff"
        >
          <nest-menu
            v-for="item in menuList"
            :key="item.index"
            :menu="item"
          ></nest-menu>
        </el-menu>
      </bf-scrollbar>
    </div>
    <div class="index__right">
      <div class="index__head">
        <el-tabs
          class="index__tabs"
          :value="$route.name"
          type="card"

          @tab-click="chgTab"
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="item in tabList"
            :key="item.name"
            :label="item.label"
            :name="item.name"
            :closable="item.name !== 'Home'"
          ></el-tab-pane>
        </el-tabs>
        <el-dropdown
          class="index__user"
          @command="handleCommand"
        >
          <span class="index__name">
            陈柄昌
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              command="logout"
              icon="el-icon-switch-button"
            >退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div
        class="index__main"
      >
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { COOKIE_KEY } from '@utils/constants'

export default {
  name: 'Index',
  data () {
    return {
      // 左侧菜单列表
      menuList: [
        {
          name: '首页', // 菜单名称
          index: 'Home', // 路由名称
        },
        {
          title: '权限', // 菜单分组名称
          // 菜单子菜单
          children: [
            {
              name: '管理员',
              index: 'AdminUser',
            },
          ],
        },
        {
          name: '首页图片轮播', // 菜单名称
          index: 'WheelImg', // 路由名称
        },
      ],
      // tabpanel列表
      tabList: [
        {
          label: '首页', // 显示的标题
          name: 'Home', // 路由名称
        },
      ],
    }
  },
  watch: {
    /**
     * 路由改变,如果tab没有该路由页面则新增
     * @param {Object} newVal 路由对象
     */
    $route (newVal) {
      const menu = this.findMenu(this.menuList, newVal.name)

      // 菜单存在
      if (menu) {
        // 查找tabList中是否存在该tab，不存在则新增
        const tab = this.tabList.find(item => item.name === menu.index)

        if (!tab) {
          this.tabList.push({
            label: menu.name,
            name: menu.index,
          })
        }
      }
    },
  },
  components: {
    NestMenu: () => import(/* webpackChunkName: "NestMenu" */'@components/common/NestMenu'),
  },
  methods: {
    /**
     * 根据路由名称查找menu
     * @param {Array} menuList 菜单数组
     * @param {string} routeName 路由名称
     * @returns {Object} 找到的菜单
     */
    findMenu (menuList, routeName) {
      let menu = null

      for (let i = 0; i < menuList.length; i++) {
        const item = menuList[i]

        if (item.children && item.children.length > 0) {
          menu = this.findMenu(item.children, routeName)

          if (menu) {
            break
          }
        } else {
          if (item.index === routeName) {
            menu = item
            break
          }
        }
      }

      return menu
    },
    /**
     * tab改变，切换路由
     * @param {Object} tab tab对象
     */
    chgTab (tab) {
      this.$router.push({ name: tab.name })
    },
    /**
     * 删除tab，切换路由
     * @param {string} tabName tab名称，即路由名称
     */
    removeTab (tabName) {
      const index = this.tabList.findIndex(item => item.name === tabName)
      let nextRouteName

      if (index !== -1) {
        // 删除
        this.tabList.splice(index, 1)
      }

      if (this.$route.name !== tabName) {
        return
      }
      // 判断下一个是否存在，splice后，index表示下一个
      if (this.tabList[index]) {
        // 后一个存在
        nextRouteName = this.tabList[index].name
      } else if (this.tabList[index - 1]) {
        // 前一个存在
        nextRouteName = this.tabList[index - 1].name
      }

      if (nextRouteName) {
        // 找到则跳转
        this.$router.push({ name: nextRouteName })
      } else {
        // 没有找到跳回首页
        this.$router.push({ path: '/' })
      }
    },
    /**
     * 姓名下拉框
     * @param {string} command 下拉项的指令
     */
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.loginout()
          break
      }
    },
    /**
     * 退出登录
     */
    loginout () {
      this.$cookies.remove(COOKIE_KEY.userId)
      this.$cookies.remove(COOKIE_KEY.name)
      this.$router.push('/login')
    },
  },
  created () {

  },
}
</script>

<style lang="scss">
.index {
  display: flex;
  width: 100%;
  height: 100%;

  &__left {
    flex: 0 0 auto;
    box-sizing: border-box;
    width: 200px;
    height: 100%;
    background-color: #001529;
  }

  &__menu {
    &.el-menu {
      border: none;
    }
  }

  &__scroll {
    height: 100%;
  }

  &__right {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    width: 0;
  }

  &__head {
    flex: 0 0 auto;
    display: flex;
  }

  &__tabs {
    flex: 1 0 auto;
    width: 0;
    background-color: #fff;

    .el-tabs__header {
      margin: 0;
    }

    .el-tabs__item {
      height: 32px;
      line-height: 32px;
    }
  }

  &__user {
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    padding: 0 20px;
    cursor: pointer;
  }

  &__name {
    display: flex;
    align-items: center;
  }

  &__main {
    flex: 1 0 auto;
    height: 0;
    padding: 10px;
  }
}
</style>
