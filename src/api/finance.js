import request from '@/utils/request.js'

export const APPLY_CASH_BY_SHOP = (data) => request.post('bill/apply', data, {
  type: 'shop'
})

export const GET_SHOP_BILL = (data) => request.get('bill/overview', data, {
  type: 'shop'
})

export const GET_USER_BILL = (data) => request.get('brokerage/main', data, {
  type: 'admin'
})

export const GET_USER_BILL_LIST = (data) => request.get('statement/getUserAccountTrace', data, {
  type: 'admin'
})

export const GET_SHOP_BILL_LIST = (data) => request.get('bill/list', data, {
  type: 'admin'
})

export const GET_SHOP_BILL_ONCE = (data) => request.get('bill/list', data, {
  type: 'shop'
})