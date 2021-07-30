import {
  SETECT_PRINT
} from '../constants/counter'

export const selectPrint = (print) => {
  return {
    type: SETECT_PRINT,
    print
  }
}

