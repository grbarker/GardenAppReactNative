import axios from 'axios';

//Get category
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_MORE_POSTS_SUCCESS = 'FETCH_MORE_POSTS_SUCCESS';
export const FETCH_MORE_POSTS_FAILURE = 'FETCH_MORE_POSTS_FAILURE';

const api = "http://34.221.120.52/api/posts/"

export function getPosts(dispatch, token, uri) {
  var uri = 'http://34.221.120.52' + uri
  return function (dispatch)  {
    console.log("Trying to DEBUG this get request for the next set of posts!!!", token, ", ", uri)
    axios.get(uri, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      dispatch(getPostsSuccess(response.data)) && console.log(response.data)
    })
    .catch(error => {
       dispatch(getMorePostsFailure(error.response.data)) && console.log(error.response.data.error)
    })
    };
}


export function getPostsSuccess(data) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: data
  };
}

export function getPostsFailure(data) {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: data.error
  };
}

export function getMorePostsSuccess(data) {
  return {
    type: FETCH_MORE_POSTS_SUCCESS,
    payload: data
  };
}

export function getMorePostsFailure(data) {
  return {
    type: FETCH_MORE_POSTS_FAILURE,
    payload: data.error
  };
}
