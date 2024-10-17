import { FaAndroid } from "react-icons/fa";
import { AiFillAndroid } from "react-icons/ai";
import { IoLogoApple } from "react-icons/io";
import { FaReact } from "react-icons/fa";
import Image from "next/image";

const Skills = () => {
  return (
    <div
      id="skills-section"
      className="bg-white px-5 md:px-10 lg:px-16 relative bg-stone-50 mb-10 md:mb-20"
      style={{ zIndex: 1 }}
    >
      <h1 className="text-2xl md:text-4xl lg:text-3xl font-semibold mb-10">
        TECH
      </h1>
      <p className="mt-3 text-base text-slate-600">
        We have extensive experience working with a variety of technologies as a
        developer. We've developed and maintained multiple projects using these
        technologies, and We are always eager to learn more.
      </p>
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center">
          <Image
            src="/android.png"
            alt="Android Icon"
            width={70}
            height={70}
            className="mr-3 object-contain"
          />
          <div>
            <h2 className="font-bold text-xl lg:text-2xl">Android</h2>
            <p className="text-base text-slate-600">Android App development</p>
          </div>
        </div>

        <div className="flex items-center">
          <Image
            src="/apple.png"
            alt="Android Icon"
            width={70}
            height={70}
            className="mr-3 object-contain"
          />
          <div>
            <h2 className="font-bold text-xl lg:text-2xl">IOS</h2>
            <p className="text-base text-slate-600">IOS App development</p>
          </div>
        </div>

        <div className="flex items-center">
          <Image
            src="/atom.png"
            alt="Android Icon"
            width={70}
            height={70}
            className="mr-3 object-contain"
          />
          <div>
            <h2 className="font-bold text-xl lg:text-2xl">React</h2>
            <p className="text-base text-slate-600">
              JavaScript library for building user interfaces.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Image
            src="/atom.png"
            alt="Android Icon"
            width={70}
            height={70}
            className="mr-3 object-contain"
          />
          <div>
            <h2 className="font-bold text-xl lg:text-2xl">React Native</h2>
            <p className="text-base text-slate-600">
              Cross-platform mobile app development.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Image
            src="/nodejs.png"
            alt="Android Icon"
            width={70}
            height={70}
            className="mr-3 object-contain"
          />
          <div>
            <h2 className="font-bold text-xl lg:text-2xl">Node js</h2>
            <p className="text-base text-slate-600">
              JavaScript runtime environment for servers.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Image
            src="/mongo.png"
            alt="Android Icon"
            width={70}
            height={70}
            className="mr-3 object-contain"
          />
          <div>
            <h2 className="font-bold text-xl lg:text-2xl">MongoDB</h2>
            <p className="text-base text-slate-600">
              Flexible, Scalable, NoSQL.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Image
            src="/nextjs.png"
            alt="Android Icon"
            width={70}
            height={70}
            className="mr-3 object-contain"
          />
          <div>
            <h2 className="font-bold text-xl lg:text-2xl">Nextjs</h2>
            <p className="text-base text-slate-600">
              Server-side rendering for React.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Image
            src="/aws.jpg"
            alt="Android Icon"
            width={70}
            height={70}
            className="mr-3 object-contain"
          />
          <div>
            <h2 className="font-bold text-xl lg:text-2xl">AWS</h2>
            <p className="text-base text-slate-600">
              Cloud computing platform by Amazon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
