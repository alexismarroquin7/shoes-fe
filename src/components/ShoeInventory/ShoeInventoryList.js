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
      dispatch(Action.findAll({useShoeView:true}));
    };
    fetchAllShoeInventory();

  }, [dispatch])
  
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
        width: "100%"
      }}
    >
      <form>
        <input />
        <button>Search</button>
      </form>

      {inventory.list.length > 0 && inventory.list.map(inventory_item => {
        return ( <ShoeInventoryItem key={inventory_item.shoe_id} inventory_item={inventory_item}/> )
      })}
    </div>
  );
}