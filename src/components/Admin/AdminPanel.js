import { Button } from "@material-ui/core"
import { useNavigate } from "react-router"

export const AdminPanel = () => {
  const navigate = useNavigate()
  return (
  <div>
    <Button onClick={() => navigate('/admin/shoe_inventory')}>Inventory</Button>
  </div>
  )
}