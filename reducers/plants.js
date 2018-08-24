import { FETCH_PLANTS, FETCH_PLANTS_SUCCESS, FETCH_PLANTS_FAILURE } from '../actions/plants'

const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  page: 1,
  links: {},
  items: [],
  error: null
}
export default function plants(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PLANTS:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_PLANTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        links: action.payload._links,
        items: action.payload.items
      };
    case FETCH_PLANTS_FAILURE:
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
