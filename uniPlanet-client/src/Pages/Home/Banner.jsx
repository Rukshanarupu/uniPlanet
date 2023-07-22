import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";


const Banner = () => {
    return (
        <div className="container mx-auto ">
           <div className='carousel  md:h-[600px] '>
                <div id="slide1" className="carousel-item relative w-full grid md:grid-cols-2">
                <motion.div
                    variants={fadeIn("right", 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.3 }}
                >
                   <div className=''>
                    <img src='https://raw.githubusercontent.com/Rukshanarupu/assignment-image-link/main/Assignment-11-img/slider-1.webp' className="w-full rounded-xl" />
                </div>
                   </motion.div>
                    <div className=''>
                        <div className=" text-white space-y-7 md:w-2/4 ml-20">
                            <h1 className="mb-5 text-7xl font-bold font-forum">We maximize your chance of getting admitted to your chosen universities</h1>
                            <p className="mb-5">Special Offer for New Customer</p>
                            <Link to='./login' className="btn my-btn mb-3">Explore More</Link>
                        </div>
                    </div>
                    
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide5" className="btn btn-circle bg-primary hover:bg-secondary">❮</a> 
                        <a href="#slide2" className="btn btn-circle bg-primary ml-2 hover:bg-secondary">❯</a>
                    </div>
                </div> 
                <div id="slide2" className="carousel-item relative w-full">
                    <img src='https://raw.githubusercontent.com/Rukshanarupu/assignment-image-link/main/Assignment-11-img/slider-2.webp' className="w-full" />
                    <div className='absolute rounded-xl flex items-center h-full w-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]'>
                        <div className=" text-white space-y-7 md:w-2/4 ml-20">
                            <h1 className="mb-5 text-7xl font-bold font-forum">WATCH THEM GROW </h1>
                            <p className="mb-5">There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                            <p className='flex'><Link to='./login' className="btn my-btn mb-3">Explore More</Link></p>
                        </div>
                    </div>
                    
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle bg-primary hover:bg-secondary">❮</a> 
                        <a href="#slide3" className="btn btn-circle bg-primary ml-2 hover:bg-secondary">❯</a>
                    </div>
                </div> 
                <div id="slide3" className="carousel-item relative w-full">
                    <img src='https://raw.githubusercontent.com/Rukshanarupu/assignment-image-link/main/Assignment-11-img/slider-1.webp' className="w-full" />
                    <div className='absolute rounded-xl flex items-center h-full w-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]'>
                        <div className=" text-white space-y-7 md:w-2/4 ml-20">
                            <h1 className="mb-5 text-7xl font-bold font-forum">Affordable Price For Toy Purchase!</h1>
                            <p className="mb-5">There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                            <p className='flex'><Link to='./login' className="btn my-btn mb-3">Explore More</Link></p>
                        </div>
                    </div>
                    
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle bg-primary hover:bg-secondary">❮</a> 
                        <a href="#slide1" className="btn btn-circle bg-primary ml-2 hover:bg-secondary">❯</a>
                    </div>
                </div> 
           </div>
        </div>
    );
};

export default Banner;
