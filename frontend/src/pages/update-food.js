import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "./navbar";
import EditFood from "../components/EditFood";

const UpdateFood = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const item_id = params.get("item_id");

  return (
    <>
      <Navbar />
      <div className="update-food-container">
        <EditFood item_id={item_id}></EditFood>
      </div>
    </>
  );
};

export default UpdateFood;
