import request from '@/utils/request.js'

export const ADD_PRINT_SETTING = (data) => request.post('FeiE/bind', data, { type: 'admin' })

export const FETCH_PRINT = (data) => request.post('FeiE/print', data, { type: 'admin' })

export const GET_PRINT_LIST = (data) => request.get('FeiE/listPrinter', data, { type: 'admin' })
