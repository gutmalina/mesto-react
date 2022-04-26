import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import FormProfile from "./FormProfile";
import FormMesto from './FormMesto';
import FormAvatar from './FormAvatar';
import FormDelete from './FormDelete';

function App() {
  let [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  let [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  let [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  let [selectedCard, setSelectedCard] = useState([])

//Открыть попап
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
//Закрыть попап
  function closeAllPopups(){
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard([])
  }

  return (
    <div className="App body">
      <div className="page indent__page">
        <Header/>
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}onCardClick={handleCardClick}/>
        <Footer/>
        <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <FormProfile/>
        </PopupWithForm>
        <PopupWithForm name="mesto" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <FormMesto/>
        </PopupWithForm>
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <FormAvatar/>
        </PopupWithForm>
        <PopupWithForm name="delete" title="Вы уверены?">
          <FormDelete/>
        </PopupWithForm>
        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
      </div>
    </div>
  );
}



export default App;
