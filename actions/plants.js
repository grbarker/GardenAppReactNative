import axios from 'axios';

//Get category
export const FETCH_PLANTS = 'FETCH_PLANTS';
export const FETCH_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS';
export const FETCH_PLANTS_FAILURE = 'FETCH_PLANTS_FAILURE';
export const LESS_PLANTS = 'LESS_PLANTS';

const api = "http://34.221.120.52/api/plants/"

export function getPlants(dispatch, token, uri) {
  var uri = 'http://34.221.120.52' + uri
  return function (dispatch)  {
    console.log("Trying to DEBUG this get request for the next set of posts!!!", token, ", ", uri)
    axios.get(uri, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      dispatch(getPlantsSuccess(response.data)) && console.log(response.data)
    })
    .catch(error => {
       dispatch(getMorePlantsFailure(error.response.data)) && console.log(error.response.data.error)
    })
    };
}

export function lessPlants() {
  return {
    type: LESS_PLANTS,
  };
}

export function getPlantsSuccess(data) {
  return {
    type: FETCH_PLANTS_SUCCESS,
    payload: data
  };
}

export function getPlantsFailure(data) {
  return {
    type: FETCH_PLANTS_FAILURE,
    payload: data.error
  };
}



export function getPlantsOldWayThatDidntWork(dispatch, token, uri) {
  const request = axios({
    method: 'get',
    url: `${api}`,
    headers: {Authorization: `Bearer ${token}`}
  });

  return {
    type: FETCH_PLANTS,
    payload: request
  };
}
