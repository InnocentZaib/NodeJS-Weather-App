

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherMsg = document.querySelector('.message-1');
const errorMsg = document.querySelector('.message-2');

weatherForm.addEventListener('submit', (event) => {

    event.preventDefault();
    const location = search.value;
    
    weatherMsg.textContent = 'Loading...';
    errorMsg.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

    response.json().then((data) => {
        if(data.error) {
            weatherMsg.textContent = '';
            errorMsg.textContent = data.error;
        }else {
            console.log(data.forecast);
            weatherMsg.textContent = 'Weather of ' + search.value + ' is ' + data.forecast.icon + '. And the temperature is ' + data.forecast.temperature;
            
        }
    })

});

});

