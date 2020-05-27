"use strict";

import { Component } from "react";
import { observer, inject } from "mobx-react";
import cx from "classnames";
import Content from "../components/Content";
@inject("List", "UI")
@observer
export default class extends Component {
  componentWillMount() {}

  render() {
    const { foldSideBar } = this.props.UI;

    return (
      <div className={cx({ content: true, "list-hide": foldSideBar })}>
        <Content />
      </div>
    );
  }
}
