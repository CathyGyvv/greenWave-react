import { observable, action, useStrict, computed } from 'mobx'

useStrict(true)

class UI {
  @observable data = {
    menuId: window.location.href.indexOf('tidal') > -1
      ? 2
      : window.location.href.indexOf('lane') > -1
        ? 1
        : 0
  }

  @observable foldSideBar = false
  @observable fullscreen = false
  // 列表点击index
  @observable activeIndex = 1
  // 请求状态
  //   @observable reqStatus = {
  //     listStatus: 'loading',
  //     loadMoreStatus: 'finish',
  //     planTableStatus:'loading'
  //   }

  //   @observable fullChart = {
  //     show: false,
  //     width: null,
  //     height: null
  //   }

  @computed get type () {
    const { menuId } = this.data

    return menuId === 0 ? 'ramp' : menuId === 1 ? 'lane' : 'tidal'
  }

  @action setMenu (id) {
    this.data.menuId = id
    // this.propertyReset()
    // rootStore.List.getAreaList()
    // rootStore.List.getList()
  }

  @action toggleFoldSideBar () {
    this.foldSideBar = !this.foldSideBar
  }

  @action toggleFullScreen () {
    this.fullscreen = !this.fullscreen
  }

  @action exitFullScreen () {
    this.fullscreen = false
  }

//   @action setFullChart(show,width,height){
//     this.fullChart = {
//       show,
//       width,
//       height
//     }
//   }

//   @action propertyReset(){

//     this.activeIndex = -1
//     rootStore.List.resetFilter()
//     rootStore.List.selectedList = {}

//   }

//   @action resetStatus = (type, status) => {
//     this.reqStatus[type] = status
//   };
}

const ui = new UI()

export default ui
