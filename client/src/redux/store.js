import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { piezasReducer } from "./reducer/stockReducer";

const store = createStore(piezasReducer, applyMiddleware(thunk));

export default store;
