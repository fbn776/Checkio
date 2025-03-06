
import logo from '/src/assets/logo.png';

export default function AboutPage() {
    return <div className="px-[55px] py-[20px]">

           <div>
           <img src = {logo} className = "mx-auto mb-[50px] w-[150px] items-center"></img> 
           </div>

           {/* Section 1: About Checkio */}
           <div className="mb-[40px]">
                <h1 className="text-[#081627] text-[40px] font-bold mb-4">
                    Checkio
                </h1>
                <p className="text-[#081627] text-[18px]">
                    Checkio is an automated code evaluation system designed to assist teachers in evaluating student codes efficiently. 
                    This project is done as part of our S6 KTU CSD 334 - Mini Project under the guidance of <b>Prof. Shibu Kumar.</b>
                </p>
            </div>

            {/* Section 2: Checkio Commands */}
            <div className="mb-[40px]">
                <h2 className="text-[#081627] text-[30px] font-semibold mb-4">
                    Checkio Commands
                </h2>
                <ul className="list-disc pl-8 text-[#081627] text-[18px]">
                    <li><b>checkio create : </b>used to create new testcases</li>
                    <li><b>checkio run : </b>used to run the program submitted by students</li>
                    <li><b>checkio about : </b>used to display the features and commands of checki</li>
                    <li><b>checkio serve : </b>used to access the web</li>
                    <li><b>checkio submit : </b>used to submit the program by students</li>
                </ul>
            </div>

            {/* Section 3: How to Use */}
            <div className="mb-[40px]">
                <h2 className="text-[#081627] text-[30px] font-semibold mb-4">
                    How to Use
                </h2>
                <ol className="list-decimal pl-8 text-[#081627] text-[18px]">
                    <li>Faculty creates test cases through the Checkio web platform.</li>
                    <li>Students submit their code through the terminal-based app.</li>
                    <li>Checkio automatically evaluates the code and provides feedback.</li>
                    <li>Students can also test their code independently before submission.</li>
                </ol>
            </div>

            {/* Section 4: Why Checkio? */}
            <div className="mb-[40px]">
                <h2 className="text-[#081627] text-[30px] font-semibold mb-4">
                    Why Checkio?
                </h2>
                <p className="text-[#081627] text-[18px]">
                    Checkio aims to simplify the evaluation process for teachers and promote independent coding practice among students. It ensures malpractice detection, provides instant feedback, and encourages students to self-test their programs.
                </p>
            </div>

            {/* Section 5: Project Members */}
            <div className="mb-[40px]">
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
}