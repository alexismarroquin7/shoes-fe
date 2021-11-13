import { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import { ShoeStyleSection } from "./ShoeStyleSection"
import { BrandSection } from "./BrandSection"
import { 
  Brand as BrandService,
  Style as ShoeStyleService,
  Color as ColorService,
  ShoeSize as ShoeSizeService,
  Gender as GenderService,
  Shoe as ShoeService
} from "../../../services"
import { ModelSection } from "./ModelSection";
import { v4 as uuidv4 } from 'uuid';

const classes = {
  root: {
    border: "10px solid red",  
    width: "100vw",
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center"
  },
  wrapper: {
    border: "1px solid blue",
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center"
  },
  header: {
    padding: "1rem 0",
    width: "90vw",
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center"
  },
  textInputContainer: {
    width: "90vw",
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "flex-start"
  },
  textInput: {
    width: "90%",
    margin: "1rem 0"
  },
  textArea: {
    width: "85%",
    padding: "1rem"
  },
  divider: {
    width: "90vw",
    border: "1px solid black",
    margin: "4rem 0"
  }
}

const initialFormOptions = {
  brands: [],
  styles: [],
  colors: [],
  sizes: [],
  genders: []
};

const initialErrorMessage = {
  brand: '',
  style: '',
  color: '',
  gender: '',
  size: ''
}

const initialFormValues = {
  name: '',
  description: '',
  brand: { name: '', description: '' },
  style: { name: '', description: '' },
  models: []
};

const initialModelValues = {
  color: {
    shoe_size_id: null,
    name: ''
  },
  size: {
    shoe_size_id: null
  },
  gender: {
    shoe_size_id: null,
    name: ''
  },
  images: [],
  quantity: 0,
  price: 0.00
}

const initialDisabled = {
  style: {
    select: false
  },
  brand: {
    select: false
  },
  submit: false
}

const Divider = () => {
  return <div style={classes.divider}></div>
}

export const NewShoeForm = () => {
  const [formOptions, setFormOptions] = useState(initialFormOptions);
  const [values, setValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(initialDisabled); //eslint-disable-line
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage); //eslint-disable-line
  
  useEffect(() => {
    const fetchStyleOptions = async () => {
      try {
        const res = await ShoeStyleService.findAll();
        setFormOptions(f => {
          return {
            ...f,
            styles: res.data
          }
        });
      
      } catch (err) {        
        setErrorMessage(s => {
          return {
            ...s,
            style: err.response.data.message
          }
        });
      }
      
    }
    
    const fetchBrandOptions = async () => {
      try {
        const res = await BrandService.findAll();
        setFormOptions(f => {
          return {
            ...f,
            brands: res.data
          }
        });
      
      } catch (err) {        
        setErrorMessage(s => {
          return {
            ...s,
            brand: err.response.data.message
          }
        });
      }
      
    }

    const fetchColorOptions = async () => {
      try {
        const res = await ColorService.findAll();
        setFormOptions(f => {
          return {
            ...f,
            colors: res.data
          }
        });
      
      } catch (err) {        
        setErrorMessage(s => {
          return {
            ...s,
            color: err.response.data.message
          }
        });
      }
    }

    const fetchGenderOptions = async () => {
      try {
        const res = await GenderService.findAll();
        setFormOptions(f => {
          return {
            ...f,
            genders: res.data
          }
        });
      
      } catch (err) {        
        setErrorMessage(s => {
          return {
            ...s,
            gender: err.response.data.message
          }
        });
      }
    }

    const fetchShoeSizeOptions = async () => {
      try {
        const res = await ShoeSizeService.findAll();
        setFormOptions(f => {
          return {
            ...f,
            sizes: res.data
          }
        });
      
      } catch (err) {        
        setErrorMessage(s => {
          return {
            ...s,
            size: err.response.data.message
          }
        });
      }
    }

    fetchStyleOptions();
    fetchBrandOptions();
    fetchColorOptions();
    fetchGenderOptions();
    fetchShoeSizeOptions();
  }, []);
  
  const navigate = useNavigate();

  const toggleDisableSelectStyle = () => setDisabled({
    ...disabled,
    style: {
      ...disabled.style,
      select: !disabled.style.select
    }
  });
  
  const toggleDisableSelectBrand = () => setDisabled({
    ...disabled,
    brand: {
      ...disabled.brand,
      select: !disabled.brand.select
    }
  });

  const handleResetStyle = () => setValues({
    ...values,
    style: initialFormValues.style
  });
  
  const handleResetBrand = () => setValues({
    ...values,
    brand: initialFormValues.brand
  });

  const handleAddImageToModel = (model_id) => setValues({
    ...values,
    models: values.models.map((model) => {
      if(model.model_id === model_id){
        model.images = [
          ...model.images,
          {
            image_id: uuidv4(), 
            src: '',
            alt: '',
            title: '',
            name: ''
          }
        ];
      }
      return model;
    })
  })
  
  const handleRemoveImageFromModel = (model_id, image_id) => setValues({
    ...values,
    models: values.models.map((model) => {
      if(model.model_id === model_id){
        model.images = model.images.filter(image => image.image_id !== image_id)
      }
      return model;
    })
  })

  const handleAddNewModel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValues({
      ...values,
      models: [
        ...values.models,
        {
          ...initialModelValues,
          model_id: uuidv4()
        }
      ] 
    })
  }

  const handleRemoveModel = (model_id) => setValues({
    ...values,
    models: values.models.filter(model => model.model_id !== model_id)
  })
  
  const handleChange = e => {
    const { name, value, checked, type } = e.target;
    
    let valueToUse = type === 'checkbox' ? checked : value;
    if(name === 'style'){
      valueToUse = JSON.parse(valueToUse);

      setValues({ 
        ...values,
        style: {
          ...values.style,
          name: valueToUse.name,
          description: valueToUse.description
        }
      });

    } else if(name.match(/new_style.*/i)){
      const key = name.replace('new_style.', '');
      setValues({ 
        ...values,
        style: {
          ...values.style,
          [key]: value,
        }
      });
      
    } else if(name === 'brand'){
      valueToUse = JSON.parse(valueToUse);

      setValues({ 
        ...values,
        brand: {
          ...values.brand,
          name: valueToUse.name,
          description: valueToUse.description
        }
      });
    } else if(name.match(/new_brand.*/i)){
      const key = name.replace('new_brand.', '');
      setValues({ 
        ...values,
        brand: {
          ...values.brand,
          [key]: value,
        }
      });
    } else if(name.match(/model.*.color/i)) {
      const keys = name.split('.');
      
      const model_id = keys[1];
      
      valueToUse = JSON.parse(valueToUse);
      
      setValues({ 
        ...values,
        models: values.models.map((model) => {
          if(model.model_id === model_id){
            model.color.color_id = valueToUse.color_id;
            model.color.name = valueToUse.name;
          }
          return model;
        })
      });
    } else if(name.match(/model.*.size/i)){
      const keys = name.split('.');

      const model_id = keys[1];
      valueToUse = JSON.parse(valueToUse);
      setValues({ 
        ...values,
        models: values.models.map((model) => {
          if(model.model_id === model_id){
            model.size = valueToUse;
          }
          return model;
        })
      });
    } else if(name.match(/model.*.gender/i)){
      const keys = name.split('.');
      
      const model_id = keys[1];
      valueToUse = JSON.parse(valueToUse);
      setValues({ 
        ...values,
        models: values.models.map((model) => {
          if(model.model_id === model_id){
            model.gender = valueToUse;
          }
          return model;
        })
      });
    } else if(name.match(/model.*.quantity/i)){
      const keys = name.split('.');
      
      const model_id = keys[1];
      
      setValues({ 
        ...values,
        models: values.models.map((model) => {
          if(model.model_id === model_id){
            model.quantity = valueToUse;
          }
          return model;
        })
      });
    } else if(name.match(/model.*.price/i)){
      const keys = name.split('.');
      
      const model_id = keys[1];
      
      setValues({ 
        ...values,
        models: values.models.map((model) => {
          if(model.model_id === model_id){
            model.price = valueToUse;
          }
          return model;
        })
      });
    } else if(name.match(/model.*.image.*/i)) {
      const keys = name.split('.');
      const model_id = keys[1];
      const image_id = keys[3];

      if(name.match(/model.*.image.*.name/i)){
        setValues({
          ...values,
          models: values.models.map(model => {
            if(model.model_id === model_id){
              model.images = model.images.map(image => {
                if(image.image_id === image_id){
                  image.name = valueToUse
                }
                return image;
              })
            }
            return model;
          })
        })
      } else if(name.match(/model.*.image.*.title/i)){
        setValues({
          ...values,
          models: values.models.map(model => {
            if(model.model_id === model_id){
              model.images = model.images.map(image => {
                if(image.image_id === image_id){
                  image.title = valueToUse
                }
                return image;
              })
            }
            return model;
          })
        })
      } else if(name.match(/model.*.image.*.alt/i)){
        setValues({
          ...values,
          models: values.models.map(model => {
            if(model.model_id === model_id){
              model.images = model.images.map(image => {
                if(image.image_id === image_id){
                  image.alt = valueToUse
                }
                return image;
              })
            }
            return model;
          })
        })
      } else if(name.match(/model.*.image.*.src/)){
        setValues({
          ...values,
          models: values.models.map(model => {
            if(model.model_id === model_id){
              model.images = model.images.map(image => {
                if(image.image_id === image_id){
                  image.src = valueToUse;
                }
                return image;
              })
            }
            return model;
          })
        })
      }

    } else {
      setValues({ ...values, [name]: valueToUse });
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await ShoeService.create(values);
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={classes.root}
    >
      <div style={classes.wrapper}>
        {/* -HEADER */}
        <div style={classes.header}>
          <h4>New Shoe</h4>
        </div>

        <ShoeStyleSection 
          values={values.style}
          handleChange={handleChange}
          disabled={disabled.style.select}
          shoeStyles={formOptions.styles}
          toggleDisable={toggleDisableSelectStyle}
          resetStyle={handleResetStyle}
        />
        
        <Divider />
        
        <BrandSection
          values={values.brand}
          handleChange={handleChange}
          disabled={disabled.brand.select}
          brands={formOptions.brands}
          toggleDisable={toggleDisableSelectBrand}
          resetBrand={handleResetBrand}
        />

        <Divider />

        <div
          style={classes.textInputContainer}
          >
          {/* -NAME */}
          <label>Name:</label>
          <input
            style={classes.textInput}
            name="name" 
            placehoder="name"
            onChange={handleChange}
            />
        </div>
        
        <Divider />

        <div
          style={classes.textInputContainer}
        >
          {/* -DESCRIPTION */}
          <label>Description:</label>
          <textarea
            style={classes.textArea} 
            name="description" 
            onChange={handleChange}
          />
        </div>
        
        <Divider />

        <ModelSection 
          handleChange={handleChange}
          models={values.models}
          options={{ colors: formOptions.colors, sizes: formOptions.sizes, genders: formOptions.genders }}
          handleAddImageToModel={handleAddImageToModel}
          handleRemoveImageFromModel={handleRemoveImageFromModel}
          handleRemoveModel={handleRemoveModel}
        />

        <div
          style={{margin: "1rem 0"}}
          >
          <button onClick={handleAddNewModel}>+ Model</button>
        </div>

        <div
          style={{margin: "1rem 0 4rem 0"}}
        >  
          <button onClick={() => navigate('/admin/shoe_inventory')}>Cancel</button>
          <button type="submit" disabled={disabled.submit}>Submit</button>
        </div>
      
      </div>
    </form>
  )
}