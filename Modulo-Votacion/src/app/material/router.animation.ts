import {
  trigger,
  animate,
  style,
  group,
  query,
  transition
} from "@angular/animations";

export const routerTransition = trigger("routerTransition", [
  transition(":decrement", [
    query(
      ":enter, :leave",
      style({
        position: "fixed",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
      }),
      { optional: true }
    ),
    group([
      query(
        ":enter",
        [
          style({
            transform: "translateX(-100%)",
            opacity: "0"
          }),
          animate(
            ".7s ease-in-out",
            style({
              transform: "translateX(0%)",
              opacity: "1"
            })
          )
        ],
        { optional: true }
      ),
      query(
        ":leave",
        [
          style({
            transform: "translateX(0%)",
            opacity: "1"
          }),
          animate(
            ".7s ease-in-out",
            style({
              transform: "translateX(100%)",
              opacity: "0"
            })
          )
        ],
        { optional: true }
      )
    ])
  ]),
  transition(":increment", [
    group([
      query(
        ":enter, :leave",
        style({
          position: "fixed",
          top: "0",
          left: "0",
          bottom: "0",
          right: "0",
        }),
        { optional: true }
      ),
      query(
        ":enter",
        [
          style({
            transform: "translateX(100%)",
            opacity: "0"
          }),
          animate(
            ".7s ease-in-out",
            style({
              transform: "translateX(0%)",
              opacity: "1"
            })
          )
        ],
        { optional: true }
      ),
      query(
        ":leave",
        [
          style({
            transform: "translateX(0%)",
            opacity: "1"
          }),
          animate(
            ".7s ease-in-out",
            style({
              transform: "translateX(-100%)",
              opacity: "0"
            })
          )
        ],
        { optional: true }
      )
    ])
  ])
]);
