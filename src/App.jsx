import { Component } from "react";
import React from "react";
import Messages from "./Messages";
import "./App.css";
import Input from "./Input";



function randomName() {
  const adjectives = [
    "gonzales",
    "vjetar",
    "stenac",
    "svjedok",
    "trkac",
    "cudak",
    "vozač",
  ];
  const nouns = [
    "brzi",
    "usporeni",
    "zeleni",
    "unaprijeđeni",
    "labavi",
    "crni",
    "okomiti",
    "tanki",
    "debeli",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff) - toString(16);
}

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
    messages: [
      {
        text: "Ovo je test poruka (hardkodirana)",
        member: {
          color: "blue",
          username: "plaviorao",
        },
      },
    ],
    member: {
      username: randomName(),
      color: randomColor(),
    },
  }
  }


  onSendMessage = (message) => {
    const messages = this.state.messages;
    messages.push({
      text: message,
      member: this.state.member,
    })
    this.setState({ messages: messages })
  };
  
  render(){
    return ( <>

    
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
