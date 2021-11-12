import { Button, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ShoeInventory } from "../../store";


export const AdminShoeInventoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inventory = useSelector(s => s.inventory);
  
  useEffect(() => {
    dispatch(ShoeInventory.findAll({useShoeView:true}));
  }, [dispatch]);

  const Row = ({ children }) => {
    return <Grid
    container
    style={{border:"1px solid red"}}
    >{children}</Grid>
  }
  // const Column = ({ children }) => {
  //   return <Grid
  //   style={{border:"1px solid blue"}}
  //   >{children}</Grid>
  // }
  const Cell = ({ children }) => {
    return <Grid
    style={{border:"1px solid green"}}
    >{children}</Grid>
  }

  return (
    <div>
      <Button onClick={() => navigate('/admin/shoe_inventory/create-new-shoe')}>Add new Shoe</Button>
      {inventory.list.length > 0 && inventory.list.map((shoe, i) => {
        return (
          <Row>
            
            <Cell>
              {shoe.brand.name}
            </Cell>

            <Cell>
              {shoe.name}
            </Cell>
           
            <Cell>
              {shoe.colors.length}
            </Cell>
            
          </Row>
        )
      })}
    </div>
  );
}
