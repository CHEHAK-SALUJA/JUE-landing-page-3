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
    title: "Why Japan?",
    text: "Ranked among the safest countries in the world with a rich cultural heritage and advanced technology.",
    image: "/images/why-japan.jpg"
  },
  {
    title: "Why JUE?",
    text: 'Focused on "Practical Economics" with hands-on experience in Japan\'s major economic hubs.',
    image: "/images/why-jue.jpg"
  },
  {
    title: "Career & Placement",
    text: "Our dedicated career center ensures a 96%+ success rate for international students.",
    image: "/images/career-jue.jpg"
  },
  {
    title: "Japanese Language",
    text: "Comprehensive support programs to achieve JLPT N2 and beyond during your studies.",
    image: "/images/language-jue.jpg"
  },
  {
    title: "Accommodation",
    text: "Modern, safe, and affordable student dormitories in Tokyo, Fukuoka, and Kobe.",
    image: "/images/accommodation-jue.jpg"
  },
  {
    title: "Scholarships",
    text: "Generous tuition reductions and access to prestigious MEXT/JASSO funding opportunities.",
    image: "/images/scholarship-jue.jpg"
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
          <p>{slide.text}</p>
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

const App = () => {
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
        <div className="hero-content">
          <h1>STUDY IN JAPAN</h1>
          <div className="hero-line" />
          <p>Build Your Global Career with Japan University Of Economics</p>
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
          <h4>Top Ranked</h4>
          <p>Top Ranked University</p>
        </div>
        <div className="info-bar-item">
          <div className="circle-img-wrapper">
            <img src="/images/scholarship-jue.jpg" alt="Scholarship" />
          </div>
          <h4>Scholarship</h4>
          <p>Affordable Tuition fee & Scholarship</p>
        </div>
        <div className="info-bar-item">
          <div className="circle-img-wrapper">
            <img src="/images/career-jue.jpg" alt="Career" />
          </div>
          <h4>Career</h4>
          <p>Global Career Opportunities</p>
        </div>
        <div className="info-bar-item">
          <div className="circle-img-wrapper">
            <img src="/images/jue-students.jpg" alt="Campus" />
          </div>
          <h4>Campus</h4>
          <p>Safe and Welcoming Campus</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about reveal" id="about">
        <div className="about-container">
          <p className="about-text">
            For over 60 years since 1956, the Tsuzuki Education Group has been developing individual expertise in the academic context and are willing to provide unlimited support in education.
          </p>
          <p className="about-text" style={{ marginTop: '20px' }}>
            We are now one of the biggest educational corporations in Japan, having established six universities, twelve junior colleges and vocational schools, three high schools, a junior high school, and four kindergartens and nursery schools.
          </p>
        </div>
      </section>

      {/* Stats Section (Numbers) */}
      <section className="stats-numbers-row reveal">
        <div className="stats-box">
          <div className="stats-box-content">
            <h3 className="stats-label">Enrollment</h3>
            <div className="number-val"><Counter target="5700" suffix="+" /></div>
          </div>
        </div>
        <div className="stats-box">
          <div className="stats-box-content">
            <h3 className="stats-label">Global Diversity</h3>
            <div className="number-val"><Counter target="46.6" suffix="%" /></div>
          </div>
        </div>
        <div className="stats-box">
          <div className="stats-box-content">
            <h3 className="stats-label">Career Success</h3>
            <div className="number-val"><Counter target="96.3" suffix="%" /></div>
          </div>
        </div>
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
              <img src="/images/fukuokacampus02.jpg" alt="Economics" />
            </div>
            <div className="program-info-box">
              <h4>Department of Economics</h4>
            </div>
          </div>
          <div className="program-card">
            <div className="program-image-box">
              <img src="/images/LearningProgression01.jpg" alt="Economics" />
            </div>
            <div className="program-info-box">
              <h4>Department of Economics</h4>
            </div>
          </div>
          <div className="program-card">
            <div className="program-image-box">
              <img src="/images/Internship06.jpg" alt="Economics" />
            </div>
            <div className="program-info-box">
              <h4>Department of Economics</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Community Row Header [NEW] */}
      <section className="community-cta reveal">
        <h2 className="community-home-text">Community That Feels Like Home</h2>
      </section>

      {/* Why JUE / Why Japan Slider */}
      <section className="reveal" id="features">
        <FeatureSlider />
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
