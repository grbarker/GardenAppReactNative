import { FETCH_ADDRESSES, FETCH_ADDRESSES_SUCCESS, FETCH_ADDRESSES_FAILURE, SET_ADDRESS } from '../actions/map'

const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  addresses: [],
  address: null,
  error: null,
}
export default function map(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ADDRESSES:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_ADDRESSES_SUCCESS:
      return {
        fetching: false,
        fetched: true,
        addresses: action.payload,
        error: null
      };
    case FETCH_ADDRESSES_FAILURE:
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload
      };
        case SET_ADDRESS:
          return {
            ...state,
            address: action.payload,
          };
    default :
      return state
  }
}
