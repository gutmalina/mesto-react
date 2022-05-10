import React, {useRef, useEffect} from "react";

function ImagePopup({card, onClose}){
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
          <img
            src={card.link}
            className="popup__image"
            alt={card.name}/>
          <figcaption
            className="popup__image-caption">
            {card.name}
          </figcaption>
        </figure>
    </div>
  )
}

export default ImagePopup;
