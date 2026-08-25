import openFile from '../assets/open_file.png';
import closeFile from '../assets/close_file.png';
import { FILES } from './files';

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function FileRow() {
  return (
    <section className="file-row-section">
      <p className="file-row-hint">Browse</p>
      <div className="file-row">
        {FILES.map((file) => (
          <button
            key={file.id}
            type="button"
            className="file-icon hover-pop"
            onClick={() => scrollToSection(file.id)}
          >
            <span className="file-icon-image">
              <img src={openFile} alt="" className="file-icon-closed" />
              <img src={closeFile} alt="" className="file-icon-open" />
            </span>
            <span>{file.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default FileRow;
