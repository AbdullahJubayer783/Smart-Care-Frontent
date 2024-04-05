const loadservice = () => {
   
    fetch('http://127.0.0.1:8000/service/')
    .then((res)=>res.json())
    .then((data)=>displayservice(data))
}

const displayservice = (service) => {
    service.forEach((ser)=>{
        // console.log(ser);
        const id = document.getElementById('service-container')
        const li = document.createElement("li")
        li.innerHTML = `
        <div class="card shadow h-100">
            <div class="ratio ratio-16x9">
                <img src="${ser.image}" class="card-img-top" loading="lazy" alt="...">
            </div>
            <div class="card-body p-3 p-xl-5">
                <h3 class="card-title h5">${ser.name}</h3>
                <p class="card-text">${ser.description}</p>
                <div><a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
        </div>
        `
        id.appendChild(li)
    })
    
}


const loadDoctors = (search) => {
    console.log(search);
    document.getElementById("doctors").innerHTML="";
    document.getElementById("spinner").style.display = "block";
    fetch(`http://127.0.0.1:8000/doctor/list/?search=${search?search:""}`)
    .then((res)=>res.json())
    .then((data)=>{
        if (data.results.length > 0) {
            document.getElementById("spinner").style.display = "none";
            document.getElementById("nodata").style.display = "none";
            displayDoctor(data?.results);
          } else {
            document.getElementById("doctors").innerHTML = "";
            document.getElementById("spinner").style.display = "none";
            document.getElementById("nodata").style.display = "block";
          }}
    )
    
}
const displayDoctor = (doctors) => {
    
    doctors.forEach((doctor)=>{

        fetch(`http://127.0.0.1:8000/user/list/${doctor.user}/`)
        .then((res)=>res.json())
        .then((user)=>{
            
        
        console.log(user);
        const parent = document.getElementById('doctors');
        const div = document.createElement("div");
        div.classList.add("doc-card");
        div.classList.add("me-4");
        div.innerHTML = `
        <img class="doc-img" src=${doctor.image} alt="">
        <h4>${user.first_name} ${user.last_name}</h4>
        <h6>${doctor.designation[0]}</h6>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, vel?</p>
        <p>
        ${doctor?.specialization.map((item) =>{
            return `<button class="btn btn-warning disabled">${item}</button>`
        })}
        </p>
        <button class="btn btn-primary"><a class="text-decoration-none text-light"  href="doctorDetails.html?doctorId=${doctor.id}">Details</a></button>
        
        `;
        parent.appendChild(div);
    })
})
}


const loadDesignation = () => {
    fetch(`http://127.0.0.1:8000/doctor/designation/`)
    .then((res)=>res.json())
    .then((data)=>data.forEach((des)=>{
            const parent = document.getElementById("drop-deg");
            
            const li = document.createElement("li");
            li.classList.add("dropdown-item");
            li.innerHTML = `
                <li onclick="loadDoctors('${des.name}')">${des.name}</li>
            `;
            parent.appendChild(li);
    }))
}

const loadSpecialization = () => {
    fetch(`http://127.0.0.1:8000/doctor/specialization/`)
    .then((res)=>res.json())
    .then((data)=>data.forEach((spi)=>{
        const parent = document.getElementById('drop-spc');
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerHTML = `
            <li onclick="loadDoctors('${spi.name}')">${spi.name}</li>
        `;
        parent.appendChild(li);
    }))
}

const hendelSearch = () => {
    const search = document.getElementById('search').value;
    loadDoctors(search);
}

const loadAllReviews = () => {
    fetch(`http://127.0.0.1:8000/doctor/review/`)
    .then((res)=>res.json())
    .then((data)=>data.forEach((review)=>{
        
        const parent = document.getElementById("review-container");
        const div = document.createElement("div");
        div.classList.add("review-card");
        div.innerHTML = `
            <img src="./Images/girl.png" alt="">
            <h4>${review.reviewer}</h4>
            <p>${review.body.slice(0,100)}</p>
            <h6>${review.rating}</h6>
        `;
        parent.appendChild(div);
    }))
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
                             <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                             <li><a class="dropdown-item" href="">Logout</a></li>
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
loadAllReviews();
loadSpecialization();
loadDesignation();
loadservice();
loadDoctors();