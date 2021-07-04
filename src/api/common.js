import request from '@/utils/request.js'

export const UPLOAD_IMG = (filePath, data) =>
request.upload(`storage/create`, filePath, data)


export const GET_SCHOOL_LIST = (data) => request.get('relation/list', data, {
  type: 'admin'
})