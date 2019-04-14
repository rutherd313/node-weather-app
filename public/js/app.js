
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    //prevents browser from refreshing
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch("/weather?address=" + search.value).then((response) => {
        response.json().then((data) => {
            if (search.value) {
                if (data.error) {
                    messageOne.textContent  = data.error;
                }
                else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }    
            }
        })
    })
})