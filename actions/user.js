import axios from 'axios';

//Get category
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const api = "http://34.221.120.52/api/user"

export function getUser(token) {
  const request = axios({
    method: 'get',
    url: `${api}`,
    headers: {Authorization: `Bearer ${token}`}
  });

  return {
    type: FETCH_USER,
    payload: request
  };
}

export function getUserSuccess(data) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data
  };
}

export function getUserFailure(data) {
  return {
    type: FETCH_USER_FAILURE,
    payload: data.error
  };
}
