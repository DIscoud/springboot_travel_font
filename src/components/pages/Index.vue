<template>
  <div>
    <div id="he-plugin-standard"></div>
    <div>
      <el-card
        class="box-card"
        style="width: 1000px; padding: 20px; margin-top: -450px; margin-left: 350px;"
      >
        <div
          style="
            text-align: center;
            background-color: #f1f1f3;
            height: 100%;
            padding: 0px;
            margin: 0px;
          "
        >
          <h1 style="font-size: 38px">{{ "欢迎您！" + username }}</h1>
          <el-descriptions title="个人中心" :column="2" size="40" border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-custom"></i>
                账号
              </template>
              {{ userUsername}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                电话
              </template>
              {{ phone }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                性别
              </template>
              <el-tag
                :type="userSex === '1' ? 'primary' : 'succcess'"
                disable-transitions
                ><i
                  :class="userSex == 1 ? 'el-icon-male' : 'el-icon-female'"
                ></i
                >{{ userSex == 1 ? "男" : "女" }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                角色
              </template>
              <el-tag
                :type="
                  user.roleId === 0
                    ? 'danger'
                    : user.roleId === 1
                    ? 'primary'
                    : 'success'
                "
                disable-transitions
                >{{
                  user.roleId == 0
                    ? "超级管理员"
                    : user.roleId == 1
                    ? "管理员"
                    : "用户"
                }}</el-tag
              >
            </el-descriptions-item>
          </el-descriptions>

          <DateUtils></DateUtils>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import DateUtils from "../common/DateUtils.vue";
export default {
  name: "Index",
  components: { DateUtils },
  data() {
    return {
      username:"",
      phone:"",
      userUsername:"",
      userSex:"",
      user: {},
    };
  },
  computed: {},
  methods: {
    init() {
      this.user = JSON.parse(sessionStorage.getItem("CurUser"));
    },
  },
  created() {
    // this.init()
  },
  mounted() {
    window.WIDGET = {
      CONFIG: {
        layout: "2",
        width: 300,
        height: 450,
        background: "1",
        dataColor: "FFFFFF",
        language: "zh",
        borderRadius: "5",
        city: "CN101230106",
        key: "4232bbf32aec42bfa8b7374090e95451",
      },
    };
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
    document.getElementsByTagName("head")[0].appendChild(script);


    let obj = JSON.parse(sessionStorage.getItem("userData"))
     this.username=obj.userName;
     this.userUsername=obj.userUsername;
      this.phone=obj.userPhone;
      this.userSex=obj.userSex;
      console.log('csssssssssss---',obj);
     console.log("obj.state=------" + obj.state);

  },
};
</script>

<style scoped>
.el-descriptions {
  width: 90%;
  margin: 0 auto;
  text-align: center;
}
</style>
