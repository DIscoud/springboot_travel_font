<template>
  <div>
    <div>
      <el-card class="box-card" style="width:1600px;margin:20px auto ">
        <div style="margin-left: 5px;margin-bottom:5px">
          <el-form :inline="true" class="demo-form-inline" ref="ruleForm">
            <el-form-item label="">
              <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" style="margin-left:5px"
                @click="add">添加酒店信息</el-button>
            </el-form-item>
            <el-form-item label="酒店名称">
              <el-input v-model="htlName" placeholder="请输入" style="width:200px;" prefix-icon="el-icon-search" clearable
                @keyup.enter.native="post"></el-input>
            </el-form-item>
            <el-form-item label="附近景点">
              <el-select v-model="snicName" placeholder="请选择" filterable>
                <el-option v-for="scenic in scenics" :key="scenic.snicId" :label="scenic.snicName"
                  :value="scenic.snicName">
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
          <el-table-column prop="htlId" label="序号" width="100" align="center">
          </el-table-column>
          <el-table-column prop="htlName" label="酒店名称" width="170" align="center">
          </el-table-column>
          <el-table-column prop="snicName" label="附近景点" width="170" align="center">
          </el-table-column>
          <el-table-column prop="htlAddress" label="酒店地址" width="170" align="center">
          </el-table-column>
          <el-table-column label="酒店照片" width="170" align="center">
            <template slot-scope="scope">
              <el-image :src="getImage(scope.row.htlImg)" :preview-src-list="[getImage(scope.row.htlImg)]"
                style="height: 50px" />
            </template>
          </el-table-column>
          <el-table-column prop="htlStar" label="酒店星级" width="170" align="center">
            <template slot-scope="{row}">
              <el-rate v-model="row.htlStar" text-color="#ff9900" disabled>
              </el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="htlPhone" label="联系方式" width="170" align="center">
          </el-table-column>
          <el-table-column prop="rutTime" label="发布时间" width="170" align="center">
          </el-table-column>
          <el-table-column prop="operate" label="管理" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-tickets" @click="detail(scope.row)">详情</el-button>
              <el-button type="primary" size="small" icon="el-icon-edit" @click="mod(scope.row)">修改</el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="del(scope.row.htlId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
          :page-sizes="[5, 10, 20, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="total" style="align:right">
        </el-pagination>
        <el-dialog :title="title" :visible.sync="centerDialogVisible" width="35%">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="酒店名称" prop="htlName">
              <el-col :span="15">
                <el-input v-model="form.htlName"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="酒店地址" prop="htlAddress" type="textarea">
              <el-col :span="15">
                <el-input v-model="form.htlAddress"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="酒店照片">
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
            <el-form-item label="联系方式" prop="htlPhone">
              <el-col :span="10">
                <el-input v-model="form.htlPhone"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="酒店星级">
              <el-radio-group v-model="form.htlStar">
                <el-radio label="1">1星</el-radio>
                <el-radio label="2">2星</el-radio>
                <el-radio label="3">3星</el-radio>
                <el-radio label="4">4星</el-radio>
                <el-radio label="5">5星</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="附近景点">
              <el-select v-model="form.snicName" placeholder="请选择" filterable>
                <el-option v-for="scenic in scenics" :key="scenic.snicId" :label="scenic.snicName"
                  :value="scenic.snicName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="酒店简介" prop="htlRemark">
              <el-col :span="20">
                <el-input v-model="form.htlRemark" type="textarea"></el-input>
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
  </div>
</template>

<script>
  export default {
      name:'hotelList',
      data(){
          return{
            pageNum:1, //页码
            pageSize:5, //数量
            tableData:[],
            total:0 ,  //总数
            htlName:'',//酒店名称
            snicName:'',//附近景点名称
            title:'',//新增或者修改弹框标题
            centerDialogVisible:false, //新增或者修改弹框
            imageUrl:'',//照片回显路径
            form:{
              htlId:'',
              htlName:'',
              htlImg:'',
              htlPhone:'',
              htlAddress:'',
              htlStar:'1',
              htlRemark:'',
              snicName:''
            },
            sure:true, //控制新增、修改、详情弹窗的确定按钮是否隐藏（查看详情则隐藏）
            scenics:[] //附近景点数组（从后端接口取）
          }
      },
      methods:{
        post(){
            this.$axios.post(this.$httpUrl+'/hotel/page',{
                pageSize:this.pageSize,
                pageNum:this.pageNum,
                param:{
                    htlName:this.htlName,
                    snicName:this.snicName
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
        //get请求所有的景点信息
        scenicsGet(){
            this.$axios.get(this.$httpUrl+'/scenic/getAll').then(res=>{
                this.scenics = res.data.data
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
            this.form.htlImg = response.data
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
        //根据id删除酒店信息
        del(id){
            this.$confirm('此操作将永久删除id为【'+id+'】的酒店信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$axios.get(this.$httpUrl + '/hotel/del?htlId='+id).then((res)=>{
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
            this.title = "新增酒店信息"
            //重置表单
            this.$nextTick(()=>{
                this.resetForm();
                this.form.htlId = '';
                this.form.htlName = '';
                this.form.htlImg = '';
                this.imageUrl = '';
                this.form.htlPhone = '';
                this.form.htlAddress = '';
                this.form.htlStar = '1';
                this.form.snicName = '';
                this.form.htlRemark = '';
                this.sure = true;
            })
        },
        //修改按钮
        mod(row){
                //表单弹框
                this.centerDialogVisible = true
                this.title = "修改酒店信息"
                this.$nextTick(()=>{
                //表单赋值
                this.form.htlId = row.htlId;
                this.form.htlName = row.htlName;
                this.form.htlImg = row.htlImg;
                this.form.htlPhone = row.htlPhone;
                this.form.htlAddress = row.htlAddress;
                this.form.htlStar = row.htlStar + '';
                this.form.htlRemark =row.htlRemark;
                this.form.snicName = row.snicName;
                this.imageUrl = this.getImage(row.htlImg);
                this.sure = true
            })
        },
         //详情按钮
        detail(row){
                //表单弹框
                this.centerDialogVisible = true
                this.title = "酒店信息详情"
                this.$nextTick(()=>{
                //表单赋值
                this.form.htlId = row.htlId;
                this.form.htlName = row.htlName;
                this.form.htlImg = row.htlImg;
                this.form.htlPhone = row.htlPhone;
                this.form.htlAddress = row.htlAddress;
                this.form.htlStar = row.htlStar + '';
                this.form.htlRemark =row.htlRemark;
                this.form.snicName = row.snicName;
                this.imageUrl = this.getImage(row.htlImg);
                this.sure = false
            })
        },
        // 更新
        save(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //id存在则更新，否则新增
                    if(this.form.htlId){
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
            this.$axios.post(this.$httpUrl + '/hotel/save',this.form).then((res)=>{
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
            this.$axios.post(this.$httpUrl + '/hotel/update',this.form).then((res)=>{
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
                this.htlName = ''
                this.snicName = ''
                this.post();
            })
        },
      },
      beforeMount(){
        this.post();
        this.scenicsGet();
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
.el-container.is-vertical {
    -ms-flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    height: 650px !important;
}
</style>
