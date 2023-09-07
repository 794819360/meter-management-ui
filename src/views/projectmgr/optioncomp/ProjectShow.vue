<template>
  <div class="app-container">
    <!-- 项目名称 -->
    <el-card class="box-card">
      <el-card>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="项目名称:">{{
            projectFormAddObj.projectName
          }}</el-form-item>
          <el-form-item label="项目发起时间:">{{
            projectFormAddObj.createTime
          }}</el-form-item>
          <el-form-item label="项目交付时间:">{{
            projectFormAddObj.projectEstime
          }}</el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card">
        <span
          style="color: #6ecee5; cursor: pointer"
          @click="downUrlStuff(projectFormAddObj)"
          >下载材料</span
        >
      </el-card>
    </el-card>

    <el-card class="box-card"
      ><el-form
        ><el-form-item label="项目说明：">{{
          projectFormAddObj.projectDescription
        }}</el-form-item></el-form
      ></el-card
    >

    <el-card class="box-card">
      <el-table :data="showTableArray" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-table-column>
                <el-table :data="props.row.planResqs">
                  <el-table-column
                    label="周期计划"
                    prop="task"
                  ></el-table-column>
                  <el-table-column
                    label="负责人"
                    prop="adminName"
                  ></el-table-column>
                  <el-table-column
                    label="计算开始日期"
                    prop="startTime"
                  ></el-table-column>
                  <el-table-column
                    label="计划完成日期"
                    prop="completionTime"
                  ></el-table-column>
                  <el-table-column
                    label="状态"
                    prop="statusName"
                  ></el-table-column>
                  <el-table-column
                    label="实际完成日期"
                    prop="finishTime"
                  ></el-table-column>
                </el-table>
              </el-table-column>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="子项目名" prop="projectName"></el-table-column>
        <el-table-column
          label="子项目启用日期"
          prop="createTime"
        ></el-table-column>
        <el-table-column
          label="子项目交付日期"
          prop="projectEstime"
        ></el-table-column>
        <el-table-column label="质量专员反馈意见">
          <template slot-scope="props">
            <span v-if="props.row.comResq">
              <span>{{ props.row.comResq.commistorName }}:</span>
            <span v-if="props.row.comResq.feedbackStatus === 0">通过</span>
            <span v-if="props.row.comResq.feedbackStatus === 1">
              <el-button type="text"  size="small" plain @click="noPassView(props.row.comResq.feedback)"> 不通过 </el-button>
            </span>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// import { projectUnderwayGetById } from '@/api/projectmgr/index.js'
export default {
  name: 'ProjectShow',
  data() {
    return {
      // projectId: this.$route.query.projectId, // 人力成本数据 和 项目详情
      // attacheId: this.$route.query.attacheId, // 财务专员名称
      // status: this.$route.query.status, // 项目状态  未进行 |  进行中

      projectFormAddObj: {
        comResq: {
          feedbackStatus: '0'
        }
      },
      showTableArray: []
    }
  },
  created() {
    // this.postProjectUnderwayGetById()
  },
  methods: {
    timeToTime(time) {
      let newTime = new Date(parseInt(time))
      let y = newTime.getFullYear()
      let m = newTime.getMonth() + 1
      let d = newTime.getDate()
      let h = newTime.getHours()
      let mm = newTime.getMinutes()
      let s = newTime.getSeconds()
      return y + '.' + m + '.' + d + ' ' + h + ':' + mm + ':' + s
    },

    noPassView(info) {
      this.$notify({
          title: '不通过原因',
          message: info,
      });
    },

    downUrlStuff(val) {
      window.open(val.projectUrl);
    },
  }
}
</script>

<style>
.box-card {
  margin-top: 1em;
}
</style>