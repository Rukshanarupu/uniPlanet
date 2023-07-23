import { Link, useLoaderData } from "react-router-dom";

const Admission = () => {
  const admissionDetailsLoaded = useLoaderData();
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
                <Link to={`/admissionDetails/${_id}`} className="btn bg-primary normal-case text-black hover:bg-secondary border-0">Booking</Link>
              </div>
            </div>
          </div>
        ))
      }

    </div>
  );
};


{/* <div className="card w-96 bg-base-100 shadow-xl image-full">
  <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div> */}
// { 
//   sports_facility.facilities.map((facility, _id) => (
//       <div key={_id}>
//           <p>{facility}</p>
//       </div>
//   ))}
export default Admission;