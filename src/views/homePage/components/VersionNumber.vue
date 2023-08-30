 <template>
  <div class="edition">
    <div class="edition-title">版本数量 </div>
    <div class="edition-item">
      <div class="edition-itemone">
        <div class="titleone">
          <el-row>
            <el-col :span="8" :offset="8">
              <template>
                <div v-if="numberData.total!=null">
                  {{numberData.total}}
                </div>
                <div v-else>
                  0
                </div>
              </template>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="8" :offset="8">
            <div class="title">全部</div>
          </el-col>
        </el-row>
      </div>
      <div class="edition-itemtwo">
        <div class="edition-item24">
          <img src="@/assets/logo/icon13.png" class="image1" />
          <span class="title1">未规划</span>
          <template>
            <span v-if="numberData.notPlan!=null" class="title2">
              {{numberData.notPlan}}
            </span>
            <span class="title2" v-else>
              0
            </span>
          </template>
        </div>
        <div class="edition-item21">
          <img src="@/assets/logo/icon9.png" class="image1" />
          <span class="title1">未开始</span>
          <template>
            <span class="title2" v-if="numberData.notStart!=null">
              {{numberData.notStart}}
            </span>
            <span class="title2" v-else>
              0
            </span>
          </template>
        </div>
        <div class="edition-item22">
          <img src="@/assets/logo/icon11.png" class="image1" />
          <span class="title1">进行中</span>
          <template>
            <span class="title2" v-if="numberData.underway!=null">
              {{numberData.underway}}
            </span>
            <span class="title2" v-else>
              0
            </span>
          </template>
        </div>
        <div class="edition-item23">
          <img src="@/assets/logo/icon10.png" class="image1" />
          <span class="title1">已完成</span>
          <template>
            <span class="title2" v-if="numberData.complete!=null">
              {{numberData.complete}}
            </span>
            <span class="title2" v-else>
              0
            </span>
          </template>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
// import { getEdition } from '@/api/home'
export default {
  name: "VersionNumber",
  props: {
    numberData: {
      type: Object,
      default: () => { },
    },
  },

  data () {
    return {

    }
  },
  created () {
  },
  methods: {
  }

}
</script>
<style lang="scss" scoped>
.edition {
  width: 100%;
  display: flex;
  height: 240px;
  .edition-title {
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
  .edition-item {
    margin-top: 35px;
    height: 75%;
    width: 100%;
    display: flex;

    .edition-itemone {
      width: 50%;
      height: 100%;
      justify-content: center;
      align-items: center;
      // display: flex;
      text-align: center;
      .titleone {
        margin-top: 60px;
        margin-bottom: 10px;
        height: 20px;
        font-size: 36px;
        font-family: Source Han Sans CN, Source Han Sans CN-Medium;
        // font-weight: 550;
        color: rgba(0, 0, 0, 0.85);
        line-height: 20px;
      }
      .title {
        height: 20px;
        font-size: 14px;
        font-family: Source Han Sans CN, Source Han Sans CN-Medium;
        font-weight: 550;
        color: #959595;
        line-height: 20px;
      }
    }
    .edition-itemtwo {
      width: 50%;
      height: 100%;
      .edition-item21 {
        width: 100%;
        height: 25%;
        position: relative;
        .image1 {
          margin-left: 10px;
          float: left;
          align-items: center;
          margin-top: 10px;
        }
        .title1 {
          margin-top: 7px;
          margin-left: 10px;
          position: absolute;
        }
        .title2 {
          margin-top: 7px;
          margin-left: 150px;
          position: absolute;
          height: 20px;
          font-size: 24px;
          font-family: Source Han Sans CN, Source Han Sans CN-Medium;
          font-weight: 550;
          color: #57abfb;
          line-height: 20px;
        }
      }
      .edition-item22 {
        width: 100%;
        height: 25%;
        position: relative;
        .image1 {
          margin-left: 10px;
          float: left;
          align-items: center;
          margin-top: 10px;
        }
        .title1 {
          margin-top: 7px;
          margin-left: 10px;
          position: absolute;
        }
        .title2 {
          margin-top: 7px;
          margin-left: 150px;
          position: absolute;
          height: 20px;
          font-size: 24px;
          font-family: Source Han Sans CN, Source Han Sans CN-Medium;
          font-weight: 550;
          color: #f7cd6e;
          line-height: 20px;
        }
      }
      .edition-item23 {
        width: 100%;
        height: 25%;
        position: relative;
        .image1 {
          margin-left: 10px;
          float: left;
          align-items: center;
          margin-top: 10px;
        }
        .title1 {
          margin-top: 7px;
          margin-left: 10px;
          position: absolute;
        }
        .title2 {
          margin-top: 7px;
          margin-left: 150px;
          position: absolute;
          height: 20px;
          font-size: 24px;
          font-family: Source Han Sans CN, Source Han Sans CN-Medium;
          font-weight: 550;
          color: #90e0ac;
          line-height: 20px;
        }
      }
      .edition-item24 {
        width: 100%;
        height: 25%;
        position: relative;
        .image1 {
          margin-left: 10px;
          float: left;
          align-items: center;
          margin-top: 10px;
        }
        .title1 {
          margin-top: 7px;
          margin-left: 10px;
          position: absolute;
        }
        .title2 {
          margin-top: 7px;
          margin-left: 150px;
          position: absolute;
          height: 20px;
          font-size: 24px;
          font-family: Source Han Sans CN, Source Han Sans CN-Medium;
          font-weight: 550;
          color: #cdcdcd;
          line-height: 20px;
        }
      }
    }
  }
}
</style>