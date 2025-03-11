import {useNavigate} from "react-router";
import { motion } from "framer-motion";
import logo from '/src/assets/logo.png';

export default function WelcomePage(){
    const navigate = useNavigate();
    return(
        <div onClick={()=>{
            
            localStorage.setItem("isNewUser",true);
            navigate("/login")
        }}
        className="flex h-screen bg-[#c7e0ec] items-center justify-center" 
        >
            <div className = "flex flex-col items-center gap-10">
                  {/* Animated Logo */}
                  <motion.img
                        src={logo}
                        className="w-[150px] cursor-pointer"
                        initial={{ scale: 0, opacity: 0 }} // Start hidden
                        animate={{ scale: 1, opacity: 1 }} // Pop up effect
                        transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
                    />
                    <motion.div
                        className="text-[50px] font-bold gap-2 flex"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    >
                         Welcome to<div className="text-[#009be5]"> CHECKIO!</div>
                    </motion.div>
               </div>
        </div>
    )
}