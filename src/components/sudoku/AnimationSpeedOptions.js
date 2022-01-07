import { render } from "@testing-library/react";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAnimationSpeed } from "../../actions";

export const AnimationSpeedOptions = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const selectedSpeed = useSelector((state) => state.animationSpeed);
  const isRunning = useSelector((state) => state.isRunning);
  const dispatch = useDispatch();

  const speeds = [
    {
      title: "Slow",
      value: "Slow",
    },
    {
      title: "Normal",
      value: "Normal",
    },
    {
      title: "Fast",
      value: "Fast",
    },
    {
      title: "Instant",
      value: "Instant",
    },
  ];

  const [selected, setSelected] = useState(speeds[0]);

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  // const generateArraySize = (option) => {
  //   dispatch(setSpeed(option.value));
  //   generateArray(dispatch, option.value);
  //   setSelected(option);
  // };

  const renderedOptions = speeds.map((option) => {
    if (option.value === selected) {
      return null;
    }

    return (
      <li
        key={option.value}
        className="dropdown__text"
        onClick={() => {
          dispatch(setAnimationSpeed(option.value));
          setSelected(option);
        }}
      >
        {option.title}
      </li>
    );
  });

  return (
    <div className="dropdown dropdown--animated">
      <div id="dropdown">
        <label
          className="dropdown__face"
          htmlFor="dropdown"
          style={{ borderColor: isRunning ? "gray" : "#000" }}
        >
          <div
            className="dropdown__text"
            style={{ float: "left", color: isRunning ? "gray" : "#000" }}
          >
            Speed:
          </div>
          <div
            className="dropdown__text"
            style={{ color: isRunning ? "gray" : "#000" }}
          >
            {selectedSpeed}
          </div>

          <div
            ref={ref}
            className="dropdown__arrow"
            onClick={() => (!isRunning ? setOpen(!open) : null)}
            style={{ borderColor: isRunning ? "gray" : "#000" }}
          ></div>
        </label>

        <ul
          className="dropdown__items"
          style={{
            top: open ? "calc(100% + 2.5rem)" : "50%",
            visibility: open ? "visible" : "hidden",
            opacity: open ? 1 : 0,
          }}
        >
          {renderedOptions}
        </ul>
      </div>
    </div>
  );
};
