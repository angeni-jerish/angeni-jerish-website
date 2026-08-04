import PlaceholderPanel from './PlaceholderPanel';
import { FILES } from './files';

function ComingSoonSections() {
  return (
    <>
      {FILES.map((file) => (
        <section id={file.id} key={file.id} className="content-section">
          <PlaceholderPanel title={file.label} />
        </section>
      ))}
    </>
  );
}

export default ComingSoonSections;
