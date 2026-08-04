import './App.css';
import Landing from './components/Landing';
import FileRow from './components/FileRow';
import ComingSoonSections from './components/ComingSoonSections';

function App() {
  return (
    <div className="app">
      <Landing />
      <FileRow />
      <ComingSoonSections />
    </div>
  );
}

export default App;
