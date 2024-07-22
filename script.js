

const USERNAME = "Dilshodbek"
updateUserBalance()
async function updateUserBalance()  {
    let response = await sendRequest ("user", "GET", {
        username: USERNAME
    })
    if (response.error) {
        alert(response.message)
    } else {
        let userBalance = response.userBalance
        let span = document.querySelector("header span")
        span.innerHTML = `[${USERNAME}, ${userBalance}]`   }
}

async function 