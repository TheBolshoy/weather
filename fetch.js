



const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const WEATHER_FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'



/* 

export function getCityInfo(cityName) {
    return fetch(`${serverUrl}?q=${cityName}&appid=${apiKey}`)
        .then(response => {
            if (response.status === 404) {
                throw new Error('Error 404')
            }
            return response.json()
        })
}




export function getWeatherByTime(cityName) {
    const url = `${WEATHER_FORECAST_URL}?q=${cityName}&appid=${apiKey}&units=metric`

    return fetch(url)
        .then((response) => {
            if (response.status === 404) {
                throw new Error('Введите корректный запрос!')
            }
            return response.json()
        })

}
*/


export async function getCityInfo(cityName) {
    let url = `${serverUrl}?q=${cityName}&appid=${apiKey}`
    try {
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export async function getWeatherByTime(cityName) {
    const urlIcon = `${WEATHER_FORECAST_URL}?q=${cityName}&appid=${apiKey}&units=metric`
    try {
        const response = await fetch(urlIcon)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}




