import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "./Style.css";
import FormEditCall from "./FormEditCall";

const Task = () => {
  const Style = {
    overflowY: "scroll",
    maxHeight: "200px",
  };
  function refreshPage() {
    window.location.reload(false);
  }

  const [task, settask] = useState([]);
  const [Title, setTitle] = useState("");
  const [displayForm, setDisplayForm] = useState(true);
  const [displayFormEdit, setDisplayFormEdit] = useState(false);
  const [formValue, setFormValue] = useState("");
  const [LabelStyle, setLabelStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8081/");
        settask(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);


const handleSubmit = (e) => {
  e.preventDefault();
  axios
    .post("http://localhost:8081/", { Title })
    .then((res) => {
      console.log(res);
      refreshPage();
    })
    .catch((error) => {
      console.log(error);
    });
};



  const handleEditTitle = (okay) => {
    setLabelStyle({ border: 'solid 3px #ea95e0' });
    setDisplayFormEdit(true);
    setDisplayForm(false);
    setFormValue(okay);
    // console.log(formValue);\
   
  };

  const handleInputChange = (event) => {
    setFormValue(event.target.value);
    // console.log(formValue);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8081/task/" + id);
      refreshPage();
    } catch (err) {
      console.log(err);
    }
  };

  const handleHover = (title) => {
    setIsHovered(title);
  };
  
  const HoverStyle = {
    'textDecoration': 'initial',
  };
  return (
    <>
      <section className="container">
        <div className="heading">
          <img
            className="heading__img"
            alt="something"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg"
          />
          <h1 className="heading__title">To-Do List</h1>
        </div>
        {/* displaying error wihle posting */}
        {/* {errorMessage && <div className="error-alert">{errorMessage}</div>} */}
        {displayForm && (
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label className="form__label" htmlFor="todo">
                ~ My Task List ~
              </label>
              <input
                className="form__input"
                type="text"
                id="todo"
                name="to-do"
                size="30"
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Type here"
              />
              <button className="button">
                <span>Submit</span>
              </button>
            </div>
          </form>
        )}

        {displayFormEdit && (
          <FormEditCall LabelStyle={LabelStyle} value={formValue} onChange={handleInputChange} />
        )}

        {task.length > 0 ? (
          <div style={Style}>
            {task.map((data, i) => (
              <ul className="toDoList" key={i}>
                <li>
                  <span style={isHovered === data.Title ? { ...HoverStyle, textDecoration: 'line-through wavy #24bffb' } : HoverStyle}>
  {data.Title}</span>
                  <button className="delbut" onMouseEnter={(e)=>{handleHover(data.Title)} } onMouseLeave={() => handleHover(null)}  onClick={(e) => handleDelete(data.ID)}>Delete</button>
                  <button onClick={(e) => handleEditTitle(data.ID)}>
                    Edit
                  </button>
                </li>
              </ul>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </section>
    </>
  );
};
export default Task;
