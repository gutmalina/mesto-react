import React from "react";

function FormProfile(){
  return(
    <form name="profile-form" className="form form_profile" noValidate>
      <fieldset className="popup__contact">
        <input id="name-profile" type="text" name="name" required placeholder="Имя" className="popup__input popup__input_edit_name" minLength="2" maxLength="40" autoFocus/>
        <div className="indent__span"><span className="span span_name-profile"></span></div>
        <input id="job-profile" type="text" name="job" required placeholder="О себе" className="popup__input popup__input_edit_job" minLength="2" maxLength="200"/>
        <div className="indent__span"><span className="span span_job-profile"></span></div>
      </fieldset>
      <button type="submit" className="button button-submit button_type_save-profile button_style_save">Сохранить</button>
    </form>
  )
}

export default FormProfile
