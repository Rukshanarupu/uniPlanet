import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import LoadingSpinner from "../Shared/LoadingSpinner";

const CollegeSection = () => {
    const [colleges, setColleges] = useState([]);
    const {loading } = useContext(AuthContext);

    useEffect(() => {
      fetch(`https://animal-toy-market.vercel.app/universities`)
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
          {categories?.map((category, id) => (
            <Category key={id} category={category}></Category>
          ))}
        </div>
        </div>
    );
};

export default CollegeSection;