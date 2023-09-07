<template>
  <div class="app-container">
    <div class="workbench-container">
      <!-- 第一行 -->
      <div class="row1">
        <div class="row1-one row-box">
          <div>
            <basic-information></basic-information>
          </div>
        </div>
        <div class="row1-two row-box">
          <div>
            <burn-down :tableData="tableData" ></burn-down>
          </div>
        </div>
      </div>
      <!-- 第二行 -->
      <div class="row2">
        <div class="row2-one row-box">
          <div>
            <version-number :numberData="numberData"></version-number>
          </div>
        </div>
        <div class="row2-two row-box">
          <!-- <div>
            <working-hours>
            </working-hours>
          </div> -->
          <div class="card-title">
              工时
          </div>
          <line-chart :chart-data="lineChartData" />
        </div>
      </div>
      <!-- 第三行 -->
      <div class="row3">
        <div class="row3-one row-box">
          <div class="card-title">
              缺陷
          </div>
          <pie-chart />
        </div>
        <div class="row3-two row-box">
            <div class="card-title">
              成员
            </div>
            <!-- <member-one></member-one> -->
            <!-- <pie-chart /> -->
            <bar-chart />
            <!-- <raddar-chart />
            <line-chart :chart-data="lineChartData" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicInformation from "./components/BasicInformation"
import BurnDown from "./components/BurnDown"
import VersionNumber from "./components/VersionNumber"
import WorkingHours from "./components/WorkingHours"
import WorkItems from "./components/WorkItems"
import MemberOne from "./components/MemberOne"
// import { getEdition } from '@/api/home'

import PanelGroup from '../dashboard/PanelGroup'
import LineChart from '../dashboard/LineChart'
import RaddarChart from '../dashboard/RaddarChart'
import PieChart from '../dashboard/PieChart'
import BarChart from '../dashboard/BarChart'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}


export default {
  name: "WorkBench",
  components: {
    BasicInformation, BurnDown, VersionNumber, WorkingHours, WorkItems, MemberOne,
     PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  data () {
    return {
      numberData: {},
      tableData: [ {
          editionName:'V1.0',
          leaderName:'螺丝',
          startTime:1694057038000,
          rate:0.6
        }],
      loading: true,
      lineChartData: lineChartData.newVisitis
      // data: {},
      // complete: [],
      // underway: [],
      // notStart: []
    };
  },
  created () {
    // this.getNumber()
  },
  methods: {
    async getNumber () {
      let res = await getEdition()
      this.numberData = res.data
      this.tableData = res.data.edition
      this.loading = false
    }

  }
};
</script>
<style lang="scss" scoped>
.workbench-container {
  width: 100%;
  height: 755px;
}
.row-box{
  background-color: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}

.card-title {
    margin-left: 10px;
    margin-top: 10px;
    height: 20px;
    font-size: 16px;
    font-family: Source Han Sans CN, Source Han Sans CN-Medium;
    font-weight: 550;
    color: rgba(0, 0, 0, 0.85);
    line-height: 20px;
}
.row1 {
  height: 39%;
  display: flex;
  .row1-one {
    width: 35%;
    
  }
  .row1-two {
    width: 65%;
    margin-left: 10px;
    
  }
}
.row2 {
  height: 29%;
  display: flex;
  margin-top: 10px;
  .row2-one {
    width: 50%;
    
  }
  .row2-two {
    width: 50%;
    margin-left: 10px;
    
  }
}
.row3 {
  height: 29%;
  display: flex;
  margin-top: 10px;
  .row3-one {
    width: 50%;
    
  }
  .row3-two {
    width: 50%;
    margin-left: 10px;
    
  }
}
</style>