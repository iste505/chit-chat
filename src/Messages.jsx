import { Component } from "react";
import React from "react";

class Messages extends Component {
  render() {
    const { messages } = this.props;
    return (
      <ul className="Messages-list">
        {messages.map((message) => this.renderMessage(message))}
      </ul>
    );
  }

  renderMessage(message) {
    const { member, text } = message;
    const { currentMember } = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";


    return (
      <li className={className} key={[member.id]}>
        <span
          className="avatar"
          style={{ backgroundColor: member.color || member.clientData.color }}
          />
        <div className="Message-content">
          <div className="username">{member.username || member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
