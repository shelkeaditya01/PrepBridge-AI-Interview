import Header from '@/app/dashboard/_components/Header';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div>
      
      <Header></Header>

      <main className="flex w-full min-h-screen mb-1 mt-1">
        {/* Left Side - 60% */}
        
        <div className="w-[60%] flex items-center justify-center relative bg-gray-900">
          
          <div className="relative z-10 w-full max-w-md text-white px-6">
            <img src="/PrepBridgeLogo.png" width={150} className="ml-32" />
            <div className="mt-16 space-y-3">
              <h3 className="text-3xl font-bold">
                Crack Interviews. Powered by AI. Driven by You.
              </h3>
              <p className="text-gray-300">
                Create an account and get access to all features for 30-days. No credit card required.
              </p>
              <div className="flex items-center -space-x-2 overflow-hidden">
                {/* Avatars */}
                <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://randomuser.me/api/portraits/men/86.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" className="w-10 h-10 rounded-full border-2 border-white" />
                <p className="text-sm text-gray-400 font-medium translate-x-5">
                  Join 5,000+ users
                </p>
              </div>
            </div>
          </div>

          {/* Gradient Background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)',
              filter: 'blur(118px)',
            }}
          />
        </div>

        {/* Right Side - 40% */}
        <div className="w-[40%] flex items-center justify-center bg-white">
          <div className="w-full max-w-md space-y-8 px-4 text-gray-600 sm:px-0">
            <div className="lg:hidden">
              <img src="https://floatui.com/logo.svg" width={150} />
            </div>
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
              <p>
                Already have an account?{" "}
                <a href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Log in
                </a>
              </p>
            </div>

            {/* Divider */}
            <div className="relative">
              <span className="block w-full h-px bg-gray-300" />
              <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
                Or continue with
              </p>
            </div>

            <SignIn afterSignInUrl="/dashboard" afterSignUpUrl="/sign-in"></SignIn>

          </div>
        </div>
      </main>
      

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
