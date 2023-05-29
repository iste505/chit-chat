import { Component } from "react";
import React from "react";
import Messages from "./Messages";
import "./App.css";
import Input from "./Input";

function randomName() {
  const adjectives = [
    "brzi",
    "usporeni",
    "zeleni",
    "unaprijeđeni",
    "labavi",
    "crni",
    "okomiti",
    "tanki",
    "debeli",
    "smješni",
    "zabavni"
  ];
  const nouns = [
    "gonzales",
    "vjetar",
    "štenac",
    "svjedok",
    "trkac",
    "čudak",
    "vozač",
    "pas",
    "tigar"
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //   messages: [
  //     {
  //       text: "Ovo je test poruka (hardkodirana)",
  //       member: {
  //         color: "blue",
  //         username: "plaviorao",
  //       },
  //     },
  //   ],
  //   member: {
  //     username: randomName(),
  //     color: randomColor(),
  //   },
  // }
  // }

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      member: {
        username: randomName(),
        color: randomColor(),
      },
    };
    this.drone = new window.Scaledrone("54dx9KixrbnG0nkz", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  onSendMessage = (message) => {
    const messages = this.state.messages;
    messages.push({
      text: message,
      member: this.state.member,
    });
    this.setState({ messages: messages });
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };

  render() {
    return (
      <>
        <div className="App">
          <div className="App-header">
            <h1>chitChat - easy chat App</h1>
          </div>
          <Messages
            messages={this.state.messages}
            currentMember={this.state.member}
          />
          <Input onSendMessage={this.onSendMessage} />
        </div>
      </>
    );
  }
}

export default App;
