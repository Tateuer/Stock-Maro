import { FETCH_PIEZAS, SEARCH_PIEZAS } from "../actions/stockActions";

const initialState = {
  piezas: [],
};

export const piezasReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PIEZAS:
      return { ...state, piezas: payload };
    case SEARCH_PIEZAS:
      return {
        ...state,
        piezas: payload,
      };
    default:
      return { ...state };
  }
};
