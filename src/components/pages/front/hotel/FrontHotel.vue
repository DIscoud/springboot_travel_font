<template>
  <div>
    <el-row class="row1" :gutter="30">
      <el-col  v-for="(o, index) in tableData" :key="o" class="box">
        <!--  -->
        <el-card :body-style="{ padding: '0px' }">
          <el-image :src="getImage(o.htlImg)" :preview-src-list="[getImage(o.htlImg)]" class="image travelImage"/>
          <div style="padding: 15px;" class="font_box" >
            <span class="title_name"><h2>{{o.htlName}}</h2></span>
            <div class="bottom11 clearfix">
                <span class="time_One">{{o.htlRemark}}</span><br>
                <span class="time_Two">{{o.htlAddress}}</span><br>
                <div class="tesu">
                    <span class="time_Th">{{"电话："+o.htlPhone}}</span>
                </div>
                <br>
                <el-tag type="success">{{ o.snicName }}</el-tag>
                <el-tag type="primary">{{ o.htlStar }}星级</el-tag>
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
      name:'FrontHotel',
      data(){
          return{
            pageNum:1, //页码
            pageSize:4, //数量
            tableData:[],
            total:0 ,  //总数
            htlName:'',//酒店名称
            snicName:'',//附近景点名称
            htlRemark:'',//酒店介绍
            title:'',//新增或者修改弹框标题
            centerDialogVisible:false, //新增或者修改弹框
            imageUrl:'',//照片回显路径
            // form:{
            //   htlId:'',
            //   htlName:'',
            //   htlImg:'',
            //   htlPhone:'',
            //   htlAddress:'',
            //   htlStar:'1',
            //   htlRemark:'',
            //   snicName:''
            // },
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
                    snicName:this.snicName,
                    htlRemark:this.htlRemark
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
        hotelGet(){
            this.$axios.get(this.$httpUrl+'/hotel/getAll').then(res=>{
                this.scenics = res.data.data
                console.log(res.data.data)
            })
        },
        //获取照片
        getImage (image) {
            return `http://localhost:7948/common/download?name=${image}`
        },
      },
      beforeMount(){
        this.post();
        this.hotelGet();
      }

  }
  </script>

<style scoped>
  .row1{
    width: 100%;
    margin: 0 auto;
  }
.travelImage{
  width: 300px;
  height: 350px;
}
.image {
  float: left;
  display: block;
  padding-right: 10px;
}
.box{
  width: 670px;
  margin-bottom: 25px;
}
.title_name{
  font-weight: 300px;
  font-family: "微软雅黑";
}
.time_One{
  width: 240px;
  height: 150px;
  overflow: hidden;
  letter-spacing:1px;
  text-align: center;
  line-height: 1.5;

}

.time_Two{
  padding-top: 5px;
  text-align: center;
  line-height: 1;
}
.time_Th{
  color: hotpink;
}

.tesu{
  padding-top: 10px;
}

</style>
