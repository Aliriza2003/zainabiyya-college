// app.js
const firebaseConfig = {
  apiKey: "AIzaSyBCEXwWHF1SyhPDMUdkP0tEkzy7EDTZZw0",
  authDomain: "zainabiyya-db.firebaseapp.com",
  projectId: "zainabiyya-db",
  storageBucket: "zainabiyya-db.firebasestorage.app",
  messagingSenderId: "947350103539",
  appId: "1:947350103539:web:5e06a5bafb8c2ff8109e86",
  measurementId: "G-Y3R3N7MQMM"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence().catch((err) => {
    if (err.code == 'failed-precondition') {
        console.warn('Persistence failed: Multiple tabs open');
    } else if (err.code == 'unimplemented') {
        console.warn('Persistence not supported by this browser');
    }
});

// DOM Elements



// Auth Flow
if (sessionStorage.getItem('isLoggedIn') !== 'true' || sessionStorage.getItem('loggedInModule') !== 'student') {
    window.location.replace('index.html');
}

window.addEventListener('pageshow', function(event) {
    if (event.persisted || sessionStorage.getItem('isLoggedIn') !== 'true' || sessionStorage.getItem('loggedInModule') !== 'student') {
        if (sessionStorage.getItem('isLoggedIn') !== 'true') {
            window.location.replace('index.html');
        }
    }
});

window.logout = function() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('loggedInModule');
    window.location.replace('index.html');
};

const enrollModal = document.getElementById('enrollModal');
const form = document.getElementById('studentForm');

window.openEnrollModal = function() {
    enrollModal.classList.remove('hidden');
    enrollModal.classList.add('flex');
};

window.closeEnrollModal = function() {
    enrollModal.classList.add('hidden');
    enrollModal.classList.remove('flex');
    form.reset();
};
const admissionNoInput = document.getElementById('admissionNo');
const photoInput = document.getElementById('photo');
const fullNameInput = document.getElementById('fullName');
const gradeInput = document.getElementById('grade');
const parentContactInput = document.getElementById('parentContact');
const admissionDateInput = document.getElementById('admissionDate');
const nicInput = document.getElementById('nic');
const addressInput = document.getElementById('address');
const dobInput = document.getElementById('dob');
const studentNoteInput = document.getElementById('studentNote');
const studentList = document.getElementById('studentList');
const emptyState = document.getElementById('emptyState');
const studentCount = document.getElementById('studentCount');
const searchInput = document.getElementById('searchInput');
const notification = document.getElementById('notification');

let currentDeleteId = null;
const deleteModal = document.getElementById('deleteModal');
const deleteModalContent = document.getElementById('deleteModalContent');
const deleteStudentName = document.getElementById('deleteStudentName');

// Edit Elements
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editAdmissionNo = document.getElementById('editAdmissionNo');
const editFullName = document.getElementById('editFullName');
const editGrade = document.getElementById('editGrade');
const editContact = document.getElementById('editContact');
const editAdmissionDate = document.getElementById('editAdmissionDate');
const editNic = document.getElementById('editNic');
const editAddress = document.getElementById('editAddress');
const editDob = document.getElementById('editDob');
const editPhoto = document.getElementById('editPhoto');
const editPhotoPreview = document.getElementById('editPhotoPreview');
const editNote = document.getElementById('editNote');

// Exams Elements
const examsModal = document.getElementById('examsModal');
const addExamForm = document.getElementById('addExamForm');
const examStudentName = document.getElementById('examStudentName');
const addExamAdmissionNo = document.getElementById('addExamAdmissionNo');
const newExamCategory = document.getElementById('newExamCategory');
const newExamDate = document.getElementById('newExamDate');
const subjectsContainer = document.getElementById('subjectsContainer');
const addSubjectBtn = document.getElementById('addSubjectBtn');
const examTbody = document.getElementById('examTbody');

const examTypeSelect = document.getElementById('examType');
const examCategoryLabel = document.getElementById('examCategoryLabel');
const subjectsLabel = document.getElementById('subjectsLabel');
const examMetaFields = document.getElementById('examMetaFields');
const examYearContainer = document.getElementById('examYearContainer');
const newExamYear = document.getElementById('newExamYear');

// Profile Elements
const profileModal = document.getElementById('profileModal');
const profilePhoto = document.getElementById('profilePhoto');
const profileAvatarFallback = document.getElementById('profileAvatarFallback');
const profileName = document.getElementById('profileName');
const profileGrade = document.getElementById('profileGrade');
const profileContact = document.getElementById('profileContact');
const profileAdmissionDate = document.getElementById('profileAdmissionDate');
const profileNic = document.getElementById('profileNic');
const profileAddress = document.getElementById('profileAddress');
const profileDob = document.getElementById('profileDob');
const profileNote = document.getElementById('profileNote');
const marksChartCanvas = document.getElementById('marksChart');
const noExamsMessage = document.getElementById('noExamsMessage');
const profileExamsTbody = document.getElementById('profileExamsTbody');
const noExamsTableMessage = document.getElementById('noExamsTableMessage');
const profileDocsTbody = document.getElementById('profileDocsTbody');
const noDocsMessage = document.getElementById('noDocsMessage');

// Docs Elements
const docsModal = document.getElementById('docsModal');
const addDocForm = document.getElementById('addDocForm');
const docStudentName = document.getElementById('docStudentName');
const addDocAdmissionNo = document.getElementById('addDocAdmissionNo');
const newDocName = document.getElementById('newDocName');
const newDocFile = document.getElementById('newDocFile');
const docTbody = document.getElementById('docTbody');

// Fees Elements
const feesModal = document.getElementById('feesModal');
const feeStudentName = document.getElementById('feeStudentName');
const addFeeAdmissionNo = document.getElementById('addFeeAdmissionNo');
const addFeeForm = document.getElementById('addFeeForm');
const newFeeMonth = document.getElementById('newFeeMonth');
const newFeeDate = document.getElementById('newFeeDate');
const newFeeAmount = document.getElementById('newFeeAmount');
const feeTbody = document.getElementById('feeTbody');
const profileFeesTbody = document.getElementById('profileFeesTbody');
const noFeesMessage = document.getElementById('noFeesMessage');

let currentChart = null;

