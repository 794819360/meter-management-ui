<template>
  <div class="background">
      <!-- 提示框 -->
      <div class="tishi">
          <el-alert title="温馨提示" type="success" description="执行测试计划前，记得修改测试计划接收人, 这样就能收到邮件通知啦😈~">
          </el-alert>
      </div>
      <div class="table">
          <!-- 搜索选择框 -->
          <div class="select1">
              项目:
              <el-select v-model="selectedProject" filterable placeholder="请选择项目">
                  <el-option v-for="item in projects" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
              </el-select>
          </div>
          <!-- 优先级选择框 -->
          <div class="select3">
              优先级:
              <el-select v-model="selectedPriority" clearable placeholder="请选择优先级">
                  <el-option v-for="item in priorities" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
              </el-select>
          </div>
          <!-- 是否关注 -->
          <div class="select4">
              关注:
              <el-select v-model="selectedAttention" clearable placeholder="请选择是否关注">
                  <el-option v-for="item in attentions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
              </el-select>
          </div>
          <!-- 创建人搜索 -->
          <div class="select5">
              创建人:
              <el-select v-model="selectedCreator" filterable placeholder="请选择创建人">
                  <el-option v-for="item in creators" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
              </el-select>
          </div>

          <!-- 搜索选择框 -->

          <!-- 添加计划按钮 -->
          <div class="button">
              <el-button type="primary" icon="el-icon-edit" style="margin-left: 20px; margin-top: 20px"
                  @click="handleAdd = true" v-hasPermi="['pill:factory:add']">添加计划</el-button>
          </div>
      </div>

      <el-table :data="filteredTableData" style="width: 1500px" class="main">
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
              <template slot-scope="scope">
                  <!-- <el-switch v-model="scope.row.attention" active-color="#13ce66" inactive-color="#ff4949" align="center"
                      @change="open(scope.row)">
                  </el-switch> -->
                  <el-switch v-model="scope.row.attention" active-color="#13ce66" inactive-color="#ff4949"
                      :active-value="1" :inactive-value="0" align="center" @change="openE(scope.row.attention)">
                  </el-switch>

              </template>
          </el-table-column>

          <el-table-column prop="creator" label="创建人" width="150" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130" align="center">
              <template slot-scope="scope">
                  <el-button type="text" size="small" align="center" @click="handleEdit(scope.$index)">编辑</el-button>

                  <!-- <el-button type="text" size="small" align="center">编辑</el-button> -->
                  <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                      移除
                  </el-button>
              </template>
          </el-table-column>
      </el-table>
      <!-- 下一页 -->
      <el-pagination background layout="prev, pager, next" :total="1" class="footer">
      </el-pagination>
      <!-- 新增页面内容 -->
      <!-- 新增页面内容 -->
      <el-dialog title="新增测试计划" :visible.sync="handleAdd" width="50%">
          <el-form :model="newPlan">
              <el-form-item label="项目名:">
                  <el-input v-model="newPlan.date" placeholder="请输入项目名称"></el-input>
              </el-form-item>
              <el-form-item label="测试计划:">
                  <el-input v-model="newPlan.name" placeholder="请输入测试计划"></el-input>
              </el-form-item>
              <el-form-item label="优先级:">
                  <el-input v-model="newPlan.province" placeholder="请输入优先级"></el-input>
              </el-form-item>
              <el-form-item label="cron表达式:">
                  <el-input v-model="newPlan.city" placeholder="请输入cron表达式"></el-input>
              </el-form-item>
              <el-form-item label="顺序执行:">
                  <el-input v-model="newPlan.address" placeholder="请输入顺序执行"></el-input>
              </el-form-item>
              <el-form-item label="用例数量:">
                  <el-input v-model="newPlan.zip" placeholder="请输入用例数量"></el-input>
              </el-form-item>
              <el-form-item label="状态:">
                  <el-radio-group v-model="newPlan.state">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="是否关注:">
                  <el-switch v-model="newPlan.attention" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
                      :inactive-value="0" align="center" @change="openE(scope.row.attention)">
                  </el-switch>

                  <!-- <el-switch v-model="newPlan.attention"></el-switch> -->
              </el-form-item>
              <el-form-item label="创建人:">
                  <el-input v-model="newPlan.creator" placeholder="请输入创建人"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="handleAdd = false">取 消</el-button>
              <el-button type="primary" @click="addNewPlan">确 定</el-button>
          </span>
      </el-dialog>

  </div>
