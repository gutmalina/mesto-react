import React from "react";

function PopupWithForm({name, title, isOpen, onClose, children}){
  let className = `popup popup_type_${name} popup_theme_light ${isOpen ? 'popup_opened' : ''}`;

  return(
    <div className={className}>
      <button type="button" className="button popup__close button_style_close" aria-label="Закрыть" onClick={onClose}></button>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default PopupWithForm
