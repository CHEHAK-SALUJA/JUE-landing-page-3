import React, { useEffect, useState, useRef, useCallback } from 'react';
import ChatWidget from './components/ChatWidget';
import './index.css';
import namasteIcon from './assets/namaste.png';

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

const programDetails = {
  "Department of Economics": "Learn to analyze complex markets, understand economic policies, and navigate the global financial landscape. Our economics program at JUE focuses on practical applications and international trade dynamics.",
  "Department of Management": "Master the art of leadership and organizational strategy. This course provides a deep dive into corporate efficiency, team building, and strategic decision-making for future global business leaders.",
  "Department of Commerce": "Explore the essentials of international trade, marketing, and accounting. We equip you with the technical skills and market insights necessary for success in the competitive global commercial sector.",
  "Department of Management Law": "Understand the intersection of business and legal frameworks. This unique program covers corporate governance, commercial law, and regulatory compliance essential for modern industrial management.",
  "Health & Sports Management": "Turn your passion for athletics into a career. Our program combines business acumen with specialized knowledge in sports facility operations, health promotion, and wellness industry management."
};

const journeySteps = [
  { title: "Apply Online", sub: "Submit application securely", color: "blue", align: "text-pos-top", t: 0.05 },
  { title: "Free Counseling", sub: "Personal guidance from our team", color: "blue", align: "text-pos-right", t: 0.20 },
  { title: "Document Check", sub: "Academic records are reviewed", color: "blue", align: "text-pos-left", t: 0.33 },
  { title: "Online Interview", sub: "Interaction with university", color: "blue", align: "text-pos-right", t: 0.46 },
  { title: "Receive Admission", sub: "Get official offer letter", color: "green", align: "text-pos-left", t: 0.58 },
  { title: "Connect with Students", sub: "Interact with current students", color: "blue", align: "text-pos-right", t: 0.70 },
  { title: "Visa & COE Support", sub: "Complete your visa process", color: "blue", align: "text-pos-left", t: 0.82 },
  { title: "Fly to Japan", sub: "Begin journey with confidence", color: "green", align: "text-pos-bottom", t: 0.95 }
];

const faqsList = [
  { q: "How do I apply?", a: "Submit your application securely through our online admission portal with the required documents." },
  { q: "How can I apply for a scholarship?", a: "Eligible international students can apply for JUE's special scholarships during the standard admission pipeline." },
  { q: "How do I apply for a visa?", a: "JUE provides comprehensive COE support and guides you through every step of the Japanese student visa process." },
  { q: "Are there vegetarian/halal food options?", a: "Yes, our cafeteria and local urban campuses are surrounded by diverse dining options, and we provide guidance for students with specific dietary needs." },
  { q: "What is the safety level in Japan?", a: "Japan is consistently ranked as one of the safest countries globally. Students can safely travel and live even late at night." },
  { q: "Can I work part-time while studying?", a: "International students are generally allowed to work up to 28 hours per week with a permit, offering great opportunities for cultural immersion." }
];

const specialSupportSteps = [
  { id: "visa", title: "Support for Visa and Admission", img: "/images/visa-jue.png" },
  { id: "english", title: "English Friendly Programs", img: "/images/language-jue.jpg" },
  { id: "cities", title: "Study in Japan's Top Cities", img: "/images/fukuokacampus02.jpg" },
  { id: "meals", title: "Indian Meals Available", img: "/images/cafe00.jpg" },
  { id: "accommodation", title: "Comfortable Accommodation", img: "/images/accommodation-jue.jpg" },
  { id: "clubs", title: "Club And Activities", img: "/images/clubs03.jpg" },
  { id: "safe", title: "Safe Environment", img: "/images/jue-students.jpg" }
];

