export const FETCH_ADDRESSES = 'FETCH_ADDRESSES';
export const FETCH_ADDRESSES_SUCCESS = 'FETCH_ADDRESSES_SUCCESS';
export const FETCH_ADDRESSES_FAILURE = 'FETCH_ADDRESSES_FAILURE';

export function getAddresses() {
  return {
    type: FETCH_ADDRESSES,
  };
}

export function getAddressesSuccess(data) {
  return {
    type: FETCH_ADDRESSES_SUCCESS,
    payload: data
  };
}

export function getAddressesFailure(error) {
  return {
    type: FETCH_ADDRESSES_FAILURE,
    payload: error
  };
}
