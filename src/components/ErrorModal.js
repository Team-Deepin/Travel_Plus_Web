import "../styles/Modal.css";

export default function ErrorModal({ onClose, title, content }) {

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
          <h2 className="modal-title">{title}</h2>
          <p className="modal-text">{content}</p>
          <button onClick={onClose} className="modal-button">닫기</button>

      </div>
    </div>
  );
}