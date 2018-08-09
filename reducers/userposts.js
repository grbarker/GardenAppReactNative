import { FETCH_USER_POSTS, FETCH_USER_POSTS_SUCCESS, FETCH_USER_POSTS_FAILURE } from '../actions/userposts'

const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  items: [],
  error: null
}
export default function userposts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_POSTS:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_USER_POSTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        items: action.payload.items
      };
    case FETCH_USER_POSTS_FAILURE:
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
