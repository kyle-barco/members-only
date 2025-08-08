const userDropdown = document.querySelector(".user-nav .drop-down")
const userNav = document.querySelector(".user-nav")

const membershipLink = document.querySelector("a.join-membership")
const deleteBtns = document.querySelectorAll("button.delete-post")

if (userDropdown && userNav) {
  document.body.addEventListener("click", (e) => {
    if(userDropdown.classList.contains("active") && !userDropdown.contains(e.target)){
      // console.log("active remove")
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

if (deleteBtns.length) {
  const deletePost = (e) => {
    const postId = e.target.getAttribute("data-post-id")

    fetch(`/delete-post/${postId}`, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({id: postId})
    })
    .then(res => {
        if(res.redirected){
          window.location.href = res.url
        }
      })
    .catch(err => {
        console.log(err)
      })
  }

  deleteBtns.forEach(btn => {
    btn.addEventListener("click", e => deletePost(e))
  })
}

