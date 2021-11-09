import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ShoeInventory as Action } from "../../store";
import { ShoeInventoryItem } from "./ShoeInventoryItem";

export const ShoeInventoryList = () => {
  const dispatch = useDispatch();
  const inventory = useSelector(s => s.inventory);

  useEffect(()=> {
    
    const fetchAllShoeInventory = () => {
      dispatch(Action.findAll());
    };
    fetchAllShoeInventory();

  }, [dispatch])
  
  return (
    <div>
      {inventory.list.length > 0 && inventory.list.map(inventory_item => {
        return ( <ShoeInventoryItem key={inventory_item.shoe_id} inventory_item={inventory_item}/> )
      })}
    </div>
  );
}