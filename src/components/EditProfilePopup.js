import React, {useState, useEffect, useCallback} from 'react';
import PopupWithForm from "./PopupWithForm";
import FormProfile from "./FormProfile";
import { CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}){
  const currentUser = React.useContext(CurrentUserContext)
  const [isContentButton, setIsContentButton] = useState('Сохранить')
/** Значения импутов*/
  const [formValues, setFormValues] = useState({
    name: '',
    description: ''
  })
  const {name, description} = formValues

/** Невалидные значения инпутов: ошибка - true, нет ошибок - false */
  const [errors, setErrors] = useState({
    name: {
      required: true,
      minLength: true,
    },
    description: {
      required: true,
      minLength: true,
    }
  })

/** правила валидации */
const validators = {
  name: {
    required: (value)=>{return value === ''},
    minLength: (value)=>{return value.length === 1},
  },
  description: {
    required: (value)=>{return value === ''},
    minLength: (value)=>{return value.  length === 1},
  }
}

/** Получение данных профиля*/
const handleFormValues = useCallback((evt)=>{
  const { name, value } = evt.target
  setFormValues(prevState=>({...prevState, [name]: value}))
}, [setFormValues])

/** Подстановка данных пользователя из контекста в поля формы */
  useEffect(() => {
    setFormValues({
      name: currentUser.name,
      description: currentUser.about})
  }, [isOpen, currentUser]);

/** Проверка введенных значений согласно правилам валидации. Результаты проверки сводятся в объект */
  useEffect(
      function validateInputs(){
    if(isOpen){

      const nameValidationResult = Object.keys(validators.name).map(errorKey=>{
        const errorResult = validators.name[errorKey](name);
        return {[errorKey]: errorResult}
      }).reduce((acc, el)=>({...acc, ...el}), {})

      const descriptionValidationResult = Object.keys(validators.description).map(errorKey=>{
        const errorResult = validators.description[errorKey](description);
        return {[errorKey]: errorResult}
      }).reduce((acc, el)=>({...acc, ...el}), {})

      setErrors({
        name: nameValidationResult,
        description: descriptionValidationResult
      })
    }
    }, [isOpen, formValues, setErrors])

/** Приведение результатов валидации в одно boolean значение - если хотя бы одно поле true - будет true */
  const isNameInvalid = Object.values(errors.name).some(Boolean)
  const isDescriptionInvalid = Object.values(errors.description).some(Boolean)

/** переменная для изменения состояния кнопки на disabled */
  const isSubmitDisable = isNameInvalid || isDescriptionInvalid

/** Submit, сбор и передача данных профиля для отправки на сервер */
  function handleSubmit(evt){
    evt.preventDefault();
    renderLoading(true);
    onUpdateUser({
      name,
      about: description,
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
      name="profile"
      title="Редактировать профиль"
      contentButton={isContentButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onDisabled={isSubmitDisable}>
      <FormProfile
        name={name || ''}
        description={description || ''}
        onHandleFormValues={handleFormValues}
        onErrors={errors}
        onNameInvalid={isNameInvalid}
        onDescriptionInvalid={isDescriptionInvalid}
      />
    </PopupWithForm>
  )
}

export default EditProfilePopup;
