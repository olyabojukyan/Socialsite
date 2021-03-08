if(localStorage.getItem("accessToken")){
    let profileId=document.querySelector("#profileId").innerHTML
    let profile=document.querySelector("#profile")
    let userId="";
    fetch("/profile",{
        method:"POST",
         headers: {
            Authorization: localStorage.getItem("accessToken")
        }
  }).then(res=>res.json())
    .then(data=>{
        if(data.id==profileId){
        userId=data.id
     profile.insertAdjacentHTML("beforeend",` 
     <p>
       <button id="editImageBtn">Change Photo</button>  
     </p>
    <section id="editImage" hidden >
        <input type="file" name="file" id="imageFile"> 
        <p>
            <input type="button" value="Save" id="changeBtn"> 
            <input type="button" value="Cancel" id="cancelChangeBtn">
        </p>`)
let editProfileBtn =document.querySelector(".editProfile")
            //change profile image
            let imgFile=document.querySelector("#imageFile") 
            let editImageBtn=document.querySelector("#editImageBtn")
            let changeBtn=document.querySelector("#changeBtn")
            let cancelChangeBtn=document.querySelector("#cancelChangeBtn")
            let editImageSection=document.querySelector("#editImage")
            let homeImg=document.querySelector("#homeImg")
 // Երբ նկարը կցում ենք link=URL.createObjectURL(imgFile.files[0]) երևում է բրաուզերում
            imgFile.addEventListener("change",()=>{
                let link=URL.createObjectURL(imgFile.files[0])
                homeImg.src=link
            })  
         cancelChangeBtn.addEventListener("click",()=>{
            imgFile.value=""  
            editImageBtn.hidden=true;
            editImageSection.hidden=false
  })
editImageBtn.addEventListener("click",()=>{
                    editImageBtn.hidden=true;
                    editImageSection.hidden=false
                
                })
       //change prifile photo
    //   formData=new FormData() ավելացնում ենք    let img=imgFile.files[0] որպեսզի ուղարկենք սերվեր fetch-ով
               
                changeBtn.addEventListener("click",()=>{
                    let formData=new FormData()
                    let img=imgFile.files[0]
                    formData.append("avatar",img)
                    fetch("/changePhoto",{
                            method:"POST",
                            headers:{
                            Authorization: localStorage.getItem("accessToken")
                            },
                            body:formData
                        }).then(res=>res.json())
                        .then(data=>{
                            console.log(data)
                            homeImg.src="/images/"+data
                            imgFile.value=""
                            editImageBtn.hidden=false;
                            editImageSection.hidden=true
                        })
                     })
                }  
            })
        }
        