<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用例名称" prop="testTitle">
        <el-input
          v-model="queryParams.testTitle"
          placeholder="请输入用例名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属模块" prop="testModule">
        <el-input
          v-model="queryParams.testModule"
          placeholder="请输入所属模块"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     
      <el-form-item label="创建者" prop="creator">
        <el-input
          v-model="queryParams.creator"
          placeholder="请输入创建者"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="执行日期" prop="executionDate">
        <el-date-picker clearable
          v-model="queryParams.executionDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择执行日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['pas:case:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['pas:case:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['pas:case:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pas:case:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :data="caseList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="测试用例id" align="center" prop="testCaseId" />
      <el-table-column label="用例名称" align="center" prop="testTitle" />
      <el-table-column label="所属模块" align="center" prop="testModule" />
      <el-table-column label="优先级" align="center" prop="priority" />
      <el-table-column label="创建者" align="center" prop="creator" />
      <el-table-column label="执行日期" align="center" prop="executionDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.executionDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pas:case:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pas:case:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属模块" prop="testModule">
          <el-input v-model="form.testModule" placeholder="请输入所属模块" />
        </el-form-item>
        <el-form-item label="用例标题" prop="testTitle">
          <el-input v-model="form.testTitle" placeholder="请输入用例标题" />
        </el-form-item>
        <el-form-item label="优先级(1、2、3、4优先级依次降低)" prop="priority">
          <el-input v-model="form.priority" placeholder="请输入优先级(1、2、3、4优先级依次降低)" />
        </el-form-item>
        <el-form-item label="前置条件" prop="preconditions">
          <el-input v-model="form.preconditions" placeholder="请输入前置条件" />
        </el-form-item>
        <el-form-item label="测试输入" prop="testInput">
          <el-input v-model="form.testInput" placeholder="请输入测试输入" />
        </el-form-item>
        <el-form-item label="操作步骤" prop="steps">
          <el-input v-model="form.steps" placeholder="请输入操作步骤" />
        </el-form-item>
        <el-form-item label="预期结果" prop="expectedOutcome">
          <el-input v-model="form.expectedOutcome" placeholder="请输入预期结果" />
        </el-form-item>
        <el-form-item label="测试结果" prop="testResults">
          <el-input v-model="form.testResults" placeholder="请输入测试结果" />
        </el-form-item>
        <el-form-item label="创建者" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建者" />
        </el-form-item>
        <el-form-item label="执行者" prop="executor">
          <el-input v-model="form.executor" placeholder="请输入执行者" />
        </el-form-item>
        <el-form-item label="执行日期" prop="executionDate">
          <el-date-picker clearable
            v-model="form.executionDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择执行日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { listCase, getCase, delCase, addCase, updateCase } from "@/api/pas/case";

export default {
  name: "Case",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      caseList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        testModule: null,
        testTitle: null,
        priority: null,
        creator: null,
        executionDate: null,
        
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        testModule: [
          { required: true, message: "所属模块不能为空", trigger: "blur" }
        ],
        testTitle: [
          { required: true, message: "用例名称不能为空", trigger: "blur" }
        ],
        priority: [
          { required: true, message: "优先级不能为空", trigger: "blur" }
        ],
        creator: [
          { required: true, message: "创建者不能为空", trigger: "blur" }
        ],
        executionDate: [
          { required: true, message: "执行日期不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listCase(this.queryParams).then(response => {
        this.caseList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        testCaseId: null,
        testModule: null,
        testTitle: null,
        priority: null,
        creator: null,
        executionDate: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.testCaseId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const testCaseId = row.testCaseId || this.ids
      getCase(testCaseId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.testCaseId != null) {
            updateCase(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCase(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const testCaseIds = row.testCaseId || this.ids;
      this.$modal.confirm('是否确认删除【请填写功能名称】编号为"' + testCaseIds + '"的数据项？').then(function() {
        return delCase(testCaseIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('pas/case/export', {
        ...this.queryParams
      }, `case_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
