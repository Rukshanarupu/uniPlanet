import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const CollegeSection = () => {
    const [colleges, setColleges] = useState([]);
    const {loading } = useContext(AuthContext);

    useEffect(() => {
      fetch(`http://localhost:5000/universities`)
      .then((res) => res.json())
      .then((result) => {
        setColleges(result);
      });
    }, []);
  
    if (loading) {
        return <LoadingSpinner />;
    }

    console.log(colleges)

    return (
        <div>
        <div className="grid md:grid-cols-2 gap-7 my-5">
          {colleges?.map((college, id) => (
            <College key={id} college={college}></College>
          ))}
        </div>
        </div>
    );
};

const College =({college})=>{
    const {user } = useContext(AuthContext);
      console.log(college)
      const {pictureUrl, name, price, rating, _id}=college || {}
      const warning = () => toast.error('You have to log in first to view details');
    return(
      <div className="md:flex-row flex-col card card-side bg-sky-100 shadow-xl">
        <div className="w-full h-64 flex items-center justify-center">
          <figure><img className="w-[300px] h-[200px]" src={pictureUrl} alt="Movie"/></figure>
        </div>
        <div className="card-body">
          <div>
            <h2 className="card-title">{name}</h2>
            <p className="font-semibold">Price: <span className="text-orange-500">{price} taka</span></p>
          </div>
          <h3 className="text-xs">Rating: <span className="text-orange-500">{rating}</span></h3>
          <div className="card-actions justify-end">
            {
              user ?
              <Link to={`/details/${_id}`} className="btn my-btn">View details</Link>:
              <Link onClick={warning} className="btn my-btn">View details</Link>
  
            }
          </div>
        </div>
      </div>
  
    )
  }

export default CollegeSection;