// Live Clock
const liveDateTime = document.getElementById('liveDateTime');
function updateClock() {
    if (!liveDateTime) return;
    const now = new Date();
    
    const optionsDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', optionsDate);
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    const timeStr = `${hours}:${minutes}:${seconds} ${ampm}`;
    
    liveDateTime.textContent = `${dateStr}  |  ${timeStr}`;
}

setInterval(updateClock, 1000);
updateClock();

// Load Data on startup
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loadStudents());
} else {
    loadStudents();
}

function fileToBase64(file) {
    if (!file) return Promise.resolve(null);
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 500;
                const MAX_HEIGHT = 500;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                resolve(dataUrl);
            };
            img.onerror = error => reject(error);
            img.src = event.target.result;
        };
        reader.onerror = error => reject(error);
    });
}

// Handle Form Submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let photoBase64 = null;
    if (photoInput.files.length > 0) {
        photoBase64 = await fileToBase64(photoInput.files[0]);
    }

    const exams = [];


    const student = {
        admission_no: parseInt(admissionNoInput.value),
        photo: photoBase64,
        full_name: fullNameInput.value.trim(),
        grade: gradeInput.value,
        parent_contact: parentContactInput.value.trim(),
        admission_date: admissionDateInput.value,
        nic: nicInput.value.trim(),
        address: addressInput.value.trim(),
        dob: dobInput.value,
        note: studentNoteInput.value.trim(),
        exams: exams,
        fees: []
    };

    try {
        const docRef = db.collection("students").doc(student.admission_no.toString());
        const existingDoc = await docRef.get();
        if (existingDoc.exists) {
            showNotification(`Admission No "${student.admission_no}" already exists!`, 'error');
            return;
        }
        await docRef.set(student);
        
        showNotification(`Student successfully registered!`, 'success');
        closeEnrollModal();
        loadStudents();
    } catch (error) {
        showNotification(`An error occurred: ${error.message}`, 'error');
    }
});

// Real-time search
searchInput.addEventListener('input', (e) => {
    loadStudents(e.target.value.toLowerCase());
});

// Load Students from DB
async function loadStudents(query = '') {
    try {
        const querySnapshot = await db.collection("students").get();
        let students = [];
        querySnapshot.forEach((doc) => {
            students.push(doc.data());
        });

        if (query) {
            students = students.filter(student => {
                return (
                    student.full_name.toLowerCase().includes(query) ||
                    student.grade.toLowerCase().includes(query) ||
                    student.admission_no.toString().includes(query) ||
                    (student.parent_contact && student.parent_contact.includes(query)) ||
                    (student.nic && student.nic.toLowerCase().includes(query))
                );
            });
        }
        
        students.sort((a,b) => b.admission_no - a.admission_no);

        renderStudents(students);
    } catch (error) {
        console.error("Failed to load students:", error);
    }
}

