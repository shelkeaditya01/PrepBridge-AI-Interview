import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "./dashboard/_components/Header";

export default function Home() {
  const features = [
    {
      title: "AI-Powered Feedback",
      description: "Get instant, detailed feedback on your interview performance with AI-driven insights.",
      icon: "🤖",
    },
    {
      title: "Real Interview Scenarios",
      description: "Practice with realistic interview questions tailored to your target role and industry.",
      icon: "🎯",
    },
    {
      title: "Confidence Building",
      description: "Simulate real interviews and track your progress with every attempt.",
      icon: "💪",
    },
    {
      title: "Expert Guidance",
      description: "Learn from best practices and get personalized tips to improve your skills.",
      icon: "📚",
    },
    {
      title: "Performance Analytics",
      description: "Track your improvement over time with detailed performance metrics and insights.",
      icon: "📊",
    },
    {
      title: "Dream Job Ready",
      description: "Master interviews and land your dream job with PrepBridge's comprehensive platform.",
      icon: "🚀",
    },
  ];

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
<section className="relative flex items-center justify-center min-h-[80vh] sm:min-h-screen bg-black text-white overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/PrepHome.webp"
      alt="PrepBridge Background"
      className="w-full h-full object-cover opacity-60"
    />
    {/* Dark gradient overlay for better text visibility */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center max-w-3xl">
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold drop-shadow-lg">
      PrepBridge
    </h1>

    <p className="mt-4 text-base sm:text-lg md:text-2xl font-medium leading-snug">
      Your AI-powered partner to master interviews from practice to performance.
    </p>

    <p className="mt-3 text-sm sm:text-base md:text-lg font-semibold text-gray-200">
      Get instant feedback, simulate real interview scenarios, & boost your confidence
      with every attempt. Get ready to showcase your skills & land your dream job.
    </p>

    <Link href="/sign-in">
      <Button className="mt-6 sm:mt-8 bg-neutral-800 hover:bg-transparent border border-gray-900 cursor-pointer text-white text-base sm:text-lg px-5 py-3 rounded-md shadow-md transition-all">
        Schedule Your Interview Now!
      </Button>
    </Link>
  </div>
</section>


      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PrepBridge?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to ace your interviews and land your dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="mt-3 text-base sm:text-lg text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-300 px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-black text-xl font-semibold mb-3">PrepBridge</h3>
            <p className="text-sm text-black">
              Crack Interviews. Powered by AI. Driven by You.
            </p>
            <p className="mt-4 text-xs text-black">© {new Date().getFullYear()} Aditya Shelke. All rights reserved.</p>
          </div>

          {/* Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-black font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-black hover:text-gray-800 transition hover:font-bold">About Us</a></li>
              <li><a href="/contact" className="text-black hover:text-gray-800 transition hover:font-bold">Contact</a></li>
              <li><a href="/careers" className="text-black hover:text-gray-800 transition hover:font-bold">Careers</a></li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-black font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/terms" className="text-black hover:text-gray-800 transition hover:font-bold">Terms & Conditions</a></li>
              <li><a href="/privacy" className="text-black hover:text-gray-800 transition hover:font-bold">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-center sm:text-left">
            <h4 className="text-black font-semibold mb-3">Connect</h4>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="https://www.linkedin.com/in/aditya-shelke-ba90742a5" target="_blank" className="text-black hover:text-gray-800 transition hover:font-bold">LinkedIn</a>
              <a href="https://github.com/shelkeaditya01" target="_blank" className="text-black hover:text-gray-800 transition hover:font-bold">GitHub</a>
            </div>
            <p className="mt-4 text-xs text-black">Made with ❤️ by Aditya Shelke.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
