import React from "react";

function FormProfile(){
  return(
    <>
      <input id="name-profile" type="text" name="name" required placeholder="Имя" className="popup__input popup__input_edit_name" minLength="2" maxLength="40" autoFocus/>
      <div className="indent__span"><span className="span span_name-profile"></span></div>
      <input id="job-profile" type="text" name="job" required placeholder="О себе" className="popup__input popup__input_edit_job" minLength="2" maxLength="200"/>
      <div className="indent__span"><span className="span span_job-profile"></span></div>
    </>
  )
}

export default FormProfile;
