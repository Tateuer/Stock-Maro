import {
  FETCH_PIEZAS,
  SEARCH_PIEZAS,
  ORDER_ESTANTERIA,
} from "../actions/stockActions";

const initialState = {
  piezas: [],
  allPiezas: [],
};

export const piezasReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PIEZAS:
      return { ...state, piezas: payload, allPiezas: payload };
    case SEARCH_PIEZAS:
      return {
        ...state,
        piezas: payload,
      };
    case ORDER_ESTANTERIA:
      let allPiezas = [...state.allPiezas];
      let filterEstanteria =
        payload === "all"
          ? allPiezas
          : allPiezas.filter((p) => p.estanteria.toString() === payload);
      return {
        ...state,
        piezas: filterEstanteria,
      };
    default:
      return { ...state };
  }
};
