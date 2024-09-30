import React from 'react'

const InfoModal = ({ children, open, close, title}) => (
    <div
      className={`modal ${open ? 'modal-show' : 'modal'}`}
      tabIndex="-1"
      role="dialog"
      onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{title}</h4>
            <button type="button" className="btn-close" aria-label="Close"
              onClick={close}
            />
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
  
  export default InfoModal;