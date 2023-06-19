import React, { useState } from 'react';
import './Style.css';
import axios from 'axios';

const FormEditCall = ({LabelStyle,value, onChange }) => {
  const [Title, setTitle] = useState('');


  function refreshPage() {
    window.location.reload(false);
  }

 
  const handleEdit = (e) => {
    e.preventDefault();
// console.log(value)
    axios
      .put('http://localhost:8081/update/' + value, { Title })
      .then((res) => {
        console.log(res);refreshPage();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <form className="formedit" onSubmit={handleEdit}>
        <div>
          <label className="form__label" htmlFor="todo">
            ~ Edit Below ~
          </label>
          
          <input
              style={LabelStyle}
          className="form__input"
            type="text"
            id="todo"
            name="to-do"
            size="30"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button className="button">
            <span>Finish</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default FormEditCall;
