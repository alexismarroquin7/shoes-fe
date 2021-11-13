import { Model } from "./Model";

export const ModelSection = ({ models,
  options,
  handleChange,
  handleAddImageToModel,
  handleRemoveImageFromModel,
  handleRemoveModel
 }) => {
  return (
    <div>
      {models.length > 0 && models.map((model) => {
        return <Model 
          key={model.model_id}
          options={options}
          handleChange={handleChange}
          model={model}
          handleAddImageToModel={handleAddImageToModel}
          handleRemoveImageFromModel={handleRemoveImageFromModel}
          handleRemoveModel={handleRemoveModel}
        />
      })}
    </div>
  )
};