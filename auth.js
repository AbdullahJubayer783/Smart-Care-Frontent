const handleRegistration = (event) => {
    event.preventDefault();
    document.getElementById("regerrshow").style.display="none";
    document.getElementById("mailcheck").style.display="none";
    document.getElementById("somewrong").style.display="none";
    console.log("slfsdlf");
    const first_name = getValue('first_name');
    const last_name = getValue('last_name');
    const email = getValue('email');
    const password = getValue('password');
    const confirm_password = getValue('confirm_password');
    const username = (first_name+last_name+getRandomThreeDigitNumber()).toLowerCase();
    console.log("UserName",username);
    const info = {
        username:username,
        first_name:first_name,
        last_name:last_name,
        email:email,
        password:password,
        confirm_password:confirm_password,
    };
    if (password == confirm_password) {
        fetch(`http://127.0.0.1:8000/register/`,{
            method:"POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(info)
        })
        .then((res)=>res.json())
        .then((data)=>{
            if (data) {
                document.getElementById("mailcheck").style.display="block";
            }else{
                document.getElementById("somewrong").style.display="block";
            }
        })
    }else{
        document.getElementById("regerrshow").style.display="block";
        
    }
    console.log("fine");
}

const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const password = getValue("current-password");
    console.log(username,password);
    if (username,password) {
        fetch(`http://127.0.0.1:8000/login/`,{
            method:"POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({username,password})
    })
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data);
        if (data.token && data.user_id) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
         //Store Patient name on local storage
         fetch(`http://127.0.0.1:8000/user/list/${data.user_id}/`)
         .then((res)=>res.json())
         .then((us)=>{
             console.log("user",us);
             localStorage.setItem("username",`${us.username}`);
             window.location.href = "index.html";
         })
        //Store Patient name on local storage
        
    };
      });
    
    }
}


function getRandomThreeDigitNumber() {
    return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
}

const getValue = (id) => {
    return document.getElementById(id).value;
}

const loadmanubar = () => {
    const username = localStorage.getItem("username");
    const parent = document.getElementById("manu-container");
    if(username){
    const div = document.createElement("div");
    div.innerHTML = `
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown mx-2">
                           <a class="nav-link dropdown-toggle text-dark" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                             <strong class="text-black">${username}</strong>
                           </a>
                           <ul class="dropdown-menu" aria-labelledby="profileDropdown">
                             <li><a class="dropdown-item" href="{% url 'profile' %}">Profile</a></li>
                             <li><a class="dropdown-item" href="{% url 'orders' %}">Orders</a></li>
                             <li><a class="dropdown-item" href="{% url 'changepassword' %}">Change Password</a></li>
                             <li><a class="dropdown-item" href="{% url "logout" %}">Logout</a></li>
                           </ul>
                         </li>
                     </ul>
    `;
    parent.appendChild(div);
    }else{
        const div = document.createElement("manu-container");
        div.innerHTML = `
            <a href="login.html" class="btn btn-success"><li><strong>Login</strong></li></a>
            <a href="register.html" class="btn btn-danger"><li><strong>Register</strong></li></a>
        `;
        parent.appendChild(div);
    }
}
loadmanubar();

