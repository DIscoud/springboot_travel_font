<template>
  <div class="header-container">
    <div class="l-content">
      <el-button type="" icon="el-icon-menu" size="medium" style="margin-left:20px; margin-right: 20px;"
        @click="handleMenu"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in tags" :key="item.path"
          :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user_img" src="@/assets/images/user.jpg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'Header',
    data() {
      return {

      }
    },
    methods: {
      handleMenu() {
        //对左侧菜单进行缩放操作
        this.$store.commit('collapseChange')
      },

    async logout() {
    sessionStorage.clear()   //清除所有session值
      this.$router.push(`/`)
    }

    },
    computed: {
      ...mapState({
        tags: state => state.tab.tabsList
      })
    }

  }
</script>

<style scoped lang="less">
  .header-container {
    height: 60px;
    background-color:rgb(199, 219, 220);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .Index {
      color: #fff;
      font-size: 16px;
      margin-left: 10px;
      cursor: pointer;
    }

    .r-content {
      padding-right: 20px;

      .user_img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

    }

    .l-content {
      display: flex;
      align-items: center;

      /deep/.el-breadcrumb__item {
        .el-breadcrumb__inner {
          font-weight: normal;

          &.is-link {
            color: #666;
          }
        }

        &:last-child {
          .el-breadcrumb__inner {
            color: #fff;
          }
        }
      }
    }
  }
</style>
