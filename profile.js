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

const loadPatientdata = () =>{
    const user_id = localStorage.getItem('user_id');
    fetch(`http://127.0.0.1:8000/list/?user_id=${user_id}`)
    .then((res)=>res.json())
    .then((data)=>{
        if (data.length!=0) {
            console.log(data[0]);
            const img = document.getElementById('profile-img');
            const name = document.getElementById('name');
            const number = document.getElementById('number');
            img.src = `${data[0].image}`;
            name.value = `mahin`;
            number.value = `${data[0].mobile_no}`
        }
    })
}

const hendelcng = (event) =>{
    event.preventDefault();
    const user_id = localStorage.getItem('user_id');

    //user object
    fetch(`http://127.0.0.1:8000/user/list/${user_id}/`)
    .then((res)=>res.json())
    .then((user)=>{
        const userobj = user;
    })
    //user object

    fetch(`http://127.0.0.1:8000/list/?user_id=${user_id}`)
    .then((res)=>res.json())
    .then((data)=>{
        if (data.length>0) {
            console.log("User Model ase",data[0]);
        }else{
            const img = document.getElementById('image');
            const number = document.getElementById('number');
            const info = {
                image:img.files[0],
                mobile_no:number.value,
                user:user_id, 
            }
            console.log(img.files[0]);
            console.log(img.files[0].name);
            fetch(`http://127.0.0.1:8000/list/`,{
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(info),
            })
            .then((res)=>res.json())
            .then((us)=>{
                console.log(us);
            })
        }
    })
}

loadPatientdata();
loadmanubar();