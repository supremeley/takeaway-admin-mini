import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Button, Input } from '@tarojs/components'

import headerBg from '@/assets/imgs/header-bg.png'
import CaiwuIcon from '@/assets/imgs/center-caiwu.png'
import JinYingIcon from '@/assets/imgs/center-jinying.png'

import api from '@/api'
import D from '@/common'

import './index.scss'

class FinanceIndex extends Component {
  state = {
    balance: 0,
    form: { amt: '' },
    // userType,
    menuList: [
      {
        icon: CaiwuIcon,
        title: '提现记录',
        url: '/pages/finance/record/index'
      },
      {
        icon: JinYingIcon,
        title: '资金明细',
        url: '/pages/finance/detail/index'
      }
    ]
  }

  componentDidMount() {
    this.fetchData()
  }

  onJump = (url) => () => {
    Taro.navigateTo({ url })
  }

  changeInp = (e, key) => {
    // console.log(e)
    const { form } = this.state

    form[key] = e.detail.value
  }

  onSubmit = async () => {
    const { form, balance } = this.state

    if (form.amt > balance) {
      D.toast('提现金额超过可提现余额')
      return
    }

    if (form.amt <= 0) {
      D.toast('提现金额不可小于等于0')
      return
    }

    const query = {
      ...form,
      withdrawType: 1
    }

    const userTypeDesc = Taro.getStorageSync('userTypeDesc')

    let resultApi

    switch (userTypeDesc) {
      case 'shop': // 商户端
        resultApi = api.finance.APPLY_CASH_BY_SHOP
        // query.brandId = brandId
        break
      case 'manager':
        resultApi = api.finance.APPLY_CASH_BY_MANANGE
        // query.uId = userId
        break
    }

    const { data, erron } = await resultApi(query)

    if (!erron) {
      D.toast('申请成功')

      this.fetchData()
    }
  }

  fetchData = async () => {
    const userTypeDesc = Taro.getStorageSync('userTypeDesc')
    const { brandId, userId } = Taro.getStorageSync('userInfo')

    let resultApi,
      query = {}

    switch (userTypeDesc) {
      case 'shop': // 商户端
        resultApi = api.finance.GET_SHOP_BILL
        query.brandId = brandId
        break
      case 'manager':
        resultApi = api.finance.GET_USER_BILL
        query.uId = userId
        break
    }

    const { data } = await resultApi(query)

    let balance

    switch (userTypeDesc) {
      case 'shop': // 商户端
        balance = data
        break
      case 'manager':
        balance = data.withdrawalAmount
        break
    }

    this.setState({ balance })
  }

  render() {
    const { balance, form, menuList } = this.state

    return (
      <View className='index'>
        <View className='header'>
          <Image src={headerBg} mode='widthFix' className='header-bg'></Image>
          <View className='header-container'>
            <View className='header-info'>
              <View className='header-info__explain'>可提现金余额</View>
              <View className='header-info__text'>￥{balance}</View>
            </View>
          </View>
        </View>
        <View className='content'>
          <View className='content-explain'>
            <View>提现金额</View>
            {/* <View>萌哒哒-微信钱包</View> */}
          </View>
          {/* <View className='content-explain'>
            <View>提现账户</View>
            <View>萌哒哒-微信钱包</View>
          </View> */}
          <Input
            value={form.amt}
            placeholder='请输入提现金额'
            type='number'
            className='content-inp'
            onInput={(e) => this.changeInp(e, 'amt')}
          />
        </View>
        <View className='menu-container'>
          {menuList &&
            menuList.map((item) => {
              return (
                <View key={item.url} className='menu-item' onClick={this.onJump(item.url)}>
                  <Image src={item.icon} mode='widthFix' className='menu-item-icon'></Image>
                  <View className='menu-item-title'>{item.title}</View>
                  <View className='at-icon at-icon-chevron-right'></View>
                </View>
              )
            })}
        </View>
        <Button className='page-btn' onClick={this.onSubmit}>
          确认提现
        </Button>
      </View>
    )
  }
}

export default FinanceIndex
