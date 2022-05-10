import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({isOpen, onClose, onCardDelete}){
  const [isContentButton, setIsContentButton] = useState('Да')

/** Submit удаления карточки на сервере */
  function handleSubmit(evt){
    evt.preventDefault();
    renderLoading(true)
    onCardDelete({
      onRenderLoading: ()=>{
        renderLoading(false)
      },
    })
  }

/** Изменение текста кнопки при ожидании ответа от сервера */
  function renderLoading(isLoading){
    isLoading ? setIsContentButton('Удаление...') : setIsContentButton('Да')
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      contentButton={isContentButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default ConfirmDeletePopup;
