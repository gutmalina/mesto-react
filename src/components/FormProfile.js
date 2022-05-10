import React from 'react';

function FormProfile({ name, description, onHandleFormValues, onErrors, onNameInvalid, onDescriptionInvalid}){
  const classNameInputName = `popup__input popup__input_edit_name ${onNameInvalid ? 'popup__input_type_error' : ''}`
  const classNameInputDescription = `popup__input popup__input_edit_job ${onDescriptionInvalid ? 'popup__input_type_error' : ''}`
  const classNameSpanName = `span ${onNameInvalid ? 'span_active' : ''}`
  const classNameSpanDescription = `span ${onDescriptionInvalid ? 'span_active' : ''}`
  const isTextSpanRequired = 'Вы пропустили это поле.'
  const isTextSpanMinLength = 'Минимальное количество символов: 2. Длина текста сейчас: 1 символ.'

  return(
    <>
      <input id="name-profile"
        value={name || ''}
        onChange={onHandleFormValues}
        type="text"
        name="name"
        placeholder="Имя"
        className={classNameInputName}
        minLength="2"
        maxLength="40"
        autoFocus
        required
      />
      <div className="indent__span">
        {onErrors.name.required && <span className={classNameSpanName}>{isTextSpanRequired}</span>}
        {onErrors.name.minLength && <span className={classNameSpanName}>{isTextSpanMinLength}</span>}
      </div>
      <input id="description-profile"
        value={description || ''}
        onChange={onHandleFormValues}
        type="text"
        name="description"
        placeholder="О себе"
        className={classNameInputDescription}
        minLength="2"
        maxLength="200"
        required
      />
      <div className="indent__span">
        {onErrors.description.required && <span className={classNameSpanDescription}>{isTextSpanRequired}</span>}
        {onErrors.description.minLength && <span className={classNameSpanDescription}>{isTextSpanMinLength}</span>}
      </div>
    </>
  )
}

export default FormProfile;
