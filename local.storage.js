
export let storageArray = localStorage.getItem('city') === null ? [] : Array.from(localStorage.getItem('city').split(','))

if (storageArray.includes('')) {
    storageArray = storageArray.filter((elem) => elem !== '')
}


export function setFavoriteCity(cityFav) {
    if (storageArray === '') {
        storageArray.removeItem('city')
    }
    storageArray.push(cityFav)
    let set = new Set(storageArray)
    localStorage.setItem('city', Array.from(set.values()))
}

export function removeFavoriteCity(cityDelete) {
    storageArray = storageArray.filter((elem) => elem !== cityDelete)
    localStorage.setItem('city', storageArray)
}




