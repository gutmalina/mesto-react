import React, {useRef, useEffect} from "react";

function PopupWithForm({name, title, contentButton, isOpen, onClose, children, onSubmit, onDisabled}){
  const className = `popup popup_type_${name} popup_theme_light ${isOpen ? 'popup_opened' : ''}`
  const classNameButtonSubmit = `button button-submit button_type_save-${name} button_style_save ${onDisabled ? 'button_style_save-invalid' : '' }`
  const popupRef = useRef('')

/** Закрыть попап по оверлею */
  useEffect(()=>{
    function handleClickOverlay(evt){
      isOpen && evt.target === popupRef.current && onClose()
    }
    document.addEventListener('mousedown', handleClickOverlay);
    return () => {
      document.removeEventListener('mousedown', handleClickOverlay);
    };
  }, [isOpen])

  return(
    <div
      className={className}
      ref={popupRef}>
      <button type="button"
        className="button popup__close button_style_close"
        aria-label="Закрыть"
        onClick={onClose}>
      </button>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={`${name}-form`}
          className ={`form form_${name }`}
          onSubmit={onSubmit}
          noValidate>
          <fieldset className="popup__contact">
            {children}
          </fieldset>
          <button type="submit"
            className={classNameButtonSubmit}
            disabled={onDisabled}>
              {contentButton}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
