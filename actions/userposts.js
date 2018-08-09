import axios from 'axios';

//Get category
export const FETCH_USER_POSTS = 'FETCH_USER_POSTS';
export const FETCH_USER_POSTS_SUCCESS = 'FETCH_USER_POSTS_SUCCESS';
export const FETCH_USER_POSTS_FAILURE = 'FETCH_USER_POSTS_FAILURE';

const api = "http://34.221.120.52/api/posts/"

export function getUserPosts(token) {
  const request = axios({
    method: 'get',
    url: `${api}`,
    headers: {Authorization: `Bearer ${token}`}
  });

  return {
    type: FETCH_USER_POSTS,
    payload: request
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
