import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../actions/user'

const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  user: {},
  error: null
}
export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.payload
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload.error
      };
    default :
      return state
  }
}
