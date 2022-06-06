import Api from "../controller/api.js";

async function handlePost(e){
    e.preventDefault()
    
    const input = document.querySelector('.post__input').value
    
    const dados = {
        content: input
    }

    await Api.createPost(dados)
}
Api.listPostPage()

const button = document.querySelector('.post__button')
button.addEventListener('click',handlePost)


const btn = document.querySelector('.modal__button') 
btn.addEventListener('click', Api.updatePost) 

const btnLogout = document.querySelector('.header__logoutButton')
btnLogout.addEventListener('click', ()=>{
    Api.logout()
    window.location.href = '/index.html'
    window.alert('Logout efetuado com sucesso!')
})


