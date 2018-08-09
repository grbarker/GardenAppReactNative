import { FETCH_USER_PLANTS, FETCH_USER_PLANTS_SUCCESS, FETCH_USER_PLANTS_FAILURE } from '../actions/userplants'

const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  items: [],
  error: null
}
export default function userplants(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_PLANTS:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_USER_PLANTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        items: action.payload.items
      };
    case FETCH_USER_PLANTS_FAILURE:
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
