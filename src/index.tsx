import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { DefaultToast, UpdateToast } from "./components/swal-mixins";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

const options = {
  onSuccess: (): void => {
    DefaultToast.fire("You can now use this app when offline.");
  },
  onUpdate: (): void => {
    UpdateToast.fire("A newer version is available. Update??").then((res) => {
      if (!res.dismiss) {
        navigator.serviceWorker
          .getRegistrations()
          .then((regs) => {
            regs.forEach((reg) => {
              reg.unregister();
            });
          })
          .then(() => {
            window.location.reload();
          })
          .catch((res) => {
            console.error(`Couldn't update! ${res}`);
          });
        serviceWorker.register(options);
      }
    });
  },
};
serviceWorker.register(options);
