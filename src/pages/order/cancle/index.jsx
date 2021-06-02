import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Text, Button } from '@tarojs/components'

import t1 from '@/assets/imgs/test1.jpg'

import './index.scss'

class OrderDetail extends Component {
  state = {
    goodsList: [
      {
        price: 1,
        pic: t1,
        title: '蔬菜'
      },
      {
        price: 1,
        pic: t1,
        title: '蔬菜'
      },
      {
        price: 1,
        pic: t1,
        title: '蔬菜'
      },
      {
        price: 1,
        pic: t1,
        title: '蔬菜'
      },
      {
        price: 1,
        pic: t1,
        title: '蔬菜'
      }
    ]
  }

  onConfirm = () => {
    Taro.navigateTo({ url: 'goods/list' })
  }

  render() {
    const { goodsList } = this.state

    return (
      <View className='index'>
        <View className='header'>
          <View className='header-status'>已付款</View>
        </View>
        <View className='user-container'>
          <View className='user-option'>namenamenamenamenamename</View>
          <View className='user-option'>13788954223</View>
          <View className='user-option__address'>
            <View className='at-icon at-icon-map-pin'></View>
            上海市
          </View>
        </View>
        <View className='goods-container'>
          <View className='common-title'>商品信息</View>
          <View className='goods-content'>
            {goodsList &&
              goodsList.map((goods) => {
                return (
                  <View key={goods.url} className='goods-item'>
                    <Image src={goods.pic} mode='aspectFill' className='goods-img'></Image>
                    <View className='goods-info'>
                      <View className='goods-info__title'>
                        {goods.title}
                        <Text className='goods-info__title-price'>￥{goods.price}</Text>
                      </View>
                      <View className='goods-info__detail'>
                        <View>
                          <Text className='goods-info__tag'>{goods.title}</Text>
                        </View>
                        <View>
                          <Text className='goods-info__num'>X1</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )
              })}
          </View>
        </View>
        <View className='detail-container'>
          <View className='common-title'>价格信息</View>
          <View className='detail-option'>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>优惠金额</View>
              <View>￥1400</View>
            </View>
          </View>
          <View className='total-container'>
            <Text className='total-item'>共1件</Text>
            <Text className='total-item'>合计：32.00</Text>
          </View>
        </View>
        <View className='detail-container'>
          <View className='common-title'>订单信息</View>
          <View className='detail-option'>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>下单日期</View>
              <View>2021-04-21</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>订单编号</View>
              <View>2021132121</View>
            </View>
          </View>
        </View>
        <View className='footer'>
          <Button className='footer-btn'>取消订单</Button>
          <Button className='footer-btn'>再次购买</Button>
        </View>
      </View>
    )
  }
}

export default OrderDetail
