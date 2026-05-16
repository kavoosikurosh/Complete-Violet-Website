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
      case 'assessment':
        return <RiskAssessment setPage={setCurrentPage} />;
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
              className="h-16 w-auto rounded-2xl transition-transform duration-300 group-hover:rotate-3"
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
            <button className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 group" onClick={() => setPage('assessment')}>
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
            <button onClick={() => setPage('assessment')} className="w-full mt-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300">Take Assessment</button>
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
              <button onClick={() => setPage('assessment')} className="group relative overflow-hidden bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-10 py-5 rounded-full text-xl font-semibold transition-all duration-500 hover:shadow-2xl hover:scale-110 animate-pulse hover:animate-none">
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
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button onClick={() => setPage('assessment')} className="group relative overflow-hidden bg-white text-purple-600 px-12 py-6 rounded-full text-xl font-bold hover:bg-gray-50 transition-all duration-500 shadow-2xl hover:shadow-3xl hover:scale-110">
              <span className="relative z-10 flex items-center justify-center">
                Start Your Free Assessment Now
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <a 
              href="https://hcb.hackclub.com/donations/start/violet-pancreatic-cancer-awareness-foundation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-purple-800/50 backdrop-blur-sm border-2 border-white text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-purple-700/50 transition-all duration-500 shadow-2xl hover:shadow-3xl hover:scale-110"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Support Our Mission
              </span>
            </a>
          </div>
          <p className="text-purple-200 text-lg">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Kurosh Kavoosi</h2>
              <p className="text-purple-700 font-semibold text-lg">Founder & Executive Director</p>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Kurosh Kavoosi is a high school sophomore at Nashua High School South with a passion for advancing cancer research and innovating the medical field. Aspiring to pursue a career in biomedical sciences, Kurosh founded Violet to bridge the gap between cutting-edge research and accessible public health resources.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              As a DECA International Career Development Conference (ICDC) finalist and founder of his school's UNICEF Club, Kurosh combines his background in business leadership and community service to create impactful health solutions. His commitment to developing research-backed tools for early cancer detection reflects his dedication to making a tangible difference in the fight against pancreatic cancer.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Through Violet, Kurosh is working to empower individuals with evidence-based risk assessment tools and comprehensive educational resources, with the ultimate goal of reducing pancreatic cancer mortality through early detection and awareness.
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
  const [openFaq, setOpenFaq] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const resources = [
    {
      category: "Risk Factors",
      items: [
        { 
          title: "Comprehensive Review of Pancreatic Cancer Risk Factors", 
          desc: "2025 umbrella review examining 80 potential risk factors from over 2.2 million cancer cases",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12206054/"
        },
        { 
          title: "Environmental and Lifestyle Risk Factors", 
          desc: "Evidence-based review of smoking, diet, alcohol, and other modifiable risk factors",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6780233/"
        },
        { 
          title: "Latest Research on Risk Factors (2024)", 
          desc: "Peer-reviewed study on modifiable and non-modifiable risk factors in pancreatic cancer pathogenesis",
          url: "https://www.mdpi.com/2075-1729/14/8/980"
        }
      ]
    },
    {
      category: "Early Detection & Screening",
      items: [
        { 
          title: "Early Detection Strategies and Screening Methods", 
          desc: "Comprehensive review of screening strategies, imaging methods, and diagnostic approaches",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8696234/"
        },
        { 
          title: "Screening Guidelines for High-Risk Individuals", 
          desc: "NCCN and ASGE guidelines for pancreatic cancer screening based on genetic factors and family history",
          url: "https://www.facingourrisk.org/info/risk-management-and-treatment/screening-and-risk-reduction/by-cancer-type/pancreatic/screening"
        },
        { 
          title: "Early Diagnosis and Detection Challenges", 
          desc: "Clinical analysis of early detection challenges, precursor detection, and curative-intent surgery opportunities",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9893084/"
        }
      ]
    },
    {
      category: "For Healthcare Providers",
      items: [
        { 
          title: "Clinical Practice Guidelines & Protocols", 
          desc: "Evidence-based protocols for identifying high-risk patients and screening recommendations",
          url: "https://www.uchicagomedicine.org/cancer/types-treatments/pancreatic-cancer/early-detection"
        },
        { 
          title: "Pancreatic Cancer Epidemiology and Trends", 
          desc: "PMC review of pancreatic cancer epidemiology, risk factors, and emerging research trends",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8316912/"
        },
        { 
          title: "Patient Education Resources", 
          desc: "Pancreatic Cancer Action Network resources for patient education and early detection awareness",
          url: "https://pancan.org/facing-pancreatic-cancer/diagnosis/early-detection/"
        }
      ]
    }
  ];

  const faqs = [
    {
      question: "How accurate is the risk assessment tool?",
      answer: "Our risk calculator is based on peer-reviewed research including the Swedish Cohort Study, family history data, and clinical guidelines. It provides an educational estimate of relative risk compared to the general population. However, it should NOT replace professional medical advice. Always consult with a healthcare provider for personalized guidance."
    },
    {
      question: "What should I do if I have elevated risk?",
      answer: "If your assessment shows elevated risk, we recommend: (1) Schedule an appointment with your primary care physician to discuss your results, (2) Ask about screening options if you have multiple risk factors, (3) Consider lifestyle modifications for modifiable risk factors like smoking or weight, (4) Stay informed about early detection symptoms."
    },
    {
      question: "Is my data kept private?",
      answer: "Yes! We do NOT store any of your assessment data. The risk calculation happens entirely in your browser, and no information is sent to our servers or third parties. Your privacy is our priority."
    },
    {
      question: "Can I donate to support Violet's mission?",
      answer: "Absolutely! As a 501(c)(3) nonprofit, we rely on donations to expand our educational resources and reach more communities. You can donate securely through our Hack Club fiscal sponsorship page. All donations are tax-deductible."
    },
    {
      question: "Who should take this assessment?",
      answer: "Anyone over 18 interested in understanding their pancreatic cancer risk factors can take the assessment. It's especially valuable if you have family history, are a smoker, have diabetes, or have other risk factors. However, this is an educational tool - not a diagnostic test."
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing! Welcome to the Violet community.');
    setNewsletterEmail('');
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slideUp">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Educational Resources</h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-purple-800 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive, evidence-based information about pancreatic cancer risk, prevention, and early detection
            </p>
          </div>

          {resources.map(section => (
            <div key={section.category} className="mb-12 animate-slideUp">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-purple-800 rounded-full mr-4"></span>
                {section.category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map(item => (
                  <div key={item.title} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 cursor-pointer group hover:-translate-y-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.desc}</p>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-600 font-semibold hover:text-purple-800 transition flex items-center group"
                    >
                      Read Research 
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* FAQ Section */}
          <div className="mt-20 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-purple-800 mx-auto rounded-full"></div>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-purple-200 transition-all duration-300">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-purple-50 transition-colors"
                  >
                    <span className="text-lg font-bold text-gray-900 pr-8">{faq.question}</span>
                    <svg 
                      className={`w-6 h-6 text-purple-600 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-8 pb-6 text-gray-600 leading-relaxed animate-slideUp">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
              <p className="text-xl text-purple-100 mb-8">
                Get the latest updates on pancreatic cancer awareness, research, and early detection.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-16 bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                <p className="text-gray-600">
                  Have questions? We're here to help you understand your risk and find the resources you need.
                </p>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    required
                    rows="6"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-bold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>
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
              <img 
                src="/violet-logo.png" 
                alt="Violet Logo" 
                className="h-12 w-auto mr-3 rounded-xl"
              />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Empowering communities through pancreatic cancer awareness and early detection resources
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/violet-pancreatic-cancer-awareness-foundation/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/violet_aware/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all duration-300 hover:scale-110" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://x.com/violet_aware" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all duration-300 hover:scale-110" aria-label="Twitter/X">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61589673385812" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all duration-300 hover:scale-110" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@violet.aware" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all duration-300 hover:scale-110" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setPage('about')} className="hover:text-purple-400 transition">About Us</button></li>
              <li><button onClick={() => setPage('assessment')} className="hover:text-purple-400 transition">Risk Assessment</button></li>
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
            <h4 className="text-white font-semibold mb-4">Support Us</h4>
            <p className="text-sm mb-4">Help us expand our educational resources and reach more communities.</p>
            <a 
              href="https://hcb.hackclub.com/donations/start/violet-pancreatic-cancer-awareness-foundation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 hover:scale-105 text-sm"
            >
              Donate Now
            </a>
            <p className="text-xs text-gray-400 mt-2">Tax-deductible • 501(c)(3)</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2026 Violet Pancreatic Cancer Awareness Foundation. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Founded by Kurosh Kavoosi • Fiscally sponsored by Hack Club</p>
        </div>
      </div>
    </footer>
  );
}

// Risk Assessment Component
function RiskAssessment({ setPage }) {
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    smoking: '',
    diabetes: '',
    height: '',
    weight: '',
    familyHistory: '',
    pancreatitis: '',
    alcohol: ''
  });

  const totalSteps = 8;

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightM = formData.height / 100;
      return (formData.weight / (heightM * heightM)).toFixed(1);
    }
    return 0;
  };

  const calculateRisk = () => {
    let relativeRisk = 1.0;
    
    // Age factor
    if (formData.age === '60-69' || formData.age === '70+') relativeRisk *= 1.5;
    
    // Smoking (RR = 3.06 for current, 1.5 for former)
    if (formData.smoking === 'current') relativeRisk *= 3.06;
    else if (formData.smoking === 'former') relativeRisk *= 1.5;
    
    // Diabetes (RR = 1.88)
    if (formData.diabetes === 'yes') relativeRisk *= 1.88;
    
    // BMI >= 30 (RR = 1.45)
    const bmi = calculateBMI();
    if (bmi >= 30) relativeRisk *= 1.45;
    
    // Family History (RR = 2.3 for 1 relative, 6.4 for 2+)
    if (formData.familyHistory === '1') relativeRisk *= 2.3;
    else if (formData.familyHistory === '2+') relativeRisk *= 6.4;
    
    // Chronic Pancreatitis (RR ≈ 13)
    if (formData.pancreatitis === 'yes') relativeRisk *= 13;
    
    // Heavy Alcohol (RR = 1.22)
    if (formData.alcohol === 'yes') relativeRisk *= 1.22;
    
    return relativeRisk.toFixed(2);
  };

  const getRiskCategory = () => {
    const risk = parseFloat(calculateRisk());
    if (risk < 1.5) return { level: 'Low', color: 'green', message: 'Your risk factors are minimal' };
    if (risk < 3.0) return { level: 'Moderate', color: 'yellow', message: 'Some risk factors present' };
    if (risk < 6.0) return { level: 'Elevated', color: 'orange', message: 'Multiple risk factors detected' };
    if (risk < 10.0) return { level: 'High', color: 'red', message: 'Significant risk factors present' };
    return { level: 'Very High', color: 'purple', message: 'Critical risk factors - immediate consultation recommended' };
  };

  if (showResults) {
    return <RiskResults formData={formData} calculateRisk={calculateRisk} getRiskCategory={getRiskCategory} calculateBMI={calculateBMI} setPage={setPage} />;
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-purple-600">Step {step} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-700 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 animate-slideUp">
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What is your age range?</h2>
              <p className="text-gray-600 mb-8">Age is a factor in pancreatic cancer risk</p>
              <div className="space-y-4">
                {['<40', '40-49', '50-59', '60-69', '70+'].map(age => (
                  <button
                    key={age}
                    onClick={() => { updateField('age', age); nextStep(); }}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left font-semibold ${
                      formData.age === age
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    {age} years old
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What is your biological sex?</h2>
              <p className="text-gray-600 mb-8">Baseline risk varies by sex</p>
              <div className="space-y-4">
                {['Male', 'Female'].map(sex => (
                  <button
                    key={sex}
                    onClick={() => { updateField('sex', sex); nextStep(); }}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left font-semibold ${
                      formData.sex === sex
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    {sex}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What is your smoking status?</h2>
              <p className="text-gray-600 mb-8">Smoking significantly increases pancreatic cancer risk</p>
              <div className="space-y-4">
                {[
                  { value: 'never', label: 'Never smoked' },
                  { value: 'former', label: 'Former smoker (quit)' },
                  { value: 'current', label: 'Current smoker' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => { updateField('smoking', option.value); nextStep(); }}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left font-semibold ${
                      formData.smoking === option.value
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Do you have diabetes?</h2>
              <p className="text-gray-600 mb-8">Diabetes is associated with increased risk</p>
              <div className="space-y-4">
                {[
                  { value: 'no', label: 'No' },
                  { value: 'yes', label: 'Yes, I have diabetes' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => { updateField('diabetes', option.value); nextStep(); }}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left font-semibold ${
                      formData.diabetes === option.value
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What are your height and weight?</h2>
              <p className="text-gray-600 mb-8">We'll calculate your BMI (Body Mass Index)</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => updateField('height', e.target.value)}
                    placeholder="e.g., 170"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => updateField('weight', e.target.value)}
                    placeholder="e.g., 70"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-all"
                  />
                </div>
                {formData.height && formData.weight && (
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <p className="text-purple-900 font-semibold">Your BMI: {calculateBMI()}</p>
                  </div>
                )}
                <button
                  onClick={nextStep}
                  disabled={!formData.height || !formData.weight}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Family history of pancreatic cancer?</h2>
              <p className="text-gray-600 mb-8">Number of first-degree relatives (parents, siblings, children) with pancreatic cancer</p>
              <div className="space-y-4">
                {[
                  { value: '0', label: 'None' },
                  { value: '1', label: '1 relative' },
                  { value: '2+', label: '2 or more relatives' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => { updateField('familyHistory', option.value); nextStep(); }}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left font-semibold ${
                      formData.familyHistory === option.value
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 7 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Do you have chronic pancreatitis?</h2>
              <p className="text-gray-600 mb-8">Long-term inflammation of the pancreas</p>
              <div className="space-y-4">
                {[
                  { value: 'no', label: 'No' },
                  { value: 'yes', label: 'Yes, I have chronic pancreatitis' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => { updateField('pancreatitis', option.value); nextStep(); }}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left font-semibold ${
                      formData.pancreatitis === option.value
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 8 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Heavy alcohol consumption?</h2>
              <p className="text-gray-600 mb-8">More than 3 alcoholic drinks per day on average</p>
              <div className="space-y-4">
                {[
                  { value: 'no', label: 'No' },
                  { value: 'yes', label: 'Yes, more than 3 drinks/day' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => { updateField('alcohol', option.value); nextStep(); }}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left font-semibold ${
                      formData.alcohol === option.value
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {step !== 5 && (
          <div className="flex justify-between">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all"
              >
                ← Back
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Risk Results Component
function RiskResults({ formData, calculateRisk, getRiskCategory, calculateBMI, setPage }) {
  const risk = calculateRisk();
  const category = getRiskCategory();
  const bmi = calculateBMI();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto">
        {/* Results Header */}
        <div className="text-center mb-12 animate-slideUp">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Your Risk Assessment Results</h1>
          <p className="text-xl text-gray-600">Based on peer-reviewed research and clinical studies</p>
        </div>

        {/* Risk Score Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 text-center animate-slideUp">
          <div className="mb-8">
            <div className={`inline-block px-8 py-3 rounded-full text-white font-bold text-lg mb-6 bg-gradient-to-r ${
              category.color === 'green' ? 'from-green-500 to-green-700' :
              category.color === 'yellow' ? 'from-yellow-500 to-yellow-700' :
              category.color === 'orange' ? 'from-orange-500 to-orange-700' :
              category.color === 'red' ? 'from-red-500 to-red-700' :
              'from-purple-600 to-purple-900'
            }`}>
              {category.level} Risk
            </div>
          </div>
          
          <div className="mb-6">
            <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900 mb-4">
              {risk}x
            </div>
            <p className="text-2xl text-gray-700 font-semibold mb-2">Relative Risk</p>
            <p className="text-gray-600 text-lg">{category.message}</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl">
            <p className="text-purple-900 text-lg">
              Your risk is <strong>{risk}x</strong> compared to someone with no risk factors
            </p>
          </div>
        </div>

        {/* Risk Factors Breakdown */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Risk Factors</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="font-semibold">Age: {formData.age}</span>
              <span className="text-gray-600">{formData.age === '60-69' || formData.age === '70+' ? '✓ Risk Factor' : '—'}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="font-semibold">Smoking: {formData.smoking === 'never' ? 'Never' : formData.smoking === 'former' ? 'Former' : 'Current'}</span>
              <span className="text-gray-600">{formData.smoking !== 'never' ? '✓ Risk Factor' : '—'}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="font-semibold">Diabetes: {formData.diabetes === 'yes' ? 'Yes' : 'No'}</span>
              <span className="text-gray-600">{formData.diabetes === 'yes' ? '✓ Risk Factor' : '—'}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="font-semibold">BMI: {bmi}</span>
              <span className="text-gray-600">{parseFloat(bmi) >= 30 ? '✓ Risk Factor' : '—'}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="font-semibold">Family History: {formData.familyHistory === '0' ? 'None' : formData.familyHistory}</span>
              <span className="text-gray-600">{formData.familyHistory !== '0' ? '✓ Risk Factor' : '—'}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="font-semibold">Chronic Pancreatitis: {formData.pancreatitis === 'yes' ? 'Yes' : 'No'}</span>
              <span className="text-gray-600">{formData.pancreatitis === 'yes' ? '✓ Risk Factor' : '—'}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="font-semibold">Heavy Alcohol: {formData.alcohol === 'yes' ? 'Yes' : 'No'}</span>
              <span className="text-gray-600">{formData.alcohol === 'yes' ? '✓ Risk Factor' : '—'}</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-6">What Should You Do?</h2>
          <div className="space-y-4 text-lg">
            {parseFloat(risk) >= 3.0 && (
              <p>✓ <strong>Consult your doctor</strong> about your risk factors and discuss screening options</p>
            )}
            {formData.smoking === 'current' && (
              <p>✓ <strong>Consider quitting smoking</strong> - this is the #1 modifiable risk factor</p>
            )}
            {parseFloat(bmi) >= 30 && (
              <p>✓ <strong>Discuss weight management</strong> with a healthcare professional</p>
            )}
            {formData.diabetes === 'yes' && (
              <p>✓ <strong>Maintain good diabetes control</strong> through diet, exercise, and medication</p>
            )}
            {formData.familyHistory !== '0' && (
              <p>✓ <strong>Ask about genetic counseling</strong> if you have a family history</p>
            )}
            <p>✓ <strong>Stay informed</strong> about early detection symptoms</p>
            <p>✓ <strong>Maintain a healthy lifestyle</strong> with regular exercise and a balanced diet</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all"
          >
            Retake Assessment
          </button>
          <button
            onClick={() => setPage('resources')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-900 transition-all"
          >
            Learn More About Prevention
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-xl">
          <p className="text-sm text-gray-700">
            <strong>Important:</strong> This tool provides an educational risk estimate based on published research. 
            It is NOT a medical diagnosis and should NOT replace professional medical advice. 
            Please consult with a healthcare provider about your specific situation.
          </p>
        </div>
      </div>
    </div>
  );
}
