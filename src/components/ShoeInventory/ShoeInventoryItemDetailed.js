import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ShoeInventory as Action } from "../../store";

export const ShoeInventoryItemDetailed = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const inventory = useSelector(s => s.inventory);
  
  const [shoe] = inventory.list;

  useEffect(() => {
    dispatch(Action.findByShoeId(params.shoe_id));
  }, [dispatch, params.shoe_id]);

  return (
    <div>
      {shoe && (
        <div>
          <h3>{shoe.brand.name}</h3>
          <h3>{shoe.name}</h3>
        </div>
      )}
    </div>
  )
}