import React, {useCallback, useEffect, useRef, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import FormAvatar from "./FormAvatar";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){
  const imageRef = useRef('');
  const [isContentButton, setIsContentButton] = useState('Сохранить')
  const [formValues, setFormValues] = useState('')

/** Невалидные значения инпутов: ошибка - true, нет ошибок - false */
  const [errors, setErrors] = useState({
    link: {
      required: true,
      containUrl: true,
    }
  })

/** правила валидации */
  const validators = {
    link: {
      required: (value)=>{return value === ''},
      containUrl: (value)=>{return !value.startsWith('http://') && !value.  startsWith('https://') && value !== ''},
    }
  }

/** Проверка введенных значений согласно правилам валидации. Результаты проверки сводятся в объект, где ключ - инпут, свойство - результат валидации */
  useEffect(
  function validateInputs(){
    if(isOpen){
      const linkValidationResult = Object.keys(validators.link).map(errorKey=>{
        const errorResult = validators.link[errorKey](imageRef.current.value);
        return {[errorKey]: errorResult}
      }).reduce((acc, el)=>({...acc, ...el}), {})

      setErrors({
        link: linkValidationResult
      })
    }
  }, [isOpen, formValues, setErrors])

/** Приведение результатов валидации в одно boolean значение - если хотя бы одно поле true - будет true */
  const isLinkInvalid = Object.values(errors.link).some(Boolean)

/** переменная для изменения состояния кнопки на disabled */
  const isSubmitDisable = isLinkInvalid

/** Получение ссылки на новый аватар */
const handleFormValues = useCallback((evt)=>{
  const { name, value } = evt.target
  setFormValues(prevState=>({...prevState, [name]: value}))
}, [setFormValues])

/** Submit, и передача нового аватара для отправки на сервер */
  function handleSubmit(evt){
    evt.preventDefault();
    renderLoading(true);
    onUpdateAvatar({
      avatar: imageRef.current.value,
      onRenderLoading: ()=>{
        renderLoading(false)
      },
    });
  }

/** Изменение текста кнопки при ожидании ответа от сервера */
  function renderLoading(isLoading){
    isLoading ? setIsContentButton('Сохранение...') : setIsContentButton('Сохранить')
  }

  return(
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      contentButton={isContentButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onDisabled={isSubmitDisable}>
      <FormAvatar
        imageRef={imageRef}
        onHandleFormValues={handleFormValues}
        onErrors={errors}
        onLinkInvalid={isLinkInvalid}
      />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
