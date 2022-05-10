import React from "react";

function FormMesto({name, link, onHandleFormValues, onErrors, onNameInvalid, onLinkInvalid}){
  const classNameInputName = `popup__input popup__input_foto_name ${onNameInvalid ? 'popup__input_type_error' : ''}`
  const classNameInputLink = `popup__input popup__input_foto_link ${onLinkInvalid ? 'popup__input_type_error' : ''}`
  const classNameSpanName = `span ${onNameInvalid ? 'span_active' : ''}`
  const classNameSpanLink = `span ${onLinkInvalid ? 'span_active' : ''}`
  const isTextSpanRequired = 'Вы пропустили это поле.'
  const isTextSpanMinLength = 'Минимальное количество символов: 2. Длина текста сейчас: 1 символ.'
  const isTextSpanContainUrl = 'Введите адрес сайта.'
  return(
    <>
      <input id="name-mesto"
        type="text"
        name="name"
        value={name || ''}
        onChange={onHandleFormValues}
        placeholder="Название"
        className={classNameInputName}
        minLength="2"
        maxLength="30"
        autoFocus
        required
      />
      <div className="indent__span">
        {onErrors.name.required && <span className={classNameSpanName}>{isTextSpanRequired}</span>}
        {onErrors.name.minLength && <span className={classNameSpanName}>{isTextSpanMinLength}</span>}
      </div>
      <input id="url-mesto"
        type="url"
        name="link"
        value={link || ''}
        onChange={onHandleFormValues}
        placeholder="Ссылка на картинку"
        className={classNameInputLink}
        required
      />
      <div className="indent__span">
        {onErrors.link.required && <span className={classNameSpanLink}>{isTextSpanRequired}</span>}
        {onErrors.link.containUrl && <span className={classNameSpanLink}>{isTextSpanContainUrl}</span>}
      </div>
    </>
  )
}

export default FormMesto;
