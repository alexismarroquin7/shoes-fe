import { useEffect, useState } from "react";
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
    boxShadow: "0px 0px 5px black",
    padding: "1rem",
    margin: "1rem 0"
  },
  cardInfo: {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    alignItems: "center"
  },
}

const initialDisplay = {
  colorsWithSizes: false
}

export const ShoeInventoryItem = ({ inventory_item }) => {
  const [ display, setDisplay ] = useState(initialDisplay);
  const [ selectedImage, setSelectedImage ] = useState(null);
  const navigate = useNavigate();

  const toggleDisplay = (key) => setDisplay({
    ...display,
    [key]: !display[key]
  });
  
  const {
    shoe_id,
    name,
    brand,
    colors,
    thumbnails
  } = inventory_item;
  
  const handleNavigateToShoe = e => {
    e.stopPropagation();
    navigate(`/shoes/${shoe_id}`);
  }

  useEffect(() => {
    const handleSelectedImage = () => {
      if(thumbnails.length > 0){
        setSelectedImage(0);
      }
    }

    handleSelectedImage();
  }, [thumbnails.length]);

  const handleThumbnailScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedImage === null) return;
    
    if(e.target.name === 'forward'){
      
      if(selectedImage + 1 === thumbnails.length){
        setSelectedImage(0);
      } else {
        setSelectedImage(selectedImage + 1);
      }

    } else {  
      if(selectedImage - 1 < (thumbnails.length - thumbnails.length)){
        setSelectedImage(thumbnails.length - 1);
      } else {
        setSelectedImage(selectedImage - 1);
      }
    }

  }
  
  return (
  <div
    style={classes.root}
    onClick={handleNavigateToShoe}
  >
    <div style={classes.wrapper}>
      
      {selectedImage !== null && (
        <div>
          <img 
            width="100%"
            alt={thumbnails[selectedImage].alt}
            title={thumbnails[selectedImage].title}
            src={thumbnails[selectedImage].src}
          />
        </div>
      )}

      {thumbnails.length > 0 
      ? (
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between"
          }}
        >
          <div>
            {thumbnails.map((thumbnail, i) => {
              return (
                <img
                  key={thumbnail.image_id}
                  style={{
                    width: "10%",
                    border: i === selectedImage ? "1px solid black" : ""
                  }}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedImage(i);
                  }}
                  alt={thumbnail.alt || ''}
                  src={thumbnail.src}
                  title={thumbnail.title || ''}
                />
              )
            })}
          </div>
          <div>
            <button
              name="backward"
              onClick={handleThumbnailScroll}
            >{'<'}</button>
            <button
              name="forward"
              onClick={handleThumbnailScroll}
            >{'>'}</button>
          </div>
        </div>
      ) : (
        
        <div
          style={{
            width: "100%",
            height: "250px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center"
          }}
        >
          <p>no images were found...</p>
        </div>
      )}
      
      <div style={classes.cardInfo}>
        
        <div
          style={{
            display: "flex",
            flexFlow: "column wrap",
            width: "100%"
          }}
        >
          <h3>{brand.name}</h3>
          <h2>{name}</h2>
        </div>
                

        {!display.colorsWithSizes && (
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              width: "100%"
            }}
          >
            {colors.map((color, i) => (
              <p 
                key={color.color_id}
              >
                {color.name}{i !== (colors.length-1) && ', '}
              </p>
            ))}
          </div>
        )}

        <div
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
          }}
        >
          <button onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            toggleDisplay('colorsWithSizes');
          }}>{display.colorsWithSizes ? 'Close Sizes ^' : 'View Sizes v' }</button>
          <button>Add to bag</button>
        </div>

        {display.colorsWithSizes && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap"
            }}
          >
          
            <p>Color(s):</p>
          
            {colors.map((color,i) => {
              return (
                <div
                  key={color.color_id}
                  style={{
                    margin: "1rem 0",
                    width: "100%",
                    display: "flex",
                    flexFlow: "row wrap",
                    justifyContent: "space-between"
                  }}
                >
                  <p>{color.name}</p>
                  
                  <div
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      flexFlow: "column wrap"
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
        )}

      </div>
    </div>
  </div>
  );
}