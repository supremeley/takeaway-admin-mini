import Taro from '@tarojs/taro'
import qs from 'qs'

class API {
  constructor(options = {}) {
    let { baseURL = '/' } = options

    if (!/\/$/.test(baseURL)) {
      baseURL = baseURL + '/'
    }

    this.options = options
    this.baseURL = baseURL
    this.genMethods(['get', 'post', 'delete', 'put'])
  }

  genMethods(methods) {
    methods.forEach((method) => {
      this[method] = (url, data, config = {}) =>
        this.makeReq({
          ...config,
          method,
          url,
          data
        })
    })
  }

  errorToast(msg) {
    const errMsg = msg || '操作失败，请稍后重试'

    let newText = ''
    if (errMsg.length > 11) {
      newText = errMsg.substring(0, 11) + '\n' + errMsg.substring(11)
    } else {
      newText = errMsg
    }
    setTimeout(() => {
      Taro.showToast({
        icon: 'none',
        title: newText
      })
    }, 200)
  }

  async makeReq(config) {
    let {
      url,
      data,
      header = {},
      method = 'GET',
      showLoading,
      showError = true,
      getDate,
      trackData
    } = config
    // debugger
    const methodIsGet = method.toLowerCase() === 'get'

    let apiUrl = /^http/.test(url) ? url : `${this.baseURL}${url.replace(/^\//, '')}`
    // const query = !data || typeof data === 'string' ? qs.parse(data) : data

    if (!methodIsGet) {
      header['content-type'] = header['content-type'] || 'application/x-www-form-urlencoded'
    }

    const options = {
      ...config,
      url: apiUrl,
      method: method.toUpperCase(),
      data,
      header
    }

    if (showLoading) {
      Taro.showLoading({
        mask: true
      })
    }

    try {
      const {
        data: { data: res, errmsg, errno }
      } = await Taro.request(options)

      if (!res) {
        this.errorToast(errmsg)
      } else {
        return res
      }
      // this.reqError(errmsg, errno)
    } catch (e) {
      console.log(e)
      this.reqError(e)
    }

    // return .then(async (res) => {
    //   // eslint-disable-next-line
    //   const { data, statusCode, header, code } = res

    //   if (showLoading) {
    //     Taro.hideLoading()
    //   }

    //   console.log('接口：', options.url, '------tid=======', data.tid ? data.tid : '没有tid')
    //   // if (statusCode >= 200 && statusCode < 300) {
    //   //   if (data.data !== undefined || _code === 10000) {
    //   //   } else {
    //   //   }
    //   // }

    //   return Promise.reject(this.reqError(res))

    //   return Promise.reject(this.reqError(res, `API error: ${statusCode}`))
    // })
  }

  reqError(res, msg = '', noError) {
    // debugger
    const data = res.data.error || res.data
    const errMsg = data.message || data.err_msg || msg
    const err = noError ? { message: errMsg } : new Error(errMsg)
    err.res = res
    return err
  }
}

export default new API({
  baseURL: 'http://121.36.109.180:8083/admin'
})

export { API }
