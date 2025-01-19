import React from "react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="bg-gray-900 py-4">
        <div className="container mx-auto flex justify-between items-center px-6 md:px-12">
          <h1 className="text-3xl font-bold text-yellow-500">CrackItHub</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-white transition"
                >
                  Features
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-24">
        <section className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-extrabold text-yellow-500 mb-6">
            Your Gateway to JEE/NEET Success
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            CrackItHub provides a platform to help students and admins manage and excel in JEE/NEET preparation with ease.
          </p>
        </section>

        <section id="features" className="py-12">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-800 p-8 rounded-lg">
              <h4 className="text-2xl font-semibold text-yellow-500 mb-4">
                For Students
              </h4>
              <ul className="text-gray-300 space-y-2">
                <li>Realistic test environment for JEE/NEET.</li>
                <li>Detailed performance analysis to improve scores.</li>
                <li>Access to test history and upcoming schedules.</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg">
              <h4 className="text-2xl font-semibold text-yellow-500 mb-4">
                For Teachers
              </h4>
              <ul className="text-gray-300 space-y-2">
                <li>Manage tests and schedules seamlessly.</li>
                <li>Track student performance in real time.</li>
                <li>Customizable test interface and settings.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-6">
        <div className="container mx-auto text-center text-gray-500">
          <p>© {new Date().getFullYear()} CrackItHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