const supportSlides = {
  "visa": [
    { title: "Direct CoE Guidance", text: "Our International Office provides expert support in securing your Certificate of Eligibility, the first step for your Japanese student visa.", img: "/images/visa-1.png" },
    { title: "Document Preparation", text: "We assist Indian students with all financial and academic documentation required by the Japanese Immigration Services Agency.", img: "/images/visa-2.png" },
    { title: "Online Briefings", text: "Participate in mandatory pre-departure sessions where we explain the visa interview process and arrival logistics.", img: "/images/visa-3.png" },
    { title: "Embassy Support", text: "Get localized advice on visiting the Japanese Embassy in New Delhi or Consulates in Mumbai, Chennai, and Kolkata.", img: "/images/visa-4.png" },
    { title: "Arrival Logistics", text: "From CoE to Residence Card, JUE ensures your legal status in Japan is managed professionally from day one.", img: "/images/visa-5.png" }
  ],
  "english": [
    { title: "Global Classrooms", text: "Join diverse classes where core economics and management subjects are taught entirely in English by international faculty.", img: "/images/english-1.png" },
    { title: "Interactive Seminars", text: "Participate in small-group discussions and case studies conducted in English to build your global business vocabulary.", img: "/images/english-2.png" },
    { title: "Digital Resources", text: "Access a wide range of English-language journals, textbooks, and online research databases through the JUE library system.", img: "/images/english-3.png" },
    { title: "Expert Tutoring", text: "Work closely with bilingual professors who understand the needs of international students and provide academic guidance in English.", img: "/images/english-4.png" },
    { title: "Global Degree Path", text: "Graduate with a degree recognized worldwide, opening doors to careers in Japan, India, and beyond.", img: "/images/english-5.png" }
  ],
  "cities": [
    { title: "Tokyo: Global Hub", text: "Experience the heartbeat of Japan in Shibuya, Tokyo. Study at the center of world-class technology, fashion, and business.", img: "/images/cities-1.png" },
    { title: "Fukuoka: Asian Gateway", text: "Our main campus in Dazaifu, Fukuoka, offers a warm climate, lower living costs, and a high-quality international lifestyle.", img: "/images/cities-2.png" },
    { title: "Kobe: Business Port", text: "Study in the historical port city of Kobe, known for its international atmosphere and vibrant Sannomiya business district.", img: "/images/cities-3.png" },
    { title: "Modern Campus Life", text: "All JUE campuses feature state-of-the-art facilities, from glass-walled study lounges to high-tech computer labs.", img: "/images/cities-4.png" },
    { title: "Connected Japan", text: "Travel easily between Tokyo, Kobe, and Fukuoka using Japan's efficient Shinkansen bullet train network.", img: "/images/cities-5.png" }
  ],
  "meals": [
    { title: "Authentic Indian Thalis", text: "Savor the taste of home with traditional thalis featuring dal, paneer, and fresh vegetables prepared with authentic spices.", img: "/images/meals-1.png" },
    { title: "Cross-Cultural Dining", text: "Our cafeterias are social hubs where Indian and Japanese students share meals and build lifelong cross-cultural friendships.", img: "/images/meals-2.png" },
    { title: "Vegetarian Excellence", text: "JUE prioritizes dietary needs, offering a wide range of high-quality vegetarian and vegan meal options every day.", img: "/images/cafe00.jpg" },
    { title: "Healthy Campus Food", text: "All meals are prepared in hygienic, modern facilities with a focus on nutritional balance and student wellness.", img: "/images/cafe00.jpg" },
    { title: "Global Flavors", text: "Beyond Indian and Japanese cuisine, our dining halls offer variety to cater to students from over 20 different countries.", img: "/images/cafe00.jpg" }
  ],
  "accommodation": [
    { title: "Modern Dormitories", text: "Safe, clean, and fully furnished student residences are located within walking distance of all our campuses.", img: "/images/accommodation-jue.jpg" },
    { title: "Comfortable Rooms", text: "Each student room is equipped with high-speed internet, a study desk, and climate control for a productive living environment.", img: "/images/accommodation.png" },
    { title: "Shared Life", text: "Kitchen and lounge areas provide spaces to cook Indian meals together and bond with fellow international students.", img: "/images/accommodation01.jpg" },
    { title: "Secure Housing", text: "JUE housing features electronic keycard access and 24/7 on-call staff to ensure your safety and peace of mind.", img: "/images/fukuokacampus03.jpg" },
    { title: "Serene Surroundings", text: "Many of our residences are surrounded by green spaces and traditional Japanese gardens, offering a peaceful retreat after classes.", img: "/images/garden03.jpg" }
  ],
  "clubs": [
    { title: "Traditional Arts", text: "Join clubs for Kendo, Tea Ceremony, or Calligraphy to deeply immerse yourself in Japan's rich cultural heritage.", img: "/images/clubs03.jpg" },
    { title: "Sports & Fitness", text: "From soccer to basketball, our athletic clubs help you stay active and make friends through team-based competition.", img: "/images/clubs06.jpg" },
    { title: "Business Societies", text: "Participate in student-led organizations that focus on entrepreneurship, marketing, and global economic trends.", img: "/images/clubs08.jpg" },
    { title: "Global Networking", text: "The International Student Union hosts regular mixers, cultural festivals, and networking events for all JUE students.", img: "/images/clubs10.jpg" },
    { title: "Modern Facilities", text: "JUE provides high-quality gyms and courts for all student clubs to practice and host friendly matches.", img: "/images/basketball.png" }
  ],
  "safe": [
    { title: "Smiling Community", text: "Japan is one of the world's safest nations, and JUE provides a welcoming, high-trust environment for every student.", img: "/images/jue-students.jpg" },
    { title: "Secure Campuses", text: "Our campuses are well-lit and feature comprehensive security teams, ensuring a safe learning environment at any hour.", img: "/images/jue-open.jpg" },
    { title: "Health & Wellness", text: "Access on-campus medical checkups and counseling services to support your physical and emotional well-being throughout your studies.", img: "/images/support04.jpg" },
    { title: "Parental Peace of Mind", text: "We maintain regular contact with families and provide a secure support system so parents in India can feel confident.", img: "/images/why-parents.png" },
    { title: "Always Connected", text: "JUE's emergency support network and community mentors are available 24/7 to assist international students with any situation.", img: "/images/community.png" }
  ]
};

