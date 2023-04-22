<template>
  <div>
    <div>
      <div>
        <h2>旅游</h2>
      </div>
      <div>
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#0076f5" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1">旅游线路</el-menu-item>
          <el-menu-item index="2">景点推荐</el-menu-item>
          <el-menu-item index="3">酒店住宿</el-menu-item>
          <el-menu-item index="4">美食推荐</el-menu-item>
        </el-menu>
      </div>
      <div style="display: flex;justify-content: center;margin-top:20px">
        <el-carousel :interval="5000" arrow="always" style="width:50%;height: 300px;" >
          <el-carousel-item v-for="item in imgs" :key="item.id">
            <img :src="item.image" alt="" style="width:100%; height: 300px;"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Front",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      imgs:[
        {
          id:1,
          image:require('../../../assets/lunbo1.jpg')
        },
        {
          id:2,
          image:require('../../../assets/lunbo2.jpg')
        },
        {
          id:3,
          image:require('../../../assets/lunbo3.jpg')
        },
      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>