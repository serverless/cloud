export default function SystemWarning({ message }) {
  return (
    <div className="alert alert-primary" role="alert">
      {message}
    </div>
  );
}
