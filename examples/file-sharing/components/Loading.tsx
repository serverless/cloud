export default function Loading({ width, height }) {
  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h5 aria-busy='true'>Loading</h5>
    </div>
  );
}
