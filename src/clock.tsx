import React from "react";

export default class Clock extends React.Component<{}, { date: Date }> {
  timerId: any;

  date = new Date();

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return <h2>{this.state.date.toLocaleTimeString()}</h2>;
  }
}
