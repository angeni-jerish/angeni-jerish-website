import { useState } from 'react';
import './App.css';
import Landing from './components/Landing';
import FileRow from './components/FileRow';
import ComingSoonSections from './components/ComingSoonSections';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);
  const [photoVisible, setPhotoVisible] = useState(false);

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
