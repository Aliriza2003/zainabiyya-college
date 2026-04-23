window.onerror = function(msg, url, line, col, error) {
    alert("Error: " + msg + "\nLine: " + line);
};
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
const storage = firebase.storage();

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
if (sessionStorage.getItem('isLoggedIn') !== 'true' || sessionStorage.getItem('loggedInModule') !== 'staff') {
    window.location.replace('index.html');
}

window.addEventListener('pageshow', function(event) {
    if (event.persisted || sessionStorage.getItem('isLoggedIn') !== 'true' || sessionStorage.getItem('loggedInModule') !== 'staff') {
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

const staffModal = document.getElementById('staffModal');
const form = document.getElementById('staffForm');

window.openStaffModal = function() {
    staffModal.classList.remove('hidden');
    staffModal.classList.add('flex');
};

window.closeStaffModal = function() {
    staffModal.classList.add('hidden');
    staffModal.classList.remove('flex');
    form.reset();
};
const staffIdInput = document.getElementById('staffId');
const photoInput = document.getElementById('photo');
const fullNameInput = document.getElementById('fullName');
const gradeInput = document.getElementById('grade');
const empTypeInput = document.getElementById('empType');
const parentContactInput = document.getElementById('parentContact');
const admissionDateInput = document.getElementById('admissionDate');
const nicInput = document.getElementById('nic');
const addressInput = document.getElementById('address');
const dobInput = document.getElementById('dob');
const staffNoteInput = document.getElementById('staffNote');
const staffList = document.getElementById('staffList');
const emptyState = document.getElementById('emptyState');
const staffCount = document.getElementById('staffCount');
const searchInput = document.getElementById('searchInput');
const notification = document.getElementById('notification');

let currentDeleteId = null;
const deleteModal = document.getElementById('deleteModal');
const deleteModalContent = document.getElementById('deleteModalContent');
const deleteStaffName = document.getElementById('deleteStaffName');

// Edit Elements
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editAdmissionNo = document.getElementById('editAdmissionNo');
const editFullName = document.getElementById('editFullName');
const editRole = document.getElementById('editRole');
const editEmpType = document.getElementById('editEmpType');
const editContact = document.getElementById('editContact');
const editAdmissionDate = document.getElementById('editAdmissionDate');
const editNic = document.getElementById('editNic');
const editAddress = document.getElementById('editAddress');
const editDob = document.getElementById('editDob');
const editPhoto = document.getElementById('editPhoto');
const editPhotoPreview = document.getElementById('editPhotoPreview');
const editNote = document.getElementById('editNote');

// Docs Elements
const docsModal = document.getElementById('docsModal');
const addDocForm = document.getElementById('addDocForm');
const docStaffName = document.getElementById('docStaffName');
const addDocStaffId = document.getElementById('addDocStaffId');
const newDocName = document.getElementById('newDocName');
const newDocFile = document.getElementById('newDocFile');
const docTbody = document.getElementById('docTbody');

// Profile Elements
const profileModal = document.getElementById('profileModal');
const profilePhoto = document.getElementById('profilePhoto');
const profileAvatarFallback = document.getElementById('profileAvatarFallback');
const profileName = document.getElementById('profileName');
const profileRole = document.getElementById('profileRole');
const profileContact = document.getElementById('profileContact');
const profileAdmissionDate = document.getElementById('profileAdmissionDate');
const profileNic = document.getElementById('profileNic');
const profileAddress = document.getElementById('profileAddress');
const profileDob = document.getElementById('profileDob');
const profileNote = document.getElementById('profileNote');
const profileDocsTbody = document.getElementById('profileDocsTbody');
const noDocsMessage = document.getElementById('noDocsMessage');

// Salary Elements
const salaryModal = document.getElementById('salaryModal');
const salaryStaffName = document.getElementById('salaryStaffName');
const addSalaryStaffId = document.getElementById('addSalaryStaffId');
const addSalaryForm = document.getElementById('addSalaryForm');
const newSalaryMonth = document.getElementById('newSalaryMonth');
const newSalaryDate = document.getElementById('newSalaryDate');
const newSalaryAmount = document.getElementById('newSalaryAmount');
const salaryTbody = document.getElementById('salaryTbody');
const profileSalaryTbody = document.getElementById('profileSalaryTbody');
const noSalaryMessage = document.getElementById('noSalaryMessage');

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
    document.addEventListener('DOMContentLoaded', () => loadStaffs());
} else {
    loadStaffs();
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

    const staffMember = {
        staff_id: parseInt(staffIdInput.value),
        photo: photoBase64,
        full_name: fullNameInput.value.trim(),
        grade: gradeInput.value.trim(),
        emp_type: empTypeInput.value,
        parent_contact: parentContactInput.value.trim(),
        admission_date: admissionDateInput.value,
        nic: nicInput.value.trim(),
        address: addressInput.value.trim(),
        dob: dobInput.value,
        note: staffNoteInput.value.trim(),
        docs: [],
        salaries: []
    };

    try {
        const docRef = db.collection("staff").doc(staffMember.staff_id.toString());
        const existingDoc = await docRef.get();
        if (existingDoc.exists) {
            showNotification(`Staff ID "${staffMember.staff_id}" already exists!`, 'error');
            return;
        }
        await docRef.set(staffMember);
        
        showNotification(`Staff successfully registered!`, 'success');
        closeStaffModal();
        loadStaffs();
    } catch (error) {
        showNotification(`An error occurred: ${error.message}`, 'error');
    }
});

// Real-time search
searchInput.addEventListener('input', (e) => {
    loadStaffs(e.target.value.toLowerCase());
});

// Load Staffs from DB
async function loadStaffs(query = '') {
    try {
        const querySnapshot = await db.collection("staff").get();
        let staffMembers = [];
        querySnapshot.forEach((doc) => {
            staffMembers.push(doc.data());
        });

        if (query) {
            staffMembers = staffMembers.filter(staffMember => {
                return (
                    staffMember.full_name.toLowerCase().includes(query) ||
                    staffMember.grade.toLowerCase().includes(query) ||
                    staffMember.staff_id.toString().includes(query) ||
                    (staffMember.parent_contact && staffMember.parent_contact.includes(query)) ||
                    (staffMember.nic && staffMember.nic.toLowerCase().includes(query))
                );
            });
        }
        
        staffMembers.sort((a,b) => b.staff_id - a.staff_id);

        renderStaffs(staffMembers);
    } catch (error) {
        console.error("Failed to load staff:", error);
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

// Render Staffs to Table
function renderStaffs(staffMembers) {
    staffList.innerHTML = '';
    staffCount.textContent = staffMembers.length;

    if (staffMembers.length === 0) {
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
    } else {
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');

        staffMembers.forEach(staffMember => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50/80 group transition-colors';
            
            const avatarClass = getAvatarClass(staffMember.full_name);
            const initials = getInitials(staffMember.full_name) || '?';
            
            const avatarHTML = staffMember.photo 
                ? `<img src="${staffMember.photo}" class="w-10 h-10 rounded-full object-cover shadow-sm cursor-pointer hover:ring-2 hover:ring-brand-500 transition-all" alt="Avatar" onclick="if(this.src && !this.src.includes('placeholder')) window.openImageViewer(this.src)">`
                : `<div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${avatarClass}">${initials}</div>`;

            const docCount = staffMember.docs ? staffMember.docs.length : 0;
            tr.innerHTML = `
                <td class="py-4 px-5 text-sm font-bold text-gray-900 border-b border-gray-50">#${staffMember.staff_id}</td>
                <td class="py-4 px-5 border-b border-gray-50">
                    <div class="flex items-center gap-3">
                        ${avatarHTML}
                        <div>
                            <button onclick="viewStaffProfile(${staffMember.staff_id})" class="text-sm font-semibold text-brand-600 hover:text-brand-800 text-left transition-colors">${staffMember.full_name}</button>
                            
                        </div>
                    </div>
                </td>
                <td class="py-4 px-5 border-b border-gray-50">
                    <div class="flex flex-col gap-1 items-start">
                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                            ${staffMember.grade}
                        </span>
                        ${staffMember.emp_type ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">${staffMember.emp_type}</span>` : ''}
                    </div>
                </td>
                <td class="py-4 px-5 text-sm font-medium text-gray-600 border-b border-gray-50">
                    <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        ${staffMember.parent_contact}
                    </div>
                </td>
                <td class="py-4 px-5 border-b border-gray-50">
                    <div class="flex items-center gap-3">
                        <span class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                            ${docCount} Docs
                        </span>
                    </div>
                </td>
                <td class="py-4 px-5 text-right border-b border-gray-50">
                    <div class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                        <button onclick="openDocsModal(${staffMember.staff_id})" class="text-brand-500 hover:text-brand-700 hover:bg-brand-50 p-2 rounded-xl transition-all" title="Manage Documents">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                        </button>
                        <button onclick="openSalaryModal(${staffMember.staff_id})" class="text-green-500 hover:text-green-700 hover:bg-green-50 p-2 rounded-xl transition-all" title="Manage Salaries">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                        <button onclick="openEditModal(${staffMember.staff_id})" class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all" title="Edit Staff">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button onclick="promptDelete(${staffMember.staff_id}, '${staffMember.full_name.replace(/'/g, "\\'")}')" class="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all" title="Remove Staff">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </td>
            `;
            staffList.appendChild(tr);
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
    deleteStaffName.textContent = name;
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
        // Fetch staff data before deletion for potential undo
        const staffToRestore = (await db.collection("staff").doc(currentDeleteId.toString()).get()).data();
        
        await db.collection("staff").doc(currentDeleteId.toString()).delete();
        
        showNotification('Staff record removed successfully.', 'success', async () => {
             // Undo Delete Action
             if(staffToRestore) {
                 await db.collection("staff").doc(staffToRestore.staff_id.toString()).set(staffToRestore);
                 showNotification('Staff restored.', 'success');
                 loadStaffs(searchInput.value.toLowerCase());
             }
        });
        
        closeDeleteModal();
        loadStaffs(searchInput.value.toLowerCase());
    }
});

// Edit Flow
window.openEditModal = async function(id) {
    const staffMember = (await db.collection("staff").doc(id.toString()).get()).data();
    if(staffMember) {
        oldStaffId.value = staffMember.staff_id;
        editAdmissionNo.value = staffMember.staff_id;
        editFullName.value = staffMember.full_name;
        editRole.value = staffMember.grade;
        editEmpType.value = staffMember.emp_type || '';
        editContact.value = staffMember.parent_contact;
        editAdmissionDate.value = staffMember.admission_date || '';
        editNic.value = staffMember.nic || '';
        editAddress.value = staffMember.address || staffMember.city || '';
        editDob.value = staffMember.dob || '';
        editNote.value = staffMember.note || '';
        editPhotoPreview.src = staffMember.photo || '';
        editPhotoPreview.classList.toggle('hidden', !staffMember.photo);
        
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
    const oldId = parseInt(oldStaffId.value);
    const newId = parseInt(editAdmissionNo.value);
    const staffMember = (await db.collection("staff").doc(oldId.toString()).get()).data();
    
    staffMember.staff_id = newId;
    staffMember.full_name = editFullName.value.trim();
    staffMember.grade = editRole.value.trim();
    staffMember.emp_type = editEmpType.value;
    staffMember.parent_contact = editContact.value.trim();
    staffMember.admission_date = editAdmissionDate.value;
    staffMember.nic = editNic.value.trim();
    staffMember.address = editAddress.value.trim();
    staffMember.dob = editDob.value;
    staffMember.note = editNote.value.trim();

    if (editPhoto.files.length > 0) {
        staffMember.photo = await fileToBase64(editPhoto.files[0]);
    }

    if (oldId !== newId) {
        await db.collection("staff").doc(oldId.toString()).delete();
    }
    await db.collection("staff").doc(newId.toString()).set(staffMember);
    showNotification('Staff updated successfully!', 'success');
    closeEditModal();
    loadStaffs(searchInput.value.toLowerCase());
});

// Profile Flow
window.viewStaffProfile = async function(id) {
    window.currentProfileId = id;
    const staffMember = (await db.collection("staff").doc(id.toString()).get()).data();
    if(!staffMember) return;

    profileName.textContent = staffMember.full_name;
    profileStaffId.textContent = staffMember.staff_id;
    profileRole.textContent = staffMember.grade + (staffMember.emp_type ? ` • ${staffMember.emp_type}` : '');
    profileContact.textContent = staffMember.parent_contact;
    profileAdmissionDate.textContent = staffMember.admission_date || '-';
    profileNic.textContent = staffMember.nic || '-';
    profileAddress.textContent = staffMember.address || staffMember.city || '-';
    let dobText = staffMember.dob || '-';
    if(staffMember.dob) {
        const birthDate = new Date(staffMember.dob);
        if(!isNaN(birthDate)) {
            let age = new Date().getFullYear() - birthDate.getFullYear();
            const m = new Date().getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && new Date().getDate() < birthDate.getDate())) age--;
            if(age >= 0) dobText += ` (${age} Years)`;
        }
    }
    profileDob.textContent = dobText;
    profileNote.textContent = staffMember.note || '-';

    if (staffMember.photo) {
        profilePhoto.src = staffMember.photo;
        profilePhoto.classList.remove('hidden');
        profileAvatarFallback.classList.add('hidden');
    } else {
        profilePhoto.classList.add('hidden');
        const names = staffMember.full_name.split(' ');
        const initials = names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
        profileAvatarFallback.textContent = initials.toUpperCase();
        profileAvatarFallback.classList.remove('hidden');
    }

    // Render profile docs table records
    profileDocsTbody.innerHTML = '';
    if (!staffMember.docs || staffMember.docs.length === 0) {
        profileDocsTbody.parentElement.classList.add('hidden');
        noDocsMessage.classList.remove('hidden');
    } else {
        profileDocsTbody.parentElement.classList.remove('hidden');
        noDocsMessage.classList.add('hidden');
        
        staffMember.docs.forEach(doc => {
            const tr = document.createElement('tr');
            let isPdf = false;
            if (doc.file) {
                if (doc.format && doc.format.toLowerCase() === 'pdf') isPdf = true;
                else if (doc.file.startsWith('data:application/pdf')) isPdf = true;
                else if (doc.file.toLowerCase().includes('.pdf')) isPdf = true;
                else if (doc.storagePath && doc.storagePath.toLowerCase().endsWith('.pdf')) isPdf = true;
                else if (doc.name && doc.name.toLowerCase().endsWith('.pdf')) isPdf = true;
            }
            
            tr.innerHTML = `
                <td class="py-3 px-4 font-medium text-gray-700 pl-4 border-t border-gray-50">
                    ${doc.name}
                </td>
                <td class="py-3 px-4 text-right border-t border-gray-50">
                    ${isPdf 
                        ? `<button onclick="window.open('${doc.file}'.replace('/upload/', '/upload/fl_attachment/'), '_blank')" class="text-brand-600 font-semibold hover:underline">Download PDF</button>` 
                        : `<button onclick="window.openImageViewer('${doc.file}')" class="text-brand-600 font-semibold hover:underline">View Image</button>`
                    }
                </td>
            `;
            profileDocsTbody.appendChild(tr);
        });
    }

    profileModal.classList.remove('hidden');
    profileModal.classList.add('flex');
    
    // Render profile salary records
    profileSalaryTbody.innerHTML = '';
    if (!staffMember.salaries || staffMember.salaries.length === 0) {
        profileSalaryTbody.parentElement.classList.add('hidden');
        noSalaryMessage.classList.remove('hidden');
    } else {
        profileSalaryTbody.parentElement.classList.remove('hidden');
        noSalaryMessage.classList.add('hidden');
        
        const sortedSalaries = [...staffMember.salaries].sort((a,b) => new Date(b.month) - new Date(a.month));
        sortedSalaries.forEach(salary => {
            const monthDate = new Date(salary.month + "-01");
            const monthStr = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="py-3 px-4 font-semibold text-gray-800">${monthStr}</td>
                <td class="py-3 px-4 text-gray-600">${salary.date}</td>
                <td class="py-3 px-4 text-right font-bold text-gray-800">Rs. ${parseFloat(salary.amount).toFixed(2)}</td>
            `;
            profileSalaryTbody.appendChild(tr);
        });
    }
}

