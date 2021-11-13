import { useNavigate } from "react-router-dom";

const classes = {
  root: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    width: "100vw"
  },
  wrapper: {
    width: "80vw",
    border: "1px solid black",
    boxShadow: "0px 0px 5px black",
    padding: "1rem",
    margin: "1rem 0"
  },
  card: {
    // border: "1px solid red",
    width: "90%",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    alignItems: "center"
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
    <div
      style={classes.root}
      onClick={() => {
        navigate(`/shoes/${shoe_id}`);      
      }}
      >
      <div
        style={classes.wrapper}
      >
        {thumbnail.src 
        ? (
          <div style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-start"
          }}>
            <img width="250px" alt={thumbnail.alt || ''} src={thumbnail.src} title={thumbnail.title || ''} />
          </div>
        ) : (
          <div style={{
            width: "250px",
            height: "250px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center"
          }}><p>no image was found :(</p></div>
        )}
        
        <div style={classes.card}>
          
          <div>
            <p>{brand.name}</p>
            <p>{name}</p>
          </div>
          
          <div
            style={{
              border: "1px solid black",
              display: "flex",
              flexFlow: "column wrap",
              boxShadow: "0px 0px 2px black"
            }}
          >
            
            <p>Color(s): </p>
            
            {colors.map((color,i) => {
              return (
                <div
                
                  key={color.color_id}
                  style={{
                    border: "1px solid black",
                    width: "100%",
                    display: "flex",
                    flexFlow: "row wrap",
                    alignItems: "flex-start"
                  }}
                >

                  <p>{color.name}</p>
                  
                  <div
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      flexFlow: "column wrap",
                      // padding: "0 1rem"
                    }}
                  >
                    <div
                      style={{
                        padding: "0 1rem"
                      }}
                    >
                      <p>size(s):</p>
                    </div>
                    {color.sizes.map((size) => {
                      return (
                        <div 
                        key={size.shoe_size_id}
                        style={{
                          // width: "100%",
                          border: "1px solid black",
                          padding: "0 1rem"
                        }}
                        >
                          <p>{size.amount} {size.country.name_abreviation} {size.gender.name.toUpperCase()}</p>
                        </div>
                      )
                    })}
                  </div>

                </div>
              )
            })}
          </div>

        </div>

        <div>
          <button>Add to bag</button>
        </div>
      </div>
    </div>
  );
}