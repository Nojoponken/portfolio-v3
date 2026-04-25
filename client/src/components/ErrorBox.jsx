import "./ErrorBox.css";

function ErrorBox({ error }) {
  return (
    <div className="error">
      <h2>Error: {error.status}</h2>
      <p>{error.message}</p>
    </div>
  );
}

export default ErrorBox;
