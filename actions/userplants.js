import axios from 'axios';

//Get category
export const FETCH_USER_PLANTS = 'FETCH_PLANTS';
export const FETCH_USER_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS';
export const FETCH_USER_PLANTS_FAILURE = 'FETCH_PLANTS_FAILURE';

const api = "http://34.221.120.52/api/plants/"

export function getUserPlants(token) {
  const request = axios({
    method: 'get',
    url: `${api}`,
    headers: {Authorization: `Bearer ${token}`}
  });

  return {
    type: FETCH_USER_PLANTS,
    payload: request
  };
}

export function getUserPlantsSuccess(data) {
  return {
    type: FETCH_USER_PLANTS_SUCCESS,
    payload: data
  };
}

export function getUserPlantsFailure(data) {
  return {
    type: FETCH_USER_PLANTS_FAILURE,
    payload: data.error
  };
}
