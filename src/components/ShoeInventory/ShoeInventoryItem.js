import { useNavigate } from "react-router-dom";

const classes = {
  root: {
    display: "flex",
    flexFlow: "column wrap",
    border: "1px solid black"
  },
  card: {
    width: "90%",
    display: "flex",
    flexFlow: "row wrap",
  },
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
    <div style={classes.root} onClick={() => {
      navigate(`/shoes/${shoe_id}`);      
    }}>
      <img width="200px" alt={thumbnail.alt || ''} src={thumbnail.src || ''} />
      
      <div style={classes.card}>
      
        <p>{brand.name}</p>
        <p>{name}</p>
        
        {colors.map((color,i) => {
          return (
          <div key={color.color_id}>{color.name}{i !== colors.length-1 && ','}</div>
          )
        })}

      </div>

    </div>
  );
}