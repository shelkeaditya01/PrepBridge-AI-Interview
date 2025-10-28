import Header from '@/app/dashboard/_components/Header';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div>
      <Header />

      <main className="flex flex-col lg:flex-row w-full min-h-screen mt-1 mb-1">
        {/* Left Side */}
        <div className="relative w-full lg:w-[60%] flex items-center justify-center bg-gray-900 px-6 py-12">
          {/* Content */}
          <div className="relative z-10 w-full max-w-md text-white text-center lg:text-left">
            <img
              src="/PrepBridgeLogo.png"
              width={130}
              className="mx-auto lg:mx-0"
              alt="PrepBridge Logo"
            />

            <div className="mt-10 space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
                Crack Interviews. Powered by AI. Driven by You.
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Create an account and get access to all features for 30 days.
                No credit card required.
              </p>

              {/* Avatars */}
              <div className="flex items-center justify-center lg:justify-start flex-wrap gap-2 mt-4">
                <div className="flex -space-x-2">
                  <img
                    src="https://randomuser.me/api/portraits/women/79.jpg"
                    className="w-9 h-9 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                    className="w-9 h-9 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200"
                    className="w-9 h-9 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/men/86.jpg"
                    className="w-9 h-9 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200"
                    className="w-9 h-9 rounded-full border-2 border-white"
                  />
                </div>
                <p className="text-sm text-gray-400 font-medium">
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

        {/* Right Side */}
        <div className="w-full lg:w-[40%] flex items-center justify-center bg-white px-6 py-12">
          <div className="w-full max-w-md space-y-8 text-gray-600">

            <div className="space-y-2 text-center lg:text-left">
              <h3 className="text-gray-800 text-2xl sm:text-3xl font-bold">Sign up</h3>
              <p className="text-sm sm:text-base">
                Already have an account?{' '}
                <a
                  href="/sign-in"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
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

            <SignIn afterSignInUrl="/dashboard" afterSignUpUrl="/sign-in" />
          </div>
        </div>
      </main>

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
