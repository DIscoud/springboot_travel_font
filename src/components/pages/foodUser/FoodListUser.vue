<template>
  <div>
    <el-card class="box-card" style="width:1600px;margin:20px auto ">
      <div style="margin-left: 5px;margin-bottom:5px">
        <el-form :inline="true" class="demo-form-inline" ref="ruleForm">
          <el-form-item label="美食名称">
            <el-input v-model="foodName" placeholder="请输入" style="width:200px;" prefix-icon="el-icon-search" clearable
              @keyup.enter.native="post"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="foodCategory" placeholder="请选择" filterable>
              <el-option v-for="category in categorys" :key="category.categoryId" :label="category.categoryName"
                :value="category.categoryName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="附近景点">
            <el-select v-model="snicName" placeholder="请选择" filterable>
              <el-option v-for="scenic in scenics" :key="scenic.snicId" :label="scenic.snicName" :value="scenic.snicName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-search" style="margin-left:5px"
              @click="post()">查询</el-button>
            <el-button type="success" size="small" icon="el-icon-refresh" native-type="reset"
              @click="resetRuleForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
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
        <el-table-column prop="foodPrice" label="人均价格" width="180" align="center">
        </el-table-column>
        <el-table-column prop="snicName" label="附近景点" width="180" align="center">
        </el-table-column>
        <el-table-column prop="foodCategory" label="美食分类" width="180" align="center">
        </el-table-column>
        <el-table-column prop="foodHot" label="是否热门" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.foodHot == 1 ? 'danger' : 'primary'" disable-transitions>{{
              scope.row.foodHot == 1 ? '热门' : '正常' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="rutTime" label="创建时间" width="180" align="center">
        </el-table-column>
        <el-table-column prop="operate" label="管理" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-tickets" @click="detail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
        :page-sizes="[5, 10, 20, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total" style="align:right">
      </el-pagination>
      <el-dialog :title="title" :visible.sync="centerDialogVisible" width="35%"  >
        <el-form ref="form" :model="form" label-width="80px" :disabled="true">
          <el-form-item label="美食名称" prop="foodName" >
            <el-col :span="10">
              <el-input v-model="form.foodName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="人均价格" prop="foodPrice">
            <el-col :span="10">
              <el-input v-model="form.foodPrice"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="美食照片">
            <!-- <div class="addBrand-container" id="food-add-app" >
                            <div class="container"> -->
            <el-upload class="avatar-uploader" action="http://localhost:7948/common/upload" :show-file-list="false"
              :on-success="handleAvatarSuccess" :before-upload="beforeUpload" ref="upload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="form.foodCategory" placeholder="请选择" filterable>
              <el-option v-for="category in categorys" :key="category.categoryId" :label="category.categoryName"
                :value="category.categoryName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="附近景点">
            <el-select v-model="form.snicName" placeholder="请选择" filterable>
              <el-option v-for="scenic in scenics" :key="scenic.snicId" :label="scenic.snicName"
                :value="scenic.snicName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否热门">
            <el-radio-group v-model="form.foodHot">
              <el-radio label="2">正常</el-radio>
              <el-radio label="1">热门</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="美食简介" prop="foodRemark">
            <el-col :span="20">
              <el-input v-model="form.foodRemark" type="textarea"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save" v-if="sure">确 定</el-button>
        </span>
      </el-dialog>
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
            foodName:'', //美食名称
            snicName:'', //附近景点
            foodCategory:'', //美食分类
            scenics:[], //附近景点数组（从后端接口取）
            categorys:[],//美食分类数组（从后端接口取）
            title:'',//新增或者修改弹框标题
            centerDialogVisible:false, //新增或者修改弹框
            imageUrl:'',//照片回显路径
            form:{
                foodId:'',
                foodName:'',
                foodImg:'',
                foodCategory:'',
                snicName:'',
                foodPrice:'',
                foodRemark:'',
                foodHot:2,
            },
            sure:true, //控制新增、修改、详情弹窗的确定按钮是否隐藏（查看详情则隐藏）
          }
      },
      methods: {
        disabledFn() {
              return this.source == 3;
            },
        post(){
            this.$axios.post(this.$httpUrl+'/food/page',{
                pageSize:this.pageSize,
                pageNum:this.pageNum,
                param:{
                    foodName:this.foodName,
                    snicName:this.snicName,
                    foodCategory:this.foodCategory
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
            return `http://localhost:7948/common/download?name=${image}`
        },
        //获取头像
        getImage (image) {
            return `http://localhost:7948/common/download?name=${image}`
        },
        //图片上传
        handleAvatarSuccess (response, file, fileList) {
            this.imageUrl = `http://localhost:7948/common/download?name=${response.data}`
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
        //根据id删除美食信息
        del(id){
            this.$confirm('此操作将永久删除id为【'+id+'】的美食信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$axios.get(this.$httpUrl + '/food/del?foodId='+id).then((res)=>{
                if(res.data.code == 200){
                    this.$message.success('删除成功!')
                    this.post()
                }else{
                    this.$message.error('删除失败!')
                }
            })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //新增按钮
        add(){
            this.centerDialogVisible = true
            this.title = "新增美食信息"
            //重置表单
            this.$nextTick(()=>{
                this.resetForm();
                this.form.foodId = '';
                this.form.foodName = '';
                this.form.foodImg = '';
                this.imageUrl = '';
                this.form.foodCategory = '';
                this.form.snicName = '';
                this.form.foodPrice = '';
                this.form.foodRemark = '';
                this.form.foodHot = '2';
                this.sure = true;
            })
        },
        //修改按钮
        mod(row){
                //表单弹框
                this.centerDialogVisible = true
                this.title = "美食信息详情"
                this.$nextTick(()=>{
                //表单赋值
                this.resetForm();
                this.form.foodId = row.foodId;
                this.form.foodName = row.foodName;
                this.form.foodImg = row.foodImg;
                this.form.foodCategory = row.foodCategory;
                this.form.snicName = row.snicName;
                this.form.foodPrice = row.foodPrice;
                this.form.foodRemark = row.foodRemark;
                this.form.snicRemark = row.snicRemark;
                this.form.foodHot = row.foodHot + '';
                this.imageUrl = this.getImage(row.foodImg);
                this.sure = true;
            })
        },
        //查看详情按钮
        detail(row){
                //表单弹框
                this.centerDialogVisible = true
                this.title = "美食信息详情"
                this.$nextTick(()=>{
                //表单赋值
                this.resetForm();
                this.form.foodId = row.foodId;
                this.form.foodName = row.foodName;
                this.form.foodImg = row.foodImg;
                this.form.foodCategory = row.foodCategory;
                this.form.snicName = row.snicName;
                this.form.foodPrice = row.foodPrice;
                this.form.foodRemark = row.foodRemark;
                this.form.snicRemark = row.snicRemark;
                this.form.foodHot = row.foodHot + '';
                this.imageUrl = this.getImage(row.foodImg);
                this.sure = false;
            })
        },
        // 更新
        save(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //id存在则更新，否则新增
                    if(this.form.foodId){
                        this.doMod();
                    }else{
                        this.doSave();
                    }

                } else {
                    return false;
                }
            });

        },
        doSave(){
            this.$axios.post(this.$httpUrl + '/food/save',this.form).then((res)=>{
                if(res.data.code == 200){
                    this.$message.success('操作成功！')
                    this.centerDialogVisible = false
                    this.post()
                }else{
                    this.$message.error('操作失败')
                }
            })
        },
        //修改
        doMod(){
            this.$axios.post(this.$httpUrl + '/food/update',this.form).then((res)=>{
                if(res.data.code == 200){
                    this.$message.success('操作成功！')
                    this.centerDialogVisible = false
                    this.post()
                }else{
                    this.$message.error('操作失败')
                }
            })

        },
        // 重置表单
        resetForm() {
          this.$refs.form.resetFields();
        },
        //重置查询的参数
        resetRuleForm(formName) {
            this.$nextTick(()=>{
                this.$refs[formName].resetFields();
                this.foodName = ''
                this.foodCategory = ''
                this.snicName = ''
                this.post();
            })
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
