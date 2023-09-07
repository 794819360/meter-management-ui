<template>
  <div>
    <!-- 搜索表单 -->
    <div>
      <el-card>
        <el-form :inline="true" :model="searchFormObj" class="demo-form-inline">
          <el-form-item label="项目名称">
            <el-input
              v-model="searchFormObj.projectName"
              placeholder="请输入项目名称"
            />
          </el-form-item>
          <el-form-item label="项目状态">
            <el-select
              v-model="searchFormObj.projectStatus"
              placeholder="项目状态"
            >
              <el-option label="待启用" value="0" />
              <el-option label="待审核" value="1" />
              <el-option label="已驳回" value="2" />
              <el-option label="已挂起" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search"  @click="handleQuery" >查询</el-button>
            <el-button icon="el-icon-refresh"  @click="projectListUnm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- 操作列表 -->
    <div>
      <el-card class="box-card">
        <el-button type="primary"
          plain
          icon="el-icon-plus"
          @click="handleLinkToProjectAdd"
          >新增</el-button
        >
      </el-card>
    </div>

    <!-- 表格 -->
    <div>
      <el-card class="box-card">
        <el-table :data="showTableArray" border style="width: 100%">
          <el-table-column type="index" label="序号" align="center" />
          <el-table-column prop="projectName" label="项目名称" align="center" />
          <el-table-column
            prop="createTime"
            label="项目发起日期"
            align="center"
          />
          <el-table-column
            prop="projectStart"
            label="项目启用日期"
            align="center"
          />
          <el-table-column
            prop="projectEstime"
            label="项目交付日期"
            align="center"
          />
          <el-table-column prop="statusTitle" label="项目状态" align="center" />
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <span>
                <!-- <el-button
                  type="text"
                  size="small"
                  @click="distribution(scope.row)"
                  :disabled="scope.row.isHeld ? true : false"
                  >分配</el-button
                > -->
                <!-- 当项目启动后，隐藏启动按钮 -->
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-circle-check"
                  @click="projectInitiate(scope.row)"
                  >启用</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="editProject(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="deleteProject(scope.row)"
                  >删除</el-button
                >
              </span>
            </template>
          </el-table-column>

          <el-table-column label="是否挂起" align="center">
            <template slot-scope="scope">
              <el-switch
                @change="handleStatusChange(scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.isHeld"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          style="float: right; margin: 12px 0"
        >
        </el-pagination>
      </el-card>
    </div>
  </div>

  <!--  -->

  <!-- 组件 -->
</template>

<script>
export default {
  name: "NotStarted",
  data() {
    return {
      searchFormObj: {}, // 搜索表单
      showTableArray: [
        {
          projectName: "测试项目1",
          createTime: "2023-09-07",
          projectEstime:'2023-09-27',
          projectStart: "",
          statusTitle: "待启用",
        },
        {
          projectName: "测试项目2",
          createTime: "2023-09-07",
          projectEstime:'2023-09-27',
          projectStart: "",
          statusTitle: "待审核",
        },
      ],
      heldStatus: 0, // 0 是启用  1是禁用
      loading: false,
      // 分页
      pagination: {
        // 分页数据
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
    };
  },
  created() {},
  methods: {
    // 项目新增页面 - 路由跳转
    handleLinkToProjectAdd() {
      this.$router.push("/projectmgr/project-add");
    },

    // 将项目转为启动状态
    projectInitiate(val) {
      this.$confirm("是否启动项目?", "启动项目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            attacheId: val.attacheId,
            id: val.id,
          };
          postProjectStart(data).then((res) => {
            this.$message.success("启动成功");
            this.projectListUnm();
          });
        })
        .catch(() => {
          return;
        });
    },

    // 项目分配人员
    distribution(val) {
      this.$router.push({
        path: "/project-mgr/project-distr",
        query: {
          projectId: val.id,
          attacheId: val.attacheId.toString(),
          status: val.status,
          projectStatus: val.projectStatus,
        },
      });
    },

    // 编辑
    editProject(val) {
      this.$router.push({
        path: "/projectmgr/edit",
        query: val,
      });
    },

    // 获取展示表格数据
    projectListUnm() {
      this.loading = true;
      this.searchFormObj = {};
      let data = {
        status: 0,
        pageSize: 10,
        pageNum: 1,
        projectName: "",
      };
      postProjectListUnm(data).then((res) => {
        let array = res.data.records;
        array.forEach((item, index) => {
          if (item.projectStatus === 0) {
            item.statusTitle = "待启用";
          } else if (item.projectStatus === 1) {
            item.statusTitle = "待审核";
          } else if (item.projectStatus === 2) {
            item.statusTitle = "待分配";
          } else if (item.projectStatus === 3) {
            item.statusTitle = "已驳回";
          } else if (item.projectStatus === 4) {
            item.statusTitle = "挂起";
          }
          // unix 需要parseInt(item.createTime) *1000 linux
          item.createTime = this.timeToTime(item.createTime);
          item.projectEstime = this.timeToTime(item.projectEstime);
        });
        this.showTableArray = array;
        this.loading = false;
      });
    },
    // 删除
    deleteProject(item) {
      console.log(item);
      this.$confirm("是否删除项目?", "删除项目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            projectId: item.id,
          };
          postChildProjectDelete(data).then((res) => {
            if (res.code == 200) {
              this.$message.success("删除成功");
              this.projectListUnm();
            }
          });
        })
        .catch(() => {
          return;
        });
    },
    // 时间戳转化
    timeToTime(time) {
      let newTime = new Date(parseInt(time));
      let y = newTime.getFullYear();
      let m = newTime.getMonth() + 1;
      let d = newTime.getDate();
      let h = newTime.getHours();
      let mm = newTime.getMinutes();
      let s = newTime.getSeconds();
      return y + "." + m + "." + d + " " + h + ":" + mm + ":" + s;
    },
    // 挂起
    handleStatusChange(val) {
      let data = {
        heldStatus: val.isHeld,
        projectId: val.id,
      };
      projectHeld(data).then((res) => {
        this.$message.success("修改成功");
      });
    },
    // 条数改变
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.projectListUnm();
    },
    // 页码改变
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      this.projectListUnm();
    },
    // 查询事件
    handleQuery() {
      let data = {
        status: 0,
        projectName: this.searchFormObj.projectName,
        projectStatus: this.searchFormObj.projectStatus,
      };
      postProjectListUnm(data).then((res) => {
        let array = res.data.records;
        array.forEach((item, index) => {
          if (item.projectStatus === 0) {
            item.statusTitle = "待启用";
          } else if (item.projectStatus === 1) {
            item.statusTitle = "待审核";
          } else if (item.projectStatus === 2) {
            item.statusTitle = "待分配";
          } else if (item.projectStatus === 3) {
            item.statusTitle = "已驳回";
          } else if (item.projectStatus === 4) {
            item.statusTitle = "挂起";
          }
          // unix 需要parseInt(item.createTime) *1000 linux
          item.createTime = this.timeToTime(item.createTime);
          item.projectEstime = this.timeToTime(item.projectEstime);
        });
        this.showTableArray = array;
      });
    },
  },
};
</script>

<style scoped>
.box-card {
  margin-top: 1em;
}
</style>
