<template>
  <div>
    <el-card class="box-card" style="width:1600px;margin:20px auto ">
      <div style="margin-left: 5px;margin-bottom:5px">
        <el-form :inline="true" class="demo-form-inline" ref="ruleForm">
          <el-form-item label="">
            <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" style="margin-left:5px"
              @click="add">添加景点信息</el-button>
          </el-form-item>
          <el-form-item label="景点名称">
            <el-input v-model="snicName" placeholder="请输入" style="width:200px;" prefix-icon="el-icon-search" clearable
              @keyup.enter.native="post"></el-input>
          </el-form-item>
          <el-form-item label="所属省份">
            <el-select v-model="snicProvince" placeholder="请选择" filterable>
              <el-option v-for="province in provinces" :key="province.provinceId" :label="province.provinceName"
                :value="province.provinceName">
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
        <el-table-column prop="snicId" label="编号" width="50" align="center">
        </el-table-column>
        <el-table-column prop="snicName" label="景点名称" width="150" align="center">
        </el-table-column>
        <el-table-column label="景点图片" width="160" align="center">
          <template slot-scope="scope">
            <el-image :src="getImage(scope.row.snicImg)" :preview-src-list="[getImage(scope.row.snicImg)]"
              style="height: 50px" />
          </template>
        </el-table-column>
        <el-table-column prop="snicRank" label="景点等级" width="150" align="center">
        </el-table-column>
        <el-table-column prop="snicPrice" label="门票价格" width="100" align="center">
        </el-table-column>
        <el-table-column prop="snicHot" label="是否热门" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.snicHot == 1 ? 'danger' : 'primary'" disable-transitions>{{
              scope.row.snicHot == 1 ? '热门' : '正常' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="snicProvince" label="所属省份" width="100" align="center">
          <template slot-scope="scope">
            <el-tag type="success" disable-transitions>
              {{ scope.row.snicProvince }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="snicTime" label="开放时间" width="150" align="center">
        </el-table-column>
        <el-table-column prop="snicAddress" label="详细地址" width="150" align="center">
        </el-table-column>
        <el-table-column prop="rutTime" label="发布时间" width="170" align="center">
        </el-table-column>
        <el-table-column prop="operate" label="管理" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-tickets" @click="detail(scope.row)">详情</el-button>
            <el-button type="primary" size="small" icon="el-icon-edit" @click="mod(scope.row)">修改</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="del(scope.row.snicId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
        :page-sizes="[5, 10, 20, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total" style="align:right">
      </el-pagination>
      <el-dialog :title="title" :visible.sync="centerDialogVisible" width="35%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="景点名称" prop="snicName">
            <el-col :span="10">
              <el-input v-model="form.snicName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="详细地址" prop="snicAddress">
            <el-col :span="10">
              <el-input v-model="form.snicAddress"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="景点照片">
            <!-- <div class="addBrand-container" id="food-add-app" >
                            <div class="container"> -->
            <el-upload class="avatar-uploader" action="http://localhost:7948/common/upload" :show-file-list="false"
              :on-success="handleAvatarSuccess" :before-upload="beforeUpload" ref="upload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!-- </div>
                        </div> -->
          </el-form-item>
          <el-form-item label="门票价格" prop="snicPrice">
            <el-col :span="10">
              <el-input v-model="form.snicPrice"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="开放时间" prop="snicPrice">
            <el-col :span="10">
              <el-input v-model="form.snicTime"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="景点等级">
            <el-radio-group v-model="form.snicRank">
              <el-radio label="A">A</el-radio>
              <el-radio label="AA">AA</el-radio>
              <el-radio label="AAA">AAA</el-radio>
              <el-radio label="AAAA">AAAA</el-radio>
              <el-radio label="AAAAA">AAAAA</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属省份">
            <el-select v-model="form.snicProvince" placeholder="请选择" filterable>
              <el-option v-for="province in provinces" :key="province.provinceId" :label="province.provinceName"
                :value="province.provinceName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否热门">
            <el-radio-group v-model="form.snicHot">
              <el-radio label="2">正常</el-radio>
              <el-radio label="1">热门</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="景点简介" prop="snicRemark">
            <el-col :span="20">
              <el-input v-model="form.snicRemark" type="textarea"></el-input>
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
    name:'scenicList',
    data(){
        return{
          pageNum:1, //页码
          pageSize:5, //数量
          tableData:[],
          total:0,   //总数
          snicName:'',//景点名称
          snicProvince:'',
          provinces:[],//所有省份数组
          title:'',//新增或者修改弹框标题
          centerDialogVisible:false, //新增或者修改弹框
          imageUrl:'',//照片回显路径        
          form:{
            snicId:'',
            snicName:'',
            snicImg:'',
            snicRank:'',
            snicPrice:'',
            snicProvince:'',
            snicRemark:'',
            snicTime:'',
            snicAddress:'',
            snicHot:0
          },
          sure:true, //控制新增、修改、详情弹窗的确定按钮是否隐藏（查看详情则隐藏）
        }
    },
    methods:{
      post(){
            this.$axios.post(this.$httpUrl+'/scenic/page',{
                pageSize:this.pageSize,
                pageNum:this.pageNum,
                param:{
                    snicName:this.snicName,
                    snicProvince:this.snicProvince
                    // admUsername:this.admUsername,      
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
        //get请求所有的省份信息
        provincesGet(){
            this.$axios.get(this.$httpUrl+'/province/getAll').then(res=>{
                this.provinces = res.data.data
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
        //获取照片
        getImage (image) {
            return `http://localhost:7948/common/download?name=${image}`
        },
        //图片上传
        handleAvatarSuccess (response, file, fileList) {
            this.imageUrl = `http://localhost:7948/common/download?name=${response.data}`
            this.form.snicImg = response.data
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
        //根据id删除景点信息
        del(id){
            this.$confirm('此操作将永久删除id为【'+id+'】的景点信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$axios.get(this.$httpUrl + '/scenic/del?snicId='+id).then((res)=>{
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
            this.title = "新增景点信息"
            //重置表单
            this.$nextTick(()=>{
                this.resetForm();
                this.form.snicId = '';
                this.form.snicName = '';
                this.form.snicImg = '';
                this.imageUrl = '';
                this.form.snicRank = 'A';
                this.form.snicPrice = '';
                this.form.snicAddress = '';
                this.form.snicProvince = '';
                this.form.snicRemark = '';
                this.form.snicTime = '';
                this.form.snicHot = '2';
            })
        },
        //修改按钮
        mod(row){
                //表单弹框
                this.centerDialogVisible = true
                this.title = "修改景点信息"
                this.$nextTick(()=>{
                //表单赋值
                this.resetForm();
                this.form.snicId = row.snicId;
                this.form.snicName = row.snicName;
                this.form.snicImg = row.snicImg;
                this.form.snicRank = row.snicRank;
                this.form.snicPrice = row.snicPrice;
                this.form.snicAddress = row.snicAddress;
                this.form.snicProvince = row.snicProvince;
                this.form.snicRemark = row.snicRemark;
                this.form.snicTime = row.snicTime;
                this.form.snicHot = row.snicHot +'';
                this.imageUrl = this.getImage(row.snicImg);   
                this.sure = true;
            })
        },
        detail(row){
            //表单弹框
              this.centerDialogVisible = true
              this.title = "景点信息详情"
              this.$nextTick(()=>{
              //表单赋值
              this.resetForm();
              this.form.snicId = row.snicId;
              this.form.snicName = row.snicName;
              this.form.snicImg = row.snicImg;
              this.form.snicRank = row.snicRank;
              this.form.snicPrice = row.snicPrice;
              this.form.snicAddress = row.snicAddress;
              this.form.snicProvince = row.snicProvince;
              this.form.snicRemark = row.snicRemark;
              this.form.snicTime = row.snicTime;
              this.form.snicHot = row.snicHot + '';
              this.imageUrl = this.getImage(row.snicImg);   
              this.sure = false;
          })
        },
        // 更新
        save(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //id存在则更新，否则新增
                    if(this.form.snicId){
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
            this.$axios.post(this.$httpUrl + '/scenic/save',this.form).then((res)=>{
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
            this.$axios.post(this.$httpUrl + '/scenic/update',this.form).then((res)=>{
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
                this.snicName = ''      
                this.snicProvince = '' 
                this.post();
            })
        },
    },
    beforeMount(){
      this.post()
      this.provincesGet()
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