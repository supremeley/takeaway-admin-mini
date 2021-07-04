import request from '@/utils/request.js'

export const GET_GOODS_LIST = (data) => request.get('dashboard/brandSalesInfo', data, {
  type: 'shop'
})