const programImages = {
  "Department of Economics": "/images/Undergraduate00.jpg",
  "Department of Management": "/images/fukuokacampus02.jpg",
  "Department of Commerce": "/images/Internship06.jpg",
  "Department of Management Law": "/images/LearningProgression01.jpg",
  "Health & Sports Management": "/images/jue-students.jpg"
};

const JourneySection = ({ isActive }) => {
  // S-Curve Bezier Path
  const pathData = "M 20 85 C 80 85, 20 15, 80 15";

  // helper to get precise coordinates along cubic bezier for any t between 0 and 1
  const getBezierPoint = (t, p0, p1, p2, p3) => {
    const mt = 1 - t;
    return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
  };

  return (
    <section className="journey-wrapper reveal" id="journey">
      <div className="journey-header">
        <h2>Your Journey from India to Japan</h2>
      </div>
      <div className="journey-container">
        {/* Maps */}
        <img src="/images/india_map-removebg-preview.png" alt="India" className="map-india" />
        <img src="/images/japan_map-removebg-preview.png" alt="Japan" className="map-japan" />

        <svg className="journey-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Animated Dotted Line */}
          <path 
            id="flight-path"
            d={pathData} 
            fill="none" 
            stroke="#003B6F" 
            strokeWidth="0.4" 
            strokeDasharray="1.5, 1.5" 
            vectorEffect="non-scaling-stroke"
          />
          {/* Fixed Horizontal SVG Airplane animating over exact path - Stopping at end & Bigger size */}
          <image href="/images/airplane-removebg-preview.png" width="20" height="20" x="-10" y="-10" transform="rotate(30)">
             {isActive && (
               <animateMotion dur="12s" repeatCount="1" fill="freeze" path={pathData} />
             )}
          </image>
        </svg>

        {/* Dynamic Markers mathematically guaranteed to fall perfectly on the SVG cubic bezier path */}
        {journeySteps.map((step, idx) => {
           const x = getBezierPoint(step.t, 20, 80, 20, 80);
           const y = getBezierPoint(step.t, 85, 85, 15, 15);
           const dotColor = step.color === 'green' ? '#2ecc71' : '#3498db';

            return (
              <div 
                key={idx} 
                className="journey-marker" 
                style={{ 
                  left: `${x}%`, 
                  top: `${y}%`, 
                  borderColor: dotColor
                }}
              >
                <div 
                  className={`step-text-container ${step.align} ${isActive ? 'fade-in-on-pass' : ''}`}
                  style={{ 
                    animationDelay: `${step.t * 10}s`
                  }}
                >
                  <div className="step-title" style={{ color: dotColor }}>{step.title}</div>
                  <div className="step-sub">{step.sub}</div>
                </div>
              </div>
            );
        })}
      </div>
    </section>
  );
};

