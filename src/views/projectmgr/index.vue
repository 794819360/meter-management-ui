<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <!-- 未开始 -->
      <el-tab-pane label="未开始" name="not-started" v-if="rolePlayWho !='HR'">
        <not-started />
      </el-tab-pane>

      <!-- 进行中 -->
      <el-tab-pane label="进行中" name="started">
        <project-started />
      </el-tab-pane>

      <!-- 已取消 -->
      <!-- <el-tab-pane label="已取消" name="been-cancelled"></el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import NotStarted from '@/views/projectmgr/pagetabcomp/NotStarted.vue'
import ProjectStarted from '@/views/projectmgr/pagetabcomp/ProjectStarted.vue'

export default {
  components: {
    NotStarted,
    ProjectStarted
  },
  data() {
    return {
      activeName: 'not-started',
      rolePlayWho: ''
    }
  },
  created() {
    this.rolePlayWho = this.$store.state.user.roles[0]
    this.goRoute()
  },
  // watch: {
  //   $route(n) {
  //     this.activeName = n.query.activeNameNow
  //   }
  // },
  methods: {
    goRoute() {
      if (this.$route.query.activeNameNow) {
        this.activeName = this.$route.query.activeNameNow
      }
      if (this.rolePlayWho === 'HR') {
        this.activeName = 'started'
      }
    }
  }
}
</script>

<style>
</style>