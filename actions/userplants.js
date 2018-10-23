import axios from 'axios';

//Get category
export const FETCH_USER_PLANTS = 'FETCH_USER_PLANTS';
export const FETCH_USER_PLANTS_SUCCESS = 'FETCH_USER_PLANTS_SUCCESS';
export const FETCH_USER_PLANTS_FAILURE = 'FETCH_USER_PLANTS_FAILURE';
export const FETCH_MORE_USER_PLANTS_SUCCESS = 'FETCH_MORE_USER_PLANTS_SUCCESS';
export const LESS_USER_PLANTS = 'LESS_USER_PLANTS';

const api = "http://34.221.120.52/api/user/plants/"

export function getUserPlants(dispatch, token, uri) {
  var uri = 'http://34.221.120.52' + uri
  return function (dispatch)  {
    console.log("Trying to DEBUG this get request for the next set of plants!!!", token, ", ", uri)
    axios.get(uri, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      dispatch(getMoreUserPlantsSuccess(response.data)) && console.log(response.data)
    })
    .catch(error => {
       dispatch(getMoreUserPlantsFailure(error.response.data)) && console.log(error.response.data.error)
    })
    };
}

export function lessUserPlants() {
  return {
    type: LESS_USER_PLANTS,
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

export function getMoreUserPlantsSuccess(data) {
  return {
    type: FETCH_MORE_USER_PLANTS_SUCCESS,
    payload: data
  };
}

export function getMoreUserPlantsFailure(data) {
  return {
    type: FETCH_MORE_USER_PLANTS_FAILURE,
    payload: data.error
  };
}
