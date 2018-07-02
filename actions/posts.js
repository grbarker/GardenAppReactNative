import axios from 'axios';

//Get category
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

const api = "http://34.221.120.52/api/posts/"

export function getPosts(token) {
  const request = axios({
    method: 'get',
    url: `${api}`,
    headers: {Authorization: `Bearer ${token}`}
  });

  return {
    type: FETCH_POSTS,
    payload: request
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
