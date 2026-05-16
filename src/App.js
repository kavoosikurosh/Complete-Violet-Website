import React, { useState, useEffect } from 'react';

// Main App Component
export default function VioletWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setPage={setCurrentPage} />;
      case 'about':
        return <AboutPage setPage={setCurrentPage} />;
      case 'resources':
        return <ResourcesPage setPage={setCurrentPage} />;
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navigation currentPage={currentPage} setPage={setCurrentPage} />
      {renderPage()}
      <Footer setPage={setCurrentPage} />
    </div>
  );
}

// Navigation Component
function Navigation({ currentPage, setPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm shadow-md py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setPage('home')} 
            className="flex items-center group transition-transform duration-300 hover:scale-105"
          >
            <img 
              src="/violet-logo.png" 
              alt="Violet Logo" 
              className="h-12 w-auto transition-transform duration-300 group-hover:rotate-3"
            />
          </button>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setPage('home')} 
              className={`relative text-lg font-medium transition-all duration-300 ${
                currentPage === 'home' 
                  ? 'text-purple-600' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Home
              {currentPage === 'home' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse"></span>
              )}
            </button>
            <button 
              onClick={() => setPage('about')} 
              className={`relative text-lg font-medium transition-all duration-300 ${
                currentPage === 'about' 
                  ? 'text-purple-600' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              About
              {currentPage === 'about' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse"></span>
              )}
            </button>
            <button 
              onClick={() => setPage('resources')} 
              className={`relative text-lg font-medium transition-all duration-300 ${
                currentPage === 'resources' 
                  ? 'text-purple-600' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Resources
              {currentPage === 'resources' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse"></span>
              )}
            </button>
            <button className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
              <span className="relative z-10">Take Assessment</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          <button 
            className="md:hidden text-gray-700 hover:text-purple-600 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fadeIn">
            <button onClick={() => { setPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg px-4 transition-all duration-300">Home</button>
            <button onClick={() => { setPage('about'); setMobileMenuOpen(false); }} className="block w-full text-left py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg px-4 transition-all duration-300">About</button>
            <button onClick={() => { setPage('resources'); setMobileMenuOpen(false); }} className="block w-full text-left py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg px-4 transition-all duration-300">Resources</button>
            <button className="w-full mt-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300">Take Assessment</button>
          </div>
        )}
      </div>
    </nav>
  );
}

// Homepage
function HomePage({ setPage }) {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-40 pb-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-transparent to-purple-200/30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-slideUp">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Your Health. <br />
              <span className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-clip-text text-transparent animate-gradient">
                Your Power.
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Understand your pancreatic cancer risk in 5 minutes with our free, evidence-based assessment tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative overflow-hidden bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-10 py-5 rounded-full text-xl font-semibold transition-all duration-500 hover:shadow-2xl hover:scale-110 animate-pulse hover:animate-none">
                <span className="relative z-10 flex items-center">
                  Take Free Risk Assessment
                  <svg className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
              <button 
                onClick={() => setPage('about')}
                className="bg-white text-purple-600 px-10 py-5 rounded-full text-xl font-semibold border-3 border-purple-600 hover:bg-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="section-mission" className={`py-28 bg-white px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible['section-mission'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                Early Detection Saves Lives
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Pancreatic cancer is one of the deadliest cancers, with a 5-year survival rate of just 12%. 
                But when caught early, survival rates can increase dramatically to over 40%.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                The Violet Pancreatic Cancer Awareness Foundation exists to reduce pancreatic cancer mortality 
                through education, early detection resources, and risk awareness tools accessible to everyone.
              </p>
              <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 p-8 rounded-2xl border-l-4 border-purple-600 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -mr-16 -mt-16 opacity-50"></div>
                <p className="text-purple-900 font-bold text-2xl relative z-10">
                  "Early detection increases survival rates by up to 3x"
                </p>
                <p className="text-purple-700 text-lg mt-4 relative z-10">— National Cancer Institute</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 via-white to-purple-50 p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="space-y-8">
                {[
                  { num: 1, title: "Free Risk Assessment", desc: "Evidence-based tool using peer-reviewed research", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { num: 2, title: "Educational Resources", desc: "Comprehensive information about risk factors and prevention", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
                  { num: 3, title: "Youth Literacy", desc: "Empowering the next generation with health awareness", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }
                ].map((item, index) => (
                  <div key={item.num} className="flex items-start group hover:transform hover:translate-x-2 transition-all duration-300">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white rounded-2xl w-16 h-16 flex items-center justify-center flex-shrink-0 text-2xl font-bold shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                        {item.num}
                      </div>
                      <div className="absolute inset-0 bg-purple-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </div>
                    <div className="ml-6">
                      <h4 className="font-bold text-gray-900 mb-2 text-xl">{item.title}</h4>
                      <p className="text-gray-600 text-lg">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="section-stats" className={`py-28 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-all duration-1000 ${isVisible['section-stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { stat: "12%", label: "5-Year Survival Rate", delay: "0" },
              { stat: "40%+", label: "Survival When Caught Early", delay: "200" },
              { stat: "66K+", label: "New Cases Annually (US)", delay: "400" }
            ].map((item, index) => (
              <div key={item.stat} className="group hover:transform hover:scale-110 transition-all duration-500" style={{ animationDelay: `${item.delay}ms` }}>
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 hover:bg-white/20 transition-all duration-500 hover:shadow-2xl">
                  <div className="text-7xl md:text-8xl font-bold mb-4 bg-gradient-to-br from-white to-purple-200 bg-clip-text text-transparent">
                    {item.stat}
                  </div>
                  <p className="text-purple-100 text-xl font-medium">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="section-features" className={`py-28 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-1000 ${isVisible['section-features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">How Violet Helps</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 mx-auto rounded-full mb-8"></div>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Comprehensive tools and resources to understand and reduce your pancreatic cancer risk
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Risk Assessment Tool",
                desc: "Science-backed questionnaire analyzing 8 key risk factors based on Swedish Cohort Study and family history research",
                gradient: "from-purple-400 to-purple-600"
              },
              {
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                title: "Educational Resources",
                desc: "Comprehensive library of articles, videos, and guides about pancreatic cancer prevention, symptoms, and early detection",
                gradient: "from-purple-500 to-purple-700"
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                title: "Community Support",
                desc: "Connect with others, share experiences, and access support resources for patients, survivors, and families",
                gradient: "from-purple-600 to-purple-800"
              }
            ].map((feature, index) => (
              <div key={feature.title} className="group relative bg-white p-10 rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-500 border border-gray-100 hover:border-purple-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className={`bg-gradient-to-br ${feature.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">Ready to Take Control of Your Health?</h2>
          <p className="text-2xl text-purple-100 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
            Our free risk assessment takes just 5 minutes and provides personalized insights based on peer-reviewed research
          </p>
          <button className="group relative overflow-hidden bg-white text-purple-600 px-12 py-6 rounded-full text-xl font-bold hover:bg-gray-50 transition-all duration-500 shadow-2xl hover:shadow-3xl hover:scale-110">
            <span className="relative z-10 flex items-center justify-center">
              Start Your Free Assessment Now
              <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <p className="text-purple-200 mt-10 text-lg">
            A 501(c)(3) nonprofit organization • Fiscally sponsored by Hack Club
          </p>
        </div>
      </section>
    </div>
  );
}

// About Page
function AboutPage({ setPage }) {
  return (
    <div className="pt-20 bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">About Violet</h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-purple-800 mx-auto rounded-full"></div>
          </div>

          {/* Mission Statement */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              The Violet Pancreatic Cancer Awareness Foundation is a 501(c)(3) nonprofit dedicated to reducing pancreatic 
              cancer mortality through education, early detection resources, and youth health literacy.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that access to evidence-based risk assessment tools and comprehensive educational resources 
              should be freely available to everyone, regardless of background or income level.
            </p>
          </div>

          {/* Founder */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-purple-100">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                K
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Kurosh Kavoosi</h2>
              <p className="text-purple-700 font-semibold text-lg">Founder & Executive Director</p>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Kurosh Kavoosi is a high school sophomore at Nashua High School South with a passion for leveraging 
              technology and data science to improve public health outcomes. As founder of Violet, Kurosh combines 
              his background in AI, business, and community leadership to create accessible health resources.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Kurosh is a DECA International Career Development Conference (ICDC) finalist, founder of his school's 
              UNICEF Club, and a Google AI Certified professional. He is committed to making early cancer detection 
              resources accessible to communities worldwide.
            </p>
          </div>

          {/* Why Pancreatic Cancer */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Pancreatic Cancer?</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Pancreatic cancer is one of the deadliest forms of cancer, with a 5-year survival rate of just 12%. 
                Yet when detected early, survival rates can increase to over 40%.
              </p>
              <p>
                The challenge is that pancreatic cancer often shows no symptoms until late stages. By empowering 
                individuals with knowledge about their risk factors, we can encourage high-risk individuals to seek 
                earlier screening and monitoring.
              </p>
              <p className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600 font-semibold text-purple-900">
                "Our goal is simple: give people the knowledge and tools to understand their risk, so they can take 
                action early when it matters most."
              </p>
            </div>
          </div>

          {/* Nonprofit Status */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Nonprofit Status</h2>
            <p className="text-lg text-purple-100 leading-relaxed mb-6">
              Violet is a 501(c)(3) nonprofit organization fiscally sponsored by Hack Club. All donations are 
              tax-deductible to the fullest extent permitted by law.
            </p>
            <p className="text-lg text-purple-100 leading-relaxed">
              100% of donations go directly toward expanding our educational resources, improving our risk assessment 
              tools, and reaching more communities with life-saving information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Resources Page
function ResourcesPage({ setPage }) {
  const resources = [
    {
      category: "Risk Factors",
      items: [
        { title: "Understanding Pancreatic Cancer Risk Factors", desc: "Comprehensive guide to smoking, diabetes, family history, and other risk factors" },
        { title: "The Role of Genetics in Pancreatic Cancer", desc: "BRCA mutations, hereditary pancreatitis, and genetic screening" },
        { title: "Lifestyle Factors: Diet, Exercise, and Prevention", desc: "Evidence-based guidance on modifiable risk factors" }
      ]
    },
    {
      category: "Early Detection",
      items: [
        { title: "Symptoms and Warning Signs", desc: "Recognizing early symptoms and when to see a doctor" },
        { title: "Screening Guidelines for High-Risk Individuals", desc: "Who should get screened and what tests are available" },
        { title: "The Importance of Family History", desc: "When to talk to your doctor about genetic counseling" }
      ]
    },
    {
      category: "For Healthcare Providers",
      items: [
        { title: "Clinical Guidelines for Risk Assessment", desc: "Evidence-based protocols for identifying high-risk patients" },
        { title: "Patient Education Resources", desc: "Downloadable materials for your practice" },
        { title: "Latest Research and Studies", desc: "Peer-reviewed research on pancreatic cancer prevention" }
      ]
    }
  ];

  return (
    <div className="pt-20 bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Educational Resources</h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-purple-800 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive, evidence-based information about pancreatic cancer risk, prevention, and early detection
            </p>
          </div>

          {resources.map(section => (
            <div key={section.category} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-purple-800 rounded-full mr-4"></span>
                {section.category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map(item => (
                  <div key={item.title} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition border border-gray-100 hover:border-purple-200 cursor-pointer">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.desc}</p>
                    <button className="text-purple-600 font-semibold hover:text-purple-800 transition flex items-center">
                      Read More 
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-xl text-purple-100 mb-8">
              Our team is here to help you understand your risk and find the resources you need.
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Footer Component
function Footer({ setPage }) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-700 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <h3 className="text-white text-xl font-bold">Violet</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering communities through pancreatic cancer awareness and early detection resources
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setPage('about')} className="hover:text-purple-400 transition">About Us</button></li>
              <li><button className="hover:text-purple-400 transition">Risk Assessment</button></li>
              <li><button onClick={() => setPage('resources')} className="hover:text-purple-400 transition">Resources</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setPage('resources')} className="hover:text-purple-400 transition">Risk Factors</button></li>
              <li><button onClick={() => setPage('resources')} className="hover:text-purple-400 transition">Early Detection</button></li>
              <li><button onClick={() => setPage('resources')} className="hover:text-purple-400 transition">Prevention Guide</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm mb-2">Email: info@violetaware.org</p>
            <p className="text-sm mb-4">Fiscally sponsored by Hack Club</p>
            <p className="text-xs text-gray-400">501(c)(3) Nonprofit Organization</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2026 Violet Pancreatic Cancer Awareness Foundation. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Founded by Kurosh Kavoosi</p>
        </div>
      </div>
    </footer>
  );
}
