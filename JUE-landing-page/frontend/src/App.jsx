import React, { useEffect, useState, useRef, useCallback } from 'react';
import ChatWidget from './components/ChatWidget';
import './index.css';

const Counter = ({ target, duration = 800, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    const end = parseFloat(target.replace(/,/g, ''));
    if (isNaN(end)) return setCount(target);

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    if (target.includes('.')) return num.toFixed(1);
    return Math.floor(num).toLocaleString();
  };

  return <span ref={countRef}>{formatNumber(count)}{suffix}</span>;
};

const featureSlides = [
  {
    title: "Why Indian Parents Are Choosing Japan?",
    text: "World's Safest Environment\nDisciplined & Secure for All\nMore Affordable Than the West\nIndian Food & Lifestyle Support\nGlobal Career Opportunities\nStrong International Reputation",
    image: "/images/why-parents.png"
  },
  {
    title: "Why More Indian Students Are Choosing Japan?",
    text: "World-Class Safety & Standards\nAffordable Living & Tuition\nPart-Time Work Permissions\nGlobal Career Opportunities\nLanguage-Driven Success\nModern Cities & Infrastructure\nIndian Food & Global Culture",
    image: "/images/why-japan.jpg"
  },
  {
    title: "Why Indian Students Choose Japan University of Economics?",
    text: "Affordable Tuition & Scholarships\nEnglish-Friendly Programs\nCareer & Internship Support\nModern City Campuses\nSafe & Global Environment\nHousing & Work Assistance",
    image: "/images/why-jue.jpg"
  },
  {
    title: "Worried About Career & Placement?",
    text: "Internship Opportunities During Study\nComprehensive Job-Hunting Support\nResume & Interview Preparation\nPersonalized Career Guidance\nConnect with Top Japanese Companies\nDedicated International Placement",
    image: "/images/career-jue.jpg"
  },
  {
    title: "Worried About Japanese Language?",
    text: "English-Friendly Classes Available\nIntegrated University Language Lessons\nLearn While Studying Your Degree\nDaily Life & Part-Time Job Support\nJLPT Preparation Assistance\nBoost Your Global Career Opportunities",
    image: "/images/language-jue.jpg"
  },
  {
    title: "Worried About Accommodation?",
    text: "University Accommodation Support\nSafe & Affordable Housing Options\nSeparate Dorms for Boys & Girls\nConvenient Locations Near Campus\nFree Shuttle Bus Access Available\nSecure International Environment",
    image: "/images/accommodation-jue.jpg"
  },
  {
    title: "Scholarships & Financial Support",
    text: "International Student Scholarships\nTuition Fee Reduction Options\nExpert Application Guidance\nCompetitive Global Affordability",
    image: "/images/scholarship-jue.jpg"
  },
  {
    title: "Worried About Visa & Documents?",
    text: "Student Visa Application Guidance\nComplete Documentation Support\nStep-by-Step Assistance\nUniversity-Issued Certificates\nDedicated Visa Compliance Team",
    image: "/images/visa-jue.png"
  },
  {
    title: "Worried About Arrival in Japan?",
    text: "Flight Booking & Travel Advice\nAirport Pickup Support Information\nPost-Arrival Settling-In Assistance\nResidence Registration Help\nBank Account Setup Support",
    image: "/images/travel-jue.png"
  }
];

const FeatureSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animState, setAnimState] = useState('idle');
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const slideNext = useCallback(() => {
    setAnimState('exit');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % featureSlides.length);
      setAnimState('enter');
      setTimeout(() => setAnimState('idle'), 50);
    }, 500);
  }, []);

  const slidePrev = useCallback(() => {
    setAnimState('exit');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + featureSlides.length) % featureSlides.length);
      setAnimState('enter');
      setTimeout(() => setAnimState('idle'), 50);
    }, 500);
  }, []);

  useEffect(() => {
    const timer = setInterval(slideNext, 6000);
    return () => clearInterval(timer);
  }, [slideNext]);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStart.current - touchEnd.current > 70) {
      slideNext();
    }
    if (touchStart.current - touchEnd.current < -70) {
      slidePrev();
    }
  };

  const slide = featureSlides[currentIndex];
  const animClass = animState === 'exit' ? 'slide-exit' : animState === 'enter' ? 'slide-enter' : 'slide-idle';

  return (
    <div
      className="feature-slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`feature-slider-box ${animClass}`}>
        <div className="feature-slider-text">
          <h2>{slide.title}</h2>
          <div className="feature-slider-content">
            {slide.text.includes('\n') ? (
              <ul className="feature-list">
                {slide.text.split('\n').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{slide.text}</p>
            )}
          </div>
        </div>
        <div className="feature-slider-image">
          <img src={slide.image} alt={slide.title} />
        </div>
      </div>
    </div>
  );
};

const highlightData = [
  {
    title: "STATIO Shibuya",
    desc: "Modern student lounge and creative space in the heart of Tokyo's trendiest district.",
    image: "/images/why-japan.jpg",
    tag: "TOKYO"
  },
  {
    title: "Blue Rose Project",
    desc: "Student-led public relations project promoting JUE energy through dance and performance.",
    image: "/images/jue-students.jpg",
    tag: "CULTURE"
  },
  {
    title: "International Library",
    desc: "Multilingual research facilities and collaborative study zones for global scholars.",
    image: "/images/why-jue.jpg",
    tag: "ACADEMICS"
  },
  {
    title: "Fukuoka Campus",
    desc: "Our main campus surrounded by nature, offering a serene environment for focused learning.",
    image: "/images/scholarship-jue.jpg",
    tag: "FUKUOKA"
  },
  {
    title: "Kobe Sannomiya",
    desc: "Urban campus in the vibrant port city of Kobe with access to Japan's business network.",
    image: "/images/career-jue.jpg",
    tag: "KOBE"
  }
];

const HighlightCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const timerRef = useRef(null);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const startAutoPlay = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection('next');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % highlightData.length);
        setIsAnimating(false);
      }, 400);
    }, 4500);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(timerRef.current);
  }, [startAutoPlay]);

  const goNext = useCallback(() => {
    if (isAnimating) return;
    setDirection('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % highlightData.length);
      setIsAnimating(false);
      startAutoPlay();
    }, 400);
  }, [isAnimating, startAutoPlay]);

  const goPrev = useCallback(() => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + highlightData.length) % highlightData.length);
      setIsAnimating(false);
      startAutoPlay();
    }, 400);
  }, [isAnimating, startAutoPlay]);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;
    if (diff > 50) goNext();
    if (diff < -50) goPrev();
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const idx = (currentIndex + i + highlightData.length) % highlightData.length;
      cards.push({ ...highlightData[idx], position: i, idx });
    }
    return cards;
  };

  const animClass = isAnimating
    ? direction === 'next' ? 'carousel-slide-out-left' : 'carousel-slide-out-right'
    : direction === 'next' ? 'carousel-slide-in-right' : 'carousel-slide-in-left';

  return (
    <div
      className="highlight-carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-track">
        {getVisibleCards().map((card) => (
          <div
            key={card.idx}
            className={`carousel-card ${card.position === 0 ? 'card-active' : 'card-side'} ${card.position === 0 ? animClass : ''}`}
          >
            <div className="card-image-wrapper">
              <img src={card.image} alt={card.title} />
              <div className="card-overlay" />
            </div>
            <div className="card-content">
              <span className="card-tag">{card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const heroSliderImages = [
  '/images/hero.png',
  '/images/graduate00.jpg',
  '/images/LearningProgression01.jpg',
  '/images/support04.jpg',
  '/images/Undergraduate00.jpg',
  '/images/why-jue.jpg'
];

const heroSubtitles = [
  "JUE supports Indian students who want to study in Japan and build their careers through affordable tuition fees, scholarships, admission guidance, and career support.",
  "Special Scholarships for Indian Students",
  "Affordable Tuition Fees & Career Support in Japan",
  "Study with Experienced Professors and Students from 20+ Nationalities",
  "Rose cafe and modern campus facilities",
  "English friendly programs"
];

const App = () => {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroSliderImages.length);
    }, 4000); // 4 seconds transition
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      {/* Main Navigation Bar [NEW] */}
      <header className="main-nav-bar">
        <div className="nav-container">
          <div className="nav-logo">JUE</div>
          <nav className="nav-menu">
            <a href="#home">HOME</a>
            <a href="#admission">ADMISSION</a>
            <a href="#courses">COURSES</a>
            <a href="#campus">CAMPUS LIFE</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <header className="hero">
        {heroSliderImages.map((img, idx) => (
          <div
            key={idx}
            className={`hero-image-bg ${idx === heroIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="hero-content">
          <h1 className="hero-main-title">Studying in Japan is Now Easier for Indian Students with Japan University of Economics (JUE)</h1>
          <div className="hero-line" />
          <div className="hero-subtitle-container">
            {heroSubtitles.map((text, idx) => (
              <p
                key={idx}
                className={`hero-subtitle ${idx === heroIndex ? 'active' : ''}`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </header>

      {/* White Strip */}
      <div className="white-strip"></div>

      {/* Circular Info Bar */}
      <section className="info-bar-row">
        <div className="info-bar-item">
          <div className="circle-img-wrapper">
            <img src="/images/why-jue.jpg" alt="Top Ranked" />
          </div>
          <h4>Top Ranked University</h4>
          <p>Study in Japan’s Top Cities – Tokyo, Kobe, Fukuoka</p>
        </div>
        <div className="info-bar-item">
          <div className="circle-img-wrapper">
            <img src="/images/scholarship-jue.jpg" alt="Scholarship" />
          </div>
          <h4>Special Scholarship for Indian Students</h4>
          <p>Financial Support for Indian Students</p>
        </div>
        <div className="info-bar-item">
          <div className="circle-img-wrapper">
            <img src="/images/career-jue.jpg" alt="Career" />
          </div>
          <h4>Career Support</h4>
          <p>Internships & Job Opportunities in Japan</p>
        </div>
        <div className="info-bar-item">
          <div className="circle-img-wrapper">
            <img src="/images/jue-students.jpg" alt="Campus" />
          </div>
          <h4>Campus Life</h4>
          <p>Student Housing & International Community (20+ Nationalities)</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about reveal" id="about">
        <div className="about-container">
          <p className="about-text">
            <strong>A Trusted Japanese University with Over 60 Years of Educational Excellence</strong>
          </p>
          <p className="about-text" style={{ marginTop: '5px' }}>
            Established in 1968 – Over 50 Years of Business Education. Recognized for excellence in business education and international student support in Japan. Campuses in Tokyo, Kobe and Fukuoka. Ranked among top universities in Japan for international students with students from 20+ countries. Part of Tsuzuki Education Group with 60+ years in education.
          </p>
        </div>
      </section>

      {/* Stats Section (Institutional Style) */}
      <section className="stats-numbers-row reveal">
        <div className="stat-unit">
          <h3 className="stat-label">ENROLLMENT</h3>
          <div className="stat-number"><Counter target="5700" suffix="+" /></div>
          <p className="stat-subtext">Students from 20+ Countries</p>
        </div>
        <div className="stat-unit">
          <h3 className="stat-label">GLOBAL DIVERSITY</h3>
          <div className="stat-number"><Counter target="46.6" suffix="%" /></div>
          <p className="stat-subtext">Ranked #2 In International Student Ratio</p>
        </div>
        <div className="stat-unit">
          <h3 className="stat-label">CAREER SUCCESS</h3>
          <div className="stat-number"><Counter target="96.3" suffix="%" /></div>
          <p className="stat-subtext">Job Placement Rate</p>
        </div>
      </section>

      {/* Community Row Header [NEW] */}
      <section className="community-cta reveal">
        <h2 className="community-home-text">
          We understand your concerns <span className="animated-emoji">❓</span>
        </h2>
      </section>

      {/* Why JUE / Why Japan Slider */}
      <section className="reveal" id="features">
        <FeatureSlider />
      </section>

      {/* Programs We Offer Section [NEW] */}
      <section className="programs reveal" id="programs">
        <h2 className="programs-title">PROGRAMS WE OFFER</h2>
        <div className="programs-grid">
          <div className="program-card">
            <div className="program-image-box">
              <img src="/images/Undergraduate00.jpg" alt="Economics" />
            </div>
            <div className="program-info-box">
              <h4>Department of Economics</h4>
            </div>
          </div>
          <div className="program-card">
            <div className="program-image-box">
              <img src="/images/fukuokacampus02.jpg" alt="Management" />
            </div>
            <div className="program-info-box">
              <h4>Department of Management</h4>
            </div>
          </div>
          <div className="program-card">
            <div className="program-image-box">
              <img src="/images/Internship06.jpg" alt="Commerce" />
            </div>
            <div className="program-info-box">
              <h4>Department of Commerce</h4>
            </div>
          </div>
          <div className="program-card">
            <div className="program-image-box">
              <img src="/images/LearningProgression01.jpg" alt="Law" />
            </div>
            <div className="program-info-box">
              <h4>Department of Management Law</h4>
            </div>
          </div>
          <div className="program-card">
            <div className="program-image-box">
              <img src="/images/jue-students.jpg" alt="Health and Sports" />
            </div>
            <div className="program-info-box">
              <h4>Health & Sports Management</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Highlights Section */}
      <section className="highlights reveal" id="highlights">
        <h2 className="highlights-title">Campus Highlights</h2>
        <p className="highlights-subtitle">Discover our world-class facilities across Japan</p>
        <HighlightCarousel />
      </section>

      {/* Mentors Section (Unified Header Style) [NEW] */}
      <section className="white-strip-mentors reveal" id="mentors" style={{ background: '#fff', paddingTop: '60px', textAlign: 'center' }}>
        <h5 className="mentor-header" >
          CONNECT WITH MENTORS & STUDENTS<br />
          <span className="mentor-subtitle">Learn from those who have walked the path before you</span>
        </h5>
      </section>
      
      <section className="info-bar-row reveal">
        <div className="info-bar-item">
          <div className="circle-img-wrapper">
             <img src="/images/career-jue.jpg" alt="Career Mentors" />
          </div>
          <h4>Career Mentors</h4>
          <p>Direct guidance from industry-aligned faculty.</p>
        </div>
        <div className="info-bar-item">
          <div className="circle-img-wrapper">
             <img src="/images/jue-students.jpg" alt="Student Leaders" />
          </div>
          <h4>Student Leaders</h4>
          <p>Get insights about campus life from peers.</p>
        </div>
      </section>

      {/* Success Stories Section [NEW] */}
      <section className="success-stories" id="success">
        <h2 className="success-stories-title">Success Stories</h2>
        
        <div className="success-row reveal">
          <div className="success-img-box">
             <img src="/images/jue-students.jpg" alt="Student Presentation" />
          </div>
          <div className="success-pill">
            <strong>Kim Seong-min (South Korea) - Professional Athlete</strong><br />
            "JUE's disciplined environment at the Fukuoka campus was essential in preparing me for the rigors of the Kiwoom Heroes and my journey into professional sports."
          </div>
        </div>

        <div className="success-row reverse reveal">
          <div className="success-img-box">
             <img src="/images/Undergraduate00.jpg" alt="Student Life" />
          </div>
          <div className="success-pill">
            <strong>Garkavenko Hanna (Ukraine) - Japanese Industry</strong><br />
            "The dedicated career support programs at JUE offered me a lifeline. I am proud to have secured a career here in Japan thanks to their guidance."
          </div>
        </div>

        <div className="success-row reveal">
          <div className="success-img-box">
             <img src="/images/fukuokacampus02.jpg" alt="Alumni Founder" />
          </div>
          <div className="success-pill">
            <strong>Kang Rae-soo (South Korea) - CEO & Founder</strong><br />
            "Founding QuickConnect Co., Ltd. was possible because of the market insights and networking opportunities JUE provided during my Economics degree."
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section reveal">
        <h2>Experience JUE Life</h2>
        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/tB1vYUFAn5I"
            title="JUE University Life"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq reveal" id="faq">
        <div className="faq-container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#003B6F' }}>Common Questions</h2>
          <div className="faq-item">
            <div className="faq-question">Are there vegetarian/halal food options? <span>+</span></div>
            <div className="faq-answer">Yes, our cafeteria and local urban campuses are surrounded by diverse dining options, and we provide guidance for students with specific dietary needs.</div>
          </div>
          <div className="faq-item">
            <div className="faq-question">What is the safety level in Japan? <span>+</span></div>
            <div className="faq-answer">Japan is consistently ranked as one of the safest countries globally. Students can safely travel and live even late at night.</div>
          </div>
          <div className="faq-item">
            <div className="faq-question">Can I work part-time while studying? <span>+</span></div>
            <div className="faq-answer">International students are generally allowed to work up to 28 hours per week with a permit, offering great opportunities for cultural immersion.</div>
          </div>
        </div>
      </section>

      {/* Apply Now CTA */}
      <section className="apply-cta reveal">
        <h2>Ready to Begin Your Journey?</h2>
        <p>Join the next generation of global leaders at Japan University of Economics.</p>
        <button className="apply-btn">APPLY FOR ADMISSIONS</button>
      </section>

      {/* Institutional Redesigned Footer [MODIFIED/ENHANCED] */}
      <footer className="enhanced-footer" id="inquiry">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Campus Locations</h4>
            <ul>
              <li><strong>Fukuoka</strong>: Dazaifu City, Gojo</li>
              <li><strong>Tokyo Shibuya</strong>: Sakuragaoka-cho</li>
              <li><strong>Kobe Sannomiya</strong>: Kumoidori, Chuo-ku</li>
              <li><a href="https://www.jue.ac.jp/access/" target="_blank">Access Map & Directions</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Admissions</h4>
            <ul>
              <li><a href="https://www.jue.ac.jp/for_applicant/" target="_blank">Enrollment Info</a></li>
              <li><a href="https://www.jue.ac.jp/en/ADMISSION/Scholarship.html" target="_blank">Scholarships</a></li>
              <li><a href="https://www.jue.ac.jp/group/" target="_blank">Tsuzuki Education Group</a></li>
              <li><a href="https://www.jue.ac.jp/sitemap/" target="_blank">Site Map</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Student Support</h4>
            <ul>
              <li><a href="https://www.jue.ac.jp/en/CAMPUSLIFE/Student_Support.html" target="_blank">International Center</a></li>
              <li><a href="https://www.jue.ac.jp/privacy/" target="_blank">Privacy Policy</a></li>
              <li><a href="https://www.jue.ac.jp/inquiry/" target="_blank">General Inquiry</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <a href="https://www.jue.ac.jp/facebook/" target="_blank" className="social-icon">FB</a>
              <a href="https://www.jue.ac.jp/twitter/" target="_blank" className="social-icon">TW</a>
              <a href="https://www.jue.ac.jp/line/" target="_blank" className="social-icon">LN</a>
              <a href="https://www.jue.ac.jp/instagram/" target="_blank" className="social-icon">IG</a>
            </div>
            <p style={{ fontSize: '0.8rem', marginTop: '20px', opacity: 0.6 }}>
              Institutional Knowledge Base for Global Students.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Japan University of Economics. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Chat Advisor */}
      <ChatWidget />
    </div>
  );
};

export default App;
