import Image from "next/image";
import { LightbulbIcon } from "lucide-react";

// Feature card component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="text-center px-6 py-8 border-r border-gray-800 last:border-r-0">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-white text-xl font-medium mb-4">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function FeaturesSection() {
  // Feature data
  const features = [
    {
      icon: <LightbulbIcon className="w-6 h-6 text-amber-500" />,
      title: "Lorem ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-amber-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 16V8H8V16H16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 20V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 12H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 12H8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Lorem ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    },
    {
      icon: <LightbulbIcon className="w-6 h-6 text-amber-500" />,
      title: "Lorem ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-amber-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 16V8H8V16H16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 20V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 12H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 12H8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Lorem ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    },
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cover2.png"
          alt="Restaurant interior"
          fill
          className="object-cover brightness-[0.1]"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-amber-500 font-great-vibes text-2xl mb-6">
            Lorem Ipsum
          </h2>
          <p className="text-white text-3xl md:text-4xl font-medium max-w-4xl mx-auto leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-gray-800 rounded-lg overflow-hidden">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
