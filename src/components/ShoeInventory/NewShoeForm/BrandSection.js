import React from "react";

const classes = {
  root: {
    // border: "1px solid red",
    width: "90vw",
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center"
  },
  topSection: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between"
  },
  label: {
    width: "87.5vw",
    margin: "1rem 0"
  },
  select: {
    margin: "1rem 0"
  },
  textInput: {
    width: "87.5vw",
    margin: "1rem 0",
    padding: ".5rem"
  },
  textArea: {
    width: "87.5vw",
    margin: "1rem 0",
    padding: ".5rem"
  },
  addNewBrandSection: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center" 
  },
  newBrandContainer: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center"
  }
}

export const BrandSection = ({ handleChange, brands, values, toggleDisable, resetBrand, disabled }) => {

  return (
    <div
      style={classes.root}
    >

      <div
        style={classes.topSection}
      >

        <div
          style={classes.label}
        >
          {!disabled && <label>Brand: {values.name ? `[ ${values.name} ]` : '[ None Selected ]'}</label>}
          {disabled && <label>Brand: {values.name ? `[ ${values.name} ]` : '[ Add a new brand ]'}</label>}
        </div>

        <select
          style={classes.select}
          name="brand"
          onChange={handleChange}
          disabled={disabled}
        >
          {brands.length > 0 && brands.map((brand, i) => {
            return (
            <React.Fragment key={brand.brand_id}>
              {i === 0 && (
                <option value={JSON.stringify({ name: '', description: '' })}>select brand</option>
              )}
              <option 
                value={JSON.stringify(brand)}
              >{brand.name}</option>
            </React.Fragment>
            )})}
        </select>
      
      <div
        style={classes.addNewBrandSection}
      >
        <input 
          type="checkbox"
          name="addNewBrand"
          onChange={() => {
            resetBrand();
            toggleDisable();
          }}
          checked={disabled}
        />
        <p>Add a new brand</p>
      </div>
      
      </div>
        
      {disabled && (
        <div
         style={classes.newBrandContainer}
        >
          <input
            style={classes.textInput}
            value={values.name}
            placeholder="name"
            name="new_brand.name"
            onChange={handleChange}
          />
          <textarea
            style={classes.textArea}
            value={values.description}
            placeholder="description"
            name="new_brand.description"
            onChange={handleChange}
          />
        </div>
      )}

    </div>
  )
}