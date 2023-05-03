document.querySelector("#newPost").addEventListener("submit",event=>{
    event.preventDefault();
    const post = {
        body:document.querySelector("#post").value,
        blogId:document.querySelector("#hiddenPostId").value,
    }
    fetch("/api/posts",{
        method:"POST",
        body:JSON.stringify(comment),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("Post uploaded successfully.")
            location.reload()
        } else {
            alert("Please try again.")
        }
    })
})
