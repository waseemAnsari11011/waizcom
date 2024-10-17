"use client"
import Image from "next/image";
import LineItem from "./lineItem";

const Cost = () => {
//ad
    return (
        <>
                <h1 className="text-2xl md:text-4xl lg:text-3xl font-semibold px-5 md:px-10 lg:px-16 bg-white py-10">Factors that influence cost</h1>

            <div
                id="cost-section"
                className="flex flex-col-reverse lg:flex-row lg:justify-between items-center relative bg-white px-5 md:px-10 lg:px-16"
            >

                <div className="flex-1 lg:mr-10 mt-10 lg:mt-0">
                    <LineItem category={"Factor 1: Complexity and type"} isShown={true} description={"The more complicated an app is, the more it costs. This is because an app with lots of features takes longer to make, and the longer it takes, the more money it costs. Simple apps are quicker and cheaper to build."} color={'#2D8BBA'} highlightText={'more complicated an app is, the more it costs'} />
                    <LineItem category={"Factor 2: Integration with external systems"} isShown={true} description={"When you add features from other companies to your app, like social media, ways to pay, or map services, it costs more. These companies usually charge for using their services, which adds to the cost."} color={'#2D8BBA'} highlightText={'These companies usually charge for using their services, which adds to the cost.'} />
                    <LineItem category={"Factor 3: Platforms and devices"} isShown={true} description={"In mobile app development, using cross-Platform development meaning using single codebase for both Android & Ios can offer cost savings ranging from 10% to 50%"} color={'#2D8BBA'} highlightText={'offer cost savings ranging from 10% to 50%'} />
                    <LineItem category={"Factor 4: Ongoing maintenance"} isShown={true} description={"After an app is launched, it still needs to be looked after. This includes fixing any issues, updating it, and helping users. Even though this isn’t part of making the app, it’s important to plan and set aside money for this work early on. The basic monthly support fee starts at around ₹2000 per month after 6 months free warranty support and increases if any new feature is to be built."} color={'#2D8BBA'} highlightText={'The basic monthly support fee starts at around ₹2000 per month after 6 months free warranty support and increases if any new feature is to be built.'} />
                </div>

                <div className="flex-1">
                    <Image src="/cost_development.png" alt="My Image" className="" width={600} height={600} />
                </div>


            </div>
        </>

    );
}

export default Cost;
