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
 loginBtn.addEventListener('click' ,event=>{
   event.preventDefault()
    adminLogin.classList.add('hide');
    adminDashboard.classList.remove('hide')


 } )
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
        status: 'Pending', 
        date: new Date().toLocaleDateString()
    };
    masterComplaints.push(newComplaint);
    saveAndRenderData();
 
    searchStudentId.value = newComplaint.studentId;
       complaintform.reset();
       navBtns[1].click();
       searchBtn.click();
}
    );
    
    searchBtn.addEventListener('click', () => {
    const targetId = searchStudentId.value.trim();
    studentComplaintsList.innerHTML = ''; 

    
    const myComplaints = masterComplaints.filter(complaint => complaint.studentId === targetId);

    if (myComplaints.length === 0) {
        studentComplaintsList.innerHTML = `<tr><td colspan="3" style="text-align: center;">No complaints found for ID: ${targetId}</td></tr>`;
        return; 
    }

    myComplaints.forEach(complaint => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${complaint.id}</td>
            <td>${complaint.title}</td>
            <td>${complaint.date}</td>
            <td><span style="color: ${complaint.status === 'Pending' ? 'orange' : 'green'}">${complaint.status}</span></td>
        `;
        studentComplaintsList.appendChild(row);
    });
});
function renderAdminComplaints() {
    adminComplaintsList.innerHTML = '';
    masterComplaints.forEach(complaint => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${complaint.id}</td>
            <td>${complaint.studentId}</td>
            <td>${complaint.title}</td>
            <td>${complaint.date}</td>
            <td><span style="color: ${complaint.status === 'Pending' ? 'orange' : 'green'}">${complaint.status}</span></td>
        `;
        adminComplaintsList.appendChild(row);
    });
}