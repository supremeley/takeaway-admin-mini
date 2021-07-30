import { SETECT_PRINT } from "../constants/counter";

const INITIAL_STATE = {
  print: null,
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETECT_PRINT:
      return {
        ...state,
        print: action.print,
      };
    default:
      return state;
  }
}
