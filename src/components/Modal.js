import "../styles/Modal.css";

export default function Modal({ onClose, content }) {

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
          <p className="modal-text">{content}</p>
          <button onClick={onClose} className="modal-button">닫기</button>

      </div>
    </div>
  );
}