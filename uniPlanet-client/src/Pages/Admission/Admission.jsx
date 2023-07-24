import { Link, useLoaderData } from "react-router-dom";

const Admission = () => {
  const admissionDetailsLoaded = useLoaderData();
  const [selectedCollege, setSelectedCollege] = useState(null);

  const handleCollegeClick = (admissionDetail) => {
    setSelectedCollege(admissionDetail);
  };
  
  console.log(admissionDetailsLoaded)
 
  return (
    <div className="container mx-auto grid md:grid-cols-3">
      {
        admissionDetailsLoaded?.map((admissionDetail, _id)=>(
          <div key={_id} className="card w-96 bg-base-100 shadow-xl image-full mb-5 h-[200px]">
            <figure><img src={admissionDetail.image} alt="Movie"/></figure>
            <div className="card-body">
              <h2 className="card-title">{admissionDetail.name}</h2>
              <p>Please click the button to booking your expected College.</p>
              <div className="card-actions justify-end">
                <button onClick={() => handleCollegeClick(admissionDetail)}> className="btn bg-primary normal-case text-black hover:bg-secondary border-0">Select</button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Admission;
