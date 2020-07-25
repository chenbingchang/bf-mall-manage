<template>
  <div class="wheel-img">
    <div class="wheel-img__search">
      <el-date-picker
        class="wheel-img__search-item"
        v-model="search.startTime"
        type="datetime"
        placeholder="开始时间"
        value-format="timestamp"
        :picker-options="startTimeOpt"
        @change="compareTimeRange(true)"
      >
      </el-date-picker>
      <el-date-picker
        class="wheel-img__search-item"
        v-model="search.endTime"
        type="datetime"
        placeholder="结束时间"
        value-format="timestamp"
        :picker-options="endTimeOpt"
        @change="compareTimeRange(false)"
      >
      </el-date-picker>
      <el-select
        class="wheel-img__search-item"
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
    </div>
    <div class="wheel-img__table">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
        >
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
        >
        </el-table-column>
      </el-table>
    </div>
    <div>
      分页
    </div>
  </div>
</template>

<script>
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
      tableData: [
        {
          id: 'aaaa',
          startTime: '2020-07-22 15:25:03',
          endTime: '2020-07-22 15:25:03',
        },
      ],
    }
  },
  methods: {
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
  },
}
</script>

<style lang="scss">
  .wheel-img {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    &__search {

    }

    &__search-item + &__search-item {
      margin-left: 10px;
    }
  }
</style>
