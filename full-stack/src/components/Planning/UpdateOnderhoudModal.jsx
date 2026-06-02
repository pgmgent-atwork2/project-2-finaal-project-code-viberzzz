import { useState } from "react";
import "../../css/UpdateOnderhoudModal.css";

const UpdateOnderhoudModal = ({ item, onClose, onUpdate }) => {
  const [newStatus, setNewStatus] = useState(item?.status);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async () => {
    if (newStatus === item.status) {
      onClose();
      return;
    }

    setIsLoading(true);
    try {
      await onUpdate(item.id, newStatus);
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Update Maintenance Task</h3>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="task-info">
            <h4>{item.unit?.naam || "Unknown Unit"}</h4>
            <p className="task-description">{item.notitie}</p>
            <p className="task-meta">
              Assigned to: <strong>{item.gebruiker?.naam || "Unassigned"}</strong>
            </p>
            <p className="task-meta">
              Scheduled: <strong>{item.start_datum}</strong>
            </p>
          </div>

          <div className="status-selector">
            <label htmlFor="status-select">Change Status:</label>
            <select
              id="status-select"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="status-select"
            >
              <option value="gepland">Scheduled</option>
              <option value="voltooid">Completed</option>
              <option value="overgeslagen">Skipped</option>
            </select>
          </div>

          <div className="status-info">
            {newStatus === "gepland" && (
              <p className="status-hint pending">This task is scheduled.</p>
            )}
            {newStatus === "voltooid" && (
              <p className="status-hint completed">This task will be marked as completed.</p>
            )}
            {newStatus === "overgeslagen" && (
              <p className="status-hint skipped">This task will be skipped.</p>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn-update"
            onClick={handleStatusChange}
            disabled={isLoading || newStatus === item.status}
          >
            {isLoading ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOnderhoudModal;
