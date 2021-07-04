import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Button } from '@tarojs/components'

import api from '@/api'
import D from '@/common'

import headerBg from '@/assets/imgs/header-bg.png'

import './index.scss'

class Login extends Component {
  state = {
    code: ''
  }

  async componentDidMount() {
    // const code = Taro.getStorageSync('code')
    const { code } = await Taro.login()

    this.setState({ code })
  }

  goBack = () => {
    Taro.navigateBack()
  }

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
    const { code } = this.state
    const { errMsg, ...params } = e.detail

    if (errMsg === 'getPhoneNumber:ok') {
      const { encryptedData, iv } = params
      // console.log(encryptedData, iv)
      const res = await Taro.checkSession()

      console.log(res)

      // let code

      // if ((res.errMsg = 'checkSession:ok')) {
      // } else {
      //   const logRes = await Taro.login()
      //   code = logRes.code
      // }

      const query = {
        code,
        encryptedData,
        iv
      }

      const { data: token, errno } = await api.user.WECHAT_LOGIN(query)

      if (!errno) {
        D.toast('登录成功')
        await Taro.setStorageSync('token', token)
        // Taro.setStorageSync('code', code)

        const {
          data: { avatar, nickName, perms, roles, type, userId, brandId }
        } = await api.user.WECHAT_INFO()

        this.typeHandle(type)

        const userInfo = {
          avatarUrl: avatar,
          nickName,
          perms,
          roles,
          type,
          userId,
          brandId
        }

        console.log(userInfo)

        Taro.setStorageSync('userInfo', userInfo)

        Taro.switchTab({ url: '/pages/order/list/index' })
      }
    }
  }

  typeHandle = (type) => {
    // const type = Taro.getStorageSync('userType')

    let userTypeDesc = ''

    switch (type) {
      case 1: // 管理端
        userTypeDesc = 'admin'
        break
      case 2: // 商户端
        userTypeDesc = 'shop'
        break
      case 3: // 大学城经理
      case 4: // 校园经理
      case 5: // 楼长
      case 6: // 区域经理
        userTypeDesc = 'manager'
        break
    }

    Taro.setStorageSync('userTypeDesc', userTypeDesc)
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
          <View>
            <View></View>
            <Button
              type='primary'
              lang='zh_CN'
              openType='getPhoneNumber'
              class='login-btn'
              onGetPhoneNumber={this.handleGetPhoneNumber}
            >
              授权手机号登录
            </Button>
          </View>
          {/* <Button lang='zh_CN' class='login-btn' onClick={this.getUserInfo}>
            确认登录
          </Button> */}
        </View>
      </View>
    )
  }
}

export default Login
