import { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from '../actions/posts'

const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  items: [],
  error: null
}
export default function posts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        items: action.payload.items
      };
    case FETCH_POSTS_FAILURE:
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
