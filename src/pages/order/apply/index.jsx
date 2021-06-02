import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Text, Input, ScrollView } from '@tarojs/components'

import PrintIcon from '@/assets/imgs/print-icon.png'

import 'taro-ui/dist/style/components/icon.scss'
import './index.scss'

class OrderApply extends Component {
  state = {
    current: 0,
    navList: [
      { url: '', title: '待配送' },
      { url: '', title: '待收货' },
      { url: '', title: '退款' }
      // { url: '', title: '配送中' },
      // { url: '', title: '已完成' },
      // { url: '', title: '已取消' }
    ],
    orderList: [
      {
        price: 1,
        id: 1,
        pic: PrintIcon,
        title: '蔬菜'
      },
      {
        price: 1,
        pic: PrintIcon,
        title: '蔬菜'
      },
      {
        price: 1,
        pic: PrintIcon,
        title: '蔬菜'
      },
      {
        price: 1,
        pic: PrintIcon,
        title: '蔬菜'
      },
      {
        price: 1,
        pic: PrintIcon,
        title: '蔬菜'
      }
    ]
  }

  onJump = (id) => () => {
    Taro.navigateTo({ url: `/pages/order/detail/index?id=${id}` })
  }

  handleClick = (index) => () => {
    this.setState({ current: index })
  }

  render() {
    const { current, navList, orderList, goodsList } = this.state

    const Order =
      orderList &&
      orderList.map((item) => {
        return (
          <View className='order-item' key={item.id} onClick={this.onJump(item.id)}>
            <View className='order-item__content'>
              <View className='order-item__content-header'>
                <View className='order-item__content-header__no'>#3</View>
                <View className='order-item__content-header__status'>等待支付</View>
              </View>
              <View className='order-item__content-time'>送货时间: 2021-05-08 12:26</View>
              <View className='order-item__content-remark'>退款原因：同学要求撤单</View>
            </View>
            <View className='order-item__content'>
              <View className='order-item__content-user'>
                <Text className='order-item__content-user__name'>用户123</Text>
                <Text className='order-item__content-user__phone'>13710000000</Text>
              </View>
              <View className='order-item__content-address'>上海大学1号楼104</View>
            </View>
            <View className='order-item__content'>
              <View className='order-item__content-total'>
                <Text className='order-item__content-total__info'>3种商品，共3件</Text>
                <Text className='order-item__content-total__detail'>实付￥24.72</Text>
              </View>
            </View>
            <View className='order-item__content'>
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
            </View>
            <View className='order-item__content'>
              <View className='order-item__content-print'>下单：21-05-30 12：50</View>
              <View className='order-item__content-print'>
                单号：210530125033333
                <Text className='order-item__content-print__cilp' onClick={this.onClipboard}>
                  复制
                </Text>
              </View>
              {/* <View className='order-item__content-print__btn'>
                <Image
                  src={PrintIcon}
                  mode='aspectFit'
                  className='order-item__content-print__btn-icon'
                ></Image>
                <View>批量打印</View>
              </View> */}
            </View>
            <View className='order-item__footer'>
              <View className='order-item__footer-btn-box'>
                <View className='order-item__footer-btn'>审核确认</View>
              </View>
              <View className='order-item__footer-show'>
                收起
                <View className='at-icon at-icon-chevron-down'></View>
              </View>
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

          {/* <ScrollView scrollX enableFlex className='nav-container'>
            {navList &&
              navList.map((item, index) => {
                return (
                  <View key={item.title} className='nav-item' onClick={this.handleClick(index)}>
                    <Text className={`nav-item-text ${current === index ? 'active' : ''}`}>
                      {item.title}
                    </Text>
                  </View>
                )
              })}
          </ScrollView> */}
        </View>

        <View className='order-container'>{Order}</View>
      </View>
    )
  }
}

export default OrderApply
