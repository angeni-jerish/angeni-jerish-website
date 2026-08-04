import PixelIcon from './PixelIcon';
import { FOLDER_PATTERN } from './pixelPatterns';
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
            <PixelIcon pattern={FOLDER_PATTERN} color="#ff69b4" />
            <span>{file.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default FileRow;