function getInitials(name) {
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

function getAvatarClass(name) {
    const colors = [
        'bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700',
        'bg-green-100 text-green-700', 'bg-orange-100 text-orange-700',
        'bg-pink-100 text-pink-700', 'bg-brand-100 text-brand-700'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
}

// Render Students to Table
function renderStudents(students) {
    studentList.innerHTML = '';
    studentCount.textContent = students.length;

    if (students.length === 0) {
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
    } else {
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');

        students.forEach(student => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50/80 group transition-colors';
            
            const avatarClass = getAvatarClass(student.full_name);
            const initials = getInitials(student.full_name) || '?';
            
            const avatarHTML = student.photo 
                ? `<img src="${student.photo}" class="w-10 h-10 rounded-full object-cover shadow-sm cursor-pointer hover:ring-2 hover:ring-brand-500 transition-all" alt="Avatar" onclick="if(this.src && !this.src.includes('placeholder')) window.openImageViewer(this.src)">`
                : `<div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${avatarClass}">${initials}</div>`;

            const examCount = student.exams ? student.exams.length : 0;
            const numericExams = student.exams ? student.exams.filter(e => !isNaN(parseFloat(e.marks))) : [];
            const avgMarks = numericExams.length > 0 
                ? (numericExams.reduce((sum, e) => sum + parseFloat(e.marks), 0) / numericExams.length).toFixed(1) 
                : '-';

            const noteHTML = '';

            tr.innerHTML = `
                <td class="py-4 px-5 text-sm font-bold text-gray-900 border-b border-gray-50">#${student.admission_no}</td>
                <td class="py-4 px-5 border-b border-gray-50">
                    <div class="flex items-center gap-3">
                        ${avatarHTML}
                        <div>
                            <button onclick="viewStudentProfile(${student.admission_no})" class="text-sm font-semibold text-brand-600 hover:text-brand-800 text-left transition-colors">${student.full_name}</button>
                            
                        </div>
                    </div>
                </td>
                <td class="py-4 px-5 border-b border-gray-50">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                        ${student.grade}
                    </span>
                </td>
                <td class="py-4 px-5 text-sm font-medium text-gray-600 border-b border-gray-50">
                    <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        ${student.parent_contact}
                    </div>
                </td>
                <td class="py-4 px-5 border-b border-gray-50">
                    <div class="flex flex-col gap-2 items-start">
                        <span class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                            ${examCount} Exams
                        </span>
                        <span class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                            ${student.docs ? student.docs.length : 0} Docs
                        </span>
                    </div>
                </td>
                <td class="py-4 px-5 text-right border-b border-gray-50">
                    <div class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                        <button onclick="openDocsModal(${student.admission_no})" class="text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 p-2 rounded-xl transition-all" title="Manage Documents">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                        </button>
                        <button onclick="openExamsModal(${student.admission_no})" class="text-brand-500 hover:text-brand-700 hover:bg-brand-50 p-2 rounded-xl transition-all" title="Manage Exams">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </button>
                        <button onclick="openFeesModal(${student.admission_no})" class="text-green-500 hover:text-green-700 hover:bg-green-50 p-2 rounded-xl transition-all" title="Manage Fees">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                        <button onclick="openEditModal(${student.admission_no})" class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all" title="Edit Student">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button onclick="promptDelete(${student.admission_no}, '${student.full_name.replace(/'/g, "\\'")}')" class="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all" title="Remove Student">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </td>
            `;
            studentList.appendChild(tr);
        });
    }
}

let notificationTimeoutId = null;

function showNotification(message, type, undoCallback = null) {
    if (notificationTimeoutId) clearTimeout(notificationTimeoutId);
    notification.innerHTML = '';
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'shrink-0 mt-0.5';
    const textWrapper = document.createElement('div');
    textWrapper.className = 'flex-1 font-semibold text-sm';
    
    if (type === 'success') {
        iconWrapper.innerHTML = `<svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
        notification.className = 'fixed top-6 right-6 z-[100] max-w-sm w-full transition-all duration-300 transform translate-y-[-10px] shadow-xl flex items-center gap-3 p-4 rounded-2xl border bg-white border-green-100 text-gray-800 hidden opacity-0';
    } else {
        iconWrapper.innerHTML = `<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
        notification.className = 'fixed top-6 right-6 z-[100] max-w-sm w-full transition-all duration-300 transform translate-y-[-10px] shadow-xl flex items-center gap-3 p-4 rounded-2xl border bg-white border-red-100 text-gray-800 hidden opacity-0';
    }
    textWrapper.textContent = message;
    notification.appendChild(iconWrapper);
    notification.appendChild(textWrapper);

    if (undoCallback) {
        const undoBtn = document.createElement('button');
        undoBtn.className = 'shrink-0 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-lg transition-colors border border-gray-200';
        undoBtn.textContent = 'Undo';
        undoBtn.onclick = () => {
            undoCallback();
            notification.style.opacity = 0;
            notification.style.transform = 'translateY(-10px)';
            setTimeout(() => notification.classList.add('hidden'), 300);
            if (notificationTimeoutId) clearTimeout(notificationTimeoutId);
        };
        notification.appendChild(undoBtn);
    }
    
    notification.classList.remove('hidden');
    // slight delay to trigger css transition
    setTimeout(() => {
        notification.style.opacity = 1;
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    const displayDuration = undoCallback ? 5000 : 4000;
    notificationTimeoutId = setTimeout(() => {
        notification.style.opacity = 0;
        notification.style.transform = 'translateY(-10px)';
        setTimeout(() => notification.classList.add('hidden'), 300);
    }, displayDuration);
}

// Delete Flow
window.promptDelete = function(id, name) {
    currentDeleteId = id;
    deleteStudentName.textContent = name;
    deleteModal.classList.remove('hidden');
    deleteModal.classList.add('flex');
};

window.closeDeleteModal = function() {
    deleteModal.classList.add('hidden');
    deleteModal.classList.remove('flex');
    currentDeleteId = null;
}

document.getElementById('cancelBtn').addEventListener('click', closeDeleteModal);
document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
    if (currentDeleteId) {
        // Fetch student data before deletion for potential undo
        const studentToRestore = (await db.collection("students").doc(currentDeleteId.toString()).get()).data();
        
        await db.collection("students").doc(currentDeleteId.toString()).delete();
        
        showNotification('Student record removed successfully.', 'success', async () => {
             // Undo Delete Action
             if(studentToRestore) {
                 await db.collection("students").doc(studentToRestore.admission_no.toString()).set(studentToRestore);
                 showNotification('Student restored.', 'success');
                 loadStudents(searchInput.value.toLowerCase());
             }
        });
        
        closeDeleteModal();
        loadStudents(searchInput.value.toLowerCase());
    }
});

// Edit Flow
window.openEditModal = async function(id) {
    const student = (await db.collection("students").doc(id.toString()).get()).data();
    if(student) {
        editAdmissionNo.value = student.admission_no;
        editFullName.value = student.full_name;
        editGrade.value = student.grade;
        editContact.value = student.parent_contact;
        editAdmissionDate.value = student.admission_date || '';
        editNic.value = student.nic || '';
        editAddress.value = student.address || student.city || '';
        editDob.value = student.dob || '';
        editNote.value = student.note || '';
        editPhotoPreview.src = student.photo || '';
        editPhotoPreview.classList.toggle('hidden', !student.photo);
        
        editModal.classList.remove('hidden');
        editModal.classList.add('flex');
    }
};

window.closeEditModal = function() {
    editModal.classList.add('hidden');
    editModal.classList.remove('flex');
    editForm.reset();
}

editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(editAdmissionNo.value);
    const student = (await db.collection("students").doc(id.toString()).get()).data();
    
    student.full_name = editFullName.value.trim();
    student.grade = editGrade.value;
    student.parent_contact = editContact.value.trim();
    student.admission_date = editAdmissionDate.value;
    student.nic = editNic.value.trim();
    student.address = editAddress.value.trim();
    student.dob = editDob.value;
    student.note = editNote.value.trim();

    if (editPhoto.files.length > 0) {
        student.photo = await fileToBase64(editPhoto.files[0]);
    }

    await db.collection("students").doc(student.admission_no.toString()).set(student);
    showNotification('Student updated successfully!', 'success');
    closeEditModal();
    loadStudents(searchInput.value.toLowerCase());
});

