import { combineReducers } from "redux";

import { shoeInventoryReducer } from "./shoe_inventory-reducer";
import { authReducer } from "./auth-reducer";

export const rootReducer = combineReducers({
  inventory: shoeInventoryReducer,
  auth: authReducer
});