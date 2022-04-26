import React from "react";

function FormAvatar(){
  return(
    <form name="avatar-form" className="form form_avatar" noValidate>
      <fieldset className="popup__contact">
        <input id="url-avatar" type="url" name="link" required placeholder="Ссылка на аватар" className="popup__input popup__input_foto_link"/>
        <div className="indent__span"><span className="span span_url-avatar"></span></div>
      </fieldset>
      <button type="submit" className="button button-submit button_type_save-avatar button_style_save">Сохранить</button>
    </form>
  )
}

export default FormAvatar
