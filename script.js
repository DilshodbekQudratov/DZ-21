


let USERNAME 
let launch = document.querySelector('.launch')
document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();
    auth()

});

async function updateUserBalance() {
    let response = await sendRequest("user", "GET", {
        username:USERNAME
    })
    if (response.error){
        alert(response.message)
    } else {
        let userBalance = response.balance
        let span = document.querySelector("header span")
        span.innerHTML = `[${USERNAME}, ${userBalance}]`
    }
}

async function sendRequest(url, method, data) {
    url = `https://tg-api.tehnikum.school/tehnikum_course/minesweeper/${url}`
    
    if(method == "POST") {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
        response = await response.json()
        return response
    } else if(method == "GET") {
        url = url+"?"+ new URLSearchParams(data)
        let response = await fetch(url, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        response = await response.json()
        return response
    }
}

async function auth(){
    let login = document.getElementsByName("login")[0].value

    let response = await sendRequest ("user", "GET", {
        username: login
    })
    if (response.error){
        let registration = await sendRequest ("user", "POST", {
            username: login
        })
        if(registration.error){
            alert(registration.message)
        } else {
            USERNAME = login
            launch.classList.add('disabled')
            updateUserBalance()
            localStorage.setItem('username', USERNAME)
        }

    }  else {
        USERNAME = login
        launch.classList.add('disabled')
        updateUserBalance()
        localStorage.setItem('username', USERNAME)
    }
    }
    
