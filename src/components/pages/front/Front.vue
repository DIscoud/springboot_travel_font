<template>
  <div>
    <div>
      <div>
        <h2>旅游</h2>
      </div>
      <div>
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#0076f5" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="frontTravel" >旅游线路</el-menu-item>
          <el-menu-item index="frontScenic">景点推荐</el-menu-item>
          <el-menu-item index="frontHotel">酒店住宿</el-menu-item>
          <el-menu-item index="frontFood">美食推荐</el-menu-item>
        </el-menu>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Front",
  data() {
    return {
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      console.log(this.$route.path);
      if (this.$route.path !== "/"+key) {
        this.$router.push("/"+key);
      }
    },
  },
};
</script>
<style scoped>
</style>