// Profile Flow
window.viewStudentProfile = async function(id) {
    window.currentProfileId = id;
    const student = (await db.collection("students").doc(id.toString()).get()).data();
    if(!student) return;

    profileName.textContent = student.full_name;
    profileGrade.textContent = student.grade;
    profileContact.textContent = student.parent_contact;
    profileAdmissionDate.textContent = student.admission_date || '-';
    profileNic.textContent = student.nic || '-';
    profileAddress.textContent = student.address || student.city || '-';
    let dobText = student.dob || '-';
    if(student.dob) {
        const birthDate = new Date(student.dob);
        if(!isNaN(birthDate)) {
            let age = new Date().getFullYear() - birthDate.getFullYear();
            const m = new Date().getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && new Date().getDate() < birthDate.getDate())) age--;
            if(age >= 0) dobText += ` (${age} Years)`;
        }
    }
    profileDob.textContent = dobText;
    profileNote.textContent = student.note || '-';

    if (student.photo) {
        profilePhoto.src = student.photo;
        profilePhoto.classList.remove('hidden');
        profileAvatarFallback.classList.add('hidden');
    } else {
        profilePhoto.classList.add('hidden');
        const names = student.full_name.split(' ');
        const initials = names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
        profileAvatarFallback.textContent = initials.toUpperCase();
        profileAvatarFallback.classList.remove('hidden');
    }

    // Render profile docs table records
    profileDocsTbody.innerHTML = '';
    if (!student.docs || student.docs.length === 0) {
        profileDocsTbody.parentElement.classList.add('hidden');
        noDocsMessage.classList.remove('hidden');
    } else {
        profileDocsTbody.parentElement.classList.remove('hidden');
        noDocsMessage.classList.add('hidden');
        
        student.docs.forEach(doc => {
            const tr = document.createElement('tr');
            let isPdf = false;
            if (doc.file) {
                if (doc.file.startsWith('data:application/pdf')) isPdf = true;
                else if (doc.file.toLowerCase().includes('.pdf?')) isPdf = true;
                else if (doc.storagePath && doc.storagePath.toLowerCase().endsWith('.pdf')) isPdf = true;
                else if (doc.name && doc.name.toLowerCase().endsWith('.pdf')) isPdf = true;
            }
            
            tr.innerHTML = `
                <td class="py-3 px-4 font-medium text-gray-700 pl-4 border-t border-gray-50">
                    ${doc.name}
                </td>
                <td class="py-3 px-4 text-right border-t border-gray-50">
                    ${isPdf 
                        ? `<button onclick="window.open('${doc.file}', '_blank')" class="text-brand-600 font-semibold hover:underline">View PDF</button>` 
                        : `<button onclick="window.openImageViewer('${doc.file}')" class="text-brand-600 font-semibold hover:underline">View Image</button>`
                    }
                </td>
            `;
            profileDocsTbody.appendChild(tr);
        });
    }

    if (currentChart) {
        currentChart.destroy();
    }

    const chartExams = student.exams ? student.exams.filter(e => !isNaN(parseFloat(e.marks))) : [];

    if (chartExams.length === 0) {
        marksChartCanvas.parentElement.classList.add('hidden');
        noExamsMessage.textContent = (!student.exams || student.exams.length === 0) ? 'No exam records to display.' : 'No numerical marks to display on chart.';
        noExamsMessage.classList.remove('hidden');
    } else {
        marksChartCanvas.parentElement.classList.remove('hidden');
        noExamsMessage.classList.add('hidden');
        
        const ctx = marksChartCanvas.getContext('2d');
        currentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartExams.map(e => (e.category || e.name) + (e.subject ? ' - ' + e.subject : '')),
                datasets: [{
                    label: 'Exam Marks',
                    data: chartExams.map(e => parseFloat(e.marks)),
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.5)',
                    borderWidth: 2,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1f2937',
                        padding: 12,
                        titleFont: { size: 14, family: 'Outfit' },
                        bodyFont: { size: 13, family: 'Outfit' },
                        displayColors: false,
                        callbacks: {
                            label: function(context) { return 'Marks: ' + context.parsed.y; }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: '#f3f4f6', drawBorder: false },
                        ticks: { font: { family: 'Outfit' }, color: '#6b7280' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: 'Outfit' }, color: '#6b7280' }
                    }
                }
            }
        });
    }

    // Render profile exams table records
    profileExamsTbody.innerHTML = '';
    if (!student.exams || student.exams.length === 0) {
        profileExamsTbody.parentElement.classList.add('hidden');
        noExamsTableMessage.classList.remove('hidden');
    } else {
        profileExamsTbody.parentElement.classList.remove('hidden');
        noExamsTableMessage.classList.add('hidden');
        
        const groupedExamsProfile = {};
        student.exams.forEach(exam => {
            const cat = exam.category || exam.name || 'Uncategorized';
            if (!groupedExamsProfile[cat]) {
                groupedExamsProfile[cat] = { subjects: [] };
            }
            groupedExamsProfile[cat].subjects.push(exam);
        });

        Object.keys(groupedExamsProfile).sort().forEach(cat => {
            const group = groupedExamsProfile[cat];
            
            const headerTr = document.createElement('tr');
            headerTr.className = 'bg-brand-50/30';
            headerTr.innerHTML = `
                <td colspan="2" class="py-3 px-4 font-bold text-brand-800 text-sm border-t border-brand-100 bg-brand-50/50">
                    ${cat}
                </td>
            `;
            profileExamsTbody.appendChild(headerTr);

            group.subjects.forEach(exam => {
                const tr = document.createElement('tr');
                const isPassing = (!isNaN(parseFloat(exam.marks)) && parseFloat(exam.marks) >= 50) || ['A', 'B', 'C', 'S'].includes(String(exam.marks).toUpperCase());
                const markClass = isPassing ? 'text-green-600' : 'text-red-600';
                const subjectDateNode = exam.date ? ` <span class="text-xs text-gray-400 font-normal ml-2">(${exam.date})</span>` : '';

                tr.innerHTML = `
                    <td class="py-3 px-4 font-medium text-gray-700 pl-8 relative border-t border-gray-50">
                        <div class="absolute left-4 top-1/2 -mt-[5px] w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                        ${exam.subject || '-'}${subjectDateNode}
                    </td>
                    <td class="py-3 px-4 text-right font-bold ${markClass} border-t border-gray-50">${exam.marks}</td>
                `;
                profileExamsTbody.appendChild(tr);
            });
        });
    }

    profileModal.classList.remove('hidden');
    profileModal.classList.add('flex');
    
    // Render profile fee records
    profileFeesTbody.innerHTML = '';
    if (!student.fees || student.fees.length === 0) {
        profileFeesTbody.parentElement.classList.add('hidden');
        noFeesMessage.classList.remove('hidden');
    } else {
        profileFeesTbody.parentElement.classList.remove('hidden');
        noFeesMessage.classList.add('hidden');
        
        const sortedFees = [...student.fees].sort((a,b) => new Date(b.month) - new Date(a.month));
        sortedFees.forEach(fee => {
            const monthDate = new Date(fee.month + "-01");
            const monthStr = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="py-3 px-4 font-semibold text-gray-800">${monthStr}</td>
                <td class="py-3 px-4 text-gray-600">${fee.date}</td>
                <td class="py-3 px-4 text-right font-bold text-gray-800">Rs. ${parseFloat(fee.amount).toFixed(2)}</td>
            `;
            profileFeesTbody.appendChild(tr);
        });
    }
}

window.closeProfileModal = function() {
    profileModal.classList.add('hidden');
    profileModal.classList.remove('flex');
}

// Fees Flow
window.openFeesModal = async function(id) {
    const student = (await db.collection("students").doc(id.toString()).get()).data();
    if(student) {
        addFeeAdmissionNo.value = student.admission_no;
        feeStudentName.textContent = student.full_name;
        newFeeDate.valueAsDate = new Date();
        renderFees(student);
        feesModal.classList.remove('hidden');
        feesModal.classList.add('flex');
    }
};

window.closeFeesModal = function() {
    feesModal.classList.add('hidden');
    feesModal.classList.remove('flex');
    addFeeForm.reset();
}

function renderFees(student) {
    feeTbody.innerHTML = '';
    if (!student.fees || student.fees.length === 0) {
        feeTbody.innerHTML = '<tr><td colspan="4" class="py-4 text-center text-gray-500">No fee records added yet.</td></tr>';
        return;
    }
    
    const sortedFees = [...student.fees].sort((a,b) => new Date(b.month) - new Date(a.month));

    sortedFees.forEach(fee => {
        const tr = document.createElement('tr');
        const monthDate = new Date(fee.month + "-01");
        const monthStr = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        
        tr.innerHTML = `
            <td class="py-3 px-4 font-semibold text-gray-800">${monthStr}</td>
            <td class="py-3 px-4 text-gray-600">${fee.date}</td>
            <td class="py-3 px-4 font-bold text-green-600">Rs. ${parseFloat(fee.amount).toFixed(2)}</td>
            <td class="py-3 px-4 text-right">
                <button onclick="deleteFee(${student.admission_no}, ${fee.id})" class="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </td>
        `;
        feeTbody.appendChild(tr);
    });
}

addFeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(addFeeAdmissionNo.value);
    const student = (await db.collection("students").doc(id.toString()).get()).data();
    
    if(!student.fees) student.fees = [];
    student.fees.push({
        id: Date.now(),
        month: newFeeMonth.value,
        date: newFeeDate.value,
        amount: parseFloat(newFeeAmount.value) || 0
    });
    
    await db.collection("students").doc(student.admission_no.toString()).set(student);
    addFeeForm.reset();
    newFeeDate.valueAsDate = new Date(); // prep next entry if they want to add another right away
    renderFees(student);
});

window.deleteFee = async function(studentId, feeId) {
    const student = (await db.collection("students").doc(studentId.toString()).get()).data();
    if(student && student.fees) {
        student.fees = student.fees.filter(f => f.id !== feeId);
        await db.collection("students").doc(student.admission_no.toString()).set(student);
        renderFees(student);
    }
};

// Exams Flow
examTypeSelect?.addEventListener('change', () => {
    const isNational = examTypeSelect.value === 'national';
    if (isNational) {
        examYearContainer.classList.remove('hidden');
        examMetaFields.classList.remove('grid-cols-1');
        examMetaFields.classList.add('grid-cols-2');
        examCategoryLabel.textContent = 'Exam Type (e.g. O/L)';
        if(window.newExamCategory) window.newExamCategory.placeholder = 'e.g. O/L or A/L';
        subjectsLabel.textContent = 'Subjects & Grades';
        
        document.querySelectorAll('.subject-marks').forEach(input => {
            input.type = 'text';
            input.placeholder = 'Grade';
            input.removeAttribute('step');
        });
        document.querySelectorAll('.subject-date').forEach(input => {
            input.classList.add('hidden');
            input.required = false;
        });
    } else {
        examYearContainer.classList.add('hidden');
        examMetaFields.classList.remove('grid-cols-2');
        examMetaFields.classList.add('grid-cols-1');
        examCategoryLabel.textContent = 'Exam Category';
        if(window.newExamCategory) window.newExamCategory.placeholder = 'e.g. 1st Term';
        subjectsLabel.textContent = 'Subjects & Marks';
        
        document.querySelectorAll('.subject-marks').forEach(input => {
            input.type = 'number';
            input.placeholder = 'Marks';
            input.step = '0.01';
        });
        document.querySelectorAll('.subject-date').forEach(input => {
            input.classList.remove('hidden');
            input.required = false;
        });
    }
});

window.openExamsModal = async function(id) {
    const student = (await db.collection("students").doc(id.toString()).get()).data();
    if(student) {
        addExamAdmissionNo.value = student.admission_no;
        examStudentName.textContent = student.full_name;
        if(examTypeSelect) {
            examTypeSelect.value = 'term';
            examTypeSelect.dispatchEvent(new Event('change'));
        }
        renderExams(student);
        examsModal.classList.remove('hidden');
        examsModal.classList.add('flex');
    }
};

window.closeExamsModal = function() {
    examsModal.classList.add('hidden');
    examsModal.classList.remove('flex');
    addExamForm.reset();
    resetSubjectsContainer();
}

function resetSubjectsContainer() {
    const isNational = examTypeSelect && examTypeSelect.value === 'national';
    const inputType = isNational ? 'text' : 'number';
    const placeholder = isNational ? 'Grade' : 'Marks';
    const stepAttr = isNational ? '' : 'step="0.01"';
    const dateClass = isNational ? 'hidden' : '';

    subjectsContainer.innerHTML = `
        <div class="flex gap-2 items-center subject-row">
            <input type="date" class="subject-date ${dateClass} w-32 px-2 py-2 rounded-lg border border-white focus:border-brand-500 font-medium text-xs text-gray-700 outline-none">
            <input type="text" required placeholder="Subject (e.g. Maths)" class="subject-name flex-1 px-3 py-2 rounded-lg border border-white focus:border-brand-500 font-medium text-sm">
            <input type="${inputType}" ${stepAttr} required placeholder="${placeholder}" class="subject-marks w-28 px-3 py-2 rounded-lg border border-white focus:border-brand-500 font-medium text-sm">
            <button type="button" class="remove-subject text-gray-300 p-1 cursor-not-allowed font-bold text-lg leading-none" disabled>
                &times;
            </button>
        </div>
    `;
}

addSubjectBtn.addEventListener('click', () => {
    const isNational = examTypeSelect && examTypeSelect.value === 'national';
    const inputType = isNational ? 'text' : 'number';
    const placeholder = isNational ? 'Grade' : 'Marks';
    const stepAttr = isNational ? '' : 'step="0.01"';
    const dateClass = isNational ? 'hidden' : '';

    const row = document.createElement('div');
    row.className = 'flex gap-2 items-center subject-row';
    row.innerHTML = `
        <input type="date" class="subject-date ${dateClass} w-32 px-2 py-2 rounded-lg border border-gray-200 focus:border-brand-500 font-medium text-xs text-gray-700 outline-none">
        <input type="text" required placeholder="Subject" class="subject-name flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-brand-500 text-sm font-medium">
        <input type="${inputType}" ${stepAttr} required placeholder="${placeholder}" class="subject-marks w-28 px-3 py-2 rounded-lg border border-gray-200 focus:border-brand-500 text-sm font-medium">
        <button type="button" onclick="this.parentElement.remove()" class="remove-subject text-red-500 hover:text-red-700 p-1 font-bold text-lg leading-none transition-colors">
            &times;
        </button>
    `;
    subjectsContainer.appendChild(row);

    // Auto-scroll to the bottom of the container so the newly added subject is visible
    setTimeout(() => {
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 10);
});

function groupExamsByCategory(exams) {
    const grouped = {};
    if (!exams) return grouped;
    exams.forEach(exam => {
        const cat = exam.category || exam.name || 'Uncategorized';
        if (!grouped[cat]) {
            grouped[cat] = { subjects: [] };
        }
        grouped[cat].subjects.push(exam);
    });
    return grouped;
}

function renderExams(student) {
    examTbody.innerHTML = '';
    if (!student.exams || student.exams.length === 0) {
        examTbody.innerHTML = '<tr><td colspan="3" class="py-4 text-center text-gray-500">No exams added yet.</td></tr>';
        return;
    }
    
    const sortedExams = [...student.exams].sort((a,b) => b.id - a.id);
    const grouped = groupExamsByCategory(sortedExams);
    
    Object.keys(grouped).sort().forEach(cat => {
        const group = grouped[cat];
        
        const headerTr = document.createElement('tr');
        headerTr.className = "bg-brand-50/50";
        headerTr.innerHTML = `
            <td colspan="3" class="py-2 px-4 font-bold text-brand-800 text-sm border-t border-brand-100">
                ${cat}
            </td>
        `;
        examTbody.appendChild(headerTr);
        
        group.subjects.forEach(exam => {
            const tr = document.createElement('tr');
            const subjectDateNode = exam.date ? ` <span class="text-xs text-gray-400 font-normal ml-2">(${exam.date})</span>` : '';
            tr.innerHTML = `
                <td class="py-3 px-4 font-semibold text-gray-700 pl-8 relative border-t border-gray-50">
                    <div class="absolute left-4 top-1/2 -mt-[5px] w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                    ${exam.subject || '-'}${subjectDateNode}
                </td>
                <td class="py-3 px-4 font-bold ${(!isNaN(parseFloat(exam.marks)) && parseFloat(exam.marks) >= 50) || ['A', 'B', 'C', 'S'].includes(String(exam.marks).toUpperCase()) ? 'text-green-600' : 'text-red-600'} border-t border-gray-50">${exam.marks}</td>
                <td class="py-3 px-4 text-right border-t border-gray-50">
                    <div class="flex justify-end gap-1">
                        <button onclick="openEditExamModal(${student.admission_no}, ${exam.id})" class="text-brand-400 hover:text-brand-600 p-1.5 hover:bg-brand-50 rounded-lg transition-colors" title="Edit Result">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button onclick="deleteExam(${student.admission_no}, ${exam.id})" class="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Delete Result">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </td>
            `;
            examTbody.appendChild(tr);
        });
    });
}

addExamForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(addExamAdmissionNo.value);
    const student = (await db.collection("students").doc(id.toString()).get()).data();
    
    if(!student.exams) student.exams = [];
    
    const isNational = examTypeSelect && examTypeSelect.value === 'national';
    let category = window.newExamCategory.value.trim();
    if(isNational && newExamYear) {
        category = newExamYear.value + ' ' + category;
    }
    const rows = document.querySelectorAll('.subject-row');
    
    rows.forEach((row, index) => {
        const subject = row.querySelector('.subject-name').value.trim();
        const marks = row.querySelector('.subject-marks').value.trim();
        const dateInput = row.querySelector('.subject-date');
        const sDate = (dateInput && !dateInput.classList.contains('hidden')) ? dateInput.value : '';

        if(subject && marks !== '') {
            let finalMarks = marks;
            if(!isNaN(parseFloat(marks)) && isFinite(marks)) {
                finalMarks = parseFloat(marks);
            } else {
                finalMarks = marks.toUpperCase();
            }
            student.exams.push({
                id: Date.now() + index, // Add index to ensure unique IDs
                category: category,
                date: sDate,
                subject: subject,
                marks: finalMarks
            });
        }
    });
    
    await db.collection("students").doc(student.admission_no.toString()).set(student);
    addExamForm.reset();
    resetSubjectsContainer();
    renderExams(student);
    loadStudents(searchInput.value.toLowerCase());
});

// Edit Exam Flow
const editExamModal = document.getElementById('editExamModal');
const editExamRowForm = document.getElementById('editExamRowForm');
const editExamStudentId = document.getElementById('editExamStudentId');
const editExamId = document.getElementById('editExamId');
const editExamCategory = document.getElementById('editExamCategory');
const editExamSubject = document.getElementById('editExamSubject');
const editExamDate = document.getElementById('editExamDate');
const editExamMarks = document.getElementById('editExamMarks');

window.openEditExamModal = async function(studentId, examId) {
    const student = (await db.collection("students").doc(studentId.toString()).get()).data();
    if(student && student.exams) {
        const exam = student.exams.find(e => e.id === examId);
        if(exam) {
            editExamStudentId.value = studentId;
            editExamId.value = examId;
            editExamCategory.value = exam.category || '';
            editExamSubject.value = exam.subject || '';
            editExamDate.value = exam.date || '';
            editExamMarks.value = exam.marks === undefined ? '' : exam.marks;
            
            editExamModal.classList.remove('hidden');
            editExamModal.classList.add('flex');
        }
    }
};

window.closeEditExamModal = function() {
    editExamModal.classList.add('hidden');
    editExamModal.classList.remove('flex');
    editExamRowForm.reset();
}

editExamRowForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const studentId = editExamStudentId.value;
    const examId = parseInt(editExamId.value);
    
    const student = (await db.collection("students").doc(studentId.toString()).get()).data();
    if(student && student.exams) {
        const examIndex = student.exams.findIndex(e => e.id === examId);
        if(examIndex !== -1) {
            student.exams[examIndex].category = editExamCategory.value.trim();
            student.exams[examIndex].subject = editExamSubject.value.trim();
            student.exams[examIndex].date = editExamDate.value;
            const m = editExamMarks.value.trim();
            student.exams[examIndex].marks = (!isNaN(parseFloat(m)) && isFinite(m)) ? parseFloat(m) : m.toUpperCase();
            
            await db.collection("students").doc(student.admission_no.toString()).set(student);
            closeEditExamModal();
            renderExams(student);
            showNotification('Exam result updated!', 'success');
        }
    }
});

window.deleteExam = async function(studentId, examId) {
    const student = (await db.collection("students").doc(studentId.toString()).get()).data();
    if(student && student.exams) {
        student.exams = student.exams.filter(e => e.id !== examId);
        await db.collection("students").doc(student.admission_no.toString()).set(student);
        renderExams(student);
        loadStudents(searchInput.value.toLowerCase());
    }
};

// Docs Flow
window.openDocsModal = async function(id) {
    const student = (await db.collection("students").doc(id.toString()).get()).data();
    if(student) {
        addDocAdmissionNo.value = student.admission_no;
        docStudentName.textContent = student.full_name;
        renderDocs(student);
        docsModal.classList.remove('hidden');
        docsModal.classList.add('flex');
    }
};

window.closeDocsModal = function() {
    docsModal.classList.add('hidden');
    docsModal.classList.remove('flex');
    addDocForm.reset();
}

function renderDocs(student) {
    docTbody.innerHTML = '';
    if (!student.docs || student.docs.length === 0) {
        docTbody.innerHTML = '<tr><td colspan="2" class="py-4 text-center text-gray-500">No documents added yet.</td></tr>';
        return;
    }
    
    const sortedDocs = [...student.docs].sort((a,b) => b.id - a.id);
    
    sortedDocs.forEach(doc => {
        const tr = document.createElement('tr');
        let isPdf = false;
        if (doc.file) {
            if (doc.file.startsWith('data:application/pdf')) isPdf = true;
            else if (doc.file.toLowerCase().includes('.pdf')) isPdf = true;
            else if (doc.storagePath && doc.storagePath.toLowerCase().endsWith('.pdf')) isPdf = true;
            else if (doc.name && doc.name.toLowerCase().endsWith('.pdf')) isPdf = true;
        }
        tr.innerHTML = `
            <td class="py-3 px-4 font-semibold text-gray-700 pl-4 border-t border-gray-50">
                ${doc.name}
            </td>
            <td class="py-3 px-4 text-right border-t border-gray-50">
                <div class="flex justify-end gap-1">
                    ${isPdf 
                        ? `<button onclick="window.open('${doc.file}', '_blank')" class="text-brand-400 hover:text-brand-600 p-1.5 hover:bg-brand-50 rounded-lg transition-colors" title="View PDF">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                           </button>` 
                        : `<button onclick="window.openImageViewer('${doc.file}')" class="text-brand-400 hover:text-brand-600 p-1.5 hover:bg-brand-50 rounded-lg transition-colors" title="View Image">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                           </button>`
                    }
                    <button onclick="deleteDoc(${student.admission_no}, ${doc.id})" class="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Delete Document">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </td>
        `;
        docTbody.appendChild(tr);
    });
}

addDocForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(addDocAdmissionNo.value);
    const student = (await db.collection("students").doc(id.toString()).get()).data();
    
    if(!student.docs) student.docs = [];
    
    if (newDocFile.files.length > 0) {
        const file = newDocFile.files[0];
        const docId = Date.now();
        
        try {
            showNotification('Uploading to Cloudinary...', 'info');
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'b4w3hzdw');
            
            const response = await fetch(`https://api.cloudinary.com/v1_1/dtaevnxys/auto/upload`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Cloudinary upload failed');
            }
            
            const data = await response.json();
            const downloadURL = data.secure_url;
            
            student.docs.push({
                id: docId,
                name: newDocName.value.trim(),
                file: downloadURL,
                storagePath: data.public_id
            });
            
            await db.collection("students").doc(student.admission_no.toString()).set(student);
            addDocForm.reset();
            renderDocs(student);
            loadStudents(searchInput.value.toLowerCase());
            showNotification('Document uploaded successfully!', 'success');
        } catch (error) {
            console.error("Error uploading document: ", error);
            showNotification('Error uploading document.', 'error');
        }
    } else {
        showNotification('Please select a file to upload.', 'error');
    }
});

