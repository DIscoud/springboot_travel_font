<template>
  <div>
    <el-row class="row" :gutter="30">
      <el-col :span="6" v-for="(o, index) in tableData" :key="o">
        <el-card style="padding:5px; margin: 15px;">
          <!-- <el-card :body-style="{ padding: '10px' }"> -->
          <el-image :src="getImage(o.foodImg)" :preview-src-list="[getImage(o.foodImg)]" class="image travelImage"/>
          <div style="padding: 14px;">
            <span>{{o.foodName}}</span>
            <div class="bottom clearfix">
              <span class="time">人均{{ o.foodPrice }}</span>
              <br><br>
              <el-tag type="success">{{ o.snicName }}</el-tag>
              <el-tag type="primary">{{ o.foodCategory }}</el-tag>
              <el-tag :type="o.foodHot == 1 ? 'danger' : 'primary'" disable-transitions>{{
                o.foodHot == 1 ? '热门' : '正常' }}</el-tag>
              <!-- <el-button type="text" class="button">查看详情</el-button> -->
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

  <script>
    export default {
        name:'FrontFood',
        data(){
            return{
              pageNum:1, //页码
              pageSize:8, //数量
              tableData:[],
              total:0,  //总数
              scenics:[], //附近景点数组（从后端接口取）
              categorys:[],//美食分类数组（从后端接口取）
              imageUrl:'',//照片回显路径
            }
        },
        methods: {
          post(){
              this.$axios.post(this.$httpUrl+'/food/pageHot',{
                  pageSize:this.pageSize,
                  pageNum:this.pageNum,
                  param:{
                  }
              }).then(res=>{
                  if(res.data.code == 200){
                      console.log(res)
                      this.tableData = res.data.data
                      this.total = res.data.total
                      // 关闭加载框
                      // this.loading = false
                  }else {
                      this.$message({
                          type:'error',
                          message:'数据加载失败'
                      });
                  }
              }).catch(()=>{
                  this.$message({
                      type:'error',
                      message:'数据加载失败'
                  });
              })
          },
          //get请求所有的景点信息
          foodGet(){
              this.$axios.get(this.$httpUrl+'/food/getAll').then(res=>{
                  this.scenics = res.data.data
                  console.log(res.data.data)
              })
          },
          //get请求所有的美食分类信息
          categorysget(){
              this.$axios.get(this.$httpUrl+'/foodCategory/getAll').then(res=>{
                  this.categorys = res.data.data
                  console.log(res.data.data)
              })
          },
          //获取图片
          getImage (image) {
              return `http://localhost:7948/common/download?name=${image}`
          },
        },
        beforeMount(){
          this.post();
          this.scenicsGet();
          this.categorysget();
        }

  }
  </script>

<style scoped>
.travelImage{
  width: 200px;
  height: 200px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

</style>
