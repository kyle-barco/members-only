
const userDropdown = document.querySelector(".user-nav .drop-down")
const userNav = document.querySelector(".user-nav")

const membershipLink = document.querySelector("a.join-membership")

if (userDropdown && userNav) {
  document.body.addEventListener("click", (e) => {
    if(userDropdown.classList.contains("active") && !userDropdown.contains(e.target)){
      console.log("active remove")
      userDropdown.classList.remove("active")
    }
  })

  userNav.addEventListener("click", (e) => {
    e.stopPropagation()
    if(userDropdown.classList.contains("active")){
      userDropdown.classList.remove("active")
    } else {
      userDropdown.classList.add("active")
    }
  })
}

if(membershipLink){
    membershipLink.addEventListener("click", (e) => {
    e.preventDefault()

    const secret = prompt(`code: "jointheclub"`)

    if(secret === "jointheclub"){
      fetch(`/join`, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type" : "application/json",
        },
      })
      .then(response => {
          if(response.redirected){
            window.location.href = response.url
          }
        })
      .catch(err => {
          console.log(err)
        })
    } else {
      alert("Wrong password/code")
    }
  })
}
