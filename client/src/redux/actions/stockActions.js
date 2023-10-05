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
    } catch (error) {}
  };
};

export const descargarArchivo = (piezaId) => {
  return async () => {
    try {
      if (piezaId) {
        const res = await axios.get(`http://localhost:3001/piezas/${piezaId}`);
        const pieza = res.data;

        if (pieza && pieza.archivo) {
          const nombreArchivo = pieza.archivo;

          const urlDescarga = `http://localhost:3001/download/${nombreArchivo}`;

          const response = await fetch(urlDescarga);
          const blob = await response.blob();

          const enlace = document.createElement("a");
          enlace.href = window.URL.createObjectURL(blob);
          enlace.download = nombreArchivo;
          enlace.style.display = "none";
          document.body.appendChild(enlace);

          enlace.click();

          document.body.removeChild(enlace);
        } else {
          console.error(
            "No se encontró un nombre de archivo válido para la pieza con ID:",
            piezaId
          );
        }
      } else {
        console.error("El ID de la pieza es undefined o vacío.");
      }
    } catch (error) {
      console.error(error);
    }
  };
};
