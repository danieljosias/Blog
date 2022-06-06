class Api{
    static async registerUser(data){

        await fetch('https://api-blog-m2.herokuapp.com/user/register',
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body:JSON.stringify(data)
            }
        )
        .then(response => response.json())

        .then(data=>{
            if(data.status === 201){
                window.location.href = '../login.html'
                alert('Usuário cadastrado(a) com sucesso!')
            }
        })
        .catch(err=> console.log(err))
            
    }

    static async login(data){
        
        await fetch('https://api-blog-m2.herokuapp.com/user/login',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(data)
            }
        )    
        .then(response => response.json())
        
        .then(data=>{
            if(data.token){
                window.location.href = './post.html'
                alert('Usuário logado(a) com sucesso!')

                localStorage.setItem("token", JSON.stringify(data.token))
                localStorage.setItem("userId", JSON.stringify(data.userId))
            }
        })
        .catch(err=> console.log(err))
 
    }

    static async listUser(){
        const token = localStorage.getItem("token")

        await fetch('https://api-blog-m2.herokuapp.com/user/8a96a674-8835-4037-b1e7-7956bf974435',
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${JSON.parse(token)}`
                },
                
            }
            .then(response => response.json())
        
            .catch(err=> console.log(err))
        )    
        
    }

    //cria post na api
    static async createPost(data){
        const token = localStorage.getItem("token")
        await fetch('https://api-blog-m2.herokuapp.com/post',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(token)}`,
                },
                body:JSON.stringify(data)
            }   
        )
        .then(response=>{
            if(response.status === 201){
                alert('Post criado com sucesso!')
                window.location.reload(true)
            }
        })
        .catch(error=> console.log(error))
        .catch(err => console.log(err))
        
    }
   
    //lista todos os posts e renderiza todos na tela
    static async listPostPage(){
        const token = localStorage.getItem('token')
        await fetch('https://api-blog-m2.herokuapp.com/post?page=1',
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${JSON.parse(token)}`,
                },
                
            }
        )
        .then(response => response.json())
    
        .then((resp)=>{
            resp.data.map(({id, post, createdAt, owner}) =>{
               
                const postSection = document.querySelector('.post__section')
                postSection.style.display = 'flex'
                postSection.style.justifyContent = 'center'
                postSection.style.alignItems = 'center'
                postSection.style.flexDirection = 'column'
            
                const containerMain = document.createElement('div')
                containerMain.style.display = 'flex'
                containerMain.style.alignItems = 'center'
                containerMain.style.justifyContent = 'center'
                containerMain.style.boxShadow = '0.1rem 0.1rem 0.2rem #1E1E1E'
                containerMain.style.width = '30em'
                containerMain.style.height = '10em'
                containerMain.style.margin = '1em 0em'
                
                const containerOne = document.createElement('div')
                containerOne.style.display = 'flex'
                containerOne.style.alignItems = 'center'
                containerOne.style.gap = '10px'

                const img = document.createElement('img')
                img.setAttribute('src',`${owner.avatarUrl}`)
                img.classList.add('avatar')
                img.style.width = '70px'
                img.style.height = '70px'
                img.style.borderRadius = '50%'

                const containerTwo = document.createElement('div')
                containerTwo.style.display = 'flex'
                containerTwo.style.flexDirection = 'column'
                containerTwo.style.gap = '10px'

                const name = document.createElement('h2')
                name.innerText = `${owner.username}`
                name.style.color = '#000000'
                name.style.fontWeight = 'bold'
                
                const content = document.createElement('p')
                content.innerText = `${post}`
                content.style.color = '#000000'
                content.style.whiteSpace = 'nowrap'
                content.style.overflow = 'hidden'
                content.style.textOverflow = 'ellipsis'
                content.style.width = '17em'

                const containerButtons = document.createElement('div')
                containerButtons.style.display = 'flex'
                containerButtons.style.flexDirection = 'column'
                containerButtons.style.gap = '10px'
                
                const edit = document.createElement('button')
                edit.innerText = 'Editar'
                edit.style.color = '#2EAADB'
                edit.style.border = 'none'
                edit.style.background = 'transparent'
                edit.classList.add('edit__btn')
                
                const exclude = document.createElement('button')
                exclude.innerText = 'Apagar'
                exclude.style.color = '#DB004C'
                exclude.style.border = 'none'
                exclude.style.background = 'transparent'
                exclude.classList.add('exclude__btn')

                const date = document.createElement('p')
                date.innerText = `${createdAt}`
                date.style.color = '#000000'
                date.style.fontSize = '0.8em'
                
                containerButtons.append(edit,exclude,date)
                containerTwo.append(name,content)
                containerOne.append(img,containerTwo,containerButtons)
                containerMain.append(containerOne)
                postSection.append(containerMain)

                if(JSON.stringify(owner.id) === localStorage.getItem('userId')){
                    
                    exclude.addEventListener('click', () => {
                      this.excludePost(id)
                    })
        
                    edit.addEventListener('click', () => {
                        const modal = document.querySelector('.modal')
                        containerMain.style.visibility = 'hidden'
                        modal.style.visibility = 'visible'
                    })
                    
                    const modalButton = document.querySelector('.modal__button')
                    modalButton.addEventListener('click', () => {
                        
                      this.updatePost(id)

                      const modal = document.querySelector('.modal')
                      containerMain.style.visibility = 'visible'
                      modal.style.visibility = 'hidden'
        
                      window.alert('Post Editado com sucesso!')
        
                      window.location.reload(true)
                    })

                }
            })

        })
    }

    static async updatePost(id){
        console.log(id);
        const token = localStorage.getItem('token')

        const input = document.querySelector('.modal__input').value         
        console.log(input)
    
        const dados = {
            newContent: input
        }
    
        await fetch(`https://api-blog-m2.herokuapp.com/post/${id}`,
            {
                method: "PATCH",
                headers:{
                    "Authorization": `Bearer ${JSON.parse(token)}`,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(dados)
            }
        )
        
        const containerMain = document.querySelector('.container__main')
        containerMain.style.visibility = 'visible'

        const modal = document.querySelector('.modal')
        modal.style.visibility = 'hidden'
    }

    static async excludePost(id){
        const token = localStorage.getItem('token')
        await fetch(`https://api-blog-m2.herokuapp.com/post/${id}`,
            {
                method: "DELETE",
                headers:{
                    "Authorization": `Bearer ${JSON.parse(token)}`,
                }
            }
        )
        .then(response=>{
            if(response.status === 204){
                alert('Post excluído com sucesso!')
                window.location.reload(true)
            }
        })
        .catch(error=> console.log(error))
    }

    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
    }
    
}
export default Api
