<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="projectFormAddObj"
        class="demo-form-inline"
      >
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
      </el-form>
    </el-card>

    <el-card class="box-card">
      <span>项目材料：</span>
      <el-upload
        class="upload-demo"
        drag
        multiple
        :action="uploadImgUrl"
        :headers="headers"
        :on-success="onsuccess"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，修改项目材料,
          <span style="font-size: 12px" v-if="isEnable != 'yes'"
            ><i>* 如不上传则默认此前项目材料,*</i></span
          >
         或<em>点击上传</em>
        </div>
      </el-upload>
    </el-card>

    <el-card class="box-card">
      <span>项目说明：</span>
      <el-input
        v-model="projectFormAddObj.projectDescription"
        type="textarea"
        autosize
        placeholder="请输入内容"
      />
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

    <el-card class="box-card">
      <span >原发送负责人：{{ attacheName }}</span>
      <p>
        选择发送负责人
        <span  style="font-size: 12px"
          ><i>*如不选择,则默认原发送负责人*</i></span
        >
      </p>
      <el-select v-model="attacheId" placeholder="请选择" @focus="getRoleList">
        <el-option
          v-for="item in laborCostOptionsList"
          :key="item.id"
          :label="item.nickName"
          :value="item.id"
        />
      </el-select>
    </el-card>

    <el-card class="box-card">
      <div class="btnLocation">
        <el-button type="success" plain @click="handleUpdate">修改</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'ProjectEdit',
  data() {
    return {
      projectFormAddObj: {},
      humanCost: [],
      attacheId: '',
      postOptions: [],
      laborCostOptionsList: [], // 成员列表
      uploadImgUrl: 'http://192.168.96.34:8080/minio/upload',
      headers: {
        Authorization: 'Bearer '
        // Authorization: 'Bearer ' + getToken()
      },
      fileUrl: '',
      attacheName: '',

      attacheId: '',

      // projectId: this.$route.query.projectId, // 人力成本数据 和 项目详情
      // oldAttacheId: this.$route.query.attacheId , // 负责人名称
      // status: this.$route.query.status, // 项目状态  未进行 |  进行中
      isEnable: this.$route.query.isEnable ? this.$route.query.isEnable : 'no',


      isUpdateFileUrl: 0
    }
  },
  created() {
    // this.postLaborDataList()
    // this.getUserNameData()
    // this.postProjectListPro()
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
    getPostList() {
      getPost()
        .then((res) => {
          console.log(res)
          this.postOptions = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    disabledChange(val) {
      this.postOptions.forEach((item, index) => {
        if (item.postName === val) {
          this.postOptions[index].disabled = true
        }
      })
    },
    // 获取人员列表
    getRoleList() {
      let num = 5
      getRoleUser(num).then((res) => {
        this.laborCostOptionsList = res.data
      })
    },
    onsuccess(res) {
      console.log(res)
      this.fileUrl = res.data.url
      this.$message.success('文件上传成功')
      this.isUpdateFileUrl = 1
    },

    // 获取财务名字
    getUserNameData() {
        getUserName(this.oldAttacheId).then((res) => {
        this.attacheName = res.data.nickName
      })
    },

    // 获取成本表格数据
    postLaborDataList() {
      let data = {
        projectId: this.projectId
      }
      laborDataList(data).then((res) => {
        console.log(res);
        this.humanCost = res.data
      })
    },

    postProjectListPro() {
      let data = {
        id: this.projectId,
        status: this.status
      }
      projectListPro(data).then((res) => {
        this.projectFormAddObj = res.data
      })
    },

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

    handleUpdate() {
      //  审核不通过修改 
      if ((this.isEnable = 'no')) {
         // url被修改
        if (this.isUpdateFileUrl === 1) {
          this.projectFormAddObj.projectUrl = this.fileUrl
        }

        // 负责人被修改
        if (this.attacheId != '') {
          this.projectFormAddObj.attacheId = this.attacheId
        }
        // 状态改为 1
        this.projectFormAddObj.projectStatus = 1
      }  else  {   // 待启用时修改
        // url被修改
        if (this.isUpdateFileUrl === 1) {
          this.projectFormAddObj.projectUrl = this.fileUrl
        }

        // 负责人被修改
        if (this.attacheId != '') {
          this.projectFormAddObj.attacheId = this.attacheId
        }
      }
      
      this.projectFormAddObj.projectStatus = 0

      projectUnderUpdate(this.projectFormAddObj).then(res => {
        let id = res.data.id
        this.humanCost.forEach(item => {
            item.projectId = id
         })
         this.$router.push('/project-mgr/list')
        //  postLaborDataSave(this.humanCost).then(res => {
        //       this.$message.success('修改成功')
        //       this.$router.push('/project-mgr/list')
        //   }).catch(err => {console.log(err);})
      }) 

    }
  }
}
</script>

<style>
.box-card {
  margin-top: 1em;
}

.btnLocation {
  margin: 0 auto;
  text-align: center;
}
</style>