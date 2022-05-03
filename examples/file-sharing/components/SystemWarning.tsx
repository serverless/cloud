export default function SystemWarning({ message }) {
  return (
    <div className="alert alert-primary rounded-0" role="alert">
      {message}
    </div>
  );
}
