import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/common/Home.vue'
import AdminList from '@/components/pages/admin/AdminList.vue'
import UserList from '@/components/pages/user/UserList.vue'
import TravelList from '@/components/pages/travel/TravelList.vue'
import ScenicList from '@/components/pages/scenic/ScenicList.vue'
import ScenicHot from '@/components/pages/scenic/ScenicHot.vue'
import Index from '@/components/pages/Index.vue'
import Register from '@/components/common/Register.vue'
import Shoye from '@/components/common/Shoye.vue'

import BaiduView from '@/components/common/BaiduView.vue'

import LoginNew from '@/components/common/LoginNew.vue'
import Upload from '@/components/pages/demo/Upload.vue'


import Front from '@/components/pages/Front/Front.vue'
import FoodHot from '@/components/pages/food/FoodHot.vue'
import FoodList from '@/components/pages/food/FoodList.vue'
import FoodCategory from '@/components/pages/food/FoodCategory.vue'


import FoodListUser from '@/components/pages/foodUser/FoodListUser.vue'
import FoodCategoryUser from '@/components/pages/foodUser/FoodCategoryUser.vue'
import FoodHotUser from '@/components/pages/foodUser/FoodHotUser.vue'



import TrafficList from '@/components/pages/traffic/TrafficList.vue'
import TravelListUser from '@/components/pages/travelUser/TravelListUser.vue'


import HotelList from '@/components/pages/hotel/HotelList.vue'
import HotelListUser from '@/components/pages/hotelUser/HotelListUser.vue'
import ProvinceList from '@/components/pages/province/ProvinceList.vue'
import ProvinceListUser from '@/components/pages/provinceUser/ProvinceListUser.vue'

import FrontTravel from '@/components/pages/front/travel/FrontTravel.vue'

import FrontScenic from '@/components/pages/front/scenic/FrontScenic.vue'
import FrontHotel from '@/components/pages/front/hotel/FrontHotel.vue'
import FrontFood from '@/components/pages/front/food/FrontFood.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/LoginNew',
      name: 'LoginNew',
      component: () => import( "../components/common/LoginNew"),
    },
    {
      path: '/Register',
      name: 'register',
      component: () => import( "../components/common/Register"),
    },
    {
      path: '/',
      name: 'shoye',
      component: () => import( "../components/common/Shoye"),
    },

    {
      path: '/Home',
      name: 'Home',
      component: Home,

      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import( "../components/pages/Index"),
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
          path: '/HotelListUser',
          name: 'hotelListUser',
          component: HotelListUser
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
          path: '/FoodListUser',
          name: 'foodListUser',
          component: FoodListUser
        },
        {
          path: '/FoodCategoryUser',
          name: 'foodCategoryUser',
          component: FoodCategoryUser
        },
        {
          path: '/FoodHotUser',
          name: 'foodHotUser',
          component: FoodHotUser
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
        },
        {
          path: '/BaiduView',
          name: 'baiduView',
          component: BaiduView
        },
        {
          path: '/TravelListUser',
          name: 'travelListUser',
          component: TravelListUser
        },
        {
          path: '/ProvinceListUser',
          name: 'provinceListUser',
          component: ProvinceListUser
        },
      ]
    },
      {
          path: '/Front',
          name: 'front',
          component: Front,
          // redirect: '/frontTravel',
          children: [{
              path: '/frontTravel',
              name: 'frontTravel',
              component: FrontTravel
            },
            {
              path: '/frontScenic',
              name: 'frontScenic',
              component: FrontScenic
            },
            {
              path: '/frontHotel',
              name: 'frontHotel',
              component: FrontHotel
            },
            {
              path: '/frontFood',
              name: 'frontFood',
              component: FrontFood
            },
          ]
        }

  ]
})



