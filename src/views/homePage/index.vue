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
          <div>
            <working-hours>
            </working-hours>
          </div>
        </div>
      </div>
      <!-- 第三行 -->
      <div class="row3">
        <div class="row3-one row-box">
          <div>
            <!-- <work-items :complete="complete" :underway="underway" :notStart="notStart"></work-items> -->
            <work-items></work-items>
          </div>
        </div>
        <div class="row3-two row-box">
          <div>
            <member-one></member-one>
          </div>
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




export default {
  name: "WorkBench",
  components: {
    BasicInformation, BurnDown, VersionNumber, WorkingHours, WorkItems, MemberOne
  },
  data () {
    return {
      numberData: {},
      tableData: [],
      loading: true,
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