import { ShoeInventory } from "../actions";

const getUniqueIds = (arr, cb) => {
  return [...new Set(arr.map(cb))];
}

const formatShoeInventoryList = (shoe_inventory_list) => {
  const uniqueShoeIdList = getUniqueIds(shoe_inventory_list, (shoe_inv) => shoe_inv.shoe.shoe_id);

  const visitedShoeIdSet = new Set();
  const shoes = uniqueShoeIdList.map(shoe_id => {
    
    let shoe = {};
    let thumbnail = {};
    
    const colorSet = new Set();
    let colors = [];
    
    const shoeInvFiltered = shoe_inventory_list.filter(shoe_inv => shoe_inv.shoe.shoe_id === shoe_id);
    
    shoeInvFiltered.forEach((shoe_inv, i) => {
      if(!visitedShoeIdSet.has(shoe_inv.shoe.shoe_id)){
        
        shoe = {
          shoe_id: shoe_inv.shoe.shoe_id,
          name: shoe_inv.shoe.name,
          description: shoe_inv.shoe.description,
          brand: shoe_inv.shoe.brand,
          created_at: shoe_inv.shoe.created_at,
          modified_at: shoe_inv.shoe.modified_at,
          style: {
            shoe_style_id: shoe_inv.shoe.style.shoe_style_id,
            name: shoe_inv.shoe.style.name,
            description: shoe_inv.shoe.style.description,
            gender: shoe_inv.shoe.style.gender,
            created_at: shoe_inv.shoe.style.created_at,
            modified_at: shoe_inv.shoe.style.modified_at
          }
        };

        visitedShoeIdSet.add(shoe_inv.shoe.shoe_id);
      }

      if(!colorSet.has(shoe_inv.shoe.style.color.color_id)){
        const color = {
          ...shoe_inv.shoe.style.color,
          sizes: [
            {
              ...shoe_inv.shoe.size,
              images: shoe_inv.shoe.images,
              
              inventory: {
                shoe_inventory_id: shoe_inv.shoe_inventory_id,
                price: shoe_inv.price,
                quantity: shoe_inv.quantity,
                created_at: shoe_inv.created_at,
                modified_at: shoe_inv.modified_at,
              }
            }
          ]
        };
        colors.push(color);
        colorSet.add(shoe_inv.shoe.style.color.color_id);

      } else {
        colors = colors.map(color => {
          if(color.color_id === shoe_inv.shoe.style.color.color_id){
            color.sizes.push({
              ...shoe_inv.shoe.size,
              images: shoe_inv.shoe.images
            });
          }
          return color;
        });

      }

      if(i === shoeInvFiltered.length-1){
        thumbnail = {...shoe_inv.shoe.images[0]};
      }
    });

    return {
      ...shoe,
      thumbnail,
      colors
    };

  });

  return shoes;
};

const initialState = {
  list: [],
  status: {
    loading: false,
    error: {
      message: ""
    }
  }
};

export const shoeInventoryReducer = (state = initialState, action) => {
  switch(action.type){
    case ShoeInventory.FETCH_ALL.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            ...state.status.error,
            message: ""
          }
        }
      }
    
    case ShoeInventory.FETCH_ALL.SUCCESS:
      const formattedShoeInventoryList = action.payload.useShoeView ? formatShoeInventoryList(action.payload.shoe_inventory) : action.payload.shoe_inventory;
      return {
        ...state,
        list: [...formattedShoeInventoryList],
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ""
          }
        }
      }
    
    case ShoeInventory.FETCH_ALL.FAIL:
      
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: action.payload.error.data.message
          }
        }
      }

    case ShoeInventory.FETCH_BY_SHOE_ID.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            ...state.status.error,
            message: ''
          }
        }
      }
    
    case ShoeInventory.FETCH_BY_SHOE_ID.SUCCESS:
      const formattedShoeInventoryListByShoeId = formatShoeInventoryList(action.payload.shoe_inventory);
      return {
        ...state,
        list: [...formattedShoeInventoryListByShoeId],
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ""
          }
        }
      }

    case ShoeInventory.FETCH_BY_SHOE_ID.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: action.payload.error.data.message
          }
        }
      }

    default:
      return state;
  }
};