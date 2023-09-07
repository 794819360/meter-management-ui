<template>
  <!-- 新增项目 -->
  <div class="app-container">
    <!-- 项目名称 -->
    <el-form
      :inline="true"
      :model="projectFormAddObj"
      class="demo-form-inline"
    >
    <el-card class="box-card">
        <!-- top -->
        <div>
          <el-form-item label="项目名称:">
            <el-input
              v-model="projectFormAddObj.projectName"
              placeholder="请输入项目名称"
            />
          </el-form-item>
          <el-form-item label="项目发起时间:">
            <el-date-picker
              v-model="projectFormAddObj.createTime"
              type="datetime"
              placeholder="选择日期时间"
            />
          </el-form-item>
          <el-form-item label="项目交付时间:">
            <el-date-picker
              v-model="projectFormAddObj.projectEstime"
              type="datetime"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </div>
    </el-card>

    <!-- 项目材料 -->
    <el-card class="box-card">
      <el-form-item label="项目说明：" :label-position="top">
        <el-upload class="upload-demo" drag  multiple :action="uploadImgUrl" :headers="headers"  :on-success="onsuccess">
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
    </el-card>

    <!-- 项目说明 -->
    <el-card class="box-card">
      <el-form :model="projectFormAddObj">
        <el-form-item label="项目说明：" label-position="top">
          <!-- <el-input
            v-model="projectFormAddObj.projectDescription"
            type="textarea"
            autosize
            placeholder="请输入内容"
          /> -->
          <div style="">
            <editor v-model="projectFormAddObj.projectDescription" :min-height="192"/>
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 人力成本 -->
    <el-card class="box-card">
      <span>人力成本数据：</span>
      <div class="tableDate">
        <div class="button" style="width: 3%; float: right">
          <p>
            <el-button
              class="el-icon-plus"
              @click.prevent="addRow()"
            ></el-button>
          </p>
        </div>
        <div class="table">
          <el-table
            :data="humanCost"
            ref="table"
            tooltip-effect="dark"
            border
            stripe
            style="width: 95%"
          >
            <el-table-column label="岗位" align="center">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.postName"
                  @focus="getPostList"
                  @change="disabledChange(scope.row.postName)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in postOptions"
                    :key="item.postName"
                    :label="item.postName"
                    :value="item.postName"
                    :disabled="item.disabled"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="人数" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.number"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="天数" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.days"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <p>
                  <el-button
                    class="el-icon-minus"
                    type="danger"
                    @click.prevent="delData(scope)"
                  ></el-button>
                </p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>

    <!-- 发送财务专员 -->
    <el-card class='box-card'>
      <span>发送负责人：</span>
      <el-select v-model="attacheId" placeholder="请选择" @focus="getRoleList">
        <el-option
          v-for="item in laborCostOptionsList"
          :key="item.id"
          :label="item.nickName"
          :value="item.id"
        />
      </el-select>
    </el-card>
  </el-form>

    <!-- 底部操作 -->
    <el-card class='box-card'>
      <div class="btnLocation">
        <el-button type="info" plain @click="()=>{this.$router.go(-1)}">取消</el-button>
        <el-button type="success" plain @click="handleAdd">添加</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// import { getPost, getRoleUser, postProjectInsert, postLaborDataSave, postMinioUpload } from '@/api/projectmgr/index.js'
// import { getToken } from "@/utils/auth";

export default {
  name: 'ProjectAdd',
  data() {
    return {
      projectFormAddObj: {}, // 项目增加表单
      humanCost: [
        {
          postName: '项目经理',
          number: '1',
          days: '30'
        }
      ], // 人力成本数据list
      attacheId: '',
      fileUrl: '',
      
      postOptions: [], // 岗位列表
      laborCostOptionsList: [],  // 财务成员列表
      uploadImgUrl: '',
      // headers: {
      //   Authorization: "Bearer " + getToken(),
      // },
    }
  },
  methods: {
    addRow() {
      let list = {
        postName: '',
        number: '',
        days: ''
      }
      this.humanCost.push(list)
    },
    delData(val) {
      let index = val.$index
      this.humanCost.splice(index, 1)
    },

    // 获取岗位
    getPostList() {
      if (this.postOptions.length === 0) {
        getPost()
          .then((res) => {
            console.log(res)
            this.postOptions = res.data
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        return
      }
    },
    
    disabledChange(val) {
      this.postOptions.forEach((item, index) => {
        if (item.postName === val) {
          this.postOptions[index].disabled = true
        }
      })
    },

    // 添加
    handleAdd() {
      this.projectFormAddObj.attacheId = this.attacheId
      this.projectFormAddObj.projectUrl = this.fileUrl
      this.projectFormAddObj.parentId = 0   
      console.log('新增岗位', this.projectFormAddObj);
      // 增加岗位
      // postProjectInsert(this.projectFormAddObj).then(res => {
      //   let id = res.data.id
      //   this.humanCost.forEach(item => {
      //       item.projectId = id
      //    })
      //     postLaborDataSave(this.humanCost).then(res => {
      //       if(res.code === 200) {
      //         this.$message.success('新增成功')
      //         this.$router.push('/project-mgr/list')
      //       }
      //     }).catch(err => {console.log(err);})

      // })
    },

    // 获取人员列表
    getRoleList() {
      let num = 5
      getRoleUser(num).then(res => {
        this.laborCostOptionsList = res.data
      })
    },

    onsuccess(res) {
        console.log(res);
        this.fileUrl = res.data.url
        this.$message.success("文件上传成功")
    },

  }
}
</script>

<style scoped>
.box-card {
  margin-top: 1em;
}

.btnLocation {
  margin: 0 auto;
  text-align: center;
}
</style>