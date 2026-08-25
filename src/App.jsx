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
    <div className="app">
      {loading && (
        <LoadingScreen
          onLanded={() => setPhotoVisible(true)}
          onComplete={() => setLoading(false)}
        />
      )}
      <Landing photoVisible={photoVisible} />
      <FileRow />
      <ComingSoonSections />
    </div>
  );
}

export default App;
