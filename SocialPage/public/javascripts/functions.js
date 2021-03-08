 let mainContainer=document.querySelector("#mainContainer")
const homeFunction=(userInfo)=>{
    mainContainer.innerHTML=""
    mainContainer.insertAdjacentHTML("afterbegin",`<div class="container-fluid text-center  py-5" style="min-height: 100vh;">
    <button id="logOut" class="float-right">LogOu t</button>
    <p>
    <a href="/auth/delete"><button  class="float-right">deleteAccount</button></a>
    </p>
    <h1>${ userInfo.username }</h1>
    <div>
        <img src="/images${userInfo.image  }" id="homeImg" width="200" height="200">
        <p>
            <a href="/profile/${ userInfo._id }">Profile</a>
        </p>       
    </div>   
`)
  let logoutButton=document.querySelector("#logOut")
  logoutButton.addEventListener("click",()=>{
      localStorage.removeItem("accessToken")
      location.href="/"
  })
}
    const loginFunction=()=>{
        mainContainer.innerHTML=""
        mainContainer.insertAdjacentHTML("afterbegin",`
        <div class="container px-2 pt-5 ">
             <form method="POST" action="/auth/login" id="loginForm" class="px-3">
               <p id="loginFormP"></p>
               <div class="form-group pt-5">
                   <label for="exampleInputEmail1">Email address</label>
                   <input name="email" type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
               </div>
               <div class="form-group pt-5">
                   <label for="exampleInputPassword1">Password</label>
                   <input name="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
               </div>         
               <button type="submit" class="btn btn-primary">Login</button>
           </form>       
           <p class="my-5">
             <button id="registerButton" class="btn btn-outline-success">Register now</button>
           </p>       
       </div>`)
          const registerButton=document.querySelector("#registerButton")
          registerButton.addEventListener("click",registerFunction)
           const loginForm=document.querySelector("#loginForm")
           loginForm.addEventListener("submit", (e)=>{
               e.preventDefault()
               let loginObj={
                   email:loginForm.elements["email"].value,
                   password:loginForm.elements["password"].value
               }
            
               fetch("/auth/login",{
                   method:"POST",
                   headers:{
                       "Content-Type":"application/json",
                       "Accept":"application/json",
                   },
                   body:JSON.stringify(loginObj)
               }).then(res=>res.json())
               .then(data=>{
                    if(data.error){
                    let elem= document.querySelector("#loginFormP")
                    elem.innerHTML=JSON.stringify(data.error)
                     return
                    }
                  
                    localStorage.setItem("accessToken", data.accessToken)
         
                    location.href="/"
               })
           })
        }
        

        const registerFunction=()=>{
            mainContainer.innerHTML=""
            mainContainer.insertAdjacentHTML("afterbegin",`
            <div class="container px-2 pt-5 "> 
                <form id="registerForm" class="px-3">
                <p id="registerFormP"></p>
    
                <div class="form-group ">
                    <label>Username</label>
                    <input type="text" name="username" class="form-control" value="">
                    <span class="help-block"></span>
                </div> 
                <div class="form-group ">
                    <label>Email</label>
                    <input type="text" name="email" class="form-control" value="">
                    <span class="help-block"></span>
                </div>    
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="password" class="form-control" value="">
                    <span class="help-block"></span>
                </div>             
                <div class="form-group">
                    <input type="submit" class="btn btn-primary" value="Submit">
                    <input type="reset" class="btn btn-default" value="Reset">                
                </div>           
            </form>        
            <button id="cancelRegisterButton" class="btn btn-primary">Cancel</button>
        </div>
            `)
            const registerForm=document.querySelector("#registerForm")
            registerForm.addEventListener("submit", (e)=>{
                
                e.preventDefault()
                let registerObj={
                    username:registerForm.elements["username"].value,
                    email:registerForm.elements["email"].value,
                    password:registerForm.elements["password"].value
                }
                fetch("/auth/register",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Accept":"application/json",
                    },
                    body:JSON.stringify(registerObj)
                }).then(res=>res.json())
                .then(data=>{
               
                    if(data.error){
                    let elem= document.querySelector("#registerFormP")
                    elem.innerHTML=JSON.stringify(data.error)
                     return
                    }
                    location.href="/"
                })
            })
       
                         
            let cancelRegisterButton=document.querySelector("#cancelRegisterButton")
                    cancelRegisterButton.addEventListener("click",()=>{
                        location.href="/"
            })   
        }