import React from "react";
import { observer, inject } from "mobx-react";
import "./index.less";
import { injectIntl, intlShape } from "react-intl";

import List from "./List";
import Detail from "./Detail";
import GasMap from "./Map";
import Content from "./Content";
@inject("UI")
@observer
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { fullscreen } = this.props.UI;

    fullscreen
      ? document.getElementsByTagName("body")[0].webkitRequestFullscreen()
      : document.webkitExitFullscreen();

    return (
      <div className="too">
        <Content />

        <List />
        <Detail />
        <GasMap />
      </div>
    );
  }
}

Index.propTypes = {
  intl: intlShape.isRequired
};
export default injectIntl(Index);
