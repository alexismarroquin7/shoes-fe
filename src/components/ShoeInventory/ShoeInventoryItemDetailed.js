import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { ShoeInventory as Action } from "../../store";

export const ShoeInventoryItemDetailed = () => {
  const dispatch = useDispatch();
  const params = useParams();
  
  useEffect(() => {
    dispatch(Action.findByShoeId(params.shoe_id));
  }, [dispatch, params.shoe_id]);

  return (
    <div>
    </div>
  )
}