import React, {useRef, useEffect} from "react";

function ImagePopup({card, onClose}){
  const {link, name} = card
  const className = `popup popup_type_image popup_theme_dark ${card ? 'popup_opened' : ''}`
  const popupRef = useRef('')


/** Закрыть попап по оверлею */
  useEffect(()=>{
    function handleClickOverlay(evt){
      card && evt.target === popupRef.current && onClose()
    }
    document.addEventListener('mousedown', handleClickOverlay);
    return () => {
      document.removeEventListener('mousedown', handleClickOverlay);
    };
  }, [card])

  return(
    <div
      className={className}
      ref={popupRef}>
      <button
        type="button"
        className="button popup__close button_style_close"
        aria-label="Закрыть"
        onClick={onClose}>
      </button>
        <figure className="popup__image-container">
          {
            card &&
            <img
            src={link}
            className="popup__image"
            alt={name}
            />
          }
          <figcaption
            className="popup__image-caption">
            {name}
          </figcaption>
        </figure>
    </div>
  )
}

export default ImagePopup;
