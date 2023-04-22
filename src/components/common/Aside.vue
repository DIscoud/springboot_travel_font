<template>
  <div class="asideContainer">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      :collapse="isCollapse" background-color="rgb(150, 202, 220)" text-color="#fff" active-text-color="#62fff2">
      <h3>{{ isCollapse ? '旅游' : '旅游信息管理系统' }}</h3>
      <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name" @click="clickMenu(item)">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :key="item.name" :index="item.name">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
          <el-menu-item :index="subItem.name" @click="clickMenu(subItem)">{{ subItem.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "Aside",
    data() {
      return {
        obj: {},
        menuData: [{
            path: "/index",
            name: "main",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
          },
          {
            label: "管理员管理",
            icon: "user",
            name: "admin",
            children: [{
                path: "/AdminList",
                name: "adminList",
                label: "管理员信息",
                icon: "setting",
                url: "admin/AdminList",
              },
              // {
              //   path: "/Upload",
              //   name: "upload",
              //   label: "文件上传",
              //   icon: "setting",
              //   url: "demo/Upload",
              // }
            ],
          },
          {
            label: "用户管理",
            icon: "user",
            name: "user",
            children: [{
              path: "/UserList",
              name: "userList",
              label: "用户信息",
              icon: "setting",
              url: "user/UserList",
            }],
          },
          {
            label: "旅游信息管理",
            icon: "s-order",
            name: "travel",
            children: [{
              path: "/TravelList",
              name: "travelList",
              label: "旅游线路",
              icon: "setting",
              url: "travel/TravelList",
            }, ],
          },
          {
            label: "景点信息管理",
            icon: "location-outline",
            name: "scenic",
            children: [{
                path: "/ScenicList",
                name: "scenicList",
                label: "景点信息",
                icon: "setting",
                url: "scenic/ScenicList",
              },
              {
                path: "/ScenicHot",
                name: "scenicHot",
                label: "热门景点",
                icon: "setting",
                url: "scenic/ScenicHot",
              },
            ],
          },
          {
            label: "酒店推荐",
            icon: "school",
            name: "hotelList",
            children: [{
              path: "/HotelList",
              name: "hotelList",
              label: "酒店信息",
              icon: "el-icon-school",
              url: "hotel/HotelList",
            }, ],
          },
          {
            label: "地方美食",
            icon: "s-shop",
            name: "foodList",
            children: [{
                path: "/FoodCategory",
                name: "foodCategory",
                label: "美食分类",
                icon: "setting",
                url: "food/FoodCategory",
              },
              {
                path: "/FoodList",
                name: "foodList",
                label: "美食信息",
                icon: "setting",
                url: "food/FoodList",
              },
              {
                path: "/FoodHot",
                name: "foodHot",
                label: "热门美食",
                icon: "setting",
                url: "food/FoodHot",
              },

            ],
          },
          {
            label: "本地地图",
            icon: "s-shop",
            name: "BaiduView",
            children: [{
              path: "/BaiduView",
              name: "baiduView",
              label: "位置信息",
              icon: "setting",
              url: "traffic/BaiduView",
            }, ],
          },
          {
            label: "省份字典",
            icon: "location-outline",
            name: "provinceList",
            children: [{
              path: "/ProvinceList",
              name: "provinceList",
              label: "省份字典",
              icon: "setting",
              url: "food/ProvinceList",
            }, ],
          },
        ],



        menuDataUser: [{
            path: "/index",
            name: "main",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
          },
          {
            label: "酒店推荐",
            icon: "school",
            name: "hotelListUser",
            children: [{
              path: "/HotelListUser",
              name: "hotelListUser",
              label: "酒店信息",
              icon: "el-icon-school",
              url: "hotelUser/HotelListUser",
            }, ],
          },
          {
            label: "地方美食",
            icon: "s-shop",
            name: "foodListUser",
            children: [{
                path: "/FoodCategoryUser",
                name: "foodCategoryUser",
                label: "美食分类",
                icon: "setting",
                url: "foodUser/FoodCategoryUser",
              },
              {
                path: "/FoodListUser",
                name: "foodListUser",
                label: "美食信息",
                icon: "setting",
                url: "foodUser/FoodListUser",
              },
              {
                path: "/FoodHotUser",
                name: "foodHotUser",
                label: "热门美食",
                icon: "setting",
                url: "foodUser/FoodHotUser",
              },

            ],
          },
          {
            label: "本地地图",
            icon: "s-shop",
            name: "BaiduView",
            children: [{
              path: "/BaiduView",
              name: "baiduView",
              label: "位置信息",
              icon: "setting",
              url: "traffic/BaiduView",
            }, ],
          },
          {
            label: "省份字典",
            icon: "location-outline",
            name: "provinceListUser",
            children: [{
              path: "/ProvinceListUser",
              name: "provinceListUser",
              label: "省份字典",
              icon: "setting",
              url: "province/ProvinceListUser",
            }, ],
          },
          {
            label: "旅游推荐",
            icon: "location-outline",
            name: "travelListUser",
            children: [{
              path: "/TravelListUser",
              name: "travelListUser",
              label: "旅游路线",
              icon: "setting",
              url: "travel/TravelListUser",
            }, ],
          },



        ],
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item) {
        // $route 当前路由 $router 路由实例
        if (this.$route.path !== item.path && !(this.$route.path === '/Index' && item.path === '/')) {
          this.$router.push(item.path)
        }
        //触发面包屑数据的更新
        this.$store.commit('menuChange', item)
      }
    },
    computed: {
      hasChildren() {
        //过滤获取所有的二级菜单的数据

        let obj = JSON.parse(sessionStorage.getItem("userData"));

        return this.obj.state == 0 ? this.menuData.filter(item => item.children) : this.menuDataUser.filter(item => item
          .children)
      },
      noChildren() {
        return this.obj.state == 0 ? this.menuData.filter(item => !item.children) : this.menuDataUser.filter(item => !
          item.children)
      },
      isCollapse() {
        return this.$store.state.tab.isCollapse
      }
    }
  };
</script>

<style scoped lang="less">
  .el-menu {
    height: 130vh;
    border-right: none;

    h3 {
      color: #fff;
      text-align: center;
      line-height: 48px;
      font-size: 20px;
      font-weight: 400;
      padding: 0px 20px;
    }
  }
</style>
