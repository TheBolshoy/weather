import { getCityInfo, getWeatherByTime } from "./fetch.js";
import { setFavoriteCity, removeFavoriteCity } from "./local.storage.js";
import { storageArray } from "./local.storage.js";
import { format } from 'date-fns'




let st = Date.now()
let index
const inputSearch = document.querySelector('.search-sity-input')
const inputButton = document.querySelector('.search-sity-button')
const temperature = document.querySelector('.show-weather-block-temp')
const cityActive = document.querySelector('.info-sity')
const likeSity = document.querySelector('.info-like')
const locationsUl = document.querySelector('.locations-ul')
const weatherIcon = document.querySelector('.img-icon')
const sunsSunr = document.querySelector('.show-feels-like')
const feelsLike = document.querySelectorAll('div.feels-like')
const feelsLikeMini = document.querySelector('.mini-block')
const clock = document.querySelector('.clock-title')
const tempTitle = document.querySelector('.temp-title')
const dateTitle = document.querySelector('.date-title')
const cityTitle = document.querySelector('.city-title')


inputButton.addEventListener('click', getJSONWeather)
likeSity.addEventListener('click', createHTMLList)

renderTitle()
window.onload = function() {
    window.setInterval(function() {
        clock.textContent = format(new Date(), "hh:mm:ss")
        dateTitle.textContent =format(new Date(), "dd.MM.yy")
    }, 1000)
}





function getJSONWeather(event) {
    event.preventDefault()
    const cityName = inputSearch.value
    const responseJSON = getCityInfo(cityName)
    responseJSON.then((data) => createHTML(data))
    const responseJSONForecast = getWeatherByTime(cityName)
    responseJSONForecast.then((data) => showForecast(data))
    inputSearch.value = ''
}
function renderTitle() {
    const responseJSon = getCityInfo('Vladikavkaz')
    responseJSon.then((data) => createTitleHTML(data))
}

function createTitleHTML(data) {
    let faringeitJSON = Math.round(data.main.temp - 273.15);
    tempTitle.textContent = `${faringeitJSON}°`

}
function showForecast(data) {
    feelsLikeMini.textContent = ''
    const forecastList = data.list
    renderForecast(forecastList, index)
}
function createHTML(data) {
    resetSunsSunr()
    let iconJSON = data.weather[0].icon
    let faringeitJSON = Math.round(data.main.temp - 273.15);
    let cityJSON = data.name;
    let timestamp = data.sys.sunrise
    let timestamp2 = data.sys.sunset
    let time = getTime(timestamp)
    let time2 = getTime(timestamp2)

    cityActive.textContent = cityJSON
    temperature.textContent = `${faringeitJSON}°`
    weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${iconJSON}@2x.png`)
    weatherIcon.removeAttribute('onerror')
    weatherIcon.removeAttribute('style')

    let sunrise = document.createElement('p')
    sunrise.setAttribute('id', 'sunrise')
    sunrise.setAttribute('class', 'sunr')
    sunrise.textContent = `Sunrise: ${time}`
    sunsSunr.appendChild(sunrise)

    let sunset = document.createElement('p')
    sunset.setAttribute('id', 'sunset')
    sunset.setAttribute('class', 'suns')
    sunset.textContent = `Sunset: ${time2}`
    sunsSunr.appendChild(sunset)
}
function addHTMLforMiniBlock(time, temp, feelsLike) {

    let miniContainer = document.createElement('div')
    let timeDiv = document.createElement('h5')
    let lineDiv = document.createElement('div')
    let feelsDiv = document.createElement('div')
    let temper = document.createElement('p')
    let feels = document.createElement('p')

    miniContainer.setAttribute('class', 'container mini-container')
    timeDiv.setAttribute('class', 'time-mini')
    timeDiv.textContent = time
    lineDiv.setAttribute('class', 'line')
    feelsDiv.setAttribute('class', 'feels-like')
    temper.setAttribute('id', 'sunrise')
    temper.textContent = `Temperature: ${temp}°`
    feels.setAttribute('id', 'sunrise')
    feels.textContent = `Feels Like: ${feelsLike}°`

    miniContainer.appendChild(timeDiv)
    miniContainer.appendChild(lineDiv)
    miniContainer.appendChild(feelsDiv)
    feelsDiv.appendChild(temper)
    feelsDiv.appendChild(feels)

    return miniContainer
}
function displayOnListClick(cityName) {
    const responseJSON = getCityInfo(cityName)
    responseJSON.then((data) => createHTML(data))
    const responseJSONForecast = getWeatherByTime(cityName)
    responseJSONForecast.then((data) => showForecast(data))
}
function renderOnLoadHTML(storageArray, index = 0) {
    let element = storageArray[index]

    if (index === storageArray.length) {
        return
    }
    arrayToHTML(element)
    displayOnListClick(element)

    renderOnLoadHTML(storageArray, index + 1)
}
function renderForecast(forecastList, index = 0) {
    let element = forecastList[index]
    if (index === 3) {
        return
    }
    const timeDT = element.dt
    const time = getTime(timeDT)
    const temp = Math.round(element.main.temp)
    const feelsLike = Math.round(element.main.feels_like)
    const HTMLMini = addHTMLforMiniBlock(time, temp, feelsLike)
    feelsLikeMini.appendChild(HTMLMini)

    renderForecast(forecastList, index + 1)
}
function arrayToHTML(city) {

    const liElement = document.createElement('li')
    const pElement = document.createElement('p')
    const closeButton = document.createElement('button')

    liElement.setAttribute('class', 'added-location')
    pElement.setAttribute('class', 'p-added-location')
    pElement.textContent = city
    pElement.addEventListener('click', function (event) {
        const city = event.target.textContent;
        displayOnListClick(city);
    })
    closeButton.setAttribute('class', 'close-button-location')
    closeButton.addEventListener('click', (event) => {
        event.target.parentElement.remove()
        const targetName = event.target.parentNode.innerText
        removeFavoriteCity(targetName)
    })

    locationsUl.appendChild(liElement)
    liElement.appendChild(pElement)
    liElement.appendChild(closeButton)
}
function createHTMLList() {
    let cityActiveName = cityActive.textContent
    if (storageArray.includes(cityActiveName)) {
        return
    } else if (storageArray === '') {
        return
    } else {
        setFavoriteCity(cityActiveName)
        arrayToHTML(cityActiveName)
    }
}


if (localStorage.getItem('city') !== null) {
    renderOnLoadHTML(storageArray, index)
}

function getTime(timestamp) {
    let date = new Date(timestamp * 1000);
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`
}
function resetSunsSunr() {
    feelsLike.forEach(function (elem) {
        elem.innerHTML = ''
    })
    sunsSunr.innerHTML = ''
}







let timeLoading = Date.now() - st
console.log(`Врeмя загрузки странциы: ${timeLoading} msec`)