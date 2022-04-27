import React from "react";

function ImagePopup({card, onClose}){
  const className = `popup popup_type_image popup_theme_dark ${card ? 'popup_opened' : ''}`

  return(
    <div className={className}>
      <button type="button" className="button popup__close button_style_close" aria-label="Закрыть" onClick={onClose}></button>
        <figure className="popup__image-container">
          <img src={card.link} className="popup__image" alt={card.name} />
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
    </div>
  )
}

export default ImagePopup;
