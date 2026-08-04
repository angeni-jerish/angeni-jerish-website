const PIXEL_SIZE = 4;

function PixelIcon({ pattern, color = '#eee' }) {
  const shadows = [];
  pattern.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      if (cell === '#') {
        shadows.push(`${x * PIXEL_SIZE}px ${y * PIXEL_SIZE}px 0 0 ${color}`);
      }
    });
  });

  const width = Math.max(...pattern.map((row) => row.length)) * PIXEL_SIZE;
  const height = pattern.length * PIXEL_SIZE;

  return (
    <div className="pixel-icon-wrap" style={{ width, height }}>
      <div
        className="pixel-icon"
        style={{
          width: PIXEL_SIZE,
          height: PIXEL_SIZE,
          boxShadow: shadows.join(', '),
        }}
      />
    </div>
  );
}

export default PixelIcon;
