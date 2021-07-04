import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View } from '@tarojs/components'
import Default from '@/components/default'
import BottomText from '@/components/bottomText'

import api from '@/api'
import D from '@/common'
import withScrollPage from '@/hoc/scrollPage'

import './index.scss'

class FinanceDetail extends Component {
  state = {
    total: 0,
    current: 0,
    navList: [
      // {
      //   title: '待入账',
      //   status: '1'
      // },
      // {
      //   title: '已入账',
      //   status: '2'
      // }
    ],
    recordList: []
  }

  componentDidMount() {
    this.nextPage()
  }

  // 下拉加载
  onReachBottom = () => {
    const { pageParams } = this.state
    // debugger
    !pageParams.isLoading && pageParams.hasNext && this.nextPage()
  }

  checkTab = (index) => () => {
    this.setState({ current: index })
  }

  fetch = async (params) => {
    const { total } = await this.getRecordList(params)

    return { total }
  }

  getRecordList = async (params) => {
    const { recordList } = this.state

    // const orderStatus = navList[current].status
    const userTypeDesc = Taro.getStorageSync('userTypeDesc')

    const { brandId, userId } = Taro.getStorageSync('userInfo')

    let resultApi,
      query = { ...params, mobile: '', endTime: '', startTime: '', status: 0 }

    switch (userTypeDesc) {
      case 'shop': // 商户端
        resultApi = api.finance.GET_SHOP_BILL_LIST
        query.brandId = brandId
        break
      case 'manager':
        resultApi = api.finance.GET_USER_BILL_LIST
        query.type = 0
        query.userId = userId
        break
    }

    Taro.showLoading({
      title: '加载中',
      icon: 'none'
    })

    const {
      data: { items = [], total }
    } = await resultApi(query)
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

    nList = [...recordList, ...nList]

    Taro.hideLoading()

    this.setState({ recordList: nList, total })

    return { total }
  }

  render() {
    const { pageParams, total, current, navList, recordList } = this.state

    return (
      <View className='index'>
        {/* <View className='nav'>
          {navList &&
            navList.map((item, index) => {
              return (
                <View
                  key={index}
                  className={`nav-item ${current === index ? 'active-item' : ''}`}
                  onClick={this.checkTab(index)}
                >
                  {item.title}
                </View>
              )
            })}
        </View> */}
        <View className='list'>
          {/* <View className='list-item'>
            <View className='list-item__left'>
              <View className='list-item__left-title'>订单2011111111</View>
              <View className='list-item__left-date'>2021-05-17</View>
              <View className='list-item__left-desc'>2101515155</View>
            </View>
            <View className='list-item__right'>
              <View className='list-item__right-price'>￥1800</View>
            </View>
          </View> */}
        </View>
        {total > 0 && !pageParams.isLoading && !pageParams.hasNext && <BottomText />}
        {!total && !pageParams.isLoading && !pageParams.hasNext && <Default />}
      </View>
    )
  }
}

export default withScrollPage(FinanceDetail)
