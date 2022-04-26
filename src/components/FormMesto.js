import React from "react";

function FormMesto(){
  return(
    <form name="mesto-form" className="form form_mesto" noValidate>
      <fieldset className="popup__contact">
        <input id="name-mesto" type="text" name="name" required placeholder="Название" className="popup__input popup__input_foto_name" minLength="2" maxLength="30"/>
        <div className="indent__span">
          <span className="span span_name-mesto"></span>
        </div>
        <input id="url-mesto" type="url" name="link" required placeholder="Ссылка на картинку" className="popup__input popup__input_foto_link"/>
        <div className="indent__span"><span className="span span_url-mesto"></span></div>
      </fieldset>
      <button type="submit" className="button button-submit button_type_save-mesto button_style_save">Создать</button>
    </form>
  )
}

export default FormMesto
