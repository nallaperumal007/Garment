import React, { createContext, useReducer } from "react";

const initialState = {
  units: [],
  lines: [],
  shifts: [],
  orders: [],
  schedule: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_UNIT":
      return { ...state, units: [...state.units, action.payload] };
    case "ADD_LINE":
      return { ...state, lines: [...state.lines, action.payload] };
    case "ADD_SHIFT":
      return { ...state, shifts: [...state.shifts, action.payload] };
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };
    case "UPDATE_SCHEDULE":
      return { ...state, schedule: action.payload };
    default:
      return state;
  }
}

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
