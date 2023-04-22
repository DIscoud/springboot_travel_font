<template>
    <div>
        <el-card class="box-card" style="width:1600px;margin:20px auto ">
            <div style="margin-left: 5px;margin-bottom:5px">
                <el-form :inline="true" class="demo-form-inline" ref="ruleForm">
                    <el-form-item label="">
                        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" style="margin-left:5px"
                            @click="add">新增</el-button>
                    </el-form-item>
                    <el-form-item label="线路名称">
                        <el-input v-model="rutName" placeholder="请输入" style="width:200px;" prefix-icon="el-icon-search"
                            clearable @keyup.enter.native="post"></el-input>
                    </el-form-item>
                    <el-form-item label="出发地">
                        <el-input v-model="rutStart" placeholder="请输入" style="width:200px;" prefix-icon="el-icon-search"
                            clearable @keyup.enter.native="post"></el-input>
                    </el-form-item>
                    <el-form-item label="目的地">
                        <el-input v-model="rutEnd" placeholder="请输入" style="width:200px;" prefix-icon="el-icon-search"
                            clearable @keyup.enter.native="post"></el-input>
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
                <el-table-column label="图片" width="180" align="center">
                    <template slot-scope="scope">
                        <el-image :src="getImage(scope.row.rutImg)" :preview-src-list="[getImage(scope.row.rutImg)]"
                            style="height: 50px" />
                    </template>
                </el-table-column>
                <el-table-column prop="rutName" label="旅游线路名称" width="180" align="center">
                </el-table-column>
                <el-table-column prop="rutStart" label="出发地" width="100" align="center">
                </el-table-column>
                <el-table-column prop="rutMid" label="途径地" width="180" align="center">
                </el-table-column>
                <el-table-column prop="rutEnd" label="目的地" width="100" align="center">
                </el-table-column>
                <el-table-column prop="rutPrice" label="价格" width="180" align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" disable-transitions>
                            {{ scope.row.rutPrice }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="admStatus" label="类型" width="180" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.rutType == 1 ? 'success' : 'primary'" disable-transitions>{{
                            scope.row.rutType == 1 ? '跟团游' : '自由行' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="rutTime" label="发布时间" width="180" align="center">
                </el-table-column>
                <el-table-column prop="operate" label="管理" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" icon="el-icon-edit" @click="mod(scope.row)">修改</el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete"
                            @click="del(scope.row.rutId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[5, 10, 20, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total" style="align:right">
            </el-pagination>

            <el-dialog :title="title" :visible.sync="centerDialogVisible" width="35%">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="线路名称" prop="rutName">
                        <el-col :span="10">
                            <el-input v-model="form.rutName"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="出发地" prop="rutStart">
                        <el-col :span="10">
                            <el-input v-model="form.rutStart"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="途径地" prop="rutMid">
                        <el-col :span="10">
                            <el-input v-model="form.rutMid"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="目的地" prop="rutEnd">
                        <el-col :span="10">
                            <el-input v-model="form.rutEnd"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="照片">
                        <!-- <div class="addBrand-container" id="food-add-app" >
                            <div class="container"> -->
                        <el-upload class="avatar-uploader" action="http://localhost:7948/common/upload"
                            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeUpload"
                            ref="upload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <!-- </div>
                        </div> -->
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-radio-group v-model="form.rutType">
                            <el-radio label="1">跟团游</el-radio>
                            <el-radio label="0">自由行</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="价格" prop="rutPrice">
                        <el-col :span="10">
                            <el-input v-model="form.rutPrice"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    name:'travelList',
    data(){
        return{
          pageNum:1, //页码
          pageSize:5, //数量
          tableData:[],
          total:0,   //总数
          rutName:'',//线路名称
          rutStart:'',//出发地
          rutEnd:'',//目的地
          //控制新增/修改弹框页面
          centerDialogVisible:false,
          //控制新增/修改弹框页面标题
          title:'',
          imageUrl:'',//图片回显路径
          //新增/修改的表单
          form:{
              rutId:'',
              rutName:'',
              rutStart:'',
              rutMid:'',
              rutEnd:'',
              rutPrice:'',
              rutType:'1',
              rutImg:'',
          },
          rutType:[
                  {
                      value: '1',
                      label: '跟团游'
                  }, 
                  {
                      value: '0',
                      label: '自由行'
                  }
            ],
        }        
      },
      methods: {
        post(){
            this.$axios.post(this.$httpUrl+'/route/page',{
                pageSize:this.pageSize,
                pageNum:this.pageNum,
                param:{
                    rutName:this.rutName,
                    rutStart:this.rutStart,
                    rutEnd:this.rutEnd
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
        //重置查询的参数
        resetRuleForm(formName) {
            this.$nextTick(()=>{
                this.$refs[formName].resetFields();
                this.rutName = ''
                this.rutStart = ''
                this.rutEnd = ''
                this.post();
            })
        },
        //新增弹框
        add(){
          this.centerDialogVisible = true; //新增弹框
          this.title = '新增线路信息'; //新增弹框标题
          //重置表单
          this.$nextTick(()=>{
                this.form.rutId = '';
                this.form.rutName = '';
                this.form.rutStart = '';
                this.form.rutMid = '';
                this.form.rutEnd = '';
                this.imageUrl = '';
                this.form.rutImg = '';
                this.form.rutType = '1';
                this.form.rutPrice = '';
                })
        },
        //修改按钮
        mod(row){
                //表单弹框
                this.centerDialogVisible = true
                this.title = "修改线路信息"
                this.$nextTick(()=>{
                //表单赋值
                this.form.rutId = row.rutId;
                this.form.rutName = row.rutName;
                this.form.rutStart = row.rutStart;
                this.form.rutMid = row.rutMid;
                this.form.rutEnd = row.rutEnd;
                this.imageUrl = this.getImage(row.rutImg);
                this.form.rutImg = row.rutImg;
                this.form.rutType = row.rutType
                this.form.rutPrice = row.rutPrice;
                })
        },
        // 更新线路
        save(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //id存在则更新，否则新增
                    if(this.form.rutId){
                        this.doMod();
                    }else{
                        this.doSave();
                    }
                    
                } else {
                    return false;
                }
            });
            
        },
        //新增
        doSave(){
            this.$axios.post(this.$httpUrl + '/route/save',this.form).then((res)=>{
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
            this.$axios.post(this.$httpUrl + '/route/update',this.form).then((res)=>{
                if(res.data.code == 200){
                    this.$message.success('操作成功！')
                    this.centerDialogVisible = false
                    this.post()
                }else{
                    this.$message.error('操作失败')
                }
            })

        },
        //根据id删除
        del(id){
          this.$confirm('此操作将永久删除id为【'+id+'】的旅游线路, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$axios.get(this.$httpUrl + '/route/del?rutId='+id).then((res)=>{
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
          
      },
      beforeMount(){
        this.post();
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