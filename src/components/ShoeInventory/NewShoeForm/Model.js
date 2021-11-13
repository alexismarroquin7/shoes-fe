import React from "react";

const classes = {
  root: {
    border: "2px solid black",
    borderRadius: "10px",
    padding: "2rem",
    width: "82.5vw",
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "flex-start"
  },
  label: {
    width: "90vw",
    margin: "1rem 0"
  },
  selectFormControl: {
    margin: "1rem 0"
  },
  textInputFormControl: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "flex-start"
  },
  textInput: {
    margin: "1rem 0",
    width: "100%"
  },
  imageSectionRoot: {
    margin: "0 0 2rem 0",
    width: "82.5vw",
    border: "2px solid black",
    borderRadius: "10px",
  },
  imageSection: {
    padding: "2rem"
  },
  divider: {
    width: "70vw",
    opacity: ".3",
    border: "1px solid black",
    margin: "4rem 0"
  },
  imageActionArea: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-end"
  },
  actionArea: {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    alignItems: "center"
  }
}

const Divider = () => {
  return <div style={classes.divider}></div>
}

export const Model = ({
  model,
  options,
  handleChange,
  handleAddImageToModel,
  handleRemoveImageFromModel,
  handleRemoveModel
}) => {

  return (
  <div style={classes.root}>

    <div style={classes.selectFormControl}>
      <div style={classes.label}>
        <label>Color: {model.color.name ? `[ ${model.color.name} ]` : '[ None Selected ]'}</label>
      </div>

      <select
        onChange={handleChange}
        name={`model.${model.model_id}.color`}
      >
        {options.colors.length > 0 && options.colors.map((color,
        i) => {
          return (
            <React.Fragment key={color.color_id}>
              {i === 0 && (
                <option value={JSON.stringify({ color_id: null, name: '' })}>select color</option>
              )}
              <option value={JSON.stringify(color)}>{color.name}</option>
            </React.Fragment>
          )
        })}
      </select>
    </div>

    <Divider />

    <div style={classes.selectFormControl}>
      <div style={classes.label}>
        <label>Size: {model.size.shoe_size_id ? `[ ${model.size.amount} - ${model.size.country.name_abreviation} - ${model.size.gender.name} ]` : '[ None Selected ]'}</label>
      </div>
      <select
        onChange={handleChange}
        name={`model.${model.model_id}.size`}
      >
        {options.sizes.length > 0 && options.sizes.map((size,i) => {
          return (
            <React.Fragment key={size.size_id}>
              {i === 0 && (
                <option value={JSON.stringify({ shoe_size_id: null, name: '' })}>select size</option>
              )}
              <option value={JSON.stringify(size)}>{`${size.amount} - ${size.country.name_abreviation} - ${size.gender.name}`}</option>
            </React.Fragment>
          )
        })}
      </select>
    </div>

    <Divider />

    <div style={classes.selectFormControl}>
      <div style={classes.label}>
        <label>Shoe Gender: {model.gender.name ? `[ ${model.gender.name} ]` : '[ None Selected ]'}</label>
      </div>
      <select
        onChange={handleChange}
        name={`model.${model.model_id}.gender`}
      >
        {options.genders.length > 0 && options.genders.map((gender,i) => {
          return (
            <React.Fragment key={gender.gender_id}>
              {i === 0 && (
                <option value={JSON.stringify({ gender_id: null, name: '' })}>select shoe gender</option>
              )}
              <option value={JSON.stringify(gender)}>{gender.name}</option>
            </React.Fragment>
          )
        })}
      </select>
    </div>

    <Divider />

    <div style={classes.textInputFormControl}>
      <label>Quantity: {model.quantity ? `[ ${model.quantity} ]` : `[ Not Set ]`}</label>
      <input
        style={classes.textInput}
        type="number"
        name={`model.${model.model_id}.quantity`}
        onChange={handleChange}
        value={model.quantity}
      />
    </div>

    <Divider />
    
    <div style={classes.textInputFormControl}>
      <label>Price: {model.price ? `[ ${model.price} ]` : `[ Not Set ]`}</label>
      <input
        style={classes.textInput}
        type="number"
        name={`model.${model.model_id}.price`}
        onChange={handleChange}
        value={model.price}
      />
    </div>

    <Divider />
    
    {model.images.length > 0 && model.images.map(image => {
      return (
        <div
          style={classes.imageSectionRoot}

        >

        <div
          style={classes.imageSection}
        >
          <div>
            <h3>Image {model.images.length}</h3>
          </div>

          <div style={classes.textInputFormControl}>
            <div>
              <label>Name: {image.name ? `[ ${image.name} ]` : `[ Not Set ]`}</label>
            </div>
            <input 
              style={classes.textInput}
              name={`model.${model.model_id}.image.${image.image_id}.name`}
              onChange={handleChange}
              value={image.name}
            />
          </div>
          
          <div style={classes.textInputFormControl}>
            <div>
              <label>Title: {image.title ? `[ ${image.title} ]` : `[ Not Set ]`}</label>
            </div>
            <input 
              style={classes.textInput}
              name={`model.${model.model_id}.image.${image.image_id}.title`}
              onChange={handleChange}
              value={image.title}
            />
          </div>
          
          <div style={classes.textInputFormControl}>
            <div>
              <label>Alt: {image.alt ? `[ ${image.alt} ]` : `[ Not Set ]`}</label>
            </div>
            <input 
              style={classes.textInput}
              name={`model.${model.model_id}.image.${image.image_id}.alt`}
              onChange={handleChange}
              value={image.alt}
            />
          </div>
          
          <div>
            <div style={classes.textInputFormControl}>
              <label>Src: {image.src ? `[ ${image.src} ]` : `[ Not Set ]`}</label>
            </div>
            <input 
              style={classes.textInput}
              name={`model.${model.model_id}.image.${image.image_id}.src`}
              onChange={handleChange}
              value={image.src}
            />
          </div>

          <div
            style={classes.imageActionArea}
          >
            <button onClick={() => handleRemoveImageFromModel(model.model_id, image.image_id)}>Delete Image</button>
          </div>
        
        </div>
      </div>
      )
    })}

    <div style={classes.actionArea}>
      <button onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAddImageToModel(model.model_id);
      }}>+ Image</button>
      <button onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleRemoveModel(model.model_id);
      }}>Delete Model</button>
    </div>

  </div>
  )
};