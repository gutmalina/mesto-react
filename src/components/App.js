import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import FormProfile from "./FormProfile";
import FormMesto from './FormMesto';
import FormAvatar from './FormAvatar';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState()

/** Открыть попап */
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card){
    setSelectedCard(card)
  }

/** Закрыть попап */
  function closeAllPopups(){
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard()
  }

/* Установить текущий год дя footer */
  function getYear(){
    return new Date().getFullYear();
  }

  return (
    <div className="App body">
      <div className="page indent__page">
        <Header/>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer date={getYear()}/>
        <PopupWithForm name="profile" title="Редактировать профиль" contentButton="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
          <FormProfile/>
        </PopupWithForm>
        <PopupWithForm name="mesto" title="Новое место" contentButton="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <FormMesto/>
        </PopupWithForm>
        <PopupWithForm name="avatar" title="Обновить аватар" contentButton="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <FormAvatar/>
        </PopupWithForm>
        <PopupWithForm name="delete" title="Вы уверены?" contentButton="Да"/>
        {
          (selectedCard) &&
            <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
        }
      </div>
    </div>
  );
}

export default App;
