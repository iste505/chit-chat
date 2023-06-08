import { Component } from "react";
import React from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.onSendMessage(this.state.text);
  }

  onHover = () => {
    if (this.state.text.replace(/\s/g, "").length === 0) {
      document.querySelector("button").innerHTML = "Prvo napiši poruku";
    }
  };

  onUnhover = () => {
    if (this.state.text.replace(/\s/g, "").length === 0) {
      document.querySelector("button").innerHTML = "Pošalji";
    }
  };
  onTouchEnds = () => {
    if (this.state.text.replace(/\s/g, "").length === 0) {
      document.querySelector("button").innerHTML = "Prvo napiši poruku";
      setTimeout(() => {
        document.querySelector("button").innerHTML = "Pošalji";
      }, 1000);
    }
  };

  handleKeyDown = (event) => {
    if (this.state.text.replace(/\s/g, "").length === 0) {
      if (event.key === "Enter") {
        document.querySelector("button").innerHTML = "Prvo napiši poruku";
        setTimeout(() => {
          document.querySelector("button").innerHTML = "Pošalji";
        }, 1000);
      }
    }
  };

  render() {
    return (
      <div className="Input">
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input
            onChange={(e) => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder='Napiši poruku i klikni ENTER ili "Pošalji"'
            autoFocus={true}
            required
            onKeyDown={this.handleKeyDown}
          />
          <button
            disabled={this.state.text.replace(/\s/g, "").length < 1}
            onMouseOver={this.onHover}
            onMouseLeave={this.onUnhover}
            onTouchEnd={this.onTouchEnds}
          >
            Pošalji
          </button>
        </form>
      </div>
    );
  }
}

export default Input;
