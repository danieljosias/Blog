import Api  from "../controller/api.js"

function handleUserRegister(e){
    e.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const avatar = document.getElementById('avatar').value
    const password = document.getElementById('password').value

    let data = {
        username: name,
        email: email,
        avatarUrl: avatar,
        password: password
    }

    Api.registerUser(data)
}          

const formButton = document.querySelector('.form__button')
formButton.addEventListener('click',handleUserRegister)
            
           