window.closeProfileModal = function() {
    profileModal.classList.add('hidden');
    profileModal.classList.remove('flex');
}

window.printStaffProfile = async function() {
    if (!window.currentProfileId) return;
    
    const staffMember = (await db.collection("staff").doc(window.currentProfileId.toString()).get()).data();
    if (!staffMember) return;

    let dobText = staffMember.dob || '-';
    if(staffMember.dob) {
        const birthDate = new Date(staffMember.dob);
        if(!isNaN(birthDate)) {
            let age = new Date().getFullYear() - birthDate.getFullYear();
            const m = new Date().getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && new Date().getDate() < birthDate.getDate())) age--;
            if(age >= 0) dobText += ` (${age} Years)`;
        }
    }

    let salariesHTML = '';
    if (staffMember.salaries && staffMember.salaries.length > 0) {
        const sortedSalaries = [...staffMember.salaries].sort((a,b) => new Date(b.month) - new Date(a.month));
        let total = 0;
        sortedSalaries.forEach(s => {
            const monthDate = new Date(s.month + "-01");
            const monthStr = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });
            total += parseFloat(s.amount);
            salariesHTML += `
                <tr>
                    <td style="padding:8px; border:1px solid #e5e7eb;">${monthStr}</td>
                    <td style="padding:8px; border:1px solid #e5e7eb;">${s.date}</td>
                    <td style="padding:8px; border:1px solid #e5e7eb; text-align:right;">Rs. ${parseFloat(s.amount).toFixed(2)}</td>
                </tr>
            `;
        });
        salariesHTML += `
            <tr style="background:#f9fafb; font-weight:bold;">
                <td colspan="2" style="padding:8px; border:1px solid #e5e7eb; text-align:right;">Total Paid:</td>
                <td style="padding:8px; border:1px solid #e5e7eb; text-align:right;">Rs. ${total.toFixed(2)}</td>
            </tr>
        `;
    } else {
        salariesHTML = '<tr><td colspan="3" style="padding:8px; text-align:center; color:#6b7280;">No salary records found.</td></tr>';
    }

    let docsHTML = '';
    if (staffMember.docs && staffMember.docs.length > 0) {
        staffMember.docs.forEach(doc => {
            docsHTML += `<li>${doc.name}</li>`;
        });
    } else {
        docsHTML = '<p style="color:#6b7280;">No documents attached.</p>';
    }

    let avatarHTML = '';
    if (staffMember.photo) {
        avatarHTML = `<img src="${staffMember.photo}" style="width:120px; height:120px; border-radius:50%; object-fit:cover; border: 4px solid #f3f4f6;">`;
    } else {
        const names = staffMember.full_name.split(' ');
        const initials = names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
        avatarHTML = `<div style="width:120px; height:120px; border-radius:50%; background:#e5e7eb; display:flex; align-items:center; justify-content:center; font-size:36px; font-weight:bold; color:#4b5563;">${initials.toUpperCase()}</div>`;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Profile - ${staffMember.full_name}</title>
            <style>
                body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; line-height: 1.5; padding: 40px; max-width: 800px; margin: 0 auto; }
                .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; }
                .logo { max-width: 80px; margin-bottom: 10px; }
                h1 { margin: 0; font-size: 24px; color: #111827; }
                .subtitle { color: #6b7280; font-size: 14px; margin-top: 5px; }
                .profile-section { display: flex; gap: 30px; margin-bottom: 40px; align-items: center; }
                .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; width: 100%; }
                .info-item label { display: block; font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: bold; margin-bottom: 4px; }
                .info-item div { font-size: 16px; font-weight: 500; }
                .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-top: 40px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th { background-color: #f9fafb; padding: 10px 8px; text-align: left; font-size: 13px; text-transform: uppercase; color: #6b7280; border: 1px solid #e5e7eb; }
                ul { padding-left: 20px; margin: 0; }
                li { padding: 4px 0; }
                @media print {
                    body { padding: 0; }
                    button { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Zainabiyya Ladies College</h1>
                <div class="subtitle">Staff Profile Report</div>
            </div>

            <div class="profile-section">
                <div>${avatarHTML}</div>
                <div class="info-grid">
                    <div class="info-item"><label>Staff ID</label><div>#${staffMember.staff_id}</div></div>
                    <div class="info-item"><label>Full Name</label><div>${staffMember.full_name}</div></div>
                    <div class="info-item"><label>Role / Designation</label><div>${staffMember.grade}${staffMember.emp_type ? ` • ${staffMember.emp_type}` : ''}</div></div>
                    <div class="info-item"><label>Contact Number</label><div>${staffMember.parent_contact || '-'}</div></div>
                    <div class="info-item"><label>NIC</label><div>${staffMember.nic || '-'}</div></div>
                    <div class="info-item"><label>Date of Birth</label><div>${dobText}</div></div>
                    <div class="info-item"><label>Address</label><div>${staffMember.address || staffMember.city || '-'}</div></div>
                    <div class="info-item"><label>Joined Date</label><div>${staffMember.admission_date || '-'}</div></div>
                </div>
            </div>

            <div class="info-item" style="margin-bottom:30px;">
                <label>Notes / Remarks</label>
                <div style="background:#f9fafb; padding:15px; border-radius:8px; border:1px solid #e5e7eb; white-space: pre-wrap;">${staffMember.note || 'No remarks.'}</div>
            </div>

            <div class="section-title">Monthly Salary History</div>
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Date Paid</th>
                        <th style="text-align:right;">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${salariesHTML}
                </tbody>
            </table>

            <div class="section-title">Attached Documents</div>
            <div style="background:#f9fafb; padding:15px; border-radius:8px; border:1px solid #e5e7eb;">
                ${docsHTML}
            </div>

            <div style="margin-top: 50px; text-align:center; font-size:12px; color:#9ca3af;">
                Generated on ${new Date().toLocaleString()}
            </div>
            
            <script>
                window.onload = function() {
                    window.print();
                }
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
};

// Salary Flow
window.openSalaryModal = async function(id) {
    const staffMember = (await db.collection("staff").doc(id.toString()).get()).data();
    if(staffMember) {
        addSalaryStaffId.value = staffMember.staff_id;
        salaryStaffName.textContent = staffMember.full_name;
        newSalaryDate.valueAsDate = new Date();
        renderSalaries(staffMember);
        salaryModal.classList.remove('hidden');
        salaryModal.classList.add('flex');
    }
};

window.closeSalaryModal = function() {
    salaryModal.classList.add('hidden');
    salaryModal.classList.remove('flex');
    addSalaryForm.reset();
}

function renderSalaries(staffMember) {
    salaryTbody.innerHTML = '';
    if (!staffMember.salaries || staffMember.salaries.length === 0) {
        salaryTbody.innerHTML = '<tr><td colspan="4" class="py-4 text-center text-gray-500">No salary records added yet.</td></tr>';
        return;
    }
    
    const sortedSalaries = [...staffMember.salaries].sort((a,b) => new Date(b.month) - new Date(a.month));

    sortedSalaries.forEach(salary => {
        const tr = document.createElement('tr');
        const monthDate = new Date(salary.month + "-01");
        const monthStr = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        
        tr.innerHTML = `
            <td class="py-3 px-4 font-semibold text-gray-800">${monthStr}</td>
            <td class="py-3 px-4 text-gray-600">${salary.date}</td>
            <td class="py-3 px-4 font-bold text-green-600">Rs. ${parseFloat(salary.amount).toFixed(2)}</td>
            <td class="py-3 px-4 text-right">
                <button onclick="deleteSalary(${staffMember.staff_id}, ${salary.id})" class="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </td>
        `;
        salaryTbody.appendChild(tr);
    });
}

addSalaryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(addSalaryStaffId.value);
    const staffMember = (await db.collection("staff").doc(id.toString()).get()).data();
    
    if(!staffMember.salaries) staffMember.salaries = [];
    staffMember.salaries.push({
        id: Date.now(),
        month: newSalaryMonth.value,
        date: newSalaryDate.value,
        amount: parseFloat(newSalaryAmount.value) || 0
    });
    
    await db.collection("staff").doc(staffMember.staff_id.toString()).set(staffMember);
    addSalaryForm.reset();
    newSalaryDate.valueAsDate = new Date(); // prep next entry if they want to add another right away
    renderSalaries(staffMember);
});

window.deleteSalary = async function(staffId, salaryId) {
    const staffMember = (await db.collection("staff").doc(staffId.toString()).get()).data();
    if(staffMember && staffMember.salaries) {
        staffMember.salaries = staffMember.salaries.filter(s => s.id !== salaryId);
        await db.collection("staff").doc(staffMember.staff_id.toString()).set(staffMember);
        renderSalaries(staffMember);
    }
};

// Docs Flow
window.openDocsModal = async function(id) {
    const staffMember = (await db.collection("staff").doc(id.toString()).get()).data();
    if(staffMember) {
        addDocStaffId.value = staffMember.staff_id;
        docStaffName.textContent = staffMember.full_name;
        renderDocs(staffMember);
        docsModal.classList.remove('hidden');
        docsModal.classList.add('flex');
    }
};

window.closeDocsModal = function() {
    docsModal.classList.add('hidden');
    docsModal.classList.remove('flex');
    addDocForm.reset();
}

function renderDocs(staffMember) {
    docTbody.innerHTML = '';
    if (!staffMember.docs || staffMember.docs.length === 0) {
        docTbody.innerHTML = '<tr><td colspan="2" class="py-4 text-center text-gray-500">No documents added yet.</td></tr>';
        return;
    }
    
    const sortedDocs = [...staffMember.docs].sort((a,b) => b.id - a.id);
    
    sortedDocs.forEach(doc => {
        const tr = document.createElement('tr');
        let isPdf = false;
        if (doc.file) {
            if (doc.format && doc.format.toLowerCase() === 'pdf') isPdf = true;
            else if (doc.file.startsWith('data:application/pdf')) isPdf = true;
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
                        ? `<button onclick="window.open('${doc.file}'.replace('/upload/', '/upload/fl_attachment/'), '_blank')" class="text-brand-400 hover:text-brand-600 p-1.5 hover:bg-brand-50 rounded-lg transition-colors" title="Download PDF">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                           </button>` 
                        : `<button onclick="window.openImageViewer('${doc.file}')" class="text-brand-400 hover:text-brand-600 p-1.5 hover:bg-brand-50 rounded-lg transition-colors" title="View Image">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                           </button>`
                    }
                    <button onclick="deleteDoc(${staffMember.staff_id}, ${doc.id})" class="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Delete Document">
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
    const id = parseInt(addDocStaffId.value);
    const staffMember = (await db.collection("staff").doc(id.toString()).get()).data();
    
    if(!staffMember.docs) staffMember.docs = [];
    
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
            
            staffMember.docs.push({
                id: docId,
                name: newDocName.value.trim(),
                file: downloadURL,
                storagePath: data.public_id,
                format: data.format || file.name.split('.').pop()
            });
            
            await db.collection("staff").doc(staffMember.staff_id.toString()).set(staffMember);
            addDocForm.reset();
            renderDocs(staffMember);
            loadStaffs(searchInput.value.toLowerCase());
            showNotification('Document uploaded successfully!', 'success');
        } catch (error) {
            console.error("Error uploading document: ", error);
            showNotification('Error uploading document.', 'error');
        }
    } else {
        showNotification('Please select a file to upload.', 'error');
    }
});

