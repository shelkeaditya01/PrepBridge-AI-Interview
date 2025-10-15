import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "./dashboard/_components/Header";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <div className="relative min-h-screen bg-black text-white mt-1">
        
        {/* Background Image with overlay */}
        <div className="relative w-full h-184">
          <img
            src="/PrepHome.webp"
            className="w-386 h-184 object-cover opacity-60"
            alt="PrepBridge Background"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-extrabold text-white drop-shadow-md tracking-tight">
              <span>PrepBridge</span>
            </h1>

            <p className="mt-4 text-2xl md:text-3xl font-medium max-w-2xl leading-snug">
              Your AI-powered partner to master interviews from practice to performance.
            </p>

            <p className="mt-3 text-lg w-200 font-bold">
              Get instant feedback, simulate real interview scenarios, & boost your confidence with every attempt. Get ready to showcase youe skills & land your dream job.
            </p>

            <Link href="/sign-in">
              <Button className="mt-10 border-gray-900 bg-gray-800 hover:bg-transparent cursor-pointer text-white text-lg px-6 py-3 rounded-md shadow-lg">
                Schedule Your Interview Now!
              </Button>
            </Link>
          </div>
        </div>
      </div>
      


      
      {/* Footer */}
      
      <footer className="bg-gray-200 text-gray-300 px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand Info */}
            <div>
            <h3 className="text-black text-xl font-semibold mb-3">PrepBridge</h3>
            <p className="text-sm text-black">
                Crack Interviews. Powered by AI. Driven by You.
            </p>
            <p className="mt-4 text-xs text-black">© {new Date().getFullYear()} Aditya Shelke. All rights reserved.</p>
            </div>

            {/* Links */}
            <div className='ml-32'>
            <h4 className="text-black font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
                <li><a href="/about" className="text-black hover:text-gray-800 transition hover:font-bold">About Us</a></li>
                <li><a href="/contact" className="text-black hover:text-gray-800 transition hover:font-bold">Contact</a></li>
                <li><a href="/careers" className="text-black hover:text-gray-800 transition hover:font-bold">Careers</a></li>
            </ul>
            </div>

            <div className='ml-18'>
            <h4 className="text-black font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
                <li><a href="/terms" className="text-black hover:text-gray-800 transition hover:font-bold">Terms & Conditions</a></li>
                <li><a href="/privacy" className="text-black hover:text-gray-800 transition hover:font-bold">Privacy Policy</a></li>
            </ul>
            </div>

            {/* Social */}
            <div>
            <h4 className="text-black font-semibold mb-3">Connect</h4>
            <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/aditya-shelke-ba90742a5" target="_blank" className="text-black hover:text-gray-800 transition hover:font-bold">LinkedIn</a>
                <a href="https://github.com/shelkeaditya01" target="_blank" className="text-black hover:text-gray-800 transition hover:font-bold">GitHub</a>
            </div>
            <p className="mt-4 text-xs text-black">Made with ❤️ by Aditya Shelke</p>
            </div>
        </div>
    </footer>


    </div>
  );
}
