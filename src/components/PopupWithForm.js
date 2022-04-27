import React from "react";

function PopupWithForm({name, title, contentButton, isOpen, onClose, children}){
  const className = `popup popup_type_${name} popup_theme_light ${isOpen ? 'popup_opened' : ''}`

  return(
    <div className={className}>
      <button type="button" className="button popup__close button_style_close" aria-label="Закрыть" onClick={onClose}></button>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={`${name}-form`} className ={`form form_${name }`} noValidate>
          <fieldset className="popup__contact">
            {children}
          </fieldset>
          <button type="submit" className={`button button-submit button_type_save-${name} button_style_save`}>{contentButton}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
