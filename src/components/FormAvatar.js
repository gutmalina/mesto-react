import React from "react";

function FormAvatar({imageRef, link, onHandleFormValues, onErrors, onLinkInvalid}){
  const classNameInputLink = `popup__input popup__input_foto_link ${onLinkInvalid ? 'popup__input_type_error' : ''}`
  const classNameSpanLink = `span ${onLinkInvalid ? 'span_active' : ''}`
  const isTextSpanRequired = 'Вы пропустили это поле.'
  const isTextSpanContainUrl = 'Введите адрес сайта.'

  return(
    <>
      <input id="url-avatar"
        type="url"
        name="link"
        placeholder="Ссылка на аватар"
        className={classNameInputLink}
        ref={imageRef}
        value={link || ''}
        onChange={onHandleFormValues}
        autoFocus
        required
      />
      <div className="indent__span">
        {onErrors.link.required && <span className={classNameSpanLink}>{isTextSpanRequired}</span>}
        {onErrors.link.containUrl && <span className={classNameSpanLink}>{isTextSpanContainUrl}</span>}
      </div>
    </>
  )
}

export default FormAvatar;
