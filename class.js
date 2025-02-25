

export let arrStorage = localStorage.getItem('city') === null ? [] : Array.from(localStorage.getItem('city').split(','))


if (arrStorage.includes('')) {
    arrStorage = arrStorage.filter((elem) => elem !== '')
}


class Storage {
    constructor(name) {
        this.name = name;
    }
    
    get() {
        console.log(localStorage.getItem(this.name))
        return localStorage.getItem(this.name)
    }
    set(value) {
        if (arrStorage === '') {
            arrStorage.removeItem('city')
            }
        this.value = value
        arrStorage.push(this.value)
        let set = new Set(arrStorage)
        localStorage.setItem(this.name, Array.from(set.values()))
        console.log(set)
    }
    clear(value) {
        arrStorage= arrStorage.filter((x) => x !== value)
        let set = new Set(arrStorage)
        localStorage.setItem(this.name, Array.from(set.values()))
        console.log(localStorage.getItem(this.name))
    }

    isEmpty() {
        console.log(localStorage)
        if (localStorage.getItem(this.namе) === null || undefined) {
            console.log('Is Empty')
            console.log(localStorage.getItem(this.namе))
            return true
        } else {
            console.log(localStorage.getItem(this.namе))
            return false
        }
    }
   
}


export const names = new Storage('city')

names.showStorage = function (x) {
    try { 
        if (x === 'l') {
            console.log(window.localStorage)
        }
        if (x === 'c') {
            console.log(document.cookie)
        }
    } catch {
        console.error('Неправильное название хранилища')
    }
    }


    
