import { Button, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
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
    style={{
      border:"1px solid red"
    }}
    >{children}</Grid>
  }
  // const Column = ({ children }) => {
  //   return <Grid
  //   style={{border:"1px solid blue"}}
  //   >{children}</Grid>
  // }

  const Cell = ({ children }) => {
    return <div
    // item
    // direction="row"
    // justifyContent="flex-start"
    style={{
      border: "1px solid green",
      padding: "1rem 2rem",
    }}
    >{children}</div>
  }

  const Label = (props) => {
    return (
      <Row>
        <Cell>
          <p>{props.label}</p>
        </Cell>
      </Row>
    )
  }

  // const AdminShoeInventoryItem = () => {
  //   return (
  //     <Row>

        // {/* <Cell>
        //   {shoe.brand.name}
        // </Cell>

        // <Cell>
        //   {shoe.name}
        // </Cell>
      
        // <Cell>
        //   {shoe.colors.reduce((acc, curr, i) => {
        //     const lastIndex = shoe.colors.length-1;
            
        //     return i === lastIndex
        //     ? acc += curr.name
        //     : acc += curr.name + ', '
        //   }, '')}
        // </Cell> */}
        
  //     </Row>
  //   )
  // }

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column wrap",
      }}
    >
      <div>
        <Button onClick={() => navigate('/admin/shoe_inventory/create-new-shoe')}>Add new Shoe</Button>
      </div>
      
      {inventory.list.length > 0 && inventory.list.map((shoe, i) => {
        return i===0?(
          <React.Fragment>
            <Label label="brand"/>
            <Cell>{shoe.brand.name}</Cell>
          </React.Fragment>
        ) : (
          <Cell>{shoe.brand.name}</Cell>
        )
      })}
    </div>
  );
}
