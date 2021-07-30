import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Button } from '@tarojs/components'

import api from '@/api'
import { connect } from 'react-redux'
import { selectPrint } from '@/actions/counter'

import './index.scss'

@connect(
  ({ counter }) => ({
    counter
  }),
  (dispatch) => ({
    onSelectPrint: (info) => dispatch(selectPrint(info))
  })
)
class PrintList extends Component {
  state = {
    printList: []
  }

  componentDidShow() {
    this.getPrintList()
  }

  onJumpToEditor = (info) => () => {
    if (info !== 'empty') {
      this.props.onSelectPrint(info)
    } else {
      this.props.onSelectPrint(null)
    }

    if (this.type === 'select') {
      Taro.navigateBack()
      return
    }

    let id = info === 'empty' ? info : info.id

    Taro.navigateTo({ url: `/pages/print/editor/index?id=${id}` })
  }

  getPrintList = async () => {
    const { data: printList } = await api.print.GET_PRINT_LIST()

    if (printList.length) {
      this.setState({ printList })
    }
  }

  get type() {
    const router = getCurrentInstance().router

    return router.params.type
  }

  render() {
    const { printList } = this.state

    return (
      <View className='print'>
        {printList &&
          printList.map((item) => {
            return (
              <View key={item.id} className='plate-option' onClick={this.onJumpToEditor(item)}>
                <View className='plate-option__title'>
                  <View className='plate-option__title-name'>{item.name}</View>
                  <View className='plate-option__title-sale'>sn：{item.sn}</View>
                </View>
                <View className='plate-option__num'>{item.remark}</View>
              </View>
            )
          })}

        <Button className='page-btn' onClick={this.onJumpToEditor('empty')}>
          添加打印机
        </Button>
      </View>
    )
  }
}

export default PrintList
