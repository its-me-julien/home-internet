import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

export default function HomeInternetFAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#150a2c] to-[#000000]">
      <Header />
      <main className="flex-grow w-full py-12 px-4">
        <div className="container mx-auto space-y-16">

          {/* Page Header */}
          <header className="text-center max-w-5xl mx-auto px-4 py-12 md:py-14 space-y-6">
            <h1
              id="home-internet-reviews-header"
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white px-6 md:px-8 py-4 md:py-6 mb-8"
            >
              Frequently Asked Questions:<br />
              <span className="text-transparent bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] bg-clip-text">
                Home Internet
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl leading-relaxed text-gray-400">
              Find clear answers to your questions about World Mobile home internet, including speed, costs, equipment, and setup.
            </p>
          </header>

          {/* FAQ Section */}
          <section className="max-w-3xl mx-auto space-y-12">

            {/* Theme: General Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">General Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">What is World Mobile Home Internet?</h3>
                  <p className="text-gray-400"></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">What equipment do I need for World Mobile Internet?</h3>
                  <p className="text-gray-400"></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">How secure is World Mobile Internet?</h3>
                  <p className="text-gray-400"></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">How do you protect my privacy?</h3>
                  <p className="text-gray-400"></p>
                </div>
              </div>
            </div>

            {/* Theme: Performance and Speed */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Performance and Speed</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">How fast is World Mobile home internet?</h3>
                  <p className="text-gray-400"></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">What is download speed? What is upload speed?</h3>
                  <p className="text-gray-400"></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">Will the speed be enough for gaming or streaming TV?</h3>
                  <p className="text-gray-400"></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">Can I purchase higher-speed service?</h3>
                  <p className="text-gray-400"></p>
                </div>
              </div>
            </div>

            {/* Theme: Setup and Installation */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Setup and Installation</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">How do I set up World Mobile Home Internet?</h3>
                  <p className="text-gray-400"></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">Do I need a Wi-Fi extender?</h3>
                  <p className="text-gray-400"></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">What is 5G, and how does it work?</h3>
                  <p className="text-gray-400"></p>
                </div>
              </div>
            </div>

            {/* Theme: Account and Policies */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Account and Policies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">Is there a termination fee if I cancel?</h3>
                  <p className="text-gray-400"></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">Do I need to return any equipment if I cancel?</h3>
                  <p className="text-gray-400"></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">How can I check the status of my order?</h3>
                  <p className="text-gray-400"></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">When will you roll out service to more areas?</h3>
                  <p className="text-gray-400"></p>
                </div>
              </div>
            </div>

          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}