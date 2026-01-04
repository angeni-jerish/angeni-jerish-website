import { useState, useEffect } from 'react';
import './App.css';
import EmailIcon from './assets/email-icon-inbox-icon-letter-icon-message-icon-text-icon-logo-line-arrow-symbol-blackandwhite-png-clipart-removebg-preview.png';
import LinkedIn from './assets/Linkedin-logo-on-transparent-PNG--removebg-preview.png'; 
import Github from './assets/25231-removebg-preview.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import aboutme from './assets/about.jpg';
import roboarm1 from './assets/roboarm1.png';
import roboarm2 from './assets/roboarm2.png';
import roboarm3 from './assets/roboarm3.png';
import roboarm4 from './assets/roboarm4.png';
import sumo from './assets/sumo.png';
import rollercoaster from './assets/rollercoaster.jpg';
import mood1 from './assets/mood1.png';
import mood2 from './assets/mood2.png';
import mood3 from './assets/mood3.png';
import mood4 from './assets/mood4.png';
import mood5 from './assets/mood5.png';
import mood6 from './assets/mood6.png';



function App() {
  const [displayed, setDisplayed] = useState('');
  const [open, setOpen] = useState('+');
  const [projects, setProjects] = useState(false);
  const [projectDisplay, setProjectDisplay] = useState(false);
  const [about, setAbout] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [contact, setContact] = useState(false);
  const techProj = [
  { id: 1, 
    name: 'Mood Tracker App', 
    skills: [
      {id:1, skill: 'React Native'}, 
      {id:2, skill: 'JavaScript'}, 
      {id:3, skill: 'VS Code'}
    ], 
    points: [
      {id:1, point: 'Developed a mobile application aimed at addressing teen mental health challenges through daily tracking and habit formation'}, 
      {id:2, point: 'Implemented core features including daily journaling, mood logging, and user reminders'}, 
      {id:3, point: 'Focused on UI/UX optimization by utilizing dynamic rendering and state management to ensure an intuitive user experience'}
    ], 
    imgs:[
      {id:1, img: mood1}, 
      {id:2, img: mood2}, 
      {id:3, img: mood3},
      {id:4, img: mood4}, 
      {id:5, img: mood5}, 
      {id:6, img: mood6}
    ]
  }];
  const engProj = [
  { 
    id: 1, 
    name: 'Autonomous SumoBot Design', 
    skills: [
      {id:1, skill: 'Arduino'}, 
      {id:2, skill: 'CAD'}, 
      {id:3, skill: 'Wiring'}
    ], 
    points: [
      {id:1, point: 'Collaborated with a team of hardware and software developers to engineer an autonomous robot for competitive performance'}, 
      {id:2, point: 'Utilized iterative CAD modeling to refine the chassis design and optimize sensor placement for better responsiveness'}, 
      {id:3, point: 'Programmed the robot using Arduino to enhance movement control and autonomous navigation'}
    ], 
    imgs:[
      {id:1, img: sumo}
    ]
  },
  { 
    id: 2, 
    name: 'Robotic Arm Object Retrieval Mechanism', 
    skills: [
      {id:1, skill: 'Python'}, 
      {id:2, skill: 'CAD'}, 
      {id:3, skill: 'PrusaSlicer'}
    ], 
    points: [
      {id:1, point: 'Served as Project Coordinator for a four-person team to design and deliver a Q-Arm package-lifting mechanism'}, 
      {id:2, point: 'Set up a virtual machine environment and integrated Python scripts to enable autonomous package movement'}, 
      {id:3, point: 'Designed precise mechanical components using CAD and PrusaSlicer, producing 3D-printed parts that improved grip and stability'},
      {id:4, point: 'Achieved a success rate of over 80% during autonomous testing and delivered the project one week ahead of schedule'}
    ], 
    imgs:[
      {id:1, img: roboarm1}, 
      {id:2, img: roboarm2}
    ]
  },
  { 
    id: 3, 
    name: 'Energy Efficient Roller Coaster', 
    skills: [
      {id:1, skill: 'Data Analysis'}, 
      {id:2, skill: 'Physical Modelling'}
    ], 
    points: [
      {id:1, point: 'Conducted research on energy efficiency concepts by building and testing a physical prototype'}, 
      {id:2, point: 'Constructed a cardboard model to collect and analyze data regarding friction and heat loss'}, 
      {id:3, point: 'Proposed improvements for energy recovery—such as powering auxiliary lights—which increased theoretical system efficiency by 10%'}
    ], 
    imgs:[
      {id:1, img: rollercoaster}, 
    ]
  }];
  const [file, setFile] = useState({
    about: '📁',
    projects: '📁',
    contact: '📁',
    tech: '📁',
    engineering: '📁',
  });

  useEffect(() => {
    const str = "Hello, I'm Angeni";
    for (let i = 0; i <= str.length; i++) {
      setTimeout(() => {
        setDisplayed(str.substring(0, i));
      }, 100 * i);
    }
  }, []);

  const fileChange = (fileName) => {
    setFile((prev) => {
      const newState = { ...prev };
      newState[fileName] = prev[fileName] === '📁' ? '📂' : '📁';
      return newState;
    });
  };
  
  const openProjects = () => {
    fileChange('projects');
    if (open === '+') {
      setOpen('-');
      setProjects(true);

      setProjectDisplay(true);
    } else {
      setOpen('+');
      setProjects(false);
      setProjectDisplay(false);
      setActiveProject(null);
    }
  };

  const selectProject = (type) => {
  setActiveProject((prev) => {
    const isClosing = prev === type; 
    setFile((prevFile) => ({
      ...prevFile,
      tech: type === 'tech' && !isClosing ? '📂' : '📁',
      engineering: type === 'engineering' && !isClosing ? '📂' : '📁',
    }));
    return isClosing ? null : type;
  });
};

  const openAbout = () => {
    fileChange('about');
    setAbout((prev) => !prev);
  } 
  const openContact = () => {
    fileChange('contact');
    setContact((prev) => !prev);
  }

  const techSkills = (project) => {
    return project.skills.map(p => <li key={p.id}>{p.skill}</li>);
  };

  const engSkills = (project) => {
    return project.skills.map(p => <li key={p.id}>{p.skill}</li>);
  };

  const techPoints = (project) => {
    return project.points.map(p => <li key={p.id}>{p.point}</li>);
  };

  const engPoints = (project) => {
    return project.points.map(p => <li key={p.id}>{p.point}</li>);
  };

  const techImages = (project) => {
    return project.imgs.map((imgs) => <SwiperSlide><img key={imgs.id} src={imgs.img} alt="Project Image" /></SwiperSlide>);
  };

  const engImages = (project) => {
    return project.imgs.map((imgs) => <SwiperSlide><img key={imgs.id} src={imgs.img} alt="Project Image" /></SwiperSlide >)
  };

  const techProjects = () => {
  return techProj.map((project) => (
    <div className="image-container" key={project.id}>
      
      <div className="text-column">
        <div className="title">{project.name}</div>

        <h3 className="skills-header">Skills</h3>
        <div className="narrow">
          <ul>{techSkills(project)}</ul>
        </div>

        <h3 className="points-header">Overview</h3>
        <div className="narrow">
          <ul>{techPoints(project)}</ul>
        </div>
      </div>

      <div className="images">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
        >
          {techImages(project)}
        </Swiper>
      </div>

    </div>
  ));
};

  const engProjects = () => {
  return engProj.map((project) => (
    <div className="image-container" key={project.id}>
      <div className="text-column">
        <div className="title">{project.name}</div>

        <h3 className="skills-header">Skills</h3>
        <div className="narrow">
          <ul>{engSkills(project)}</ul>
        </div>

        <h3 className="points-header">Overview</h3>
        <div className="narrow">
          <ul>{engPoints(project)}</ul>
        </div>
      </div>

      <div className="images">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
        >
          {engImages(project)}
        </Swiper>
      </div>

    </div>
  ));
};

  return (
    <>
      <div className="app">
        <h1 className="header">
          <span>{displayed}</span>
          <span className="cursor">|</span>
        </h1>
        <p style={{ color: "#646cff" }} className="about-section">Click on the file tree to get started! </p>
        <div className="file-tree">
          <h1 className="file">&gt; src</h1>

          <h1 className="file-names" onClick={openAbout}>
            {file['about']} about
          </h1>

          <h1 className="file-names">
          <span onClick={openProjects}>
            {open} {file.projects} projects
          </span>
            {projects ? (
              <div className="nested">
                <h1 className="file-names" onClick={() => selectProject('tech')}>
                  {file['tech']} tech
                </h1>
                <h1 className="file-names" onClick={() => selectProject('engineering')}>
                  {file['engineering']} engineering
                </h1>
              </div>
            ) : null}
          </h1>

          <h1 className="file-names" onClick={openContact}>
            {file['contact']} contact
          </h1>
        </div>
        <div className="sections">
          <div>
            {about ? (
              <div>
                <h1 className="title">About</h1>
                <div className="about-section"> 
                  <img alt="About Me" src={aboutme} className='img' style={{width: "400px", height: "550px"}}></img>
                  <div style={{ marginLeft: "2rem"}}>
                    <h1 className="title" style={{ fontWeight: "normal" }}>Hi, I'm Angeni! 🌺</h1>
                    <p>
                      I’m a <b>first-year</b> student in the Engineering I program at
                      <b>McMaster University</b>. As an aspiring <b>mechatronics engineer</b>, I enjoy turning
                      ideas into things that actually work and experimenting with new tools and technologies to bring those ideas to life.
                    </p>

                    <p style={{ marginTop: "1.5rem" }}>
                      When I’m not tinkering with projects, you’ll find me <b>leading dance performances</b>, <b>engaging in community outreach</b>, or <b>enjoying a Bollywood movie marathon</b>.
                    </p>

                    <p style={{ marginTop: "1.5rem" }}>
                      I’m always seeking opportunities to work on projects
                      where I can <b>combine my coding skills with my engineering mindset</b>. Feel free
                      to reach out if you’d like to connect!
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div>
            {projectDisplay ? (
              <div className="projects-section"> 
                <h1 className="title">Projects</h1>
                <p className="about-section">Click on one of the project categories to view</p>
                <div className="proj-container">
                  <div
                className={`tech-eng ${activeProject === 'tech' ? 'clicked' : ''}`}
                onClick={() => selectProject('tech')}
              >
                
                    <h2>Tech Projects</h2>
                    <ul>
                      {techProj.map(p => <li key={p.id}>{p.name}</li>)}
                    </ul>
                  </div>
                  <div
                className={`tech-eng ${activeProject === 'engineering' ? 'clicked' : ''}`}
                onClick={() => selectProject('engineering')}
              >
                    <h2>Engineering Projects</h2>
                    <ul>
                      {engProj.map(p => <li key={p.id}>{p.name}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div>
            {activeProject === 'tech' ? (
              <div className="project-details">
                <h2>Tech Projects:</h2>
                <div>{techProjects()}</div>
                
              </div>
            ) : null}
            {activeProject === 'engineering' ? (
              <div className="project-details">
                <h2>Engineering Projects:</h2>
                <div>{engProjects()}</div>
              </div>
            ) : null}
          </div>
          <div>
            <div>
              {contact ? (
                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "2rem"}}>
                <div style={{flexDirection: "column"}}>
                  <h1 className="title">Contact</h1>
                  <div className="contact-text"> 
                    <p>Connect with me via the quick-link buttons, or find more info in the menu</p>
                  </div>
                  <div>
                    <div className="contact-section">
                    <div
                      className="button"
                      style={{background: "#ff0044"}}
                      onClick={() => window.location.href = "mailto:angeni.jerish@gmail.com"}>
                      <img src={EmailIcon} width="50" height="40" alt="Email Icon" />
                      <span>Email</span>
                    </div>
                    <div
                      className="button"
                      style={{background: "#4070B0"}}
                      onClick={() => window.open("https://www.linkedin.com/in/angeni-jerish/", "_blank")}>
                      <img src={LinkedIn} width="50" height="50" alt="LinkedIn Icon" />
                      <span>LinkedIn</span>
                    </div>
                    <div
                      className="button"
                      style={{background: "#994df1ff"}}
                      onClick={() => window.open("https://github.com/angeni-jerish", "_blank")}>
                      <img src={Github} width="50" height="50" alt="Github Icon" />
                      <span>Github</span>
                    </div>
                    </div>
                  </div>
                </div>
                  <div className="contact-info">
                    <p>Contact Menu: </p>
                    <ul>
                      <li>Email: angeni.jerish@gmail.com</li>
                      <li>LinkedIn: @angeni-jerish</li>
                      <li>GitHub: @angeni-jerish</li>
                    </ul>
                  </div>
                  <a href="https://www.flaticon.com/free-icons/flower" style={{marginTop:"3rem", color: "#4a4a4aff"}}title="flower icons">Flower icons created by Fathema Khanom - Flaticon</a>
                </div>
              ):null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

