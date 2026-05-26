const mainPge =document.getElementById('portal-section');
const accessStudent = document.getElementById('accessPortal');
const accessAdmin = document.getElementById('accessAdmin');
const studentDashboard = document.getElementById('student-dashboard');
const adminSection = document.querySelector('.adminSection');
const adminDashboard =document.querySelector('.admin-dashboard')
const navBtns = document.querySelectorAll('.navBtn');
const raiseComplaintView = document.getElementById('raiseComplaintView');
const myComplaintView = document.getElementById('myComplaintView');
const backBtns=document.querySelectorAll('.back-btn');
const adminLogin = document.getElementById('adminLogin');
const loginBtn = document.querySelector('.loginBtn')
const logOut = document.querySelector('.logOut')
const adminUserBox = document.getElementById('adminId');
const adminPassBox = document.getElementById('adminPass');
const LoginForm = document.getElementById('loginForm'); 
accessStudent.addEventListener('click' ,event =>{
    event.preventDefault();
    mainPge.classList.add('hide');
    studentDashboard.classList.remove('hide');
})
navBtns[0].addEventListener('click', event => {
    

    navBtns[0].classList.add('activeBtn')
    navBtns[1].classList.remove('activeBtn')



    raiseComplaintView.classList.remove('hide')
        myComplaintView.classList.add('hide')


   
})
navBtns[1].addEventListener('click', event => {
    navBtns[1].classList.add('activeBtn')
    navBtns[0].classList.remove('activeBtn')

 myComplaintView.classList.remove('hide')
   raiseComplaintView.classList.add('hide')
     

 })
 function goBackToHome() {
    mainPge.classList.remove('hide');
    studentDashboard.classList.add('hide');
    adminSection.classList.add('hide'); 
}
 backBtns.forEach(button => {
    button.addEventListener('click', goBackToHome);
});
 accessAdmin.addEventListener('click',event =>{
   event.preventDefault();
   mainPge.classList.add('hide');
    adminSection.classList.remove('hide');
    adminLogin.classList.remove('hide');
    adminDashboard.classList.add('hide');


 })
 const togglePassword = document.getElementById('togglePassword');
 togglePassword.addEventListener('click', () => {

    if (adminPassBox.type === 'password') {
        adminPassBox.type = 'text';
        togglePassword.textContent = '🙈'; 
    } else {
        adminPassBox.type = 'password';
        togglePassword.textContent = '👁️'; 
    }
});
LoginForm.addEventListener('submit', event => { 
    
    event.preventDefault();
    const enteredUser = adminUserBox.value.trim();
    const enteredPass = adminPassBox.value.trim();


    if (enteredUser === 'admin' && enteredPass === 'admin123') {
        
        adminLogin.classList.add('hide');
        adminDashboard.classList.remove('hide');
        renderAdminComplaints();
        
    
        adminUserBox.value = '';
        adminPassBox.value = '';
    } else {
        
        alert("Incorrect Username or Password!");
    }
});
 logOut.addEventListener('click', event=>{
    adminDashboard.classList.add('hide')
    adminLogin.classList.remove('hide')
 })
 const complaintform = document.getElementById('complaintForm');
 const studentIdInput = document.getElementById('studentId');
const issueSubjectInput = document.getElementById('issueSubject');
const descriptionInput = document.getElementById('Description');
const studentComplaintsList = document.getElementById('studentComplaintsList');
const adminComplaintsList = document.getElementById('adminComplaintsList');
const searchBtn = document.getElementById('searchBtn');
const searchStudentId = document.getElementById('searchStudentId');
let masterComplaints = JSON.parse(localStorage.getItem('campusComplaints')) || [];

function StatusColor(status) {
    const statusLower = status.toLowerCase();
    const colors = {
        'pending': 'orange',
        'resolved': 'green',
        'rejected': 'red'
    };
    return colors[statusLower] || 'gray';
}

