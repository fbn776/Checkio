
import logo from '/src/assets/logo.png';

export default function BriefPage() {
   
    return (
    <div className="p-5">
           
           <div>
           <img src = {logo} className = "mx-auto mb-[50px] w-[150px] items-center"></img> 
           </div>

           <div className = "px-[30px] py-[20px] bg-white shadow-xl rounded-[10px] mb-[30px]">
           {/* Section 1: About Checkio */}
                <h1 className="text-[#081627] text-[40px] font-bold mb-4">
                    Checkio
                </h1>
                <p className="text-[#081627] text-[18px]">
                Checkio is a test case execution tool designed for students and faculty. It allows users to create test cases, run programs against a specified testcase. The tool provides insights and suggestions for failed test cases, helping users to debug their code efficiently.
                This project is developed as part of our S6 KTU CSD 334 - Mini Project under the guidance of <b>Prof. Shibu Kumar.</b>
                </p>
            </div>
            <div className = "px-[30px] py-[20px] bg-white shadow-xl rounded-[10px] mb-[30px]">
            {/* Section 4: Why Checkio? */}
                <h2 className="text-[#081627] text-[30px] font-semibold mb-4">
                    Why Checkio?
                </h2>
                <p className="text-[#081627] text-[18px]">
                    Checkio aims to simplify the evaluation process for teachers and promote independent coding practice among students. It ensures malpractice detection, provides instant feedback, and encourages students to self-test their programs.
                </p>
            </div>

            <div className = "px-[30px] py-[20px] bg-white shadow-xl rounded-[10px] mb-[30px]">
            {/* Section 5: Project Members */}
                <h2 className="text-[#081627] text-[30px] font-semibold mb-4">
                    Project Members
                </h2>
                <ul className="list-disc pl-8 text-[#081627] text-[18px]">
                    <li>Abhiram Ashok</li>
                    <li>Aysha Naurin</li>
                    <li>Febin Nelson P</li>
                    <li>Sreelakshmi P</li>
                </ul>
            </div>
    </div>
    )
}