import { React, useState, useEffect } from "react";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  let [todo, setTodo] = useState("");
  let [list, setList] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("todos")) {
      localStorage.setItem("todos", []);
    }
    let clone = JSON.parse(localStorage.getItem("todos"));
    setList(clone);
    console.log("bbb");
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px" }}>TO DO LIST</h1>
      <InputGroup className="mb-3" size="lg">
        <Form.Control
          placeholder="What to do"
          aria-describedby="basic-addon2"
          id="inputBox"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <Button
          variant="outline-primary"
          onClick={(e) => {
            // 로직 1 : 버튼누른 항목 스테이트에 저장.
            e.preventDefault();
            let clone = [...list];
            clone.push(todo);
            setList(clone);
            localStorage.setItem("todos", JSON.stringify(clone));
            // 로직 2 : 버튼 누르면 인풋박스 빈칸으로 만들기
            let inputBox = document.getElementById("inputBox");
            inputBox.value = "";
          }}
        >
          Submit
        </Button>
      </InputGroup>

      <ListGroup as="ul">
        {list.map((element, i) => {
          return (
            <ListGroup.Item as="li" variant="light" horizontal="sm">
              - {element}
              <Button
                style={{ marginLeft: "10px" }}
                variant="outline-danger"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  let clone = [...list];
                  clone.splice(i, 1);
                  setList(clone);
                  localStorage.setItem("todos", JSON.stringify(clone));
                }}
              >
                x
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

//해야할 것. 로컬스토리지에서 목록 가져오게 수정 & 새로고침해도 로컬스토리지 유지

export default App;
