<template>
  <div class="index">
    <div class="index__left">
      <bf-scrollbar
        class="index__scroll"
      >
        <el-menu
          :default-active="$route.name"
          class="el-menu-demo"
          mode="vertical"
          :router="true"
          background-color="#001529"
          text-color="#d7d7d7"
          active-text-color="#409eff"
        >
          <template v-for="item in menuList">
            <el-submenu
              v-if="item.children"
              :key="item.title"
              :index="item.title"
            >
              <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :key="child.index"
                :index="child.index"
                :route="child.route"
              >
                {{ child.name }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item
              v-else
              :index="item.index"
              :route="item.route"
              :key="item.index"
            >
              {{ item.name }}
            </el-menu-item>
          </template>
        </el-menu>
      </bf-scrollbar>
    </div>
    <div class="index__right">
      <div class="index__head">
        <el-tabs
          class="index__tabs"
          :value="$route.name"
          type="card"
          closable
          @tab-click="chgTab"
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="item in tabList"
            :key="item.name"
            :label="item.label"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
        <div class="index__user">
          <div class="index__info">
            <span class="index__name">陈柄昌</span>
            <i class="el-icon-arrow-down"></i>
          </div>
          <ul class="index__dropdown">
            <li @click="loginout">退出登录</li>
          </ul>
        </div>
      </div>
      <bf-scrollbar
        class="index__main"
      >
        <keep-alive>
          <router-view />
        </keep-alive>
      </bf-scrollbar>
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
          // 跳转路由的配置
          route: {
            name: 'Home',
          },
        },
        {
          title: '权限', // 菜单分组名称
          // 菜单子菜单
          children: [
            {
              name: '管理员',
              index: 'AdminUser',
              route: {
                name: 'AdminUser',
              },
            },
          ],
        },
        {
          name: '首页图片轮播', // 菜单名称
          index: 'WheelImg', // 路由名称
          // 跳转路由的配置
          route: {
            name: 'WheelImg',
          },
        },
        // {
        //   name: '404页面', // 菜单名称
        //   index: '404', // 路由名称
        //   // 跳转路由的配置
        //   route: {
        //     name: '404',
        //   },
        // },
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
      // console.log(newVal);
      let menu = null
      let isFind = false

      this.menuList.forEach(item => {
        if (isFind) {
          return
        }

        if (item.children) {
          // 菜单分组
          item.children.forEach(child => {
            if (isFind) {
              return
            }
            if (child.index === newVal.name) {
              menu = child
              isFind = true
            }
          })
        } else {
          // 菜单项
          if (item.index === newVal.name) {
            menu = item
            isFind = true
          }
        }
      })

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
  methods: {
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
  }

  &__user {
    flex: 0 0 auto;
    position: relative;
    padding: 0 20px;
    cursor: pointer;

    &:hover {
      .index__dropdown {
        visibility: visible;
      }
    }
  }

  &__info {
    display: flex;
    align-items: center;
    height: 100%;
  }

  &__name {
    margin-right: 14px;
    color: #333;
  }
  /*
    position: absolute;必须搭配z-index: 1;
    否则，移到菜单列表时，不会有显示
  */
  &__dropdown {
    position: absolute;
    right: 20px;
    top: 100%;
    z-index: 1;
    visibility: hidden;
    box-shadow: 0px 0px 5px #eee;
    width: 100%;
    background-color: #fefefe;
    text-align: center;

    li {
      height: 36px;
      padding: 0 20px;
      line-height: 36px;

      &:hover {
        background-color: #ecf5ff;
        color: #66b1ff
      }
    }
  }

  &__main {
    flex: 1 0 auto;
    height: 0;
  }
}
</style>
