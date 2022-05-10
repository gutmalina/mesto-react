import React, {useEffect, useState} from 'react';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [selectedCard, setSelectedCard] = useState(null)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false)
  const [isAnyPopupOpened, setIsAnyPopupOpened] = useState(false)
  const [cards, setCards] = useState([])
  const [cardDelete, setCardDelete] = useState({})

/** Загрузка страницы, получение данных профиля и массив карточек */
  useEffect(()=>{
    Promise.all([api.getProfile(), api.getCards()])
      .then(([res, cards]) => {
        setCurrentUser(res)
        setCards(cards)
      })
      .catch(console.log)
  }, [])

/** Отправка новых данных профиля на сервер и обновление на странице */
  function handleUpdateUser(updateUser){
    api.editProfile(updateUser.name, updateUser.about)
      .then(res => {
        setCurrentUser(res)
        setIsEditProfilePopupOpen(false)
      })
      .catch(console.log)
      .finally(()=>{
        updateUser.onRenderLoading(false)
      })
  }

/** Отправка аватара на сервер и обновление на странице */
  function handleUpdateAvatar(updateAvatar){
    api.editAvatar(updateAvatar.avatar)
      .then(res => {
        setCurrentUser(res)
        setIsEditAvatarPopupOpen(false)
      })
      .catch(console.log)
      .finally(()=>{
        updateAvatar.onRenderLoading(false)
      })
  }

/** Отправка новой карточки на сервер и обновление на странице */
  function handleAddPlace(newCard){
    api.addCard(newCard.name, newCard.link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false)
      })
      .catch(console.log)
      .finally(()=>{
        newCard.onRenderLoading(false)
      })
  }

/** Поставить лайк или дизлайк карточке */
  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    if(!isLiked){
      api.addLike(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(console.log)
      }else{
        api.deleteLike(card._id)
          .then((newCard) => {
            setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
          })
          .catch(console.log)
      }
  }

/** Удалить карточку */
  function handleCardDelete(obj){
    api.deleteCard(cardDelete._id)
      .then(res => {
      })
      .catch(console.log)
      .finally(()=>{
        obj.onRenderLoading(false)
      })
    setCards((cards) => cards.filter((c) => c._id !== cardDelete._id))
    setIsConfirmDeletePopupOpen(false)
  }

/** Открыть попапы */
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
    setIsAnyPopupOpened(true)
  }

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true)
    setIsAnyPopupOpened(true)
  }

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true)
    setIsAnyPopupOpened(true)
  }

  function handleConfirmDeleteClick(card){
    setIsConfirmDeletePopupOpen(true)
    setCardDelete(card)
    setIsAnyPopupOpened(true)
 }

  function handleCardClick(card){
    setSelectedCard(card)
  }

/** Закрыть попап */
  function closeAllPopups(){
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmDeletePopupOpen(false)
    setSelectedCard(null)
    setIsAnyPopupOpened(false)
  }

/** Установка обработчика события ESC, закрыть попап */
  useEffect(() => {
    function handleEscClose (evt){
      evt.key === 'Escape' && isAnyPopupOpened && closeAllPopups()
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isAnyPopupOpened]);

/* Установить текущий год дя footer */
  function getYear(){
    return new Date().getFullYear();
  }

  return (
    <div className="App body">
      <div className="page indent__page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header/>
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardDelete={handleConfirmDeleteClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
          />
          <Footer date={getYear()}/>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
          />
          {
            selectedCard &&
              <ImagePopup
                onClose={closeAllPopups}
                card={selectedCard}
              />
          }
        </CurrentUserContext.Provider>

      </div>
    </div>
  );
}

export default App;
