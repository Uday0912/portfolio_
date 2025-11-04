import React, { useState, useRef, useEffect } from "react";
// Color theme values are now defined in CSS variables in App.module.css

import emailjs from "@emailjs/browser";
import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
  useInView,
} from "framer-motion";

// Initialize EmailJS with your public key
emailjs.init("atxTpA5nzu42hQRvc");

import InputField from "../common/components/InputField/InputField";
import TextAreaField from "../common/components/TextAreaField/TextAreaField";
import SubmitButton from "../common/components/SubmitButton/SubmitButton";
import Loader from "../common/components/Loader/Loader";
import { BackToTop } from '../components/BackToTop';
import IconButton from "../common/components/IconButton/IconButton";

// import icons
import { AiFillGithub, AiFillLinkedin, AiOutlineEye, AiOutlineDownload } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaCode, FaLaptopCode, FaBook } from "react-icons/fa";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { RiSendPlaneFill } from "react-icons/ri";
// Import other skill icons as needed, e.g.:
// import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaJava, FaPython } from "react-icons/fa";
// import { SiMongodb, SiMysql, SiExpress } from "react-icons/si";

//import images
import profilePhoto from "../assets/images/profile_photo.jpg";
import foodfusion from "../assets/images/foodfusion.png";
import protofolio from "../assets/images/protofolio.png";
import citizenSpark from "../assets/images/citizenSpark.png";
import smartread from "../assets/images/chat.png";

// import style
import style from "./App.module.css";

const sdeSkills = [
  { name: "HTML 5", cssName: "html" /* icon: <FaHtml5 /> */ },
  { name: "CSS 3", cssName: "css" /* icon: <FaCss3Alt /> */ },
  { name: "JavaScript", cssName: "java-script" /* icon: <FaJsSquare /> */ },
  { name: "ReactJs", cssName: "react" /* icon: <FaReact /> */ },
  { name: "NodeJs", cssName: "nodejs" /* icon: <FaNodeJs /> */ },
  { name: "Express", cssName: "express" /* icon: <SiExpress /> */ },
  { name: "MongoDB", cssName: "mongodb" /* icon: <SiMongodb /> */ },
  { name: "MySQL", cssName: "mysql" /* icon: <SiMysql /> */ },
  { name: "Git", cssName: "git" /* icon: <FaGitAlt /> */ },
  { name: "Java", cssName: "java" /* icon: <FaJava /> */ },
  { name: "C", cssName: "c-lang" }, // Changed cssName for C
  { name: "Problem Solving", cssName: "problem-solving" },
  { name: "Data Structures", cssName: "data-structures" },
  { name: "Algorithms", cssName: "algorithms" },
];

const mlAiSkills = [
  { name: "Python", cssName: "python" /* icon: <FaPython /> */ },
  { name: "NumPy", cssName: "numpy" },
  { name: "Pandas", cssName: "pandas" },
  { name: "Matplotlib", cssName: "matplotlib" },
  { name: "OpenCV", cssName: "opencv" },
  { name: "TensorFlow", cssName: "tensorflow" },
  { name: "Scikit-learn", cssName: "scikit-learn" },
  { name: "Streamlit", cssName: "streamlit" },
  { name: "Machine Learning", cssName: "machine-learning" },
];

// Project data
const projects = [
  {
    name: "CitizenSpark",
    description: "MGNREGA Data Dashboard for districts: coverage, health, and trends.",
    image: citizenSpark,
    link: "https://citizen-spark-iyt3dojr4-udays-projects-d8504db5.vercel.app/",
    github: "https://github.com/Uday0912/citizenSpark",
  },
  {
    name: "FoodFusion",
    description: "A recipe aggregator and recommendation app.",
    image: foodfusion,
    link: "https://foodfusion-29.onrender.com/",
    github: "https://github.com/Uday0912/foodfusion",
  },
  {
    name: "Portfolio Website",
    description: "Responsive personal portfolio built with React, Vite, and Framer Motion.",
    image: protofolio,
    link: "https://portfolio-ekau.onrender.com/",
    github: "https://github.com/Uday0912/portfolio_",
  },
  {
    name: "SmartRead",
    description: "AI-powered summarization and insights for long articles/documents.",
    image: smartread,
    link: "https://smartread.example.com",
    github: "https://github.com/Uday0912/smartread",
  },
];

