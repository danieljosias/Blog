import Api from "../controller/api.js"


function handleLogin(e){
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const dados = {
        email: email,
        password: password
    }

    Api.login(dados)
}

const formButton = document.querySelector('.form__button')
formButton.addEventListener('click',handleLogin)
