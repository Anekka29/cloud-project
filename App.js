import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");
  const [data, setData] = useState([]);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8080/study");
    setData(res.data);
  };

  const addSession = async () => {
    await axios.post("http://localhost:8080/study", {
      subject,
      hours: parseInt(hours),
      date: new Date().toISOString()
    });
    fetchData();
  };

  const getSuggestion = async () => {
    const hoursArray = data.map(d => d.hours);
    const res = await axios.post("http://localhost:5000/suggest", hoursArray);
    setSuggestion(res.data.message);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Study Tracker</h2>

      <input placeholder="Subject" onChange={e => setSubject(e.target.value)} />
      <input placeholder="Hours" onChange={e => setHours(e.target.value)} />
      <button onClick={addSession}>Add</button>

      <h3>Sessions:</h3>
      {data.map((d, i) => (
        <p key={i}>{d.subject} - {d.hours} hrs</p>
      ))}

      <button onClick={getSuggestion}>Get AI Suggestion</button>
      <h3>{suggestion}</h3>
    </div>
  );
}

export default App;