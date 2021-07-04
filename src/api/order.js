import request from '@/utils/request.js'

export const GET_ORDER_LIST = (data) => request.get('order/list', data, { type: 'admin' })

export const GET_ORDER_DETAIL = (data) => request.get('order/detail', data, { type: 'admin' })

// export const SUBMIT_ORDER = (data) => request.post('order/submit', data)

// export const SUBMIT_PREPAY = (data) => request.post('order/prepay', data)

// export const ORDER_CONFIRM = (data) => request.post('order/confirm', data)

export const GET_FLOORLIST = (data) => request.post('order/getBuildingOrder', data)
