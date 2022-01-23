import axios from "axios";
import { useState } from "react";
import reportWebVitals from "./reportWebVitals";

const messages = require("./proto/greeter_pb")

function App() {

  const [greeting, setGreeting] = useState("");

  const transformResponse = (data) => {
    return messages.GreeterResposne.deserializeBinary(data);
  }

  const fetchGreeting = (name) => {
    const req = new messages.GreeterRequest();
    req.setName(name);

    axios.post("http://localhost:8080/greeter", req.serializeBinary(), {transformResponse, responseType: "arraybuffer", headers: {"content-type": "application/x-protobuf"}})
      .then(data => {
        setGreeting(data.data.getGreeting())
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="App">
      <h1>Greeter Service</h1>
      <form name="greeterform" onSubmit={(e) => { e.preventDefault(); reportWebVitals(fetchGreeting(document.greeterform.name.value)) }}>
        <p>{greeting}</p>
        <input type="text" name="name"></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default App;
