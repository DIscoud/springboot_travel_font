<template>
  <div>
    <el-row class="row" :gutter="30">
      <el-col :span="6" v-for="(o, index) in tableData" :key="o">
        <el-card :body-style="{ padding: '0px' }">
          <el-image :src="getImage(o.rutImg)" :preview-src-list="[getImage(o.rutImg)]" class="image travelImage"/>
          <div style="padding: 14px;">
            <span>{{o.rutName}}</span>
            <div class="bottom clearfix">
              <span class="time">{{o.rutMid}}</span>
              <el-tag :type="o.rutType == 1 ? 'success' : 'primary'" disable-transitions>{{
                            o.rutType == 1 ? '跟团游' : '自由行' }}</el-tag>
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
    name:'FrontTravel',
    data(){
        return{
          pageNum:1, //页码
          pageSize:4, //数量
          tableData:[],
          total:0,   //总数
          rutName:'',//线路名称
          rutStart:'',//出发地
          rutEnd:'',//目的地
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
