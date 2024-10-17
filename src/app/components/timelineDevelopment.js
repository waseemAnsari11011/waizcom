"use client"
import Image from "next/image";
import LineItem from "./lineItem";

const timeLine = () => {

    return (
        < >
            <h1 className="text-2xl md:text-4xl lg:text-3xl font-semibold px-5 md:px-10 lg:px-16 bg-white mb-10 md:mb-20">Factors that influence timeline</h1>

            <div
                id="time-section"
                className="flex flex-col lg:flex-row items-center relative bg-white px-5 md:px-10 lg:px-16"
            >

                <div className="flex-1 ">
                    <Image src="/timeline.png" alt="My Image" className="" width={500} height={500} />
                </div>

                <div className="flex-1 lg:mr-10 mt-10 lg:mt-0">
                    <LineItem category={"Factor-1: App complexity"} isShown={true} description={"The more things an app can do, the more complicated it is. Simple apps do just a few things, while  complex ones have lots of features that need more time to create, test, and make easy to use."} color={'#6CE5E8'} highlightText={'complex ones have lots of features that need more time to create'} />
                    <LineItem category={"Factor-2: Third-party integrations"} isShown={true} description={"Apps often use extra tools from other companies, like for payments or social media features. These tools add more abilities to the app but can also take more time to integrate them."} color={'#41B8D5'} highlightText={'These tools add more abilities to the app but can also take more time to integrate them.'} />
                    <LineItem category={"Factor-3: Experience of the development team"} isShown={true} description={"Teams with a lot of experience usually follow good strategies, rules for writing code, and smart ways to solve problems. This helps them make fewer mistakes."} color={'#2D8BBA'} highlightText={'make fewer mistakes'} />
                    <LineItem category={"Factor-4: Precision of requirements"} isShown={true} description={"When an app's plan is clear and detailed, it guides the team and helps avoid confusion or changes during the project. If the plan isn't clear, it can cause unexpected extra work and changes that can make the project harder to finish and lower the team's spirit."} color={'#2F5F98'} highlightText={'it can cause unexpected extra work and changes'} />
                </div>
            </div>
        </>

    );
}

export default timeLine;
