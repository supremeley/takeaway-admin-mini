import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Text, Input, ScrollView } from '@tarojs/components'
import Default from '@/components/default'
import BottomText from '@/components/bottomText'

import api from '@/api'
import D from '@/common'
import withScrollPage from '@/hoc/scrollPage'

import PrintIcon from '@/assets/imgs/print-icon.png'

import 'taro-ui/dist/style/components/icon.scss'
import './index.scss'

class OrderList extends Component {
  state = {
    current: 0,
    total: 0,
    navList: [
      { status: 0, title: '全部' },
      { status: 201, title: '待配送' },
      { status: 301, title: '待收货' },
      { status: 203, title: '退款' }
    ],
    orderList: []
  }

  componentDidShow() {
    this.resetPage(async () => {
      await this.nextPage()
      await this.getPrintList()
    })
  }

  // 下拉加载
  onReachBottom = () => {
    const { pageParams } = this.state
    // debugger
    !pageParams.isLoading && pageParams.hasNext && this.nextPage()
  }

  handleStatus = (status) => {
    switch (status) {
      case 101:
        return '未付款'
      case 102:
        return '已取消'
      case 201:
        return '已付款'
      case 202:
        return '退款中'
      case 203:
        return '已退款'
      case 206:
        return '打印后已出单'
      case 301:
        return '配送中'
      case 401:
        return '已收货'
      case 501:
        return '申请售后'
      case 502:
        return '售后完成'
      default:
        return ''
    }
  }

  fetch = async (params) => {
    const { total } = await this.getOrderList(params)

    return { total }
  }

  onJump = (id) => () => {
    Taro.navigateTo({ url: `/pages/order/detail/index?id=${id}` })
  }

  onClipboard = (data) => {
    Taro.setClipboardData({ data })
  }

  checkTab = (index) => () => {
    this.setState({ current: index, orderList: [] }, () => {
      this.resetPage(this.nextPage)
    })
  }

  printOrder = async (id) => {
    const { printList } = this.state

    if (!printList.length) {
      D.toast('请先添加打印机')
      return
    }

    const query = { orderId: id, sn: printList[0].sn }
    // const query = { brandId: id, sn: 960802344 }

    const { errno } = await api.print.FETCH_PRINT(query)

    if (!errno) {
      D.toast('打印成功')
    }
  }

  getOrderList = async (params) => {
    const { current, navList, orderList } = this.state

    const orderStatusArray = navList[current].status

    const query = {
      ...params,
      orderStatusArray
    }

    if (!orderStatusArray) delete query.orderStatusArray

    Taro.showLoading({
      title: '加载中',
      icon: 'none'
    })

    const {
      data: { items = [], total }
    } = await api.order.GET_ORDER_LIST(query)
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

    nList = [...orderList, ...nList]

    Taro.hideLoading()

    this.setState({ orderList: nList, total })

    return { total }
  }

  getPrintList = async () => {
    const { data } = await api.print.GET_PRINT_LIST()

    this.setState({ printList: data })
  }

  render() {
    const { pageParams, total, current, navList, orderList } = this.state

    const Order =
      orderList &&
      orderList.map((item) => {
        return (
          <View className='order-item' key={item.id} onClick={this.onJump(item.id)}>
            <View className='order-item__content'>
              <View className='order-item__content-header'>
                <View className='order-item__content-header__no'>{item.orderSn}</View>
                <View className='order-item__content-header__status'>
                  {this.handleStatus(item.orderStatus)}
                </View>
              </View>
              {/* <View className='order-item__content-time'>送货时间: 2021-05-08 12:26</View> */}
              {/* <View className='order-item__content-remark'>退款原因：同学要求撤单</View> */}
            </View>
            <View className='order-item__content'>
              <View className='order-item__content-user'>
                <Text className='order-item__content-user__name'>{item.consignee}</Text>
                <Text className='order-item__content-user__phone'>{item.mobile}</Text>
              </View>
              <View className='order-item__content-address'>{item.address}</View>
            </View>
            <View className='order-item__content'>
              <View className='order-item__content-total'>
                {/* <Text className='order-item__content-total__info'>3种商品，共3件</Text> */}
                <Text className='order-item__content-total__detail'>实付￥{item.actualPrice}</Text>
              </View>
            </View>
            {/* <View className='order-item__content'>
              <View className='order-item__content-goods'>
                <View className='order-item__content-goods__name'>豆奶</View>
                <View className='order-item__content-goods__info'>
                  <View className='order-item__content-goods__info-num'>x1</View>
                  <View className='order-item__content-goods__info-price'>$24.72</View>
                </View>
              </View>
              <View className='order-item__content-goods'>
                <View className='order-item__content-goods__name'>豆奶</View>
                <View className='order-item__content-goods__info'>
                  <View className='order-item__content-goods__info-num'>x1</View>
                  <View className='order-item__content-goods__info-price'>$24.72</View>
                </View>
              </View>
            </View> */}
            <View className='order-item__content'>
              <View className='order-item__content-print'>下单：{item.addTime}</View>
              <View className='order-item__content-print'>
                单号：{item.orderSn}
                <Text
                  className='order-item__content-print__cilp'
                  onClick={(e) => {
                    e.stopPropagation()
                    this.onClipboard(item.orderSn)
                  }}
                >
                  复制
                </Text>
              </View>
              <View
                className='order-item__content-print__btn'
                onClick={(e) => {
                  e.stopPropagation()
                  this.printOrder(item.id)
                }}
              >
                <Image
                  src={PrintIcon}
                  mode='aspectFit'
                  className='order-item__content-print__btn-icon'
                ></Image>
                <View>打印订单</View>
              </View>
            </View>
            <View className='order-item__footer'>
              {/* <View className='order-item__footer-btn-box'>
                <View className='order-item__footer-btn'>确认完成</View>
              </View> */}
              {/* <View className='order-item__footer-show'>
                收起
                <View className='at-icon at-icon-chevron-down'></View>
              </View> */}
            </View>
          </View>
        )
      })

    return (
      <View className='index'>
        <View className='container'>
          <View className='search-container'>
            <View className='header-search' onClick={this.onJupmToList}>
              <View className='at-icon at-icon-search'></View>
              <Input
                type='text'
                placeholder='请输入订单号或客户手机号'
                onChange={this.onChange}
                onConfirm={this.onConfirm}
              />
            </View>
          </View>

          <ScrollView scrollX enableFlex className='nav-container'>
            {navList &&
              navList.map((item, index) => {
                return (
                  <View key={item.title} className='nav-item' onClick={this.checkTab(index)}>
                    <Text className={`nav-item-text ${current === index ? 'active' : ''}`}>
                      {item.title}
                    </Text>
                  </View>
                )
              })}
          </ScrollView>
        </View>

        <View className='order-container'>{Order}</View>
        {total > 0 && !pageParams.isLoading && !pageParams.hasNext && <BottomText />}
        {!total && !pageParams.isLoading && !pageParams.hasNext && <Default />}
      </View>
    )
  }
}

export default withScrollPage(OrderList)
