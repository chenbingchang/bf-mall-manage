<template>
  <div class="wheel-img bf-table">
    <div class="bf-table__search">
      <el-date-picker
        class="bf-table__search-item"
        v-model="search.startTime"
        type="datetime"
        placeholder="开始时间"
        value-format="timestamp"
        :picker-options="startTimeOpt"
        @change="compareTimeRange(true)"
      >
      </el-date-picker>
      <el-date-picker
        class="bf-table__search-item"
        v-model="search.endTime"
        type="datetime"
        placeholder="结束时间"
        value-format="timestamp"
        :picker-options="endTimeOpt"
        @change="compareTimeRange(false)"
      >
      </el-date-picker>
      <el-select
        class="bf-table__search-item"
        v-model="search.status"
        placeholder="状态"
        @change="chgStatus"
      >
        <el-option
          label="全部"
          :value="0"
        >
        </el-option>
        <el-option
          label="有效"
          :value="1"
        >
        </el-option>
        <el-option
          label="无效"
          :value="2"
        >
        </el-option>
      </el-select>
      <el-button
        class="bf-table__search-item"
        type="primary"
        @click="getTableList(true)"
      >查询</el-button>
      <el-button
        class="bf-table__search-item"
        type="success"
        @click="handleAdd()"
      >新增</el-button>
    </div>
    <bf-scrollbar
      class="bf-table__table"
    >
      <el-table
        size="medium"
        :data="tableData"
        :stripe="true"
        :border="true"
        :highlight-current-row="true"
      >
        <el-table-column
          prop="id"
          label="ID"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <i
              class="el-icon-edit"
              title="修改"
              @click="handleEdit(scope.$index, scope.row)"
            ></i>
            <i
              class="el-icon-delete"
              title="删除"
              @click="handleDelete(scope.$index, scope.row)"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </bf-scrollbar>
    <el-pagination
      class="bf-table__page"
      background
      layout="prev, pager, next, jumper, sizes, total"
      :current-page.sync="page.pageIndex"
      :page-sizes="[10, 20, 50, 100, 500]"
      :page-size.sync="page.pageSize"
      :total.sync="page.total"
      @size-change="getTableList(true)"
      @current-change="getTableList()"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getWheelImgList } from '@/api/wheelImg/wheelImg'

export default {
  name: 'WheelImg',
  data () {
    return {
      search: {
        startTime: null, // 开始时间
        endTime: null, // 开始时间
        status: null, // 状态
      },
      // 开始时间选项
      startTimeOpt: {
        // 禁用
        disabledDate: time => {
          // time是某日零时的时间
          if (this.search.endTime) {
            // 开始时间不能大于结束时间
            return time.getTime() > this.search.endTime
          } else {
            // 没有结束时间，则全部可以选
            return false
          }
        },
      },
      // 结束时间选项
      endTimeOpt: {
        // 禁用
        disabledDate: time => {
          // time是某日零时的时间
          if (this.search.startTime) {
            // 结束时间不能小于开始时间
            return time.getTime() < this.search.startTime - 86399000 // (3600 * 24 * 1000 - 1000) = 86399000
          } else {
            // 没有开始时间，则全部可以选
            return false
          }
        },
      },
      // 表格数据
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        total: 1000,
      },
    }
  },
  methods: {
    /**
     * 获取列表数据
     * @param {Boolean} hasReset 是否需要重置页码
     */
    async getTableList (hasReset = false) {
      try {
        // 重置页码
        if (hasReset) {
          this.page.pageIndex = 1
        }

        const result = await getWheelImgList({
          startTime: this.search.startTime,
          endTime: this.search.endTime,
          status: this.search.status,
          pageIndex: this.page.pageIndex,
          pageSize: this.page.pageSize,
        })

        if (result.subCode && result.subCode === '00200100') {
          this.tableData = result.data.list
          this.page.total = result.data.total
        } else {
          this.$message({
            type: 'error',
            showClose: true, // 显示手动关闭按钮
            message: result.msg,
            duration: 1000, // 延迟1秒后关闭
            customClass: 'common-toast',
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
    /**
     * 比较开始时间、结束时间
     * @param {Boolean} isStartTime 是否是开始时间触发了方法
     */
    compareTimeRange (isStartTime) {
      if (isStartTime) {
        if (this.search.endTime && this.search.startTime > this.search.endTime) {
          this.search.startTime = this.search.endTime
        }
      } else {
        if (this.search.startTime && this.search.endTime < this.search.startTime) {
          this.search.endTime = this.search.startTime
        }
      }
    },
    /**
     * 改变状态，当选择是全部时，置空
     * @param {number} val 当前选中的值
     */
    chgStatus (val) {
      if (val === 0) {
        this.search.status = null
      }
    },
    /**
     * 新增
     */
    handleAdd () {

    },
    /**
     * 编辑
     */
    handleEdit () {

    },
    /**
     * 删除
     */
    handleDelete () {

    },
  },
  created () {
    this.getTableList(true)
  },
}
</script>

<style lang="scss">
  .wheel-img {

  }
</style>