const statsSets = [
  [
    { title: "Top Ranked University", label: "ENROLLMENT", value: "5,700+" },
    { title: "Safe and Welcoming Campus", label: "GLOBAL DIVERSITY", value: "46.6%" },
    { title: "Affordable Tuition fee & Scholarship", label: "CAREER SUCCESS", value: "96.3%" },
    { title: "Global Career Opportunities", label: "Students from", value: "20+ Countries" }
  ],
  [
    { title: "World-Class Faculties", label: "EXPERT PROFESSORS", value: "300+" },
    { title: "Modern Infrastructure", label: "HIGH-TECH LABS", value: "50+" },
    { title: "Guaranteed Placement", label: "ALUMNI NETWORK", value: "20,000+" },
    { title: "Beautiful Surroundings", label: "CAMPUS AREA", value: "100+ Acres" }
  ]
];

const App = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState("Department of Economics");
  const [showStories, setShowStories] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isJourneyActive, setIsJourneyActive] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState("visa");
  const [activeSupportSlide, setActiveSupportSlide] = useState(0);
  const [slideAnim, setSlideAnim] = useState('active');

  useEffect(() => {
    setActiveSupportSlide(0);
  }, [selectedSupport]);

  const nextSupportSlide = () => {
    setSlideAnim('exit');
    setTimeout(() => {
      const slides = supportSlides[selectedSupport];
      setActiveSupportSlide((prev) => (prev + 1) % slides.length);
      setSlideAnim('active');
    }, 300);
  };

  const prevSupportSlide = () => {
    setSlideAnim('exit');
    setTimeout(() => {
      const slides = supportSlides[selectedSupport];
      setActiveSupportSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setSlideAnim('active');
    }, 300);
  };
  
  const [statSetIndex, setStatSetIndex] = useState(0);
  const [statAnim, setStatAnim] = useState('active');

  useEffect(() => {
    const statsTimer = setInterval(() => {
      setStatAnim('slide-out');
      setTimeout(() => {
        setStatSetIndex(prev => (prev + 1) % statsSets.length);
        setStatAnim('slide-in');
        setTimeout(() => {
          setStatAnim('active');
        }, 100); // Wait brief moment, then slide to active
      }, 500); // 500ms slide out duration
    }, 4500); // cycle every 4.5 seconds

    return () => clearInterval(statsTimer);
  }, []);

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
          if (entry.target.id === 'journey') {
            setIsJourneyActive(true);
          }
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      {/* Sticky Apply Button */}
      <button className="sticky-apply-btn">APPLY NOW</button>

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

      {/* White Strip removed to reduce vertical space */}

      {/* Indian Welcome Section [NEW] */}
      <section className="indian-welcome reveal">
        <h2 className="welcome-title">We welcome students from India <img src={namasteIcon} alt="Namaste" className="namaste-icon" /></h2>
        <div className="welcome-container">
          <div className="welcome-text-container">
            <p className="welcome-text-bold">
              For over 60 years since 1956, the Tsuzuki Education Group has been developing individual expertise in the academic context and are willing to provide unlimited support in education.
            </p>
            <p className="welcome-text-normal">
              We are now one of the biggest educational corporations in Japan, having established six universities, twelve junior colleges and vocational schools, three high schools, a junior high school, and four kindergartens and nursery schools.
            </p>
          </div>
        </div>
      </section>

      {/* Navy Stats Section [NEW] */}
      <section className="navy-stats reveal">
        <div className="stats-grid">
          {statsSets[statSetIndex].map((stat, index) => (
            <div className="stats-block" key={index}>
              <div className="block-inner">
                <div className={`stats-slider-wrapper ${statAnim}`}>
                  <h3 className="block-title">{stat.title}</h3>
                  <div className="stat-detail">
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-value">{stat.value}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome JUE Section [NEW] */}
      <section className="welcome-jue reveal">
        <h2 className="welcome-jue-title">Welcome to Japan University of Economics (JUE)</h2>
        <div className="video-section">
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/tB1vYUFAn5I?autoplay=1&mute=1&loop=1&playlist=tB1vYUFAn5I"
              title="JUE University Life"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

       {/* Programs We Offer Section [NEW] */}
      <section className="programs reveal" id="programs">
        <h2 className="programs-title">PROGRAMS WE OFFER</h2>
        <div className="programs-grid">
          {Object.keys(programImages).map((prog, idx) => (
             <div 
               key={idx}
               className={`program-card ${selectedProgram === prog ? 'active-card' : ''}`}
               onClick={() => setSelectedProgram(prog)}
             >
               <div className="program-image-box">
                 <img src={programImages[prog]} alt={prog} />
               </div>
               <div className="program-info-box">
                 <h4>{prog}</h4>
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* About Selected Program Section [REFINED NAVY BOX STYLE] */}
      <section className="about-program-section reveal active" style={{ padding: '40px 20px' }}>
        <div className="about-program-container">
          <div className="program-detail-box">
             <h2 className="about-program-title">About {selectedProgram}</h2>
             <div className="about-program-underline"></div>
             <p className="about-program-text">
               {programDetails[selectedProgram]}
             </p>
          </div>
        </div>
      </section>

      {/* New Journey Section Implementation */}
      <JourneySection isActive={isJourneyActive} />

      {/* Community Row Header [REFINED] */}
      <section className="community-cta reveal" style={{ position: 'relative', overflow: 'visible' }}>
        <h2 className="community-home-text">
          <span className="white-text">Your concerns</span> <span className="green-highlight">NOW SOLVED</span>
          <span className="animated-emoji">🤔</span>
        </h2>
      </section>

      {/* Why JUE / Why Japan Slider */}
      <section className="reveal" id="features">
        <FeatureSlider />
      </section>

      {/* Special Support for Indian Students Section [RELOCATED] */}
      <section className="special-support-section reveal">
        <h2 className="special-support-title">Special Support for Indian Students</h2>
        <div className="support-grid">
          {specialSupportSteps.map((step, idx) => (
            <div 
              key={idx} 
              className={`support-card ${selectedSupport === step.id ? 'active-card-support' : ''}`}
              onClick={() => setSelectedSupport(step.id)}
            >
              <div className="support-img-box">
                <img src={step.img} alt={step.title} />
              </div>
              <div className="support-info-box">
                <p>{step.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Support Detail Section [UPGRADED INTERACTIVE SUB-CAROUSEL] */}
      <section className="about-program-section reveal active" style={{ padding: '0 20px' }}>
        <div className="about-program-container">
          <div className="about-program-slider sub-carousel-container">
            {/* Arrows flanking the image for sub-slide navigation */}
            <div className="support-detail-layout">
              <div className="image-carousel-unit">
                <button className="sub-arrow left" onClick={prevSupportSlide}>‹</button>
                <div className={`about-program-image sub-image ${slideAnim}`}>
                  <img src={supportSlides[selectedSupport][activeSupportSlide].img} alt="Support" />
                </div>
                <button className="sub-arrow right" onClick={nextSupportSlide}>›</button>
              </div>
              
              <div className={`about-program-info sub-info ${slideAnim}`}>
                <h2 className="about-program-title">{supportSlides[selectedSupport][activeSupportSlide].title}</h2>
                <div className="about-program-underline"></div>
                <p className="about-program-text">
                  {supportSlides[selectedSupport][activeSupportSlide].text}
                </p>
                <div className="slide-dots">
                   {supportSlides[selectedSupport].map((_, i) => (
                     <span key={i} className={`slide-dot ${i === activeSupportSlide ? 'active' : ''}`}></span>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Alumni Inspiration Section [NEW] */}
      <section className="alumni-inspiration-section reveal" id="mentors">
        <div className="alumni-content">
          <h2 className="alumni-title">Be inspired by our students and alumni</h2>
          <p className="alumni-subtitle">
            Discover how Education In JAPAN can give you unique opportunities for personal<br className="desktop-break" /> growth and career success.
          </p>
          <button 
            className="alumni-btn" 
            onClick={() => {
              setShowStories(true);
              setTimeout(() => document.getElementById('success').scrollIntoView({ behavior: 'smooth' }), 100);
            }}
          >
            Read Student Stories
          </button>
        </div>
      </section>
      


      {/* Success Stories Section [NEW] */}
      <section className="success-stories" id="success">
        {showStories && (
          <>
            <div className="success-row reveal active">
              <div className="success-img-box">
                 <img src="/images/jue-students.jpg" alt="Student Presentation" />
              </div>
              <div className="success-pill">
                <strong>Kim Seong-min (South Korea) - Professional Athlete</strong><br />
                "JUE's disciplined environment at the Fukuoka campus was essential in preparing me for the rigors of the Kiwoom Heroes and my journey into professional sports."
              </div>
            </div>

            <div className="success-row reverse reveal active">
              <div className="success-img-box">
                 <img src="/images/Undergraduate00.jpg" alt="Student Life" />
              </div>
              <div className="success-pill">
                <strong>Garkavenko Hanna (Ukraine) - Japanese Industry</strong><br />
                "The dedicated career support programs at JUE offered me a lifeline. I am proud to have secured a career here in Japan thanks to their guidance."
              </div>
            </div>

            <div className="success-row reveal active">
              <div className="success-img-box">
                 <img src="/images/fukuokacampus02.jpg" alt="Alumni Founder" />
              </div>
              <div className="success-pill">
                <strong>Kang Rae-soo (South Korea) - CEO & Founder</strong><br />
                "Founding QuickConnect Co., Ltd. was possible because of the market insights and networking opportunities JUE provided during my Economics degree."
              </div>
            </div>
          </>
        )}
      </section>
      {/* Join Our WhatsApp Community CTA Section [NEW] */}
      <section className="whatsapp-cta-section reveal">
        <div className="whatsapp-cta-banner">
          <div className="whatsapp-cta-text">
            Join Our whatsapp Community for <span className="whatsapp-green">UPDATES</span>
          </div>
          <a href="https://chat.whatsapp.com/your-group-link" target="_blank" rel="noopener noreferrer" className="whatsapp-join-btn">
            JOIN NOW
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq reveal" id="faq">
        <div className="faq-header-strip">
          <h2>FAQs</h2>
        </div>
        <div className="faq-container-navy">
          <div className="faq-list">
            {faqsList.map((faq, idx) => (
              <div 
                key={idx} 
                className="faq-item-container" 
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              >
                <div className="faq-item">{faq.q}</div>
                {openFaqIndex === idx && (
                  <div className="faq-answer-static">{faq.a}</div>
                )}
              </div>
            ))}
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
