import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Text, Button, Textarea } from '@tarojs/components'

import UploadIcon from '@/assets/imgs/upload-icon.png'

import api from '@/api'

import 'taro-ui/dist/style/components/icon.scss'
import './index.scss'

class OrderDetail extends Component {
  state = {
    info: null,
    goodsList: [],
    imgList: []
  }

  componentDidShow() {
    this.getOrderDetail()
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

  onPhone = () => {
    const { shopInfo } = this.state

    Taro.makePhoneCall({ phoneNumber: shopInfo.phone })
  }

  getOrderDetail = async () => {
    const query = { id: this.id }

    const {
      data: { orderGoods: goodsList, order: info }
    } = await api.order.GET_ORDER_DETAIL(query)

    this.setState({ info, goodsList })
  }

  upLoadImg = async () => {
    let { imgList } = this.state

    const res = await Taro.chooseImage({ count: 3, sourceType: 'album' })
    // console.log(res)
    const img = res.tempFilePaths

    imgList = imgList.concat()

    imgList.push(...img)

    imgList = imgList.slice(0, 3)
    // console.log(imgList)
    this.setState({ imgList })

    const imgRequest = imgList.map((item) => {
      return api.common.UPLOAD_IMG(item)
    })

    console.log(imgRequest)

    const result = await Promise.all(imgRequest)

    console.log(result)
  }

  delImg = (index) => () => {
    let { imgList } = this.state

    imgList = imgList.concat()

    imgList.splice(index, 1)

    this.setState({ imgList })
  }

  get id() {
    return this.route.params.id
  }

  get route() {
    return getCurrentInstance().router
  }

  render() {
    const { info, goodsList, imgList } = this.state

    if (!info) return null

    const { actualPrice, orderStatus, orderSn, addTime, address, consignee, mobile } = info

    return (
      <View className='index'>
        <View className='header'>
          <View className='header-status'>
            <Text className='header-status-text'>{this.handleStatus(orderStatus)}</Text>
            <Text>（记得好好吃饭鸭~）</Text>
          </View>
        </View>
        <View className='shop-container'>
          {/* <View className='shop-header'>
            <Image src={user.avatar} mode='aspectFill' className='shop-header__avatar'></Image>
            <View className='shop-header__name'>{user.nickname}</View>
          </View> */}
          <View className='shop-plate'>
            {goodsList &&
              goodsList.map((goods) => {
                return (
                  <View key={goods.id} className='shop-plate__item'>
                    <View className='shop-plate__item-title'>
                      {/* <Text className='shop-plate__item-title__tag red-tag'>折</Text> */}
                      <Text className='shop-plate__item-title__name'>{goods.goodsName}</Text>
                      {goods.specifications &&
                        goods.specifications.map((val) => {
                          return (
                            <>
                              {val != '默认' && (
                                <Text key={val} className='shop-plate__item-title__spe'>
                                  ({val})
                                </Text>
                              )}
                            </>
                          )
                        })}
                    </View>
                    <View className='shop-plate__item-price hava-num'>
                      <View className='shop-plate__item-num'>x{goods.number}</View>
                      <View className='shop-plate__item-price__num'>
                        {/* <View className='shop-plate__item-price__line'>￥6</View> */}￥
                        {goods.price}
                      </View>
                    </View>
                  </View>
                )
              })}
          </View>
          <View className='shop-plate'>
            <View className='shop-plate__item'>
              <View className='shop-plate__item-title'>
                <Text className='shop-plate__item-title__tag green-tag'>打包</Text>
                打包费
              </View>
              <View className='shop-plate__item-price'>￥5</View>
            </View>
            <View className='shop-plate__item'>
              <View className='shop-plate__item-title'>
                <Text className='shop-plate__item-title__tag blue-tag'>配送</Text>
                配送费
              </View>
              <View className='shop-plate__item-price'>￥5</View>
            </View>
            {/* <View className='shop-plate__item'>
              <View className='shop-plate__item-title'>
                <Text className='shop-plate__item-title__tag red-d-tag'>新客</Text>
                新客费
              </View>
              <View className='shop-plate__item-price'>￥5</View>
            </View> */}
            {/* <View className='shop-plate__item'>
              <View className='shop-plate__item-title'>平台抵扣券</View>
              <View className='shop-plate__item-price'>￥5</View>
            </View>
            <View className='shop-plate__item'>
              <View className='shop-plate__item-title explain'>优惠券xxxx</View>
            </View> */}
          </View>
          <View className='shop-plate'>
            <View className='shop-plate__item'>
              {/* <View className='shop-plate__item-title'>已为您节省￥11</View> */}
              <View className='shop-plate__item-price'>
                <View className='shop-plate__item-price__num'>
                  总计
                  <View className='red'>￥{actualPrice}</View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className='detail-container'>
          <View className='detail-option'>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>订单号</View>
              <View>{orderSn}</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>期望送达时间</View>
              <View>{addTime}</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>支付方式</View>
              <View>在线支付</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>配送方式</View>
              <View>外卖到寝</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>收货人</View>
              <View>{consignee}</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>收货电话</View>
              <View>{mobile}</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>收货地址</View>
              <View>{address}</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>下单时间</View>
              <View>{addTime}</View>
            </View>
          </View>
        </View>
        <View className='content'>
          <View className='content-title'>退款原因</View>
          <View className='content-inp'>
            <View className='con-placeholder'>补充详细退款原因，有助于商家更好的处理售后问题</View>
          </View>
          <View className='content-img-box'>
            {imgList.length > 0 &&
              imgList.map((item) => {
                return (
                  <View key={item} className='upload-box'>
                    <Image src={item} mode='aspectFill' className='upload-box-img'></Image>
                    <View className='at-icon at-icon-subtract' onClick={this.delImg(index)}></View>
                  </View>
                )
              })}
            {imgList.length < 3 && (
              <View className='content-upload' onClick={this.upLoadImg}>
                <Image src={UploadIcon} mode='aspectFill' className='content-upload-icon'></Image>
                <Text>上传凭证</Text>
                <Text>（最多3张）</Text>
              </View>
            )}
          </View>
        </View>
        <View className='content'>
          <View className='content-title'>楼长反馈</View>
          <View className='content-inp'>
            <Textarea
              placeholder='补充详细退款原因，有助于商家更好的处理售后问题'
              placeholderClass='con-placeholder'
            />
          </View>
          <View className='content-img-box'>
            {imgList.length > 0 &&
              imgList.map((item, index) => {
                return (
                  <View key={item} className='upload-box'>
                    <Image src={item} mode='aspectFill' className='upload-box-img'></Image>
                    <View className='at-icon at-icon-subtract' onClick={this.delImg(index)}></View>
                  </View>
                )
              })}
            {imgList.length < 3 && (
              <View className='content-upload' onClick={this.upLoadImg}>
                <Image src={UploadIcon} mode='aspectFill' className='content-upload-icon'></Image>
                <Text>上传凭证</Text>
                <Text>（最多3张）</Text>
              </View>
            )}
          </View>
        </View>
        <View className='content'>
          <View className='content-title'>
            责任归属
            <Text className='content-title__tag'>（必选）</Text>
          </View>
          <View className='content-option'>
            <View className='content-option__item'>楼长</View>
            <View className='content-option__item active-item'>商家</View>
          </View>
        </View>
        <View className='footer'>
          {/* <Button className='footer-btn'>提交审核</Button> */}
          <Button className='footer-btn-shop'>驳回</Button>
          <Button className='footer-btn-shop active-item'>同意</Button>
        </View>
      </View>
    )
  }
}

export default OrderDetail
