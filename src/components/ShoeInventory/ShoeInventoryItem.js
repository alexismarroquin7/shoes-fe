import { useNavigate } from "react-router-dom";

const classes = {// eslint-disable-line
  root: {
    display: "flex",
    flexFlow: "row wrap",
  }
}

export const ShoeInventoryItem = ({ inventory_item }) => {
  const navigate = useNavigate();
  
  const {
    shoe_id,
    name,
    brand,
    colors,
    thumbnail
  } = inventory_item;
  
  return (
    <div style={{ border: "1px solid black" }} onClick={() => {
      navigate(`/shoes/${shoe_id}`);      
    }}>
      <div style={classes.root}>
        <p>{brand.name}</p>
        <p>{name}</p>

        <img src={thumbnail.src} width="200px"/>
        
        {colors.map((color,i) => {
          return (
          <div>{color.name}{i !== colors.length-1 && ','}</div>
          )
        })}

      </div>
    </div>
  );
}