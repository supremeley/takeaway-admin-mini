import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Text, Button, Textarea } from '@tarojs/components'

import t1 from '@/assets/imgs/test1.png'
import UploadIcon from '@/assets/imgs/upload-icon.png'

import api from '@/api'

import 'taro-ui/dist/style/components/icon.scss'
import './index.scss'

class OrderDetail extends Component {
  state = {
    info: null,
    imgList: []
  }

  onConfirm = () => {
    Taro.navigateTo({ url: 'goods/list' })
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

  render() {
    const { info, imgList } = this.state

    // if (!info) return null

    return (
      <View className='index'>
        <View className='header'>
          <View className='header-status'>
            <Text className='header-status-text'>订单已完成</Text>
            <Text>（记得好好吃饭鸭~）</Text>
          </View>
        </View>
        <View className='shop-container'>
          <View className='shop-header'>
            <Image src={t1} mode='aspectFill' className='shop-header__avatar'></Image>
            <View className='shop-header__name'>光明鲜奶屋</View>
            <View className='at-icon at-icon-chevron-right'></View>
          </View>
          <View className='shop-plate'>
            <View className='shop-plate__item'>
              <View className='shop-plate__item-title'>
                <Text className='shop-plate__item-title__tag red-tag'>折</Text>
                豆奶
              </View>
              <View className='shop-plate__item-price hava-num'>
                <View className='shop-plate__item-num'>x1</View>
                <View className='shop-plate__item-price__num'>
                  <View className='shop-plate__item-price__line'>￥6</View>
                  ￥5
                </View>
              </View>
            </View>
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
            <View className='shop-plate__item'>
              <View className='shop-plate__item-title'>
                <Text className='shop-plate__item-title__tag red-d-tag'>新客</Text>
                新客费
              </View>
              <View className='shop-plate__item-price'>￥5</View>
            </View>
            <View className='shop-plate__item'>
              <View className='shop-plate__item-title'>平台抵扣券</View>
              <View className='shop-plate__item-price'>￥5</View>
            </View>
            <View className='shop-plate__item'>
              <View className='shop-plate__item-title explain'>优惠券xxxx</View>
            </View>
          </View>
          <View className='shop-plate'>
            <View className='shop-plate__item'>
              <View className='shop-plate__item-title'>已为您节省￥11</View>
              <View className='shop-plate__item-price'>
                <View className='shop-plate__item-price__num'>
                  总计
                  <View className='red'>￥5</View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className='detail-container'>
          <View className='detail-option'>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>订单号</View>
              <View>2021132121</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>期望送达时间</View>
              <View>2021-05-11 07:00-07:30</View>
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
              <View>收货人</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>收货电话</View>
              <View>13788954223</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>楼栋号</View>
              <View>二期公寓3号楼</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>楼层</View>
              <View>7</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>门牌号</View>
              <View>713</View>
            </View>
            <View className='detail-option__item'>
              <View className='detail-option__item-title'>下单时间</View>
              <View>2021-05-11 07:00-07:30</View>
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
                    {/* <View className='at-icon at-icon-subtract' onClick={this.delImg(index)}></View> */}
                  </View>
                )
              })}
            {/* {imgList.length < 3 && (
              <View className='content-upload' onClick={this.upLoadImg}>
                <Image src={UploadIcon} mode='aspectFill' className='content-upload-icon'></Image>
                <Text>上传凭证</Text>
                <Text>（最多3张）</Text>
              </View>
            )} */}
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