</template>
<script  >
export default {
  name: "dept",
  data() {
      return {
          selectedProject: '',
          selectedPriority: '',
          selectedAttention: '',
          selectedCreator: '',
          editIndex: -1,

          tableData: [
              {
                  date: "2016-05-02",
                  name: "刘百川",
                  province: "1",
                  city: "普陀区",
                  address: "三天饿九顿",
                  attention: 1,
                  zip: 200333,
                  state: "是",
              },
          ],
          newPlan: {
              date: "",
              name: "",
              province: "",
              city: "",
              address: "",
              attention: "1",
              zip: "",
              state: "",
          },

          value: "",
          handleAdd: false,
          // filteredTableData: []
      };
  },
  mounted() {
      const savedData = localStorage.getItem("tableData");
      if (savedData) {
          this.tableData = JSON.parse(savedData);
      }
      this.filterData();
  },
  computed: {
      projects() {
          // 使用 Set 来去重
          const uniqueProjects = new Set(this.tableData.map(row => row.date));
          return Array.from(uniqueProjects).map(project => ({
              label: project,
              value: project,
          }));
      },
      priorities() {
          const uniquePriorities = new Set(this.tableData.map(row => row.province));
          return Array.from(uniquePriorities).map(priority => ({
              label: priority,
              value: priority,
          }));
      },
      attentions() {
          const uniqueAttentions = new Set(this.tableData.map(row => row.attention));
          return Array.from(uniqueAttentions).map(attention => ({
              label: attention === 1 ? '关注' : '不关注',
              value: attention,
          }));
      },
      creators() {
          const uniqueCreators = new Set(this.tableData.map(row => row.creator));
          return Array.from(uniqueCreators).map(creator => ({
              label: creator,
              value: creator,
          }));
      },
      filteredTableData() {
          return this.tableData.filter(row => {
              return (
                  (this.selectedProject ? row.date === this.selectedProject : true) &&
                  (this.selectedPriority ? row.province === this.selectedPriority : true) &&
                  (this.selectedAttention !== '' ? row.attention === parseInt(this.selectedAttention) : true) &&
                  (this.selectedCreator ? row.creator === this.selectedCreator : true)
              );
          });
      },
  },
  watch: {
      selectedProject: 'filterData',
      selectedPriority: 'filterData',
      selectedAttention: 'filterData',
      selectedCreator: 'filterData',
  },
  methods: {
      filterData() {
          this.filteredTableData = this.tableData.filter(row => {
              return (
                  (this.selectedProject ? row.date === this.selectedProject : true) &&
                  (this.selectedPriority ? row.province === this.selectedPriority : true) &&
                  (this.selectedAttention ? row.attention === parseInt(this.selectedAttention) : true) &&
                  (this.selectedCreator ? row.creator === this.selectedCreator : true)
              );
          });
      },
      getData() {
          const savedData = localStorage.getItem("tableData");
          if (savedData) {
              this.tableData = JSON.parse(savedData);
          }
      },
      handleEdit(index) {
          this.editIndex = index;
          // this.newPlan = { ...this.tableData[index] };
          this.newPlan = JSON.parse(JSON.stringify(this.tableData[index]));
          this.handleAdd = true;
      },
      addNewPlan() {
          if (this.editIndex >= 0) {
              this.tableData[this.editIndex] = this.newPlan;
          } else {
              this.tableData.push(this.newPlan);
          }
          localStorage.setItem("tableData", JSON.stringify(this.tableData));
          this.newPlan = {};
          this.handleAdd = false;
          this.editIndex = -1;
          this.getData()
      },

      // addNewPlan() {
      //     this.tableData.push(this.newPlan);
      //     localStorage.setItem("tableData", JSON.stringify(this.tableData));
      //     this.newPlan = {};
      //     this.handleAdd = false;
      // },
      // deleteRow(index, tableData) {
      //     this.tableData.splice(index, 1);
      //     localStorage.setItem("tableData", JSON.stringify(this.tableData));
      // },


                                
      deleteRow(index) {
          this.$confirm('确认删除这条记录吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.tableData.splice(index, 1);
              localStorage.setItem("tableData", JSON.stringify(this.tableData));
              this.$message({
                  type: 'success',
                  message: '删除成功!'
              });
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });
      },
      openE: function (value) {
          localStorage.setItem("tableData", JSON.stringify(this.tableData));

          console.log(value);
      },
  },
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

.main {
  margin: 0 auto;
}

.select1 {
  margin-left: 28px;
  font-size: 7px;
  display: inline;
}

.select2 {
  font-size: 7px;
  padding-left: 10px;
  display: inline;
}

.select3 {
  font-size: 7px;
  padding-left: 10px;
  display: inline;
}

.select4 {
  font-size: 7px;
  padding-left: 5px;
  display: inline;
}

.select5 {
  font-size: 7px;
  padding-left: 5px;
  display: inline;
}

.button {
  height: 75px;
}

.footer {
  margin-top: 10px;
  margin-left: 1380px;
}
</style>

