<template>
    <div>
        <el-card class="box-card" style="width:1600px;margin:20px auto ">
            <div style="margin-left: 5px;margin-bottom:5px">
                <el-form :inline="true" class="demo-form-inline" ref="ruleForm">
                    <el-form-item label="">
                        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" style="margin-left:5px"
                            @click="add">新增用户信息</el-button>
                    </el-form-item>
                    <el-form-item label="账号">
                        <el-input v-model="userUsername" placeholder="请输入" style="width:200px;" prefix-icon="el-icon-search"
                            clearable @keyup.enter.native="post"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="userSex" placeholder="请选择性别">
                            <el-option v-for="sex in sexs" :key="sex.value" :label="sex.label" :value="sex.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="userStatus" placeholder="请选择状态">
                            <el-option v-for="userStatus in userStatuss" :key="userStatus.value" :label="userStatus.label"
                                :value="userStatus.value">
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
                <el-table-column prop="userUid" label="id" width="100" align="center">
                </el-table-column>
                <el-table-column prop="userUsername" label="账号" width="180" align="center">
                </el-table-column>
                <el-table-column prop="userId" label="身份证" width="180" align="center">
                </el-table-column>
                <el-table-column prop="userName" label="用户昵称" width="180" align="center">
                </el-table-column>
                <el-table-column label="头像" width="180" align="center">
                    <template slot-scope="scope">
                        <el-image :src="getImage(scope.row.userImg)" :preview-src-list="[getImage(scope.row.userImg)]"
                            style="height: 50px" />
                    </template>
                </el-table-column>
                <el-table-column prop="userStatus" label="状态" width="180" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.userStatus == 0 ? 'danger' : 'primary'" disable-transitions>{{
                            scope.row.userStatus == 0 ? '封禁' : '正常' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="userSex" label="性别" width="180" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.userSex == 1 ? 'primary' : 'success'" disable-transitions>{{
                            scope.row.userSex ==
                            1 ? '男' : '女' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="userPhone" label="联系方式" width="180" align="center">
                </el-table-column>
                <el-table-column prop="operate" label="管理" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" icon="el-icon-edit" @click="mod(scope.row)">修改</el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete"
                            @click="del(scope.row.userUid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[5, 10, 20, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total" style="align:right">
            </el-pagination>

            <el-dialog :title="title" :visible.sync="centerDialogVisible" width="35%">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="账号" prop="userUsername">
                        <el-col :span="10">
                            <el-input v-model="form.userUsername"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="密码" prop="userPassword">
                        <el-col :span="10">
                            <el-input v-model="form.userPassword" type="password"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="身份证" prop="userId">
                        <el-col :span="10">
                            <el-input v-model="form.userId"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="头像">
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
                    <el-form-item label="用户昵称" prop="userName">
                        <el-col :span="10">
                            <el-input v-model="form.userName"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="form.userSex">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-radio-group v-model="form.userStatus">
                            <el-radio label="1">正常</el-radio>
                            <el-radio label="0">封禁</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="userPhone">
                        <el-col :span="10">
                            <el-input v-model="form.userPhone"></el-input>
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
    name:'UserList',
    data() {
        return{
            pageNum:1, //页码
            pageSize:5, //数量
            userUsername:'',//账号
            userSex:'',//1：男 0:女
            userStatus:'',//1：正常 0:封禁
            tableData:[],
            total:0,
            sexs:[
                  {
                      value: '1',
                      label: '男'
                  },
                  {
                      value: '0',
                      label: '女'
                  }
              ],
            userStatuss:[
                  {
                      value: '1',
                      label: '正常'
                  },
                  {
                      value: '0',
                      label: '封禁'
                  }
            ],
            //控制新增/修改弹框页面
            centerDialogVisible:false,
            //控制新增/修改弹框页面标题
            title:'',
            imageUrl:'', //图片回显路径
            //新增/修改的表单
            form:{
                userUid:'',
                userUsername: '',
                userPassword: '',
                userId: '',
                userSex: '1',
                userImg: '',
                userStatus: '1',
                userPhone: '',
                userName: ''
            }

        }
      },
      methods:{
        post(){
            this.$axios.post(this.$httpUrl+'/user/page',{
                pageSize:this.pageSize,
                pageNum:this.pageNum,
                param:{
                    userUsername:this.userUsername,
                    userSex:this.userSex,
                    userStatus:this.userStatus
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
        //获取头像
        getImage (image) {
            return `http://localhost:7948/common/download?name=${image}`
        },
        //重置查询的参数
        resetRuleForm(formName) {
            this.$nextTick(()=>{
                this.$refs[formName].resetFields();
                this.userUsername = ''
                this.userSex = ''
                this.userStatus = ''
                this.post();
				alert(1111)
            })
        },
        //打开新增用户窗口
        add(){
            this.centerDialogVisible = true
            this.title = "新增用户信息"
            //重置表单
            this.$nextTick(()=>{
                this.resetForm();
                this.form.userUid = '';
                this.form.userId = '';
                this.form.userImg = '';
                this.imageUrl = '';
                this.form.userSex = '1';
                this.form.userStatus = '1';
            })
        },
        //图片上传
        handleAvatarSuccess (response, file, fileList) {
            this.imageUrl = `http://localhost:7948/common/download?name=${response.data}`
            this.form.userImg = response.data
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
        //新增
        doSave(){
            this.$axios.post(this.$httpUrl + '/user/save',this.form).then((res)=>{
                if(res.data.code == 200){
                    this.$message.success('操作成功！')
                    this.centerDialogVisible = false
                    this.post()
                }else{
                    this.$message.error('操作失败')
                }
            })
        },
        //根据id删除用户
        del(id){
            this.$confirm('此操作将永久删除id为【'+id+'】的用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$axios.get(this.$httpUrl + '/user/del?userUid='+id).then((res)=>{
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
        // 更新用户
        save(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //id存在则更新，否则新增
                    if(this.form.userUid){
                        this.doMod();
                    }else{
                        this.doSave();
                    }

                } else {
                    return false;
                }
            });

        },

        //修改按钮
        mod(row){
                //表单弹框
                this.centerDialogVisible = true
                this.title = "修改用户信息"
                this.$nextTick(()=>{
                //表单赋值
                this.form.userUid = row.userUid;
                this.form.userUsername = row.userUsername;
                this.form.userPassword = row.userPassword;
                this.form.userId = row.userId;
                this.form.userSex = row.userSex;
                this.imageUrl = this.getImage(row.userImg);
                this.form.userImg = row.userImg;
                this.form.userStatus = row.userStatus
                this.form.userPhone = row.userPhone;
                this.form.userName = row.userName;
            })
        },
        //修改
        doMod(){
            this.$axios.post(this.$httpUrl + '/user/update',this.form).then((res)=>{
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


    },

    beforeMount() {
        this.post();
    },
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
