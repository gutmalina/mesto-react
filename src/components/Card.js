import React from "react";

function Card({name, link, onCardClick} ){

//Передать данные карточки в попап с увеличенной картинкой
  function handleClick() {
    onCardClick([name, link]);
  }

  return(
    <article className="card">
      <img className="card__img" src={link} alt={name} onClick={handleClick}/>
      <div className="card__caption">
        <h2 className="card__text">{name}</h2>
        <button type="button" className="button button_type_like-card" aria-label="Поставить лайк"></button>
        <p className="card__like-counter"></p>
      </div>
      <button type="button" className="button button_type_delete-card" aria-label="Удалить фотографию"></button>
    </article>
  )
}

export default Card
