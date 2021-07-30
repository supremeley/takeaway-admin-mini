import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'

import api from '@/api'
import D from '@/common'
import { connect } from 'react-redux'

import './index.scss'

@connect(({ counter }) => ({
  printInfo: counter.print
}))
class PrintEditor extends Component {
  state = {
    form: {
      sn: '',
      key: ''
    }
  }

  componentDidShow() {
    if (this.props.printInfo) {
      this.setState({ form: this.props.printInfo })
    }
  }

  changeInp = (e, key) => {
    // console.log(e)
    const { form } = this.state

    form[key] = e.detail.value
  }

  // getPrintList = async () => {
  //   const { data } = await api.print.GET_PRINT_LIST()

  //   if (data.length) {
  //     this.setState({ form: data[0] })
  //   }
  // }

  onSubmit = async () => {
    const { form } = this.state

    const query = {
      ...form
    }

    let resApi

    if (this.props.printInfo) {
      resApi = api.print.UPLOAD_PRINT_SETTING
      delete query.addTime
    } else {
      resApi = api.print.ADD_PRINT_SETTING
    }

    const {
      data: { no }
    } = await resApi(query)

    if (no.length) {
      D.toast(no[0])
    } else {
      Taro.navigateBack()
    }
  }

  get id() {
    return this.route.params.id
  }

  get route() {
    return getCurrentInstance().router
  }

  render() {
    const { form } = this.state

    return (
      <View className='print'>
        <View className='print-option'>
          <Text onInput={this.change} className='print-option__title'>
            打印机sn号
          </Text>
          <Input
            value={form.sn}
            className='print-option__inp'
            placeholder='请输入打印机sn号'
            onInput={(e) => this.changeInp(e, 'sn')}
          />
        </View>
        <View className='print-option'>
          <Text onInput={this.change} className='print-option__title'>
            打印机key号
          </Text>
          <Input
            value={form.key}
            className='print-option__inp'
            placeholder='请输入打印机key号'
            onInput={(e) => this.changeInp(e, 'key')}
          />
        </View>
        <View className='print-option'>
          <Text onInput={this.change} className='print-option__title'>
            打印机名称
          </Text>
          <Input
            value={form.name}
            className='print-option__inp'
            placeholder='请输入打印机名称'
            onInput={(e) => this.changeInp(e, 'name')}
          />
        </View>
        <View className='print-option'>
          <Text onInput={this.change} className='print-option__title'>
            打印机备注
          </Text>
          <Input
            value={form.remark}
            className='print-option__inp'
            placeholder='请输入打印机备注'
            onInput={(e) => this.changeInp(e, 'remark')}
          />
        </View>
        <Button class='page-btn' onClick={this.onSubmit}>
          绑定打印机
        </Button>
      </View>
    )
  }
}

export default PrintEditor
