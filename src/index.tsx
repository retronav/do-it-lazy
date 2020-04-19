import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DefaultToast, UpdateToast } from "./components/swal-mixins";
import * as serviceWorker from "./serviceWorker";
import { SweetAlertResult } from "sweetalert2";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onSuccess: () => {
    DefaultToast.fire("You can now use this app when offline.");
  },
  onUpdate: (reg) => {
    UpdateToast.fire("A newer version is available. Update??").then(
      (res: SweetAlertResult) => {
        if (!res.dismiss) {
          reg
            .update()
            .then((_) => {
              window.location.reload();
            })
            .catch((res) => {
              console.error(`Couldn't update! ${res}`);
            });
        }
      }
    );
  },
});
