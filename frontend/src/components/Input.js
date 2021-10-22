import React from 'react';

const Input = (props) => {
  let isInputStretch = 'form-control';

  if (props.type === 'file') {
    isInputStretch += '-file';
  }
  if (props.hasError !== undefined) {
    isInputStretch += props.hasError ? ' is-invalid' : ' is-valid';
  }

  return (
    <div>
      {props.label && <label>{props.label}</label>}
      <input
        name={props.name}
        className={isInputStretch}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.hasError && (
        <span className="invalid-feedback">{props.error}</span>
      )}
    </div>
  );
};

Input.defaultProps = {
  onChange: () => {}
};

export default Input;
