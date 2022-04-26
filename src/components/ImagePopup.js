import React from "react";

function ImagePopup({card, onClose}){
  let className = `popup popup_type_image popup_theme_dark ${card.length > 0 ? 'popup_opened' : ''}`;
  const name = card[0];
  const link = card[1];

  return(
    <div className={className}>
      <button type="button" className="button popup__close button_style_close" aria-label="Закрыть" onClick={onClose}></button>
        <figure className="popup__image-container">
          <img src={link} className="popup__image" alt={name} />
          <figcaption className="popup__image-caption">{name}</figcaption>
        </figure>
    </div>
  )
}

export default ImagePopup
