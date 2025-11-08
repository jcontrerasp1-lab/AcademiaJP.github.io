 const $submit = document.getElementById("submit"),
       $password = document.getElementById("password"),
       $user = document.getElementById("user"),
       $lu = document.getElementById("u");
       $lc = document.getElementById("c");
       
document.addEventListener("click", (e)=>{   
    if(e.target === $submit){
    e.preventDefault();
    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;
     if($password.value === "2025" && $user.value === "alumno"){
        localStorage.setItem('username', username);
        window.location.href = 'home.html';
    }else{
        document.getElementById('user').value = '';
        document.getElementById('password').value = '';
         document.getElementById('user').focus();
    }
    }
})