<template>
  <div class="number">
    <div class="number-title">版本 </div>
    <div class="number-item">
      <el-table :data="tableData" style="width: 100%" max-height="240">
        <el-table-column prop="editionName" label="版本名称" width="220">
        </el-table-column>
        <el-table-column prop="leaderName" label="负责人">
        </el-table-column>
        <el-table-column prop="startTime" label="创建时间">
          <template slot-scope="scope">
            {{transformTime(scope.row.startTime)}}
          </template>
        </el-table-column>
        <el-table-column prop="progress" label="进度" align="center" width="220">
          <template slot-scope="scope">
            <el-progress :percentage="filterData(scope.row.rate)"></el-progress>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>
<script>

export default {
  name: "BurnDown",
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => [
      ],
    },
  },

  data () {
    return {


    }
  },
  created () {

  },
  methods: {
    // 进度条转换
    filterData (val) {
      //百分比必须为0-100，否则报错[Vue warn]:Invalid prop:custom validator check failed for prop "percentage"
      let result = 0
      if (val > 0 && (val <= 1)) {
        result = parseFloat((val * 100).toPrecision(4))
      }
      return result
    },
    //时间格式转化
    transformTime (date) {
      if (date) {
        var tiem = new Date(date);
        let y = tiem.getFullYear();
        let m = tiem.getMonth() + 1 < 10 ? '0' + Number(Number(tiem.getMonth()) + 1) : tiem.getMonth() + 1;
        let d = tiem.getDate() < 10 ? '0' + tiem.getDate() : tiem.getDate();
        let h = tiem.getHours() < 10 ? '0' + tiem.getHours() : tiem.getHours();
        let i = tiem.getMinutes() < 10 ? '0' + tiem.getMinutes() : tiem.getMinutes();
        var datetime = y + '-' + m + "-" + d + ' ' + h + ':' + i;
        return datetime;
      }
    },

  }

}
</script>
<style lang="scss" scoped>
.number {
  width: 100%;
  display: flex;
  height: 290px;
  // position: relative;
  .number-title {
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
  .number-item {
    margin-top: 35px;
    margin-left: 50px;
    height: 85%;
    width: 90%;
    justify-content: center;
    align-items: center;
    .number-item-one {
      width: calc(100%);
      height: calc(100%);
    }
  }
}
/* element滚动条组件 隐藏水平滚动条 */
.sidebar-wrapper .el-scrollbar__wrap {
  overflow-x: hidden;
}
.is-horizontal {
  display: none;
}
</style>