window.deleteDoc = async function(studentId, docId) {
    if(!confirm("Are you sure you want to delete this document?")) return;
    const student = (await db.collection("students").doc(studentId.toString()).get()).data();
    if(student && student.docs) {
        student.docs = student.docs.filter(d => d.id !== docId);
        await db.collection("students").doc(student.admission_no.toString()).set(student);
        renderDocs(student);
        loadStudents(searchInput.value.toLowerCase());
        showNotification('Document deleted successfully!', 'success');
    }
};

// Image Viewer Logic
const imageViewerModal = document.getElementById('imageViewerModal');
const viewerImage = document.getElementById('viewerImage');

window.openImageViewer = function(src) {
    if(!src || src.includes('placeholder')) return;
    viewerImage.src = src;
    imageViewerModal.classList.remove('hidden');
    imageViewerModal.classList.add('flex');
    // slight delay for animation
    setTimeout(() => {
        imageViewerModal.classList.remove('opacity-0', 'pointer-events-none');
        viewerImage.classList.remove('scale-95');
        viewerImage.classList.add('scale-100');
    }, 10);
};

window.closeImageViewer = function() {
    imageViewerModal.classList.add('opacity-0', 'pointer-events-none');
    viewerImage.classList.remove('scale-100');
    viewerImage.classList.add('scale-95');
    
    setTimeout(() => {
        imageViewerModal.classList.add('hidden');
        imageViewerModal.classList.remove('flex');
        viewerImage.src = '';
    }, 300);
};

