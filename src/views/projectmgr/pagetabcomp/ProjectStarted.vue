<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="searchFormObj">
        <el-form-item label="项目名称">
          <el-input
            v-model="searchFormObj.projectName"
            placeholder="请输入项目名称"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleQuery"  icon="el-icon-search">查询</el-button> 
          <el-button type="info" @click="postProjectUnderwayList('isReset')" icon="el-icon-refresh" 
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div>
        <el-card class="box-card">
          <el-table :data="showTableArray" border style="width: 100%">
            <el-table-column type="index" label="序号" />
            <el-table-column prop="projectName" label="项目名称" />

            <el-table-column label="子项目名称">
              <template slot-scope="scope">
                <span v-for="(item, index) in scope.row.resqList" :key="index">
                  <span v-if="scope.row.resqList.length > 0">
                    <p
                      style="
                        text-align: center;
                        border-bottom: 1px solid #ebeef5;
                      "
                    >
                      {{ item.projectName }}
                    </p>
                  </span>
                  <span v-else>
                    <div style="text-align: center">
                      {{ scope.row.projectName }}
                    </div>
                  </span>
                </span>
              </template>
            </el-table-column>

            <el-table-column label="技术经理">
              <template slot-scope="scope">
                <span v-if="scope.row.resqList.length > 1">
                  <span>{{ scope.row.resqList[0].technicalManagerName }}</span>
                </span>
              </template>
            </el-table-column>

            <el-table-column label="项目发起日期">
              <template slot-scope="scope">
                <span v-for="(item, index) in scope.row.resqList" :key="index">
                  <span v-if="scope.row.resqList.length > 1">
                    <p
                      style="
                        text-align: center;
                        border-bottom: 1px solid #ebeef5;
                      "
                    >
                      {{ item.createTime }}
                    </p>
                  </span>
                  <span v-else>
                    <div style="text-align: center">
                      {{ scope.row.createTime }}
                    </div>
                  </span>
                </span>
              </template>
            </el-table-column>

            <el-table-column label="项目启用日期">
              <template slot-scope="scope">
                <span v-for="(item, index) in scope.row.resqList" :key="index">
                  <span v-if="scope.row.resqList.length > 1">
                    <p
                      style="
                        text-align: center;
                        border-bottom: 1px solid #ebeef5;
                      "
                    >
                      {{ item.createTime }}
                    </p>
                  </span>
                  <span v-else>
                    <div style="text-align: center">
                      {{ scope.row.projectStart }}
                    </div>
                  </span>
                </span>
              </template>
            </el-table-column>

            <el-table-column label="项目启用日期">
              <template slot-scope="scope">
                <span v-for="(item, index) in scope.row.resqList" :key="index">
                  <span v-if="scope.row.resqList.length > 1">
                    <p
                      style="
                        text-align: center;
                        border-bottom: 1px solid #ebeef5;
                      "
                    >
                      {{ item.projectEstime }}
                    </p>
                  </span>
                  <span v-else>
                    <div style="text-align: center">
                      {{ scope.row.projectEstime }}
                    </div>
                  </span>
                </span>
              </template>
            </el-table-column>

            <el-table-column label="项目进度">
              <template slot-scope="scope">
                <span v-for="(item, index) in scope.row.resqList" :key="index">
                  <span v-if="scope.row.resqList.length > 1">
                    <p
                      style="
                        text-align: center;
                        border-bottom: 1px solid #ebeef5;
                      "
                    >
                      {{ item.projectProgress }}
                    </p>
                  </span>
                  <span v-else>
                    <div style="text-align: center">
                      {{ scope.row.projectProgress }}
                    </div>
                  </span>
                </span>
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <span
                  v-if="
                    rolePlayWho != 'Attache' &&
                    rolePlayWho != 'HR' &&
                    scope.row.status === 1
                  "
                >
                  <el-button
                    type="text"
                    size="small"
                    @click="projectShow(scope.row)"
                    >查看</el-button
                  >
                </span>

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
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ProjectStarted",
  data() {
    return {
      searchFormObj: {},
      showTableArray: [],
      rolePlayWho: "",
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
    // 查看项目
    projectShow(val) {
      this.$router.push({
        path: "/project-mgr/project-show",
        query: {
          projectId: val.id,
          attacheId: val.attacheId,
          status: val.status,
        },
      });
    },
    // 重置
    postProjectUnderwayList(datas) {
      if (datas === "isReset") {
        this.searchFormObj = {};
        datas = {};
      }
      let data = datas || {};
      projectUnderwayList(data).then((res) => {
        let data = res.data;
        data.forEach((item) => {
          if (item.resqList.length > 0) {
            item.isChild = true;
          }
          item.createTime = this.timeToTime(item.createTime);
          item.projectEstime = this.timeToTime(item.projectEstime);
          item.projectStart = this.timeToTime(item.projectStart);
          item.resqList.forEach((itemChild) => {
            itemChild.createTime = this.timeToTime(itemChild.createTime);
            itemChild.projectEstime = this.timeToTime(itemChild.projectEstime);
          });
        });
        this.showTableArray = data;
      });
    },
    // 时间格式化
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
    // 查询
    handleQuery() {
      let data = {
        name: this.searchFormObj.projectName,
      };
      this.postProjectUnderwayList(data);
    },
  },
};
</script>

<style>
.box-card {
  margin-top: 1em;
}
</style>
