import {
  trigger,
  sequence,
  state,
  animate,
  transition,
  style
} from "@angular/animations";

export const rowsAnimation = trigger("rowsAnimation", [
  transition("void => *", [
    style({
      height: "*",
      opacity: "0",
      transform: "translateX(-700px)",
      "box-shadow": "none"
    }),
    sequence([
      animate(
        ".1s cubic-bezier(1, 0, 0, 1)",
        style({
          height: "*",
          opacity: ".2",
          transform: "translateX(0)",
          "box-shadow": "none"
        })
      ),
      animate(
        ".4s cubic-bezier(1, 0, 0, 1)",
        style({ height: "*", opacity: 1, transform: "translateX(0)" })
      )
    ])
  ])
]);