function capitalizeStatus(status) {
    return status.charAt(0).toUpperCase() + status.slice(1);
}
function saveAndRenderData() {
    localStorage.setItem('campusComplaints', JSON.stringify(masterComplaints));
renderAdminComplaints();
}
complaintform.addEventListener('submit', event => {
    event.preventDefault();
    const newComplaint = {
        id: '#' + Math.floor(Math.random() * 10000), 
        studentId: studentIdInput.value.trim(), 
        title: issueSubjectInput.value,
        description: descriptionInput.value,
        status: 'pending', 
        date: new Date().toLocaleDateString()
    };
    masterComplaints.push(newComplaint);
    saveAndRenderData();
    updateDashboard();

    searchStudentId.value = newComplaint.studentId;
       complaintform.reset();
       navBtns[1].click();
       searchBtn.click();
}
    );
     
    
    searchBtn.addEventListener('click', () => {
    const targetId = searchStudentId.value.trim();
    studentComplaintsList.innerHTML = '';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Tracking No.</th>
            <th>Complaint Title</th>
            <th>Date</th>
            <th>Status</th>
        </tr>
    `;
    studentComplaintsList.appendChild(thead);

    const tbody = document.createElement('tbody');

    const myComplaints = masterComplaints.filter(complaint => complaint.studentId === targetId);

    if (myComplaints.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center;">No complaints yet</td></tr>`;
        studentComplaintsList.appendChild(tbody);
        return;
    }
    
    myComplaints.forEach(complaint => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${complaint.id}</td>
            <td>${complaint.title}</td>
            <td>${complaint.date}</td>
            <td><span style="color: ${StatusColor(complaint.status)}">${capitalizeStatus(complaint.status)}</span></td>
        `;
        tbody.appendChild(row);
    });

    studentComplaintsList.appendChild(tbody);
});
function renderAdminComplaints() {
    adminComplaintsList.innerHTML = '';
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Tracking No.</th>
            <th>Student Id</th>
            <th>Complaint Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    `;
    adminComplaintsList.appendChild(thead);

    const tbody = document.createElement('tbody');

    if (masterComplaints.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No complaints yet</td></tr>`;
        adminComplaintsList.appendChild(tbody);
        return;
    }

    masterComplaints.forEach((complaint, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${complaint.id}</td>
            <td>${complaint.studentId}</td>
            <td>${complaint.title}</td>
            <td>${complaint.date}</td>
            <td><span style="color: ${StatusColor(complaint.status)}">${capitalizeStatus(complaint.status)}</span></td>
            <td><button class="viewBtn" data-index="${index}">View</button></td>
        `;
        tbody.appendChild(row);
    });

    adminComplaintsList.appendChild(tbody);
    attachViewButtonEvents();
}

function attachViewButtonEvents() {
    const viewButtons = document.querySelectorAll('.viewBtn');
    viewButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const index = button.getAttribute('data-index');
            const complaint = masterComplaints[index];
            showComplaintDetails(complaint, index);
        });
    });
}

function showComplaintDetails(complaint, index) {
    const modal = document.getElementById('complaintDetailModal');
    document.getElementById('detailTrackingNo').textContent = complaint.id;
    document.getElementById('detailStudentId').textContent = complaint.studentId;
    document.getElementById('detailTitle').textContent = complaint.title;
    document.getElementById('detailDescription').textContent = complaint.description;
    document.getElementById('detailDate').textContent = complaint.date;
    document.getElementById('detailStatus').textContent = complaint.status;
    
    modal.classList.remove('hide');
    
    attachModalButtonEvents(index);
}

function attachModalButtonEvents(index) {
    const modal = document.getElementById('complaintDetailModal');
    const resolveBtn = document.querySelector('.resolveBtn');
    const rejectBtn = document.querySelector('.rejectBtn');
    const cancelBtn = document.querySelector('.cancelBtn');
    const closeBtn = document.querySelector('.closeModal');
    
    resolveBtn.onclick = () => updateComplaintStatus(index, 'resolved');
    rejectBtn.onclick = () => updateComplaintStatus(index, 'rejected');
    cancelBtn.onclick = () => closeModal();
    closeBtn.onclick = () => closeModal();
}

function updateComplaintStatus(index, status) {
    masterComplaints[index].status = status;
    saveAndRenderData();
    closeModal();
    updateDashboard();
}

function closeModal() {
    const modal = document.getElementById('complaintDetailModal');
    modal.classList.add('hide');
}
function updateDashboard() {
    const complaints = masterComplaints;
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'pending').length;
  const resolved = complaints.filter(c => c.status === 'resolved').length;

  
  document.getElementById('total').textContent = total;
  document.getElementById('pending').textContent = pending;
  document.getElementById('resolved').textContent = resolved;
}


updateDashboard();