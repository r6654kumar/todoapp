import React, { useState, useEffect } from 'react';
import "./style.css";
import axios from 'axios';
const ToDo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const handleInputChange = (event) => {
    setInputData(event.target.value);
  }
  useEffect(() => {
    axios.get('http://localhost:4444/todoitems').then(
      response => {
        setItems(response.data.data);
        console.log(response.data.data);
      }
    ).catch(error => {
      console.log(`Error:${error}`);
    })
  }, [])
  const addItem = () => {
    if (!inputdata) {
      alert("Please fill the data");
    }
    else if (inputdata && toggleButton) {
      const edited_content = {
        todoitem: inputdata,
      }
      axios.put(`http://localhost:4444/todoitems/${isEditItem}`, edited_content)
        .then(() => {
          setItems(prevItems => prevItems.map(curEle => (curEle.todoitem === isEditItem ? { ...curEle, ...edited_content } : curEle)));
          setInputData("");
          setIsEditItem(null);
          setToggleButton(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
    else {
      const myNewInputData = {
        todoitem: inputdata,
      }
      axios.post('http://localhost:4444/todoitems', myNewInputData).then(() => {
        setItems([...items, myNewInputData])
        setInputData("")
      }).catch(error => {
        console.log(`Error:${error}`);
      })

    }
  }
  //edit items
  const editItem = (todoitem) => {
    const item_todo_edited = items.find((curEle) => {
      return curEle.todoitem === todoitem;
    });
    setInputData(item_todo_edited.todoitem)
    setIsEditItem(todoitem);
    setToggleButton(true);
  }
  //delete items
  const deleteItem = (todoitem) => {
    axios.delete(`http://localhost:4444/todoitems/${todoitem}`).then(() => {
      setItems(prevItems => prevItems.filter(item => item.todoitem !== todoitem));
    }).catch(error => {
      console.log(`Error:${error}`);
    })
  }
  const removeAll = () => {
    axios.delete('http://localhost:4444/todoitems').then(() => {
      setItems([]);
    }).catch(error => {
      console.log(`Error:${error}`);
    })
  }
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/image1.jpg" alt="ToDoLogo" />
            <figcaption>ToDo List ✌️</figcaption>
          </figure>
          <div className="addItems">
            <input type="text"
              placeholder="✍️Add Items"
              className="form-control"
              value={inputdata}
              onChange={handleInputChange}
            />
            {toggleButton ?
              (<i className="fa fa-edit add-btn" onClick={addItem}></i>)
              :
              (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
            }
          </div>
          <div className="showItems">
            {items.map((curEle) => {
              return (
                <div className="eachItem" key={curEle.id}>
                  <h3>
                    {curEle.todoitem}
                  </h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={() => {
                      editItem(curEle.todoitem)
                    }}></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => {
                      deleteItem(curEle.todoitem)
                    }}></i>
                  </div>

                </div>
              )
            })}
          </div>
          <div className="showItems">
            <button className="btn" onClick={removeAll}>
              <span>Remove All</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ToDo