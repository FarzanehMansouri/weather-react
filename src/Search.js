import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [city, setCity] = useState(null);
  let [response, setResponse] = useState(false);
  let [wind, setWind] = useState(null);
  let [temp, setTemp] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [icon, setIcon] = useState(null);
  function showTemp(response) {
    setResponse(true);
    setTemp(Math.round(response.data.main.temp));
    setWind(Math.round(response.data.wind.speed));
    setHumidity(response.data.main.humidity);
    setIcon(
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=350ba39f1ebe33ca73c995004955f157&units=metric`;
    axios.get(url).then(showTemp);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={updateCity} />
      {"  "}
      <button type="submit">Search</button>
    </form>
  );
  if (response) {
    return (
      <div>
        {form}
        <ul>
          <li>temp : {temp}</li>
          <li>humidity : {humidity}</li>
          <li>wind : {wind}</li>
          <li>
            <img src={icon} alt="icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
