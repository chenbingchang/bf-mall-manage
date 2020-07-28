<template>
  <el-dialog
    class="add-wheel-img"
    title="新增图片轮播"
    :visible.sync="dialogTableVisible"
    center
    :close-on-click-modal="false"
    width="600px"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item
        label="时间"
        prop="time"
      >
        <el-date-picker
          v-model="form.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="图片"
        prop="img"
      >
        <el-upload
          class="upload-img"
          ref="upload"
          action=""
          :multiple="false"
          :limit="1"
          :show-file-list="false"
          :http-request="uploadImg"
        >
          <img
            v-if="form.img"
            :src="form.img"
            class="upload-img__preview"
          >
          <i
            v-else
            class="el-icon-plus upload-img__icon"
          ></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { uploadImg } from '@/api/common/common'

export default {
  name: 'AddWheelImg',
  data () {
    return {
      dialogTableVisible: false, // 是否显示弹窗
      form: {
        time: [], // 时间，第一个是开始时间，第二个是结束时间
        img: null, // 图片
      },
      rules: {
        time: [{ required: true, message: '请选择时间', trigger: 'blue' }],
        img: [{ required: true, message: '请上传图片', trigger: 'blue' }],
      },
    }
  },
  methods: {
    /**
     * 显示窗口
     */
    show () {
      this.dialogTableVisible = true
    },
    /**
     * 文件上传
     * @param {Object} item el-upload组件的信息
     */
    async uploadImg (item) {
      try {
        console.log(item)
        const file = item.file

        // 通过文件名后缀判断文件类型
        if (file.name) {
          const fileSuffixName = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length)
          if (!['jpg', 'jpeg', 'png', 'bmp'].includes(fileSuffixName.toLocaleLowerCase())) {
            this.$message({
              type: 'error',
              showClose: true, // 显示手动关闭按钮
              message: '请选择jpg/jpeg/png/bmp格式的文件',
              duration: 2000, // 延迟1秒后关闭
              customClass: 'common-toast',
            })
            this.$refs.upload.clearFiles()
            return false
          }
          // 文件名不能包含空格
          if (file.name.includes(' ')) {
            this.$message({
              type: 'error',
              showClose: true, // 显示手动关闭按钮
              message: '上传文件的文件名不能包含空格',
              duration: 2000, // 延迟1秒后关闭
              customClass: 'common-toast',
            })
            this.$refs.upload.clearFiles()
            return false
          }
        }

        const fd = new FormData()
        fd.append('file', file)

        const result = await uploadImg(fd)

        if (result && result.subCode === '00000100') {
          this.form.img = result.data.url
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
  },
}
</script>

<style lang="scss">
  .add-wheel-img {
    .upload-img {
      .el-upload {
        box-sizing: border-box;
        width: 150px;
        height: 150px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;

        &:hover {
          border-color: #409EFF;
        }
      }

      &__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 28px;
        color: #8c939d;
      }

      &__preview {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
