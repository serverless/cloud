export default function SystemWarning({ message }) {
  return (
    <div
      style={{
        background: '#FD5750',
        color: '#fff',
        padding: 20,
      }}
    >
      {message}
    </div>
  );
}
