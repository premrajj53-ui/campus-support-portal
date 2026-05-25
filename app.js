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
