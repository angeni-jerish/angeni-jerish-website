import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import roboarm1 from '../assets/roboarm1.png';
import roboarm2 from '../assets/roboarm2.png';
import sumo from '../assets/sumo.png';
import rollercoaster from '../assets/rollercoaster.jpg';
import mood1 from '../assets/mood1.png';
import mood2 from '../assets/mood2.png';
import mood3 from '../assets/mood3.png';
import mood4 from '../assets/mood4.png';
import mood5 from '../assets/mood5.png';
import mood6 from '../assets/mood6.png';

const techProj = [
  {
    id: 1,
    name: 'Mood Tracker App',
    skills: [
      { id: 1, skill: 'React Native' },
      { id: 2, skill: 'JavaScript' },
      { id: 3, skill: 'VS Code' },
    ],
    points: [
      { id: 1, point: 'Developed a mobile application aimed at addressing teen mental health challenges through daily tracking and habit formation' },
      { id: 2, point: 'Implemented core features including daily journaling, mood logging, and user reminders' },
      { id: 3, point: 'Focused on UI/UX optimization by utilizing dynamic rendering and state management to ensure an intuitive user experience' },
    ],
    imgs: [
      { id: 1, img: mood1 },
      { id: 2, img: mood2 },
      { id: 3, img: mood3 },
      { id: 4, img: mood4 },
      { id: 5, img: mood5 },
      { id: 6, img: mood6 },
    ],
  },
];

const engProj = [
  {
    id: 1,
    name: 'Autonomous SumoBot Design',
    skills: [
      { id: 1, skill: 'Arduino' },
      { id: 2, skill: 'CAD' },
      { id: 3, skill: 'Wiring' },
    ],
    points: [
      { id: 1, point: 'Collaborated with a team of hardware and software developers to engineer an autonomous robot for competitive performance' },
      { id: 2, point: 'Utilized iterative CAD modeling to refine the chassis design and optimize sensor placement for better responsiveness' },
      { id: 3, point: 'Programmed the robot using Arduino to enhance movement control and autonomous navigation' },
    ],
    imgs: [{ id: 1, img: sumo }],
  },
  {
    id: 2,
    name: 'Robotic Arm Object Retrieval Mechanism',
    skills: [
      { id: 1, skill: 'Python' },
      { id: 2, skill: 'CAD' },
      { id: 3, skill: 'PrusaSlicer' },
    ],
    points: [
      { id: 1, point: 'Served as Project Coordinator for a four-person team to design and deliver a Q-Arm package-lifting mechanism' },
      { id: 2, point: 'Set up a virtual machine environment and integrated Python scripts to enable autonomous package movement' },
      { id: 3, point: 'Designed precise mechanical components using CAD and PrusaSlicer, producing 3D-printed parts that improved grip and stability' },
      { id: 4, point: 'Achieved a success rate of over 80% during autonomous testing and delivered the project one week ahead of schedule' },
    ],
    imgs: [
      { id: 1, img: roboarm1 },
      { id: 2, img: roboarm2 },
    ],
  },
  {
    id: 3,
    name: 'Energy Efficient Roller Coaster',
    skills: [
      { id: 1, skill: 'Data Analysis' },
      { id: 2, skill: 'Physical Modelling' },
    ],
    points: [
      { id: 1, point: 'Conducted research on energy efficiency concepts by building and testing a physical prototype' },
      { id: 2, point: 'Constructed a cardboard model to collect and analyze data regarding friction and heat loss' },
      { id: 3, point: 'Proposed improvements for energy recovery—such as powering auxiliary lights—which increased theoretical system efficiency by 10%' },
    ],
    imgs: [{ id: 1, img: rollercoaster }],
  },
];

function ProjectsPanel() {
  const [activeProject, setActiveProject] = useState(null);

  const selectProject = (type) => {
    setActiveProject((prev) => (prev === type ? null : type));
  };

  const skillsList = (project) => project.skills.map((s) => <li key={s.id}>{s.skill}</li>);
  const pointsList = (project) => project.points.map((p) => <li key={p.id}>{p.point}</li>);
  const imageSlides = (project) =>
    project.imgs.map((img) => (
      <SwiperSlide key={img.id}>
        <img src={img.img} alt="Project" className="hover-pop" />
      </SwiperSlide>
    ));

  const renderProjects = (projects) =>
    projects.map((project) => (
      <div className="image-container" key={project.id}>
        <div className="text-column">
          <div className="title">{project.name}</div>

          <h3 className="skills-header">Skills</h3>
          <div className="narrow">
            <ul>{skillsList(project)}</ul>
          </div>

          <h3 className="points-header">Overview</h3>
          <div className="narrow">
            <ul>{pointsList(project)}</ul>
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
            {imageSlides(project)}
          </Swiper>
        </div>
      </div>
    ));

  return (
    <div className="projects-section">
      <h1 className="title">Projects</h1>
      <p className="projects-hint">Click on one of the project categories to view</p>

      <div className="proj-container">
        <div
          className={`tech-eng ${activeProject === 'tech' ? 'clicked' : ''}`}
          onClick={() => selectProject('tech')}
        >
          <h2>Tech Projects</h2>
          <ul>
            {techProj.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        </div>
        <div
          className={`tech-eng ${activeProject === 'engineering' ? 'clicked' : ''}`}
          onClick={() => selectProject('engineering')}
        >
          <h2>Engineering Projects</h2>
          <ul>
            {engProj.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        </div>
      </div>

      {activeProject === 'tech' && (
        <div className="project-details">
          <h2>Tech Projects:</h2>
          <div>{renderProjects(techProj)}</div>
        </div>
      )}
      {activeProject === 'engineering' && (
        <div className="project-details">
          <h2>Engineering Projects:</h2>
          <div>{renderProjects(engProj)}</div>
        </div>
      )}
    </div>
  );
}

export default ProjectsPanel;
