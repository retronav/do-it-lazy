import React from "react";
import "./Card.scss";
import AddTodo from "./AddTodo";
interface Props {}
interface State {
  date: string;
  time: string;
}

class Card extends React.Component<Props, State> {
  footerref: React.RefObject<HTMLElement>;
  constructor(props: Props) {
    super(props);
    this.footerref = React.createRef();
    this.state = {
      time: `${this.DateObject.getHours()}:${this.DateObject.getMinutes()}`,
      date: `${this.DateObject.toDateString()}`,
    };
  }
  DateObject = new Date();

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
