<template>
  <div class="app-container">
    <!-- <el-tabs v-model="activeName">
      <el-tab-pane label="未开始" name="not-started">
        <not-started />
      </el-tab-pane>

      <el-tab-pane label="进行中" name="started">
        <project-started />
      </el-tab-pane>
    </el-tabs> -->
    <not-started />
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
    // this.rolePlayWho = this.$store.state.user.roles[0]
    // this.goRoute()
  },

  methods: {

  }
}
</script>

<style>
</style>