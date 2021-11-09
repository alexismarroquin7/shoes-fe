import { combineReducers } from "redux";

import { shoeInventoryReducer } from "./shoe_inventory-reducer";

export const rootReducer = combineReducers({
  inventory: shoeInventoryReducer
});