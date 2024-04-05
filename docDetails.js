const loadDoctor = () => {
    //Store Patient name on local storage
    const user_id = localStorage.getItem("user_id");
    fetch(`http://127.0.0.1:8000/user/list/${user_id}/`)
    .then((res)=>res.json())
    .then((data)=>{
        const parent = document.getElementById("profileuser");
        parent.innerText = data.username;
    })
    //Store Patient name on local storage
    const param = new URLSearchParams(window.location.search).get("doctorId");
    fetch(`http://127.0.0.1:8000/doctor/list/${param}/`)
    .then((res) => res.json())
    .then((data) => displayDoctor(data));

    fetch(`http://127.0.0.1:8000/doctor/review/?doctor_id=${param}`)
    .then((res) => res.json())
    .then((data) => displayReviewsDoctor(data));

    fetch(`http://127.0.0.1:8000/doctor/availabletime/?doctor_id=${param}`)
    .then((res) => res.json())
    .then((data) => availabletimes(data));
    
}

const displayDoctor = (doctor) => {
    const parent = document.getElementById('doc-details');
    const div = document.createElement("div");
    div.classList.add("doc-details-container");
    div.innerHTML = `
    <div class="doctor-img">
    <img src="${doctor.image}" alt="">
    </div>
    <div class="doc-info">
    <h1 id="doctorname"></h1>
    ${doctor?.specialization.map((item) =>{
        return `<button class="btn btn-warning m-1 disabled ">${item}</button>`
            })}
            <br/>
            ${doctor?.designation.map((item) =>{
                return `<button class="btn btn-secondary disabled m-1">${item}</button>`
            })}
            <p class="w-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, vel?</p>
            <h4>Fees: ${doctor.fee} BDT</h4>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Take Appoinment
            </button>
            </div>
            
            `;
            parent.appendChild(div);
            loaddocuserfullname(doctor.user);
    

}

const loaddocuserfullname = (id) => {
    fetch(`http://127.0.0.1:8000/user/list/${id}/`)
    .then((res)=>res.json())
    .then((data)=>{
        docdetailsname(data);
    })
}
const docdetailsname = (data) => {
    console.log(data);
    const parent = document.getElementById('doctorname');
    parent.innerText = `${data.first_name} ${data.last_name}`;
}


const displayReviewsDoctor = (data) => {
    data.forEach((review)=>{
        
            
                
                const parent = document.getElementById("doc-details-review");
                const li = document.createElement("li");
                li.classList.add("review-card");
                li.innerHTML = `
                    <img src="./Images/girl.png" alt="">
                    <h4>${review.reviewer}</h4>
                    <p>${review.body.slice(0,100)}</p>
                    <h6>${review.rating}</h6>
                `;
                parent.appendChild(li);
        
    })
}

const availabletimes = (times) => {
    times.forEach((time)=>{
        const parent = document.getElementById('time-container');
        const option = document.createElement('option');
        option.value = time.id;
        option.innerText = time.name;
        parent.appendChild(option);
    })

}

const handleAppointment = () => {
    const param = new URLSearchParams(window.location.search).get("doctorId");
    const status = document.querySelector('input[name="status"]:checked').value;
    const symptom = document.getElementById("symptom").value;
    const e = document.getElementById("time-container");
	const time = e.options[e.selectedIndex].value;
    
    const info = {
        appoint_type: status,
        appoint_status: "Pending",
        time: parseInt(time),
        symptom: symptom,
        cancle: false,
        patient: 5,
        doctor: param,
    };
    console.log("Info",info);

    // console.log("FormData",formData);
    fetch(`http://127.0.0.1:8000/appointment/list/`,{
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
        // body:formData,
    })
    .then((res)=>res.json())
    .then((data)=>{
    console.log("Appointment-",data);
    const modalid = document.getElementById('exampleModal');
    modalid.modal = 'hide';
    // $('#exampleModal').modal('hide');
    })
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
loadDoctor();