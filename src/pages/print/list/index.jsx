import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Button } from '@tarojs/components'

import api from '@/api'
import D from '@/common'

import './index.scss'

class Center extends Component {
  state = {
    printList: []
  }

  componentDidMount() {
    this.getPrintList()
  }

  onJump = () => {
    Taro.navigateTo({ url: '/pages/print/setting/index' })
  }

  getPrintList = async () => {
    const { data: printList } = await api.print.GET_PRINT_LIST()

    if (printList.length) {
      this.setState({ printList })
    }
  }

  render() {
    const { printList } = this.state

    return (
      <View className='index'>
        {printList &&
          printList.map((item) => {
            return (
              <View key={item.id} className='plate-option'>
                <View className='plate-option__title'>
                  <View className='plate-option__title-name'>{item.name}</View>
                  <View className='plate-option__title-sale'>sn：{item.sn}</View>
                </View>
                <View className='plate-option__num'>{item.remark}</View>
              </View>
            )
          })}

        <Button className='page-btn' onClick={this.onJump}>
          添加打印机
        </Button>
      </View>
    )
  }
}

export default Center
