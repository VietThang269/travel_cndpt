export const getPlaceStart = () => ({
  type: "GET_PLACE_START",
});
export const getPlaceSuccess = (place) => ({
  type: "GET_PLACE_SUCCESS",
  payload: place,
});
export const getPlaceFailure = () => ({
  type: "GET_PLACE_FAILURE",
});
