import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Button } from '@tarojs/components'

import api from '@/api'

import t1 from '@/assets/imgs/test1.png'
import headerBg from '@/assets/imgs/header-bg.png'

import './index.scss'

class Login extends Component {
  state = {}

  async componentDidMount() {}

  getUserInfo = async () => {
    try {
      const e = await Taro.getUserProfile({
        desc: '用于完善会员资料'
      })

      console.log(e)

      const { errMsg, ...params } = e
      const {
        // cloudID, encryptedData, iv, rawData, signature,
        userInfo
      } = params

      this.login(userInfo)
    } catch (e) {
      console.log(e)
    }
  }

  handleGetPhoneNumber = async (e) => {
    const { errMsg, ...params } = e.detail

    if (errMsg === 'getPhoneNumber:ok') {
      const { cloudID, encryptedData, iv } = params
      console.log(cloudID, encryptedData, iv)
    }
  }

  login = async (userInfo) => {
    const { code } = await Taro.login()

    const {
      errno,
      data: { token, userInfo: user }
    } = await api.user.WECHAT_LOGIN({ code, userInfo })

    // console.log(errno, data)
    Taro.setStorageSync('userInfo', user)
    Taro.setStorageSync('token', token)
    Taro.setStorageSync('openid', userInfo.weixinOpenid)
    Taro.setStorageSync('userId', userInfo.userId)

    // Taro.navigateTo()
  }

  render() {
    const {} = this.state

    return (
      <View className='index'>
        <View className='header'>
          <Image src={headerBg} mode='aspectFill' className='header-bg'></Image>
          <View className='header-container'>
            <View className='at-icon at-icon-chevron-left' onClick={this.goBack}></View>
          </View>
          <View class='title'>
            <View class='title-name'>吃饭鸭</View>
            <View class='title-explain'>今天也要记得吃饭鸭~</View>
          </View>
        </View>
        <View className='content'>
          {/* <View>
            <View></View>
            <Button
              type='primary'
              lang='zh_CN'
              openType='getPhoneNumber'
              onGetPhoneNumber={this.handleGetPhoneNumber}
            >
              获取手机号
            </Button>
          </View> */}

          <Button lang='zh_CN' class='login-btn' onClick={this.getUserInfo}>
            确认登录
          </Button>
        </View>
      </View>
    )
  }
}

export default Login
