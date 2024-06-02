import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "./navbar";
import AddReviewData from "../components/AddReview";

const AddReview = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const establishment_id = params.get("establishment_id");
  const item_id = params.get("item_id");
  return (
    <>
      <Navbar />
      <div className="add-review-container">
        <AddReviewData
          establishment_id={establishment_id}
          item_id={item_id}
        ></AddReviewData>
      </div>
    </>
  );
};

export default AddReview;