window.deleteDoc = async function(staffId, docId) {
    if(!confirm("Are you sure you want to delete this document?")) return;
    const staffMember = (await db.collection("staff").doc(staffId.toString()).get()).data();
    if(staffMember && staffMember.docs) {
        staffMember.docs = staffMember.docs.filter(d => d.id !== docId);
        await db.collection("staff").doc(staffMember.staff_id.toString()).set(staffMember);
        renderDocs(staffMember);
        loadStaffs(searchInput.value.toLowerCase());
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

window.printStaffProfile = async function() {
    if(!window.currentProfileId) return;
    const staffMember = (await db.collection("staff").doc(window.currentProfileId.toString()).get()).data();
    if(!staffMember) return;

    const printWindow = window.open('', '_blank');
    
    // Build Docs HTML
    let docsHtml = '';
    if(staffMember.docs && staffMember.docs.length > 0) {
        let rows = '';
        staffMember.docs.forEach(doc => {
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

    // Build Salary HTML
    let salaryHtml = '';
    if(staffMember.salaries && staffMember.salaries.length > 0) {
        let rows = '';
        staffMember.salaries.forEach(salary => {
            rows += `<tr>
                <td style="padding:8px;border-bottom:1px solid #ddd;">${salary.month}</td>
                <td style="padding:8px;border-bottom:1px solid #ddd;">${salary.date}</td>
                <td style="padding:8px;border-bottom:1px solid #ddd;font-weight:bold;">Rs. ${salary.amount}</td>
            </tr>`;
        });
        salaryHtml = `
            <div style="margin-top: 20px;">
                <h3 style="margin-bottom: 10px; color: #374151;">Salary Payments</h3>
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

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Staff Report - ${staffMember.full_name}</title>
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
                <h2 style="font-size: 16px; color: #4b5563; font-weight: normal; margin: 0;">Staff Profile Report</h2>
            </div>
            
            <div class="profile-grid">
                <div>
                    ${staffMember.photo ? `<img src="${staffMember.photo}" class="photo" />` : `<div class="photo" style="display:flex;align-items:center;justify-content:center;background:#f3f4f6;color:#9ca3af;">No Photo</div>`}
                </div>
                <div class="info-grid">
                    <div class="info-item"><strong>Full Name</strong>${staffMember.full_name}</div>
                    <div class="info-item"><strong>Staff ID</strong>${staffMember.staff_id}</div>
                    <div class="info-item"><strong>Role / Designation</strong>${staffMember.grade}${staffMember.emp_type ? ` • ${staffMember.emp_type}` : ''}</div>
                    <div class="info-item"><strong>Date of Birth</strong>${staffMember.dob ? staffMember.dob + (function(){
                        const b = new Date(staffMember.dob);
                        if(isNaN(b)) return '';
                        let age = new Date().getFullYear() - b.getFullYear();
                        const m = new Date().getMonth() - b.getMonth();
                        if (m < 0 || (m === 0 && new Date().getDate() < b.getDate())) age--;
                        return age >= 0 ? ` (${age} Years)` : '';
                    })() : '-'}</div>
                    <div class="info-item"><strong>Joined Date</strong>${staffMember.admission_date || '-'}</div>
                    <div class="info-item"><strong>NIC No</strong>${staffMember.nic || '-'}</div>
                    <div class="info-item"><strong>Contact Number</strong>${staffMember.parent_contact || '-'}</div>
                    <div class="info-item"><strong>Address</strong>${staffMember.address || staffMember.city || '-'}</div>
                </div>
            </div>

            ${docsHtml}
            ${salaryHtml}

            <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #9ca3af;">
                <p>Generated by Staff Database System on ${new Date().toLocaleDateString()}</p>
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
