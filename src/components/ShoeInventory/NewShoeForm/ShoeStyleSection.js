import React from "react";

const classes = {
  root: {
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
    width: "90vw",
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
  addNewStyleSection: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center" 
  },
  newStyleContainer: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center"
  }
}

export const ShoeStyleSection = ({ values, handleChange, disabled, shoeStyles, toggleDisable, resetStyle }) => {
  return (
    <div
      style={classes.root}
    >    

      <div
        style={classes.topSection}
      >
        
        <div style={classes.label}>
          {!disabled && <label>Style: {values.name ? `[ ${values.name} ]` : '[ None Selected ]'}</label>}
          {disabled && <label>Style: {values.name ? `[ ${values.name} ]` : '[ Add a new style ]'}</label>}
        </div>
      
        <select
          name="style"
          style={classes.select}
          onChange={handleChange}
          disabled={disabled}
        >
        {shoeStyles.length > 0 && shoeStyles.map((sh_style,i) => {
          return (
          <React.Fragment key={sh_style.shoe_style_id}>
            {i === 0 && (
              <option value={JSON.stringify({ name: '', description: '' })}>select style</option>
            )}
            <option
              value={JSON.stringify(sh_style)} 
            >{sh_style.name}
            </option>
          </React.Fragment>
          )})}
        </select>

        <div
          style={classes.addNewStyleSection}
        >
          <input
            type="checkbox"
            name="addNewStyle"
            onChange={() => {
              resetStyle();
              toggleDisable();
            }}
            checked={disabled}
          />
          <p>Add a new style</p>
        </div>

      </div>

    {disabled && (
      <div
        style={classes.newStyleContainer}
        
        >
        <input 
          style={classes.textInput}
          value={values.name}
          placeholder="name"
          name="new_style.name"
          onChange={handleChange}
        />
        
        <textarea
          style={classes.textArea}
          value={values.description}
          placeholder="description"
          name="new_style.description"
          onChange={handleChange}
        />
      </div>
    )}

  </div>
  )
}