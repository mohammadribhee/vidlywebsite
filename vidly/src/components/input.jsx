import React from 'react';
const Input = ({name,label,value,onChange,error,placholder}) => {
    return (  
        <div className="mb-3">
        <label htmlFor={name} className="form-label">{label}</label>
        <input 
        placeholder={placholder}
        name={name}
         value={value}
         onChange={onChange}
        type={name}
        className="form-control"
         id={name}
         aria-describedby="emailHelp" 
         />
         {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
}
 
export default Input;