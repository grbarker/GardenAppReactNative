import axios from 'axios';

//Get category
export const FETCH_USER_GARDENS = 'FETCH_GARDENS';
export const FETCH_USER_GARDENS_SUCCESS = 'FETCH_GARDENS_SUCCESS';
export const FETCH_USER_GARDENS_FAILURE = 'FETCH_GARDENS_FAILURE';
export const FETCH_MORE_USER_GARDENS_SUCCESS = 'FETCH_MORE_GARDENS_SUCCESS';
export const FETCH_MORE_USER_GARDENS_FAILURE = 'FETCH_MORE_GARDENS_FAILURE';
export const LESS_USER_GARDENS = 'LESS_GARDENS';
export const SUBMIT_USER_GARDEN_SUCCESS = 'SUBMIT_USER_GARDEN_SUCCESS';
export const SUBMIT_USER_GARDEN_FAILURE = 'SUBMIT_USER_GARDEN_FAILURE';
export const UPDATE_PICKER_CHOICE = 'UPDATE_PICKER_CHOICE';

const api = "http://34.221.120.52/api/user/gardens"

export function getUserGardens(dispatch, token, uri_end) {
  var uri_end = uri_end
  var uri = 'http://34.221.120.52' + uri_end
  return function (dispatch)  {
    console.log("Trying to DEBUG this get request for the next set of gardens!!!", token, ", ", uri)
    axios.get(uri, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      (uri_end === '/api/user/gardens')
      ? (dispatch(getGardensSuccess(response.data)) && console.log('GETTING FIRST SET OF GARDENS AGAIN AFTER A GARDEN SUBMISSION'))
      : (dispatch(getMoreGardensSuccess(response.data)) && console.log('GETTING MORE GARDENS'))
    })
    .catch(error => {
       dispatch(getMoreGardensFailure(error.response.data)) && console.log(error.response.data.error)
    })
    };
}


export function submitUserGardenFetch(dispatch, token, gardenText) {
  var uri = 'http://34.221.120.52/api/user/garden'
  return function (dispatch)  {
    console.log("Trying to DEBUG this fetch GARDEN request for submitting a user garden!!!", token, ", ", gardenText)
    fetch(uri, {
      method: 'GARDEN',
      headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
      data: {
        gardenText: gardenText
      }
    })
    .then((response) => {
      dispatch(submitUserGardenSuccess(response.data)) && console.log(response)
      //dispatch(getGardens(dispatch, token, '/api/gardens'))
    })
    .catch(error => {
       dispatch(submitUserGardenFailure(error.response.data)) && console.log('ERROR ! ! !', error.response.data) && console.log('response, ', response)
    })
    };
}


export function submitUserGarden(dispatch, token, gardenText) {
  var uri = 'http://34.221.120.52/api/user/garden'
  return function (dispatch)  {
    console.log("Trying to DEBUG this axios GARDEN request for submitting a user garden!!!", token, ", ", gardenText)
    axios({
      method: 'garden',
      url: uri,
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        "gardenText": gardenText
      }
    })
    .then((response) => {
      dispatch(getUserGardens(dispatch, token, '/api/gardens'))
    })
    .catch(error => {
       dispatch(submitUserGardenFailure(error)) && console.log('ERROR ! ! !', error)
    })
    };
}

export function updatePicker(garden) {
  return {
    type: UPDATE_PICKER_CHOICE,
    payload: garden
  }
}

export function lessUserGardens() {
  return {
    type: LESS_USER_GARDENS,
  };
}

export function getUserGardensSuccess(data) {
  return {
    type: FETCH_USER_GARDENS_SUCCESS,
    payload: data
  };
}

export function getUserGardensFailure(data) {
  return {
    type: FETCH_USER_GARDENS_FAILURE,
    payload: data.error
  };
}

export function getMoreUserGardensSuccess(data) {
  return {
    type: FETCH_MORE_USER_GARDENS_SUCCESS,
    payload: data
  };
}

export function getMoreUserGardensFailure(data) {
  return {
    type: FETCH_MORE_USER_GARDENS_FAILURE,
    payload: data.error
  };
}

export function submitUserGardenSuccess(data) {
  return {
    type: SUBMIT_USER_GARDEN_SUCCESS,
    payload: data
  };
}

export function submitUserGardenFailure(data) {
  return {
    type: SUBMIT_USER_GARDEN_FAILURE,
    payload: data.error
  };
}
