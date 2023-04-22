<template>
  <div id="context">
    <h1>百度地图</h1>
    <input type="text" v-model.lazy="keyword" />
    <div id="map" ref="map"></div>
  </div>

</template>

<script>
  export default {
    name: 'TrafficList',

    data() {
      return {
        map: null,
        point: null,
        marker: null,
        keyword: "",
        local: null,

      }
    },
    mounted() {
      this.map = new window.BMapGL.Map(this.$refs.map);
      this.point = new window.BMapGL.Point(113.665, 34.784);
      this.map.centerAndZoom(this.point, 15);
      this.map.enableScrollWheelZoom(true);
      //添加一个点
      this.marker = new window.BMapGL.Marker(this.point); // 创建标注
      this.map.addOverlay(this.marker); // 将标注添加到地图中
      this.local = new window.BMapGL.LocalSearch(this.map, {
        renderOptions: {
          map: this.map
        },
      });
    },
    watch: {
      keyword: {
        handler() {
          if (this.keyword === "") {
            this.local.clearResults();
            this.map.centerAndZoom(this.point, 15);
          } else {
            this.local.search(this.keyword);
          }
        },
      },
    },
  }
</script>

<style>
  #app {
    height: 90vh;
    width: 100%;
  }
</style>
