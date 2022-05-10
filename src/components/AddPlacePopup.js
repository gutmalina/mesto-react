import React, {useState, useCallback, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import FormMesto from "./FormMesto";

function AddPlacePopup({isOpen, onClose, onAddPlace}){
  const [isContentButton, setIsContentButton] = useState('Создать')
  //** Значения импутов*/
  const [formValues, setFormValues] = useState({
    name: '',
    link: ''
  })
  const {name, link} = formValues

/** Невалидные значения инпутов: ошибка - true, нет ошибок - false */
  const [errors, setErrors] = useState({
    name: {
      required: true,
      minLength: true,
    },
    link: {
      required: true,
      containUrl: true,
    }
  })

/** правила валидации */
  const validators = {
    name: {
      required: (value)=>{return value === ''},
      minLength: (value)=>{return value.length === 1},
    },
    link: {
      required: (value)=>{return value === ''},
      containUrl: (value)=>{return !value.startsWith('http://') && !value.startsWith('https://') && value !== ''},
    }
  }

/** Получение данных новой карточки */
  const handleFormValues = useCallback((evt)=>{
    const { name, value } = evt.target
    setFormValues(prevState=>({...prevState, [name]: value}))
  }, [setFormValues])

/** Submit, сбор и передача данных новой карточки для отправки на сервер */
  function handleSubmit(evt){
    evt.preventDefault();
    renderLoading(true);
    onAddPlace({
      name,
      link,
      onRenderLoading: ()=>{
        renderLoading(false)
      },
    });
  }

/** Проверка введенных значений согласно правилам валидации. Результаты проверки сводятся в объект, где ключ - инпут, свойство - результат валидации */
  useEffect(
    function validateInputs(){
    if(isOpen){

      const nameValidationResult = Object.keys(validators.name).map(errorKey=>{
        const errorResult = validators.name[errorKey](name);
        return {[errorKey]: errorResult}
      }).reduce((acc, el)=>({...acc, ...el}), {})

      const linkValidationResult = Object.keys(validators.link).map(errorKey=>{
        const errorResult = validators.link[errorKey](link);
        return {[errorKey]: errorResult}
      }).reduce((acc, el)=>({...acc, ...el}), {})

      setErrors({
        name: nameValidationResult,
        link: linkValidationResult
      })
    }
  }, [isOpen, formValues, setErrors])

/** Приведение результатов валидации в одно boolean значение - если хотя бы одно поле true - будет true */
  const isNameInvalid = Object.values(errors.name).some(Boolean)
  const isLinkInvalid = Object.values(errors.link).some(Boolean)

/** переменная для изменения состояния кнопки на disabled */
  const isSubmitDisable = isNameInvalid || isLinkInvalid

/** Изменение текста кнопки при ожидании ответа от сервера */
  function renderLoading(isLoading){
    isLoading ? setIsContentButton('Сохранение...') : setIsContentButton('Создать')
  }

  return(
    <PopupWithForm
      name="mesto"
      title="Новое место"
      contentButton={isContentButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onDisabled={isSubmitDisable}>
      <FormMesto
        name={name}
        link={link}
        onHandleFormValues={handleFormValues}
        onErrors={errors}
        onNameInvalid={isNameInvalid}
        onLinkInvalid={isLinkInvalid}
      />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
