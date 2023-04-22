<template>
  <div>
    <el-row class="row" :gutter="30">
      <el-col :span="6" v-for="(o, index) in tableData" :key="o">
        <el-card style="padding:5px; margin: 10px;">
          <el-image :src="getImage(o.snicImg)" :preview-src-list="[getImage(o.snicImg)]" class="image travelImage"/>
          <div style="padding: 14px;">
            <span>{{o.snicName}}</span>
            <div class="bottom clearfix">
              <span class="time">{{o.snicAddress}}</span>
              <br><br>
              <el-tag type="danger">{{ o.snicRank }}</el-tag>
              <el-tag type="success">{{ o.snicProvince }}</el-tag>
              <el-tag type="primary">{{ o.snicPrice }}</el-tag>
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
      name:'FrontScenic',
      data(){
          return{
            pageNum:1, //页码
            pageSize:100, //数量
            tableData:[],
            total:0,   //总数
            imageUrl:'',//照片回显路径
          }
      },
      methods:{
        post(){
              this.$axios.post(this.$httpUrl+'/scenic/pageHot',{
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
          //获取照片
          getImage (image) {
              return `http://localhost:7948/common/download?name=${image}`
          },
      },
      beforeMount(){
        this.post();
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
