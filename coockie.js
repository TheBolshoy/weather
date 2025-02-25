let arrLocalStorge = (localStorage.getItem('city')).split(',')

function coockieSetter() {
    document.cookie = `city=${arrLocalStorge[arrLocalStorge.length - 1]} ; max-age=36` 
}

coockieSetter()


 
/*


let nameCity = arrLocalStorge[arrLocalStorge.length - 1]
Cookies.get('name', nameCity, {expires: 1})


*/
