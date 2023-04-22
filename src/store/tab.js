export default {
  state: {
    //控制菜单栏的状态
    isCollapse: false,
    tabsList: [//面包屑数据
      {
        path: '/',
        name: 'main',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      },
    ]
  },
  mutations: {
    collapseChange(state) {
      state.isCollapse = !state.isCollapse
    },
    menuChange(state, val) {
      //更新面包屑的数据(val菜单对象数据)
      if (val.name != 'main') {
        const index = state.tabsList.findIndex(item => item.name === val.name)
        if (index === -1) {
          state.tabsList.push(val)
        }

      }

    },
    closeTag(state, val) {
      //获取需要移除的面包屑数据的索引
      const index = state.tabsList.findIndex(item => item.name === val.name)
      //根据索引删除集合的数据
      state.tabsList.splice(index, 1)
    }

  },

}