window.printStudentProfile = async function() {
    if(!window.currentProfileId) return;
    const student = (await db.collection("students").doc(window.currentProfileId.toString()).get()).data();
    if(!student) return;

    const printWindow = window.open('', '_blank');
    
    // Build Exams HTML
    let examsHtml = '';
    if(student.exams && student.exams.length > 0) {
        const groupedExamsPrint = {};
        student.exams.forEach(exam => {
            const cat = exam.category || exam.name || 'Uncategorized';
            if (!groupedExamsPrint[cat]) groupedExamsPrint[cat] = [];
            groupedExamsPrint[cat].push(exam);
        });

        let rows = '';
        Object.keys(groupedExamsPrint).sort().forEach(cat => {
            rows += `<tr>
                <td colspan="2" style="padding:8px;border-bottom:1px solid #e5e7eb; background:#f3f4f6; font-weight:bold; color:#374151;">${cat}</td>
            </tr>`;
            
            groupedExamsPrint[cat].forEach(exam => {
                const dateStr = exam.date ? ` <span style="color:#9ca3af; font-size:12px;">(${exam.date})</span>` : '';
                rows += `<tr>
                    <td style="padding:8px 8px 8px 24px;border-bottom:1px solid #f3f4f6;">${exam.subject}${dateStr}</td>
                    <td style="padding:8px;border-bottom:1px solid #f3f4f6;font-weight:bold;">${exam.marks}</td>
                </tr>`;
            });
        });

        examsHtml = `
            <div style="margin-top: 20px;">
                <h3 style="margin-bottom: 10px; color: #374151;">Exam Performance</h3>
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
                    <thead>
                        <tr style="background:#f9fafb;">
                            <th style="padding:8px;border-bottom:2px solid #ddd;">Subject</th>
                            <th style="padding:8px;border-bottom:2px solid #ddd;">Marks/Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>`;
    }

    // Build Fees HTML
    let feesHtml = '';
    if(student.fees && student.fees.length > 0) {
        let rows = '';
        student.fees.forEach(fee => {
            rows += `<tr>
                <td style="padding:8px;border-bottom:1px solid #ddd;">${fee.month}</td>
                <td style="padding:8px;border-bottom:1px solid #ddd;">${fee.date}</td>
                <td style="padding:8px;border-bottom:1px solid #ddd;font-weight:bold;">Rs. ${fee.amount}</td>
            </tr>`;
        });
        feesHtml = `
            <div style="margin-top: 20px;">
                <h3 style="margin-bottom: 10px; color: #374151;">Fee Payments</h3>
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
                    <thead>
                        <tr style="background:#f9fafb;">
                            <th style="padding:8px;border-bottom:2px solid #ddd;">Month</th>
                            <th style="padding:8px;border-bottom:2px solid #ddd;">Date Paid</th>
                            <th style="padding:8px;border-bottom:2px solid #ddd;">Amount (Rs)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>`;
    }

    // Build Docs HTML
    let docsHtml = '';
    if(student.docs && student.docs.length > 0) {
        let rows = '';
        student.docs.forEach(doc => {
            rows += `<tr>
                <td style="padding:8px;border-bottom:1px solid #ddd;">${doc.name}</td>
                <td style="padding:8px;border-bottom:1px solid #ddd;color:#4f46e5;">Available in System</td>
            </tr>`;
        });
        docsHtml = `
            <div style="margin-top: 20px;">
                <h3 style="margin-bottom: 10px; color: #374151;">Uploaded Documents</h3>
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
                    <thead>
                        <tr style="background:#f9fafb;">
                            <th style="padding:8px;border-bottom:2px solid #ddd;">Document Name</th>
                            <th style="padding:8px;border-bottom:2px solid #ddd;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>`;
    }

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Student Report - ${student.full_name}</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; padding: 40px; margin: 0; }
                .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #f3f4f6; padding-bottom: 20px; }
                .header h1 { margin: 0 0 10px 0; color: #4f46e5; }
                .profile-grid { display: grid; grid-template-columns: auto 1fr; gap: 30px; margin-bottom: 30px; }
                .photo { width: 120px; height: 120px; object-fit: cover; border-radius: 10px; border: 3px solid #f3f4f6; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                .info-item { font-size: 14px; }
                .info-item strong { display: block; color: #6b7280; font-size: 11px; text-transform: uppercase; margin-bottom: 2px; }
                @media print {
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="${new URL('logo.png.png', window.location.href).href}" style="width: 80px; height: 80px; object-fit: contain; margin: 0 auto 15px auto; display: block;" onerror="this.style.display='none'" />
                <h1 style="font-size: 24px;">ZAINABIYYA LADIES COLLEGE</h1>
                <h2 style="font-size: 16px; color: #4b5563; font-weight: normal; margin: 0;">Student Profile Report</h2>
            </div>
            
            <div class="profile-grid">
                <div>
                    ${student.photo ? `<img src="${student.photo}" class="photo" />` : `<div class="photo" style="display:flex;align-items:center;justify-content:center;background:#f3f4f6;color:#9ca3af;">No Photo</div>`}
                </div>
                <div class="info-grid">
                    <div class="info-item"><strong>Full Name</strong>${student.full_name}</div>
                    <div class="info-item"><strong>Admission No</strong>${student.admission_no}</div>
                    <div class="info-item"><strong>Grade</strong>${student.grade}</div>
                    <div class="info-item"><strong>Date of Birth</strong>${student.dob ? student.dob + (function(){
                        const b = new Date(student.dob);
                        if(isNaN(b)) return '';
                        let age = new Date().getFullYear() - b.getFullYear();
                        const m = new Date().getMonth() - b.getMonth();
                        if (m < 0 || (m === 0 && new Date().getDate() < b.getDate())) age--;
                        return age >= 0 ? ` (${age} Years)` : '';
                    })() : '-'}</div>
                    <div class="info-item"><strong>Admission Date</strong>${student.admission_date || '-'}</div>
                    <div class="info-item"><strong>NIC No</strong>${student.nic || '-'}</div>
                    <div class="info-item"><strong>Parent Contact</strong>${student.parent_contact || '-'}</div>
                    <div class="info-item"><strong>Address</strong>${student.address || student.city || '-'}</div>
                </div>
            </div>

            ${examsHtml}
            ${feesHtml}
            ${docsHtml}

            <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #9ca3af;">
                <p>Generated by Student Database System on ${new Date().toLocaleDateString()}</p>
            </div>
        </body>
        </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for images to load before printing
    setTimeout(() => {
        printWindow.focus();
        printWindow.print();
    }, 500);
};

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
