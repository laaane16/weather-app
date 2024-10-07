async function getData(url) {

  let response = await fetch(
    url
  );
  let data = await response.json();

  return data;
}

function getMonth(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = date.split("-");

  return months[+month[1] - 1];
}
function getDay(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const result = days[new Date(date).getDay()];

  return result;
}


async function getCity(city){
  let url = `https://api.weatherapi.com/v1/forecast.json?key=25fe278046144634821154855240208&q=${city}&days=3&aqi=yes`;

  document.querySelector('.content').innerHTML = '';

  createApp(url);

}


function createEl(el, clss) {
  let item = document.createElement(`${el}`);
  item.classList.add(`${clss}`);

  return item;
}
function createInput(){
  let input = createEl('input', 'content__input');

  input.placeholder = 'Enter city';

  input.oninput = function(){
    if (this.value.match(/[^а-яА-Яa-zA-Z-\s]/s)) {
      this.value = this.value.replace(/[^а-яА-Яa-zA-Z-\s]/s, '');
    }
  }

  document.querySelector('.content').append(input)



  return input;
}

function createTemperature() {
  let temperature = createEl("p", "content__temperature");

  document.querySelector(".content").append(temperature);

  return temperature;
}
function createCity(city){
  let cityEl = createEl('p', 'content__city');

  return cityEl;
}

function createContainer(clss, ...fn){
  let container
}

function createTime() {
  const time = createEl("p", "content__time");
  const today = createEl("p", "content__today");

  document.querySelector(".content").append(today, time);

  return [time, today];
}

function createCards() {
  const list = createEl("ul", "content__list");
  let items = [];

  for (let i = 0; i < 3; i++) {
    const item = createEl("li", "content__item");
    item.classList.add("item");

    let itemTemp = createEl("p", "item__temperature");
    let itemIcon = createEl("img", "item__image");
    let itemDay = createEl("p", "item__day");

    item.append(itemTemp, itemIcon, itemDay);

    list.append(item);
    items.push(item);
  }

  document.querySelector(".content").append(list);
  return [list, items];
}

function createExtraInfo(data) {
  const container = createEl("div", "extra-info");
  const wind = createEl("p", "extra-info__item");
  const hum = createEl("p", "extra-info__item");
  const rain = createEl("p", "extra-info__item");

  wind.append(`Wind ${data["current"]["wind_kph"]} km/h`);
  hum.append(`Hum ${data["current"]["humidity"]} %`);
  rain.append(
    `Rain ${data["forecast"]["forecastday"][0]["day"]["daily_chance_of_rain"]} %`
  );

  container.append(wind, hum, rain);
  return [container, wind, hum, container];
}

