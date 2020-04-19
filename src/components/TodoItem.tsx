import React, { Component, ReactNode, createRef } from "react";
import "./TodoItem.scss";
import { LSTodo } from "./Card";
import store from "store";
interface Props {
  date: string;
  todo: string;
  done?: boolean;
  alreadyPushed?: boolean;
}
interface State {
  render: boolean;
}
class TodoItem extends Component<Props, State> {
  wrapper: React.RefObject<HTMLDivElement>;
  contentwrap: React.RefObject<HTMLHeadingElement>;
  donebtn: React.RefObject<HTMLButtonElement>;
  removebtn: React.RefObject<HTMLButtonElement>;
  constructor(props: Props) {
    super(props);
    this.state = { render: true };
    this.handleDone = this.handleDone.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.contentwrap = createRef();
    this.wrapper = createRef();
    document.addEventListener("DOMContentLoaded", () => {
      if (this.props.done) {
        this.handleDone();
      }
    });
  }
  handleRemove(): void {
    let toast = this.contentwrap.current.parentNode;
    if (toast instanceof HTMLElement) toast.classList.add("delete");
    let todos = store.get("todos");
    let deleteTodos = (todos: string) => {
      const updated: Array<LSTodo> = JSON.parse(JSON.stringify(todos));
      updated.forEach((todo: LSTodo, index: number) => {
        if (todo.date === this.props.date && todo.content === this.props.todo) {
          updated.splice(index, 1);
        }
      });
      return updated;
    };
    store.set("todos", deleteTodos(todos));
    setTimeout(() => {
      //perform cleanup of the parent element which will otherwise remain stale
      if (toast.parentElement.className === "toast-wrapper") {
        toast.parentElement.parentElement.removeChild(toast.parentElement);
      }
      this.setState({ render: false });
    }, 1000);
  }
  handleDone(): void {
    let content = this.contentwrap.current;
    let toast = this.wrapper.current;
    let todos = store.get("todos");
    content.classList.toggle("strike");
    toast.classList.toggle("strike");
    let updateTodos = (todos: string) => {
      const updated: Array<LSTodo> = JSON.parse(JSON.stringify(todos));
      updated.forEach((todo: LSTodo, index: number) => {
        if (
          todo.date === this.props.date &&
          todo.content === this.props.todo &&
          (todo.done === false || !todo.done)
        ) {
          updated[index].done = true;
        } else if (
          todo.date === this.props.date &&
          todo.content === this.props.todo &&
          todo.done === true
        ) {
          updated[index].done = false;
        }
      });
      return updated;
    };
    store.set("todos", updateTodos(todos));
  }
  componentDidMount() {
    this.wrapper.current.classList.add("greet");
    setTimeout(() => {
      this.wrapper.current.classList.remove("greet");
    }, 1200);
    let todos = store.get("todos");
    let toBePushed = {
      date: this.props.date,
      content: this.props.todo,
      done: this.props.done,
    };
    let newTodos = (todos: string) => {
      const neww = JSON.parse(JSON.stringify(todos));
      neww.push(toBePushed);
      return neww;
    };
    if (!this.props.alreadyPushed) {
      store.set("todos", newTodos(todos));
    }
  }
  render(): ReactNode {
    if (!this.state.render) return null;
    else
      return (
        <div ref={this.wrapper} id="todo-item-toast">
          <h2 ref={this.contentwrap} className="content">
            {this.props.todo}
          </h2>
          <small className="date">{this.props.date}</small>
          <button
            ref={this.donebtn}
            className="done"
            onClick={() => {
              this.handleDone();
            }}
          >
            &#10003;
          </button>
          <button
            ref={this.removebtn}
            className="remove"
            onClick={() => {
              this.handleRemove();
            }}
          >
            &#10005;
          </button>
        </div>
      );
  }
}

export default TodoItem;
