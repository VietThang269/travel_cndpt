import axios from "axios";
import { apiUrl } from "../../constant";
import { getPlaceFailure, getPlaceStart, getPlaceSuccess } from "./PlaceAction";

export const getAllPlace = async (dispatch) => {
  dispatch(getPlaceStart());
  try {
    const res = await axios.get(`${apiUrl}/getPlace`);
    dispatch(getPlaceSuccess(res.data));
  } catch (err) {
    dispatch(getPlaceFailure());
  }
};
