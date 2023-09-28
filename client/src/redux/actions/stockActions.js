import axios from "axios";

export const FETCH_PIEZAS = "FETCH_PIEZAS";
export const SEARCH_PIEZAS = "SEARCH_PIEZAS";
export const ORDER_ESTANTERIA = "ORDER_ESTANTERIA";
export const UPDATE_PIEZA_CANTIDAD = "UPDATE_PIEZA_CANTIDAD";

export const fetchPiezas = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/piezas`);
      const piezas = res.data;

      dispatch({ type: FETCH_PIEZAS, payload: piezas });
    } catch (error) {}
  };
};

export const searchPiezas = (search) => {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/piezas/name/${search}`);
    const piezas = res.data;

    dispatch({ type: SEARCH_PIEZAS, payload: piezas });
  };
};

export function orderEstanteria(order) {
  return {
    type: ORDER_ESTANTERIA,
    payload: order,
  };
}

export const actualizarCantidadPieza = (piezaId, cantidad) => {
  return async (dispatch) => {
    try {
      
      await axios.put(`http://localhost:3001/piezas/${piezaId}`, {
        cantidad: cantidad,
      });

      dispatch({
        type: UPDATE_PIEZA_CANTIDAD,
        payload: { piezaId, cantidad },
      });
    } catch (error) {
      
    }
  };
};
