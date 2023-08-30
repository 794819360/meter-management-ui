<template>
  <div class="basic">
    <div class="basic-title">基本信息</div>
    <div class="basic-item">
      <div class="item1">
        <div class="item11">
          <div class="item111">
            <span class="title">工作项</span>
            <template>
              <div style="margin-top:10px;">
                <el-progress type="circle" :percentage="table.progress"></el-progress>
              </div>
            </template>
          </div>
        </div>
        <div class="item12">
          <div class="title">项目名称</div>
          <template>
            <div class="name-item" @click="open()">
              {{table.projectName}}
            </div>
          </template>
          <div class="title">负责人</div>
          <template>
            <div class="name-item1">
              {{table.createBy}}
            </div>
          </template>
        </div>
      </div>
      <div class="item2">
        <div class="blonk-two">
          <el-row>
            <el-col :span="8">
              <span class="title">开始时间</span>
            </el-col>
            <el-col :span="10">
              <span class="title">完成时间</span>
            </el-col>
          </el-row>
        </div>
        <div class="blonk-three">
          <el-form ref="table" :model="table">
            <el-row>
              <el-col :span="9" :offset="3">
                <el-form-item prop="startTime">
                  <div class="date-box">
                    <el-date-picker v-model="table.startTime" type="datetime" placeholder="选择日期时间" size="small"
                      :disabled="!disabledone" @change="handleDateTimeChange" :picker-options="DateTimePicker">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="9" :offset="1">
                <el-form-item prop="endTime">
                  <div class="date-box">
                    <el-date-picker v-model="table.endTime" type="datetime" placeholder="选择日期时间" size="small"
                      :disabled="!disabledone" @change="handleDateTimeChange" :picker-options="DateTimePicker">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

        </div>
      </div>
    </div>
    <el-dialog title="修改项目名称" :visible.sync="dialogVisible" width="30%" @close="resetForm('modifyform')">
      <el-form ref="modifyform" :model="modifyform" label-width="80px" :rules="modifyformRules">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="modifyform.projectName" placeholder="请输入修改的项目名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="updateHome()" v-hasRole="['manager']" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
// import { getProject, updateHome, } from '@/api/home'
// import { getInfo } from '@/api/login'


export default {
  name: "BasicInformation",
  data () {
    return {
      // roles: [],
      table: {
      },
      dialogVisible: false,
      disabledone: false,
      value1: '',
      value2: '',
      modifyform: { projectName: '' },
      //修改项目名称校验
      modifyformRules: {
        projectName: [
          { required: true, trigger: "change", message: "请输入修改的的项目名称" },
          { max: 50, message: '长度不超过50个字符', trigger: 'change' },
        ],
      },
    }
  },
  created () {
    // this.getProject()
    // this.getInfo()
  },
  computed: {
    DateTimePicker () {
      return {
        disabledDate: time =>
        (this.table.startTime ? time.getTime() < new Date(this.table.startTime).getTime()
          : (this.table.endTime ? time.getTime() > new Date(this.table.endTime).getTime() : false)),
      };
    },
  },
  methods: {
    async getInfo () {
      let res = await getInfo(Number(this.$cache.session.getJSON('projectId')))
      this.roles = res.user.roles[0].roleKey
      this.disabledone = ['admin', 'manager'].includes(this.roles)
    },
    open () {
      if (['admin', 'manager'].includes(this.roles)) {
        this.dialogVisible = true
      } else {
        this.dialogVisible = false
      }
    },
    updateHome () {
      this.$refs["modifyform"].validate((valid) => {
        if (valid) {
          let data = {
            projectId: this.table.projectId,
            projectName: this.modifyform.projectName
          }
          updateHome(data)
            .then((res) => {
              if (res.code == 200) {
                this.dialogVisible = false
                this.getProject()
                this.$refs['modifyform'].resetFields(); // 清空表单
              }
            })
        }
      })
    },
    // 点击关闭时清空form表格的数据
    resetForm (modifyform) {
      this.$refs[modifyform].resetFields()
    },
    // 处理开始时间大于结束时间
    handleDateTimeChange () {
      if (this.table.startTime > this.table.endTime) {
        this.table.endTime = ''
      } else {
        let data = {
          projectId: this.table.projectId,
          startTime: this.table.startTime,
          endTime: this.table.endTime
        }
        updateHome(data)
          .then((res) => {
            if (res.code == 200) {
              this.getProject()
            }
          })
      }
    },

    // 获取基本信息
    async getProject () {
      let res = await getProject()
      this.table = res.data
    }
  }

}
</script>
<style lang="scss" scoped>
.basic {
  display: flex;
  width: 100%;
  height: 290px;

  .basic-title {
    position: absolute;
    margin-left: 10px;
    margin-top: 10px;
    height: 20px;
    font-size: 16px;
    font-family: Source Han Sans CN, Source Han Sans CN-Medium;
    font-weight: 550;
    color: rgba(0, 0, 0, 0.85);
    line-height: 20px;
  }
  .basic-item {
    width: 100%;
    height: 85%;
    margin-top: 40px;
    .item1 {
      width: 100%;
      height: 75%;
      display: flex;
      .item11 {
        width: 50%;
        height: 100%;
        display: flex;
        text-align: center;
        .item111 {
          width: calc(100% - 10%);
          .title {
            margin-bottom: 10px;
            height: 20px;
            font-size: 14px;
            font-family: Source Han Sans CN, Source Han Sans CN-Medium;
            font-weight: 550;
            color: rgba(0, 0, 0, 0.85);
            line-height: 20px;
          }
        }
      }
      .item12 {
        width: 50%;
        height: 100%;
        .title {
          margin-top: 20px;
          height: 20px;
          font-size: 14px;
          font-family: Source Han Sans CN, Source Han Sans CN-Medium;
          font-weight: 550;
          color: rgba(0, 0, 0, 0.85);
          line-height: 20px;
        }
        .name-item {
          margin-top: 10px;
          font-size: 14px;
          font-family: Source Han Sans CN, Source Han Sans CN-Medium;
          font-weight: 550;
          color: #4696ff;
          line-height: 20px;
          overflow: hidden;
          cursor: pointer;
          max-width: 22em;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis; /*超出部分用...代替*/
          // &:hover {
          //   //背景为蓝色
          //   color: #4696ff;
          // }
        }
        .name-item1 {
          margin-top: 10px;
          font-size: 14px;
          font-family: Source Han Sans CN, Source Han Sans CN-Medium;
          font-weight: 550;
          color: #959595;
          line-height: 20px;
          overflow: hidden;
          max-width: 22em;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis; /*超出部分用...代替*/
        }
      }
    }
    //时间部分
    .item2 {
      width: 100%;
      height: 25%;
      .blonk-two {
        width: 100%;
        height: 30%;
        text-align: center;
        .title {
          height: 20px;
          font-size: 14px;
          font-family: Source Han Sans CN, Source Han Sans CN-Medium;
          font-weight: 550;
          color: rgba(0, 0, 0, 0.85);
          line-height: 20px;
        }
      }
      .blonk-three {
        margin-top: 5px;
        width: 90%;
      }
    }

    .el-input {
      width: 100% !important;
    }
  }
}
</style>