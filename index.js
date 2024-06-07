const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


const errorMessages = {
  required: 'Input is required',
  email: 'Email is not valid'
}

const fillCheckboxes = (formData, form, type = 'checkbox') => {
  const inputs = form.querySelectorAll(`[type='${type}']`)
  for (let input of inputs) {
    const name = input.getAttribute('name')

    const exists = formData.get(name)
    
    if (input.checked) {
      formData.append(name, input.value)
    }else if (exists && !input.checked) {
      return false
    } else {
      formData.append(name, '')
    }
  }
}

const contactForm = document.getElementById('contact-form')

contactForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const formData = new FormData(this)
  fillCheckboxes(formData, this)
  fillCheckboxes(formData, this, 'radio')

  const values = Object.fromEntries(formData)
  
  for (let key in values) {
    const value = values[key]
    const errorElement = this.querySelector(`[name='${key}']`).closest('.input').querySelector('span.error')
    if (!value) {
      errorElement.style.display = 'block'
      errorElement.innerHTML = errorMessages.required
    } else if (value && key === 'email' && !validateEmail(values.email)) {
      errorElement.style.display = 'block'
      errorElement.innerHTML = errorMessages.email
    } else {
      errorElement.style.display = 'none'
    }
  }
})
