import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Card from "./Card";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}){
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

/** Загрузка страницы, получение данных профиля и массив карточек */
  useEffect(()=>{
    Promise.all([api.getProfile(), api.getCards()])
      .then(([res, cards]) => {
        setUserName(res.name)
        setUserDescription(res.about)
        setUserAvatar(res.avatar)
        setCards(cards)
      })
      .catch(err => {
        console.log(err)
      });
  }, [])

  return(
    <main className="content indent__content">
      <section className="profile indent__profile">
        <button
          type="button"
          className="button button_avatar button_type_avatar-profile"
          onClick={onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="Фотография профиля"/>
        </button>
        <div className="profile__info">
          <h1 className="profile__info-title">{userName}</h1>
          <p className="profile__info-subtitle">{userDescription}</p>
          <button
            type="button"
            className="button button_type_edit-profile"
            aria-label="Редактировать"
            onClick={onEditProfile}>
          </button>
        </div>
        <button
          type="submit"
          className="button button-submit button_type_add-profile"
          aria-label="Добавить"
          onClick={onAddPlace}>
        </button>
      </section>
      <section className="group-cards indent__group-cards">
      {
        cards.map((card) => (
          <Card {...card} key={card._id} onCardClick={onCardClick}/>
        ))
      }
      </section>
    </main>
  )
}

export default Main;
