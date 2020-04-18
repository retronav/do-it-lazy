import React, { Component, ReactNode, createRef } from "react";
import "./TodoItem.scss";

interface Props {
  date: string;
  todo: string;
}
interface State {
  render: boolean;
}

class TodoItem extends Component<Props, State> {
  contentwrap: React.RefObject<HTMLHeadingElement>;
  donebtn: React.RefObject<HTMLButtonElement>;
  removebtn: React.RefObject<HTMLButtonElement>;
  constructor(props: Props) {
    super(props);
    this.state = { render: true };
    this.handleDone = this.handleDone.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.contentwrap = createRef();
  }
  handleRemove(): void {
    let toast = this.contentwrap.current.parentNode;
    if (toast instanceof HTMLElement) toast.classList.add("delete");
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
    if (
      content.style.textDecoration === "none" ||
      !content.style.textDecoration
    )
      content.style.textDecoration = "line-through";
    else content.style.textDecoration = "none";
  }
  render(): ReactNode {
    if (!this.state.render) return null;
    else
      return (
        <div id="todo-item-toast">
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
