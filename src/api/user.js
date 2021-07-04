import request from '@/utils/request.js'

export const WECHAT_LOGIN = (data) => request.post('auth/wxLogin', data, { type: 'admin', noToken: true })

export const WECHAT_INFO = (data) => request.get('auth/info', data, { type: 'admin', refreshToken: true })

