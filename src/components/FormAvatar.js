import React from "react";

function FormAvatar(){
  return(
    <>
      <input id="url-avatar" type="url" name="link" required placeholder="Ссылка на аватар" className="popup__input popup__input_foto_link"/>
      <div className="indent__span"><span className="span span_url-avatar"></span></div>
    </>
  )
}

export default FormAvatar;
