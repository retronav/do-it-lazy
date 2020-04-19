import React from "react";
import Card, { LSTodo } from "./components/Card";
import "./App.scss";
import store from "store";
function App() {
  return <Card />;
}
function requestNotificationPermission() {
  // Some browsers don't support Notification yet. I'm looking at you iOS Safari
  if ("Notification" in window) {
    if (
      Notification.permission !== "denied" &&
      Notification.permission !== "granted"
    ) {
      Notification.requestPermission();
    }
  }
}
function dateDiffInDays(a: Date, b: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
const DailyNotifs = () => {
  requestNotificationPermission();
  if ("Notification" in window && Notification.permission === "granted") {
    let firstTodo: LSTodo = JSON.parse(JSON.stringify(store.get("todos")))[0];
    let todoDate = new Date(firstTodo.date);
    let todayDate = new Date();
    const diffDays = dateDiffInDays(todoDate, todayDate);
    if (diffDays > 0) {
      new Notification(`I think you want to ${firstTodo.content}.`);
    }
  }
};
DailyNotifs()
export default App;
