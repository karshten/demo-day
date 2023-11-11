const form = document.querySelector('form')
const okay = document.querySelector('.okay')
const button = document.querySelector('#btn')
const password = document.querySelector('#pass')
const passwordRepeat = document.querySelector('#passRep')
const name = document.querySelector('#name')
const passes = document.querySelectorAll('.password')

passes.forEach(input => {
    const control = input.querySelector('.password-control')
    const password = input.querySelector('input')
    
    control.onclick = (event) => {
        if (password.getAttribute('type') === 'password') {
            event.target.classList.add('view')
            password.setAttribute('type', 'text');
        } else {
            event.target.classList.remove('view')
            password.setAttribute('type', 'password');
        }
    }
})

const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: data
    })
    if (response.status === 404) {
        return alert('ОШИБКА 404')
    }
    if (response.status === 400) {
        return alert('Такой пользователь уже существует!')
    }
    form.style.display = 'none'
    okay.style.display = 'block'
    return response.json()
}

const bindPostData = (form) => {
    button.onclick = async (event) => {
        event.preventDefault()
        const formData = await new FormData(form)
        const obj = {}
        await formData.forEach((item, i) => obj[i] = item)
        const json = await JSON.stringify(obj)
        if (name.value === '') {
            return alert('Введиет ваше имя!')
        }
        if (password.value === '') {
            return alert('Вы не придумали пароль!')
        }
        if (password.value.length < 8) {
            return alert('должно быть минимум 8 символов в пароли')
        }
        if (passwordRepeat.value === '') {
            return alert('Вы не повторили пароль!')
        }
        if (password.value === passwordRepeat.value) {
            return postData('https://33ee-212-112-111-56.ngrok-free.app/auth/register/', json)
        }
        else {
            return alert('Пароли не совпали')
        }
    }
}

bindPostData(form)
