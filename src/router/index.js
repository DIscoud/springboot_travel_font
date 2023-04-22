import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/common/Home.vue'
import AdminList from '@/components/pages/admin/AdminList.vue'
import UserList from '@/components/pages/user/UserList.vue'
import TravelList from '@/components/pages/travel/TravelList.vue'
import ScenicList from '@/components/pages/scenic/ScenicList.vue'
import ScenicHot from '@/components/pages/scenic/ScenicHot.vue'
import Index from '@/components/pages/Index.vue'
import Login from '@/components/common/Login.vue'
import Upload from '@/components/pages/demo/Upload.vue'
import Front from '@/components/pages/Front/Front.vue'
import FoodList from '@/components/pages/food/FoodList.vue'
import FoodCategory from '@/components/pages/food/FoodCategory.vue'
import TrafficList from '@/components/pages/traffic/TrafficList.vue'
import FoodHot from '@/components/pages/food/FoodHot.vue'
import HotelList from '@/components/pages/hotel/HotelList.vue'
import ProvinceList from '@/components/pages/province/ProvinceList.vue'

import FrontTravel from '@/components/pages/front/travel/FrontTravel.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',//主路由
      component: Home,
      redirect: 'Index',
      children: [//嵌套子路由
        {
          path: '/Index',
          name: 'index',
          component: Index
        },
        {
          path: '/AdminList',
          name: 'adminList',
          component: AdminList
        },
        {
          path: '/UserList',
          name: 'userList',
          component: UserList
        },
        {
          path: '/TravelList',
          name: 'travelList',
          component: TravelList
        },
        {
          path: '/ScenicList',
          name: 'scenicList',
          component: ScenicList
        },
        {
          path: '/ScenicHot',
          name: 'scenicHot',
          component: ScenicHot
        },
        {
          path: '/Upload',
          name: 'upload',
          component: Upload
        },
        {
          path: '/HotelList',
          name: 'hotelList',
          component: HotelList
        },
        {
          path: '/FoodList',
          name: 'foodList',
          component: FoodList
        },
        {
          path: '/FoodCategory',
          name: 'foodCategory',
          component: FoodCategory
        },
        {
          path: '/FoodHot',
          name: 'foodHot',
          component: FoodHot
        },
        {
          path: '/TrafficList',
          name: 'trafficList',
          component: TrafficList
        },
        {
          path: '/ProvinceList',
          name: 'provinceList',
          component: ProvinceList
        }

      ]
    },
    {
      path: '/Login',
      name: 'login',//主路由
      component: Login,
    },
    {
      path: '/Front',
      name: 'front',//主路由
      component: Front,
    }
  ]
})


