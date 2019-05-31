const alert = document.getElementById('alert')
const btnDownload = document.getElementById('btn-download')
const signupForm = document.getElementById('signup-form')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const portfolioIdDisplays = document.querySelectorAll('.portfolio-id')

const step2 = document.getElementById('step-2')
const step3 = document.getElementById('step-3')
const step4 = document.getElementById('step-4')

btnDownload.addEventListener('click', e => step2.classList.remove('d-none'))

signupForm.addEventListener('submit', e => {
  e.preventDefault()

  const email = emailInput.value
  const password = passwordInput.value

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      signupForm.remove()
      showAlert('success', 'Account created. Proceed to the next step.')
      updatePortfolioIds(res.user.uid)
      step3.classList.remove('d-none')
      step4.classList.remove('d-none')
    })
    .catch(function(error) {
      showAlert('danger', error.message, true)
    })
})

function updatePortfolioIds(newPortfolioId) {
  portfolioIdDisplays.forEach(element => (element.textContent = newPortfolioId))
}

function showAlert(type, message, temporary) {
  alert.textContent = message
  alert.className = `alert alert-${type}`
  if (temporary) setTimeout(() => (alert.className = 'alert d-none'), 5000)
}
