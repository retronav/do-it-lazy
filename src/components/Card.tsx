import React from "react";
import "./Card.scss";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import store from "store";
import { render } from "react-dom";
interface Props {}
interface State {
  date: string;
}
export interface LSTodo {
  date: string;
  content: string;
  done: boolean;
}
class Card extends React.Component<Props, State> {
  footerref: React.RefObject<HTMLElement>;
  constructor(props: Props) {
    super(props);
    let weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.footerref = React.createRef();
    this.state = {
      date: `${
        weekdays[new Date().getDay()]
      }, ${new Date().toLocaleDateString()}`,
    };
  }
  componentDidMount() {
    if (!store.get("todos") || store.get("todos") === "[]") {
      store.set("todos", []);
    } else {
      let todos = JSON.parse(JSON.stringify(store.get("todos")));
      todos.forEach((todo: LSTodo) => {
        let todoDiv = document.createElement("div");
        todoDiv.className = "toast-wrapper";
        render(
          <TodoItem
            date={todo.date}
            todo={todo.content}
            done={todo.done}
            alreadyPushed={true}
          />,
          todoDiv
        );
        this.footerref.current.appendChild(todoDiv);
      });
    }
  }
  render(): React.ReactNode {
    return (
      <div id="card">
        <header id="cool-header">
          <pre id="date">{this.state.date}</pre>
          <AddTodo appendContainer={this} />
        </header>
        <footer ref={this.footerref}></footer>
      </div>
    );
  }
}
export default Card;
