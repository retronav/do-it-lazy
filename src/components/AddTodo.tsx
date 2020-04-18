import React, { Component, ReactNode } from "react";
import swal from "sweetalert2";
import "./AddTodo.scss";
import TodoItem from "./TodoItem";
import { render } from "react-dom";
import Card from "./Card";
interface Props {
  appendContainer: Card;
}
interface State {}

class AddTodo extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }
  handleClick(): void {
    swal
      .fire({
        title: "Add Todo",
        text: "Enter Todo text",
        input: "text",
        confirmButtonText: "Add",
        confirmButtonColor: "green",
        cancelButtonColor: "red",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      })
      .then((res) => {
        if (res.value) {
          let todo = document.createElement("div");
          todo.className = "toast-wrapper";
          render(
            <TodoItem date={new Date().toDateString()} todo={res.value} />,
            todo
          );
          this.props.appendContainer.footerref.current.appendChild(todo);
        } else if (!res.value && !res.dismiss) this.handleClick();
      });
  }
  render(): ReactNode {
    return (
      <button
        onClick={() => {
          this.handleClick();
        }}
        id="add-todo"
      >
        +
      </button>
    );
  }
}

export default AddTodo;
