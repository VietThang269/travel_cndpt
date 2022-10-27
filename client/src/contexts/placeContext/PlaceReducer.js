const PlaceReducer = (state, action) => {
  switch (action.type) {
    case "GET_PLACE_START":
      return {
        places: null,
        isFetching: true,
        error: false,
      };
    case "GET_PLACE_SUCCESS":
      return {
        places: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_PLACE_FAILURE":
      return {
        places: null,
        isFetching: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default PlaceReducer;
