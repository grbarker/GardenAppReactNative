import axios from 'axios';

//Get category
export const FETCH_USER_POSTS = 'FETCH_USER_POSTS';
export const FETCH_USER_POSTS_SUCCESS = 'FETCH_USER_POSTS_SUCCESS';
export const FETCH_USER_POSTS_FAILURE = 'FETCH_USER_POSTS_FAILURE';
export const FETCH_MORE_USER_POSTS_SUCCESS = 'FETCH_MORE_USER_POSTS_SUCCESS';
export const LESS_USER_POSTS = 'LESS_USER_POSTS';

const api = "http://34.221.120.52/api/posts/"

export function getUserPosts(dispatch, token, uri) {
  var uri = 'http://34.221.120.52' + uri
  return function (dispatch)  {
    console.log("Trying to DEBUG this get request for the next set of posts!!!", token, ", ", uri)
    axios.get(uri, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      dispatch(getMoreUserPostsSuccess(response.data)) && console.log(response.data)
    })
    .catch(error => {
       dispatch(getMoreUserPostsFailure(error.response.data)) && console.log(error.response.data.error)
    })
    };
}

export function lessUserPosts() {
  return {
    type: LESS_USER_POSTS,
  };
}

export function getUserPostsSuccess(data) {
  return {
    type: FETCH_USER_POSTS_SUCCESS,
    payload: data
  };
}

export function getUserPostsFailure(data) {
  return {
    type: FETCH_USER_POSTS_FAILURE,
    payload: data.error
  };
}

export function getMoreUserPostsSuccess(data) {
  return {
    type: FETCH_MORE_USER_POSTS_SUCCESS,
    payload: data
  };
}

export function getMoreUserPostsFailure(data) {
  return {
    type: FETCH_MORE_USER_POSTS_FAILURE,
    payload: data.error
  };
}