// Helper component for animating sections on scroll
const AnimatedSection = ({ children, className, id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    >
      {children}
    </motion.section>
  );
};

function App() {
  const form = useRef();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.001,
  });

  // State initialization
  const [theme, setTheme] = useState('light');
  // Load persisted theme and apply to :root
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const preferred = stored || 'light';
    setTheme(preferred);
    document.documentElement.setAttribute('data-theme', preferred);
  }, []);

  // Apply theme changes when state updates
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));


  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailSent(false);
    setError(null);

    // Log the form data for debugging
    const formData = new FormData(form.current);
    console.log('Form Data:', {
      name: formData.get('from_name'),
      email: formData.get('reply_to'),
      message: formData.get('message')
    });

    emailjs
      .sendForm(
        "service_928aozr", // Your EmailJS service ID
        "template_f2qvwah", // Updated with your actual template ID
        form.current,
        "atxTpA5nzu42hQRvc"
      )
      .then(
        (result) => {
          console.log('Success:', result.text);
          e.target.reset();
          setLoading(false);
          setEmailSent(true);
          setTimeout(() => setEmailSent(false), 4000);
        },
        (error) => {
          console.error('Error:', error.text);
          setLoading(false);
          setError(`Failed to send message: ${error.text}. Please try again later.`);
          setTimeout(() => setError(null), 4000);
        }
      );
  };

  // Close menu when a link is clicked
  const handleMenuLinkClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset"; // Cleanup on unmount
    };
  }, [menuOpen]);

  return (
    <div className={style.app}>
      <motion.div className={style["progress-bar"]} style={{ scaleX }} />

      {/* Navbar */}
      <motion.nav
        className={style.nav}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
      >
        <motion.a
          href="#Home"
          className={style.logo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMenuLinkClick}
        >
          <h5>Parsha Uday</h5>
        </motion.a>
        <ul className={style["desktop-nav"]}>
          {" "}
          {/* For desktop nav items */}
          {["Home", "About", "Coding", "Achievements", "Projects", "Contact"].map((item) => (
            <motion.li
              key={item}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href={`#${item}`}>{item}</a>
            </motion.li>
          ))}
        </ul>
        {/* Theme toggle */}
        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            marginLeft: 12,
            borderRadius: 20,
            border: '1px solid var(--border-color)',
            background: 'var(--card-bg-color)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
        <div className={style["menu-icon"]}>
          <input
            id="checkbox"
            className={style.checkbox2}
            type="checkbox"
            checked={menuOpen}
            onChange={() => setMenuOpen(!menuOpen)}
          />
          <label className={style.toggle} htmlFor="checkbox">
            <div className={`${style.bars} ${style.bar4}`}></div>
            <div className={`${style.bars} ${style.bar5}`}></div>
            <div className={`${style.bars} ${style.bar6}`}></div>
          </label>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className={`${style.menu} ${menuOpen ? style.open : ""}`}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
          >
            {["Home", "About", "Coding", "Achievements", "Projects", "Contact"].map((item) => (
              <motion.li
                key={item}
                whileHover={{ x: 10, color: "var(--primary-color)" }}
                whileTap={{ scale: 0.9 }}
              >
                <a href={`#${item}`} onClick={handleMenuLinkClick}>
                  {item}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Contact Navigation (Side Social Links) */}
      <motion.div
        className={style["contact-nav"]}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.7, type: "spring", stiffness: 50 }}
      >
        <motion.a
          href="https://github.com/Uday0912"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <AiFillGithub />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/parshauday/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <AiFillLinkedin />
        </motion.a>
        <motion.a
          href="https://leetcode.com/u/UDAY_PARSHA/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaCode />
        </motion.a>
        <motion.a
          href="https://www.codechef.com/users/parshauday"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaLaptopCode />
        </motion.a>
      </motion.div>

      {/* Home Section */}
      <AnimatedSection id="Home" className={style.home}>
        <motion.div
          className={style["home-content"]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hi, I am <span>Parsha Uday</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A passionate B.Tech Computer Science student specializing in Data
            Structures, Machine Learning, and MERN stack development. Proven
            experience in building impactful full-stack applications and
            innovative Machine Learning models.
          </motion.p>
          <motion.a
            href="/resume.pdf"
            download
            className={style["download-button"]}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AiOutlineDownload /> Download CV
          </motion.a>
        </motion.div>
        <motion.div
          className={style["scroll-icon"]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className={style.chevrons}>
            <div className={style["chevron-down"]}></div>
            <div className={style["chevron-down"]}></div>
          </div>
        </motion.div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection id="About" className={style.about}>
        <div className={style.container}>
          <h2 className={style.title}>About Me</h2>
          <p className={style["section-description"]}>
            Discover more about my journey, my approach to technology, and the
            skills I bring to the table.
          </p>
          <div className={style["about-content"]}>
            <motion.div
              className={style["about-image-container"]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={profilePhoto}
                alt="Parsha Uday"
                className={style["profile-photo"]}
              />
            </motion.div>
            <motion.div 
              className={style["about-info"]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Get to know me!</h3>
              <p>
                As a dedicated B.Tech Computer Science student at Gayatri Vidya
                Parishad, I possess a strong foundation in software engineering
                principles, with specialized expertise in Data Structures,
                Algorithms, Machine Learning, MERN stack development, and
                Generative AI.
              </p>
              <p>
                Key attributes include a proactive approach to problem-solving,
                a proven ability to deliver reliable results, and a
                collaborative spirit. I am eager to contribute my technical
                proficiency and commitment to innovation to a challenging and
                growth-oriented role.
              </p>
            </motion.div>
            <motion.div
              className={`${style["my-skill"]} ${style["full-width-skill-area"]}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ gridColumn: "1 / -1" }}
            >
              {" "}
              {/* Make skills span full width below image and text */}
              <h3>My Skills</h3>
              {/* SDE Skills Section */}
              <h4 className={style["skill-subsection-title"]}>
                Software Development
              </h4>
              <motion.div
                className={style.skills}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {sdeSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className={`${style.skill} ${style[skill.cssName] || ""}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      y: -7,
                      backgroundColor: "var(--primary-light)",
                      color: "white",
                      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                      scale: 1.05,
                    }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {skill.icon && (
                      <span className={style["skill-icon"]}>{skill.icon}</span>
                    )}
                    {skill.name}
                  </motion.div>
                ))}
              </motion.div>
              {/* ML/AI Skills Section */}
              <h4
                className={style["skill-subsection-title"]}
                style={{ marginTop: "2rem" }}
              >
                Machine Learning & AI
              </h4>
              <motion.div
                className={style.skills}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {mlAiSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className={`${style.skill} ${style[skill.cssName] || ""}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      y: -7,
                      backgroundColor: "var(--accent-color)",
                      color: "white",
                      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                      scale: 1.05,
                    }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {skill.icon && (
                      <span className={style["skill-icon"]}>{skill.icon}</span>
                    )}
                    {skill.name}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Achievements Section */}
      <AnimatedSection id="Achievements" className={style.achievements}>
        <div className={style.container}>
          <h2 className={style.title}>Honors & Achievements</h2>
          <div className={style["achievements-wrapper"]}>
            <div className={style["achievement-group"]}>
              <h4>Competitive Programming</h4>
              <ul className={style["achievement-list"]}>
                <li>LeetCode: Solved <strong>450+ problems</strong> and ranked in the <strong>Top 10%</strong> globally</li>
                <li>CodeChef: Achieved <strong>2★</strong> with a maximum rating of <strong>1439+</strong></li>
                <li>Completed <strong>Citi Software Development Virtual Experience (2025)</strong> focused on scalable backend systems</li>
              </ul>
            </div>
            <div className={style["achievement-group"]}>
              <h4>Hackathons</h4>
              <ul className={style["achievement-list"]}>
                <li>Participated in <strong>Adobe India Hackathon 2025</strong> — Built AI-driven document structuring solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Coding Profiles Section */}
      <AnimatedSection id="Coding" className={style.coding}>
        <div className={style.container}>
          <h2 className={style.title}>Coding Profiles</h2>
          <div className={style.cards}>
            <div className={style.card}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <SiLeetcode size={22} style={{color:'#f89f1b'}} />
                <h3>LeetCode</h3>
              </div>
              <p>• <strong>1725+</strong> Rating • Top 5.8%</p>
              <a href="https://leetcode.com/u/UDAY_PARSHA/" target="_blank" rel="noopener noreferrer">Profile →</a>
            </div>
            <div className={style.card}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <SiCodechef size={22} style={{color:'#5b3d2a'}} />
                <h3>CodeChef</h3>
              </div>
              <p><strong>2★</strong> • <strong>1430+</strong> Max Rating</p>
              <a href="https://www.codechef.com/users/parshauday" target="_blank" rel="noopener noreferrer">Profile →</a>
            </div>
            <div className={style.card}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <FaBook size={22} style={{color:'var(--text-secondary)'}} />
                <h3>TakeUForward</h3>
              </div>
              <p>Active Learner • Focus: DSA</p>
              <a href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2" target="_blank" rel="noopener noreferrer">Profile →</a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection id="Projects" className={style.projects}>
        <div className={style.container}>
          <h2 className={style.title}>My Projects</h2>
          <p className={style["section-description"]}>
            A selection of projects that showcase my skills in web development,
            AI, and problem-solving.
          </p>
          <motion.div
            className={style["projects-list"]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.name + index}
                className={style.project}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={style["project-image"]}>
                  <img src={project.image} alt={project.name} />
                </div>
                <div className={style["project-info"]}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className={style["project-buttons"]}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style["project-button-link"]}
                      >
                        <IconButton icon={<AiOutlineEye />}> Live Demo
                        </IconButton>
                      </a>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style["project-button-link"]}
                      >
                        <IconButton icon={<AiFillGithub />}> GitHub
                        </IconButton>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="Contact" className={style.contact}>
        <div className={style.container}>
          <h2 className={style.title}>Get In Touch</h2>
          <p className={style["section-description"]}>
            Have a project in mind or just want to connect? Feel free to reach
            out!
          </p>
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={loading ? style["form-loading"] : ""}
          >
            <InputField
              type="text"
              name="from_name"
              placeholder="Your Name"
              required
            />
            <InputField
              type="email"
              name="reply_to"
              placeholder="Email"
              required
            />
            <TextAreaField name="message" placeholder="Your Message" required />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? (
                  <Loader />
                ) : (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RiSendPlaneFill style={{ marginRight: "8px" }} /> Send
                    Message
                  </span>
                )}
              </SubmitButton>
            </motion.div>
            {emailSent && (
              <motion.p
                className={style["form-success-message"]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                Your message has been sent successfully!
              </motion.p>
            )}
            {error && (
              <motion.p
                className={style["form-error-message"]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {error}
              </motion.p>
            )}
          </motion.form>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className={style.footer}>
        <div className={style.container}>
          <div className={style["footer-info"]}>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Parsha Uday</h3>
              <p>
                Ambitious Computer Science student crafting innovative digital
                experiences with a focus on full-stack development and Machine
                Learning.
              </p>
            </motion.div>
            <motion.div 
              className={style.social}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>Connect With Me</h3>
              <div>
                <a
                  href="https://github.com/Uday0912"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/parshauday/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillLinkedin />
                </a>
                {/* Add more social links if needed */}
              </div>
              <p style={{ marginTop: "1rem" }}>
                <a href="mailto:parshauday799@gmail.com">
                  parshauday799@gmail.com
                </a>
              </p>
            </motion.div>
          </div>
          <motion.div 
            className={style["copy-right"]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span>
              &copy; {new Date().getFullYear()} Parsha Uday. All rights
              reserved.
            </span>
          </motion.div>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}

export default App;
