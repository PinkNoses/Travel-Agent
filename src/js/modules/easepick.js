import { easepick } from "@easepick/bundle";
import { TimePlugin } from "@easepick/time-plugin";

function easepickFunc() {
  const picker = new easepick.create({
    element: document.getElementById("datepicker"),
    css: [
      "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css",
      "https://cdn.jsdelivr.net/npm/@easepick/time-plugin@1.2.1/dist/index.css",
      "./../custom/easepick.css",
    ],

    zIndex: 10,
    plugins: [TimePlugin],
    TimePlugin: {
      format: "HH:mm",
    },
    zIndex: 10,
    format: "HH:mm, DD/MM/YY",
  });
}

export default easepickFunc;
