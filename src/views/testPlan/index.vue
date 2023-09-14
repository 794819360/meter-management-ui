<template>
  <div class="background">
    <!-- 提示框 -->
  <div class="tishi"><el-alert title="温馨提示" type="success" description="执行测试计划前，记得修改测试计划接收人, 这样就能收到邮件通知啦😈~">
      </el-alert>
    </div>
    <div class="table">
        <!-- 搜索选择框 -->
        <div class="select1">
          项目:
          <el-select v-model="value" filterable placeholder="请选择">
            <el-option v-for="item in tableData" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- 远程搜索框 -->
        <div class="select2">
          名称:
          <el-select v-model="value" multiple filterable remote reserve-keyword placeholder="请输入关键词"
            :remote-method= "remoteMethod" :loading="loading">
            <el-option v-for="item in tableData" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- 优先级选择框 -->
       <div class="select3">
        优先级:
        <el-select v-model="value" clearable placeholder="请选择优先级">
          <el-option v-for="item in tableData" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
       </div>
        <!-- 是否关注 -->
        <div class="select4">
          关注:
          <el-select v-model="value" clearable placeholder="请选择是否关注">
          <el-option v-for="item in tableData" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        </div>
        <!-- 创建人搜索 -->
        <div class="select5">
          创建人:
          <el-select v-model="value" filterable placeholder="请选择创建人">
            <el-option v-for="item in tableData" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- 添加计划按钮 -->
        <div class="button">
          <el-button type="primary" icon="el-icon-edit" style="margin-left: 20px; margin-top: 20px;">添加计划</el-button>
        </div>
    </div>
    
    <el-table :data="tableData" border="1" style="width: 1500px" class="main">
          <el-table-column fixed prop="date" label="项目" width="100" align="center">
          </el-table-column>
          <el-table-column prop="name" label="测试计划" width="200" align="center"> 
          </el-table-column>
          <el-table-column prop="province" label="优先级" width="100" align="center">
          </el-table-column>
          <el-table-column prop="city" label="cron表达式" width="150" align="center">
          </el-table-column>
          <el-table-column prop="address" label="顺序执行" width="150" align="center">
          </el-table-column>
          <el-table-column prop="zip" label="用例数量" width="150" align="center">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="150" align="center">
          </el-table-column>
          <el-table-column prop="attention" label="是否关注" width="130" align="center">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949" align="center">
            </el-switch>
          </el-table-column>
          <el-table-column prop="creator" label="创建人" width="150" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" align="center">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>
<script >
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "刘百川",
          province: "1",
          city: "普陀区",
          address: "三天饿九顿",
          zip: 200333,
          state: "是",
        }],
    };
  },
  components:{
    TodoPrompt,
    TodoHeader,
    TodoMain
  }
};
</script>

<style lang="scss" scoped>
.background {
  background-color: aliceblue;
  width: 100%;
  height: 900px;
}
.tishi {
  padding-top: 20px;
}
.main{
    margin:0 auto
  }
  .select1{
  margin-left: 28px;
  font-size: 7px;
  display: inline;
}
.select2{
  font-size: 7px;
  padding-left: 10px;
  display: inline;
}
.select3{
  font-size: 7px;
  padding-left: 10px;
  display: inline;
}
.select4{
  font-size: 7px;
  padding-left: 5px;
  display: inline;
}
.select5{
  font-size: 7px;
  padding-left: 5px;
  display: inline;
}
.button{
  height: 75px;
}
</style>

