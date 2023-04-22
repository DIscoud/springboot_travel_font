<template>
    <div>
      <el-card class="box-card" style="width:1600px;margin:20px auto ">
        <el-table :data="tableData" :header-cell-style="{ background: 'rgb(232,244,255)', color: '#555' }" border>
          <el-table-column prop="foodId" label="美食编号" width="100" align="center">
          </el-table-column>
          <el-table-column prop="foodName" label="美食名称" width="180" align="center">
          </el-table-column>
          <el-table-column label="美食照片" width="180" align="center">
            <template slot-scope="scope">
              <el-image :src="getImage(scope.row.foodImg)" :preview-src-list="[getImage(scope.row.foodImg)]"
                style="height: 50px" />
            </template>
          </el-table-column>
          <el-table-column prop="foodPrice" label="人均价格" width="120" align="center">
          </el-table-column>
          <el-table-column prop="snicName" label="附近景点" width="120" align="center">
          </el-table-column>
          <el-table-column prop="foodCategory" label="美食分类" width="120" align="center">
          </el-table-column>
          <el-table-column prop="foodHot" label="是否热门" width="120" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.foodHot == 1 ? 'danger' : 'primary'" disable-transitions>{{
                scope.row.foodHot == 1 ? '热门' : '正常' }}</el-tag>
            </template>
          </el-table-column>  
          <el-table-column prop="rutTime" label="创建时间" width="180" align="center">
          </el-table-column>  
          <el-table-column prop="foodRemark" label="美食简介" align="center">
          </el-table-column>        
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
          :page-sizes="[5, 10, 20, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="total" style="align:right">
        </el-pagination>        
      </el-card>
    </div>
  </template>
    
  <script>
    export default {
        name:'foodList',
        data(){
            return{
              pageNum:1, //页码
              pageSize:5, //数量
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
          scenicsGet(){
              this.$axios.get(this.$httpUrl+'/scenic/getAll').then(res=>{
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
          // 分页
          handleSizeChange(val) {
              console.log(`每页 ${val} 条`);
              this.pageNum = 1;
              this.pageSize = val;
              this.post();
          },
          //分页
          handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
              this.pageNum = val;
              this.post();
          },
          //获取图片
          getImage (image) {
              return `http://localhost:8081/common/download?name=${image}`
          },
          //获取头像
          getImage (image) {
              return `http://localhost:8081/common/download?name=${image}`
          },
          //图片上传
          handleAvatarSuccess (response, file, fileList) {
              this.imageUrl = `http://localhost:8081/common/download?name=${response.data}`
              this.form.rutImg = response.data
          },
          //图片上传之前验证文件格式
          beforeUpload (file) {
              if(file){
                  const suffix = file.name.split('.')[1]
                  const size = file.size / 1024 / 1024 < 2
                  if(['png','jpeg','jpg'].indexOf(suffix) < 0){
                  this.$message.error('上传图片只支持 png、jpeg、jpg 格式！')
                  this.$refs.upload.clearFiles()
                  return false
                  }
                  if(!size){
                  this.$message.error('上传文件大小不能超过 2MB!')
                  return false
                  }
                  return file
              }
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
  .avatar-uploader {
    width: 100px;
    height: 100px;
  }
  
  .avatar-uploader img {
    width: 100px;
    height: 100px;
  }
  </style>