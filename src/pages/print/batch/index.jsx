import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Picker } from '@tarojs/components'
import TimeSelector from '@/components/timeSelector'

// import headerBg from '@/assets/imgs/header-bg.png'
// import exchangeIcon from '@/assets/imgs/center-exchange.png'
// import usIcon from '@/assets/imgs/center-us.png'

import api from '@/api'
import D from '@/common'
import './index.scss'

class Center extends Component {
  state = {
    current: '',
    schoolList: [],
    floorList: []
  }

  componentDidMount() {
    this.getSchoolList()
    this.getManagerSchoolList()
  }

  changeSchool = (e) => {
    // console.log(e)
    const { schoolList } = this.state

    const current = schoolList[e.detail.value].name

    this.setState({ current })
  }

  getSchoolList = async () => {
    // const { recordList } = this.state

    // const orderStatus = navList[current].status
    const userTypeDesc = Taro.getStorageSync('userTypeDesc')

    const { brandId, userId } = Taro.getStorageSync('userInfo')

    // let resultApi,
    //   query = { ...params, mobile: '', endTime: '', startTime: '', status: 1 }

    // switch (userTypeDesc) {
    //   case 'shop': // 商户端
    //     resultApi = api.finance.GET_SHOP_BILL_LIST
    //     query.brandId = brandId
    //     break
    //   case 'manager':
    //     resultApi = api.finance.GET_USER_BILL_LIST
    //     query.type = 0
    //     query.userId = userId
    //     break
    // }

    // Taro.showLoading({
    //   title: '加载中',
    //   icon: 'none'
    // })

    const query = {
      type: 4,
      relationId: brandId
    }

    const {
      data: { items = [] }
    } = await api.common.GET_SCHOOL_LIST(query)
    // console.log(data, count, 1000)
    // debugger
    let nList = items.map((item) => {
      // let num = 0
      // const goodsInfo = item.goodsList.map((goods) => {
      //   num += goods.number
      //   return goods.goodsName
      // })
      // // console.log(goodsInfo)
      // return {
      //   ...item,
      //   goodsInfo: goodsInfo.join('+'),
      //   goodsExplain: ` 等${num}件商品`
      // }
      return item
    })

    // nList = [...recordList, ...nList]

    // Taro.hideLoading()

    this.setState({ schoolList: nList })
  }

  getManagerSchoolList = async () => {
    // const { recordList } = this.state

    // const orderStatus = navList[current].status
    const userTypeDesc = Taro.getStorageSync('userTypeDesc')

    const { brandId, userId } = Taro.getStorageSync('userInfo')

    // let resultApi,
    //   query = { ...params, mobile: '', endTime: '', startTime: '', status: 1 }

    // switch (userTypeDesc) {
    //   case 'shop': // 商户端
    //     resultApi = api.finance.GET_SHOP_BILL_LIST
    //     query.brandId = brandId
    //     break
    //   case 'manager':
    //     resultApi = api.finance.GET_USER_BILL_LIST
    //     query.type = 0
    //     query.userId = userId
    //     break
    // }

    // Taro.showLoading({
    //   title: '加载中',
    //   icon: 'none'
    // })

    const query = {
      type: 1,
      adminId: userId
    }

    const {
      data: { items = [] }
    } = await api.common.GET_SCHOOL_LIST(query)
    // console.log(data, count, 1000)
    // debugger
    let nList = items.map((item) => {
      // let num = 0
      // const goodsInfo = item.goodsList.map((goods) => {
      //   num += goods.number
      //   return goods.goodsName
      // })
      // // console.log(goodsInfo)
      // return {
      //   ...item,
      //   goodsInfo: goodsInfo.join('+'),
      //   goodsExplain: ` 等${num}件商品`
      // }
      return item
    })

    // nList = [...recordList, ...nList]

    // Taro.hideLoading()

    this.setState({ schoolList: nList })
  }

  getFloorList = async () => {
    // const { recordList } = this.state

    // const orderStatus = navList[current].status
    const userTypeDesc = Taro.getStorageSync('userTypeDesc')

    const { brandId, userId } = Taro.getStorageSync('userInfo')

    // let resultApi,
    //   query = { ...params, mobile: '', endTime: '', startTime: '', status: 1 }

    // switch (userTypeDesc) {
    //   case 'shop': // 商户端
    //     resultApi = api.finance.GET_SHOP_BILL_LIST
    //     query.brandId = brandId
    //     break
    //   case 'manager':
    //     resultApi = api.finance.GET_USER_BILL_LIST
    //     query.type = 0
    //     query.userId = userId
    //     break
    // }

    // Taro.showLoading({
    //   title: '加载中',
    //   icon: 'none'
    // })

    const query = {
      brandId
    }

    const {
      data: { items = [] }
    } = await api.order.GET_FLOORLIST(query)
    // console.log(data, count, 1000)
    // debugger
    let nList = items.map((item) => {
      // let num = 0
      // const goodsInfo = item.goodsList.map((goods) => {
      //   num += goods.number
      //   return goods.goodsName
      // })
      // // console.log(goodsInfo)
      // return {
      //   ...item,
      //   goodsInfo: goodsInfo.join('+'),
      //   goodsExplain: ` 等${num}件商品`
      // }
      return item
    })

    // nList = [...recordList, ...nList]

    // Taro.hideLoading()

    this.setState({ floorList: nList })
  }

  getPrintList = async () => {
    const { data } = await api.print.GET_PRINT_LIST()

    this.setState({ printList: data })
  }

  printOrder = (id) => async () => {
    const { printList } = this.state
    const { brandId, userId } = Taro.getStorageSync('userInfo')

    if (!printList.length) {
      D.toast('请先添加打印机')
      return
    }

    const query = { brandId, buildingId: id, sn: printList[0].sn }

    const { errno } = await api.print.FETCH_PRINT(query)

    if (!errno) {
      D.toast('打印成功')
    }
  }

  render() {
    const { current, schoolList, floorList } = this.state

    return (
      <View className='index'>
        <View>
          <View className='plate'>
            <TimeSelector />
          </View>
          <View className='plate'>
            <Picker
              range={schoolList}
              mode='selector'
              range-key='name'
              onChange={this.changeSchool}
            >
              <View className='time-search__date-info'>{current || '请选择学校'}</View>
            </Picker>
          </View>
          {/* <View className='plate-title'>
            当日总单：1333
            <View className='plate-explain'>当日总单量：18888</View>
          </View> */}

          {/* <View className='plate-option'>
            <View className='plate-option__title'>
              <View className='plate-option__title-name'>黄焖鸡米饭</View>
              <View className='plate-option__title-sale'>销量：10</View>
            </View>
            <View className='plate-option__num'>单量：16</View>
          </View> */}
          {/* <View className='plate-option'>
            <View className='plate-option__title'>
              <View className='plate-option__title-name'>1号楼</View>
              <View className='plate-option__title-sale'>单量：16</View>
            </View>
            <View className='plate-option__btn' onClick={this.printOrder(item.buildingId)}>批量打印</View>
          </View> */}
        </View>
      </View>
    )
  }
}

export default Center