function createContentImage(data, index, clss) {
  const img = createEl('img', clss);

  let now = new Date();

  let weatherCode = data["forecast"]["forecastday"][index]["day"]["condition"]["code"];
  //day
  if (
    data["forecast"]["forecastday"][index]["hour"][+now.getHours()]["is_day"]
  ) {
    if (weatherCode == 1000) {
      img.src = "./img/01.sun-light.png";
    }
    if (weatherCode == 1003) {
      img.src = "./img/05.partial-cloudy-light.png";
    }
    if (weatherCode == 1006) {
      img.src = "./img/07.mostly-cloudy-light.png";
    }
  }
  //night
  else {
    if (weatherCode == 1000) {
      img.src = "./img/09.half-moon-light.png";
    }
    if (weatherCode == 1003) {
      img.src = "./img/10.cloudy-night-light.png";
    }
    if (weatherCode == 1006) {
      img.src = "./img/10.cloudy-night-light.png";
    }
  }
  if (
    weatherCode == 1009 ||
    weatherCode == 1030 ||
    weatherCode == 1135 ||
    weatherCode == 1147
  ) {
    img.src = "./img/11.mostly-cloudy-light.png";
  }
  if (
    weatherCode == 1063 ||
    weatherCode == 1072 ||
    weatherCode == 1150 ||
    weatherCode == 1153 ||
    weatherCode == 1168 ||
    weatherCode == 1180 ||
    weatherCode == 1183 ||
    weatherCode == 1186 ||
    weatherCode == 1189 ||
    weatherCode == 1198 ||
    weatherCode == 1240
  ) {
    img.src = "./img/20.rain-light.png";
  }
  if (
    weatherCode == 1066 ||
    weatherCode == 1069 ||
    weatherCode == 1114 ||
    weatherCode == 1204 ||
    weatherCode == 1207 ||
    weatherCode == 1210 ||
    weatherCode == 1213 ||
    weatherCode == 1216 ||
    weatherCode == 1219 ||
    weatherCode == 1222 ||
    weatherCode == 1225 ||
    weatherCode == 1249 ||
    weatherCode == 1252 ||
    weatherCode == 1255 ||
    weatherCode == 1258
  ) {
    img.src = "./img/22.snow-light.png";
  }
  if (weatherCode == 1087 || weatherCode == 1117) {
    img.src = "./img/12.thunder-light.png";
  }
  if (
    weatherCode == 1171 ||
    weatherCode == 1192 ||
    weatherCode == 1195 ||
    weatherCode == 1201 ||
    weatherCode == 1243 ||
    weatherCode == 1246
  ) {
    img.src = "./img/18.heavy-rain-light.png";
  }
  if (weatherCode == 1237 || weatherCode == 1261 || weatherCode == 1264) {
    img.src = "./img/23.hailstorm-light.png";
  }
  if (
    weatherCode == 1273 ||
    weatherCode == 1276 ||
    weatherCode == 1279 ||
    weatherCode == 1282
  ) {
    img.src = "./img/13.thunderstorm-light.png";
  }

  return img;
}


async function createApp(dt) {
  let data = await getData(dt);

  let currentImage = createContentImage(data, 0, 'content__image');
  document.querySelector('.content').append(currentImage);

  let city = createEl('p', 'content__city');
  let cityName = dt.split('q=')[1].split('&')[0];

  city.append(cityName)

  document.querySelector('.content').append(city)

  let input = createInput();



  let temperature = createTemperature();
  temperature.append(data["current"]["temp_c"], "° C");
  let time, today;

  [time, today] = createTime();

  let date = data["location"]["localtime"].split(" ")[0];
  let t = data["location"]["localtime"].split(" ")[1];
  let now = new Date();

  time.append(`${getDay(date)} `);

  if (now.getHours().length == 1) {
    time.append(`0${now.getHours()}`);
  } else {
    time.append(`${now.getHours()}`);
  }

  if (now.getMinutes().length == 1) {
    time.append(`:0${now.getMinutes()}`);
  } else {
    time.append(`:${now.getMinutes()}`);
  }

  today.append(
    `${+date.split("-")[2]} ${getMonth(date)} ‘${date.split("-")[0].slice(2)}`
  );

  let extraInfoContainer, wind, hum, rain;
  [extraInfoContainer, wind, hum, rain] = createExtraInfo(data);

  document.querySelector(".content").append(extraInfoContainer);

  let list, items;

  [list, items] = createCards();
  document.querySelectorAll(".item__temperature").forEach((el, index) => {
    console.log(data)
    el.append(data["forecast"]["forecastday"][index]["day"]["avgtemp_c"], "°C");
  });
  document.querySelectorAll(".item__image").forEach((el, index) => {
    el.src = createContentImage(data, index).src;
  });
  document.querySelectorAll(".item__day").forEach((el, index) => {
    el.append(
      getDay(data["forecast"]["forecastday"][index]["date"]).slice(0, 3)
    );
  });
  document.querySelector('.content__input').addEventListener('keypress', function (e) {
    let key = e.which || e.keyCode;
    if (key === 13) {
      getCity(document.querySelector('.content__input').value)
    }
  });

}

createApp("https://api.weatherapi.com/v1/forecast.json?key=25fe278046144634821154855240208&q=Kazan&days=3&aqi=yes"
);

