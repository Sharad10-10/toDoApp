import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Alert,
  Button,
  Container,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { FaPlus, FaTrash, FaCircle } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';


export default function App() {
  const initialData = JSON.parse(localStorage.getItem("todos")) || []
  const [toDoList, setToDoList] = useState([...initialData]);
  const [text, setText] = useState("");

  const addToDo = () => {
    const newToD0 = [
      ...toDoList,
      {
        data: text,
        date: new Date().toLocaleString().split(",")[0],
        isCompleted: false,
      },
    ];

    setText("");
    setToDoList(newToD0)

    localStorage.setItem("todos",JSON.stringify(newToD0))

    toast.success("To-do added successfully!");
    

  };

  const toggleToDo = (index) => {
    const newToDo = toDoList.map((toDo, i) => {
      if (i === index)
        return {
          ...toDo,
          isCompleted: !toDo.isCompleted,
        };
      else return toDo;
    });

    setToDoList(newToDo);
    localStorage.setItem("todos", JSON.stringify(newToDo))
  };
  

  const deleteToDo = (index) => {
    const response = window.confirm("Are you sure you want to delete it?")
    if (response) {
        const newToDo = toDoList.filter((toDo, i)=> {
            if (index === i) return false
            else return true
        })
       
    
        setToDoList(newToDo)
        localStorage.setItem("todos", JSON.stringify(newToDo))
        toast.success("To-do deleted successfully!");

    }
  }

  return (
    <>
      <Container className="mt-3 text-center">
        <h1>To Do App</h1>
        <FormControl
          onChange={(e) => {
            setText(e.target.value);
          }}

          onKeyPress={(e)=> {
            e.key === "Enter" ? addToDo() : null
          }}

          type="text"
          value={text}
        />

        <Button onClick={addToDo} className="mt-3">
          {" "}
          <FaPlus className="mb-1" /> Add
        </Button>

        {toDoList.length > 0 ? (
          toDoList.map((toDoData, index) => {
            return (
              <Row>
                <Col xs={10}>
                  <Alert
                    variant={toDoData.isCompleted ? "danger" : "primary"}
                    style={{
                      textDecoration: toDoData.isCompleted
                        ? "line-through"
                        : "none",
                    }}
                    onClick={() => toggleToDo(index)}
                    role="button"
                    className="mt-4 text-start"
                  >
                    {/* <span style={{height: "20px", width: "20px", backgroundColor: "red", borderRadius: "50%"}}> </span> */}
                    
                    
                    <h4> <FaCircle style={{height: "24px", width: "24px", paddingRight: "8px"}}/> {toDoData.data}</h4>{" "}
                    <p className="ms-4">{toDoData.date}</p>
                  </Alert>
                </Col>

                <Col>
                    <FaTrash  size={40} color="red" style={{marginTop : "60px", cursor: 'pointer'}} onClick={()=> deleteToDo(index)}></FaTrash>

                </Col>
              </Row>
            );
          })
        ) : (
          <p className="mt-3 fs-2">
            <b>Tap the add button to create something</b>
          </p>
        )}
      </Container>
      <ToastContainer position="top-left"/>

    </>
  );
}
