import "./ConfirmDialog.css";

function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h2>{title}</h2>

        <p>{message}</p>

        <div className="dialog-buttons">
          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;