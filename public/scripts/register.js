const signupForm = document.querySelector("form.form")
const pwConf = document.getElementById("password")
const pw = document.getElementById("password")
const pwError = document.querySelector(".confirm-error")
let isError = false;

const showPasswordSimilarity = () => {
  if(pwConf.value !== pw) {
    pwError.classList.add("active")
    isError = true
  } else {
    pwError.classList.remove("active")
    isError = false
  }
}

pwConf.addEventListener("input", showPasswordSimilarity)
pw.addEventListener("input", showPasswordSimilarity)

signupForm.addEventListener("submit", e => {
  if(isError){
    e.preventDefault()
    alert("Password did not match!")
  }
})
