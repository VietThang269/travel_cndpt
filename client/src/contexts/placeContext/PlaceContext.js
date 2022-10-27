import { createContext, useEffect, useReducer } from "react";
import PlaceReducer from "./PlaceReducer";

const INITIAL_STATE = {
  places: null,
  isFetching: false,
  error: false,
};

export const PlaceContext = createContext(INITIAL_STATE);

export const PlaceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PlaceReducer, INITIAL_STATE);

  return (
    <PlaceContext.Provider
      value={{
        places: state.places,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};
