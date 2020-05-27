"use strict";

import React, { Component } from "react";
import cx from "classnames";
import { observer, inject } from "mobx-react";
import greenWave from "./Content";
import "./index.less";

@inject("UI")
@observer
export default class Content extends Component {
  componentDidMount() {
    var canvas = document.getElementById("canvas");
    greenWave(canvas);
  }
  render() {
    return (
      <div className="canvas-box" style={{ position: "relative" }}>
        <canvas
          style={{ backgroundColor: "#253143" }}
          id="canvas"
          width="1800"
          height="600"
        />
      </div>
    );
  }
}
