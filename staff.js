window.onerror = function(msg, url, line, col, error) {
    alert("SYSTEM ERROR (staff.js): " + msg + "\nLine: " + line);
};
console.log("STAFF.JS LOADED - V17");
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
    staffModal.style.display = 'flex';
    staffModal.style.zIndex = '9999';
};

window.closeStaffModal = function() {
    staffModal.style.display = 'none';
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

// Attendance Elements
const attendanceModal = document.getElementById('attendanceModal');
const attendanceStaffName = document.getElementById('attendanceStaffName');
const addAttendanceStaffId = document.getElementById('addAttendanceStaffId');
const addAttendanceForm = document.getElementById('addAttendanceForm');
const newAttendanceDate = document.getElementById('newAttendanceDate');
const newAttendanceEntryTime = document.getElementById('newAttendanceEntryTime');
const newAttendanceExitTime = document.getElementById('newAttendanceExitTime');
const attendanceTbody = document.getElementById('attendanceTbody');
const profileAttendanceTable = document.getElementById('profileAttendanceTable');
const profileAttendanceTbody = document.getElementById('profileAttendanceTbody');
const noAttendanceMessage = document.getElementById('noAttendanceMessage');
const profileAttendanceFrom = document.getElementById('profileAttendanceFrom');
const profileAttendanceTo = document.getElementById('profileAttendanceTo');
const profileAttendanceBadge = document.getElementById('profileAttendanceBadge');
const manageAttendanceFrom = document.getElementById('manageAttendanceFrom');
const manageAttendanceTo = document.getElementById('manageAttendanceTo');
const manageAttendanceBadge = document.getElementById('manageAttendanceBadge');

// Periods Elements
const periodsModal = document.getElementById('periodsModal');
const periodsStaffName = document.getElementById('periodsStaffName');
const addPeriodsStaffId = document.getElementById('addPeriodsStaffId');
const addPeriodsForm = document.getElementById('addPeriodsForm');
const newPeriodFromDate = document.getElementById('newPeriodFromDate');
const newPeriodToDate = document.getElementById('newPeriodToDate');
const newPeriodAllocated = document.getElementById('newPeriodAllocated');
const newPeriodConducted = document.getElementById('newPeriodConducted');
const newPeriodMissed = document.getElementById('newPeriodMissed');
const newPeriodReasonContainer = document.getElementById('newPeriodReasonContainer');
const newPeriodReason = document.getElementById('newPeriodReason');
const periodsTbody = document.getElementById('periodsTbody');
const profilePeriodsTable = document.getElementById('profilePeriodsTable');
const profilePeriodsTbody = document.getElementById('profilePeriodsTbody');
const noPeriodsMessage = document.getElementById('noPeriodsMessage');
const profilePeriodsFrom = document.getElementById('profilePeriodsFrom');
const profilePeriodsTo = document.getElementById('profilePeriodsTo');
const profilePeriodsBadge = document.getElementById('profilePeriodsBadge');
const profilePeriodsTfoot = document.getElementById('profilePeriodsTfoot');
const profileTotalAllocated = document.getElementById('profileTotalAllocated');
const profileTotalConducted = document.getElementById('profileTotalConducted');
const profileTotalMissed = document.getElementById('profileTotalMissed');
const profileConductPercentage = document.getElementById('profileConductPercentage');
const managePeriodsFrom = document.getElementById('managePeriodsFrom');
const managePeriodsTo = document.getElementById('managePeriodsTo');
const managePeriodsBadge = document.getElementById('managePeriodsBadge');

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
        salaries: [],
        attendance: [],
        periods: []
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

let currentFilter = 'active';

window.setFilter = function(filter) {
    currentFilter = filter;
    
    // update button styles
    const activeBtn = document.getElementById('filterActiveBtn');
    const pastBtn = document.getElementById('filterPastBtn');
    
    if(filter === 'active') {
        activeBtn.className = "px-5 py-1.5 rounded-full text-sm font-bold bg-brand-500 text-white shadow-md shadow-brand-500/20 border border-brand-500 transition-all";
        pastBtn.className = "px-5 py-1.5 rounded-full text-sm font-bold bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all";
    } else {
        pastBtn.className = "px-5 py-1.5 rounded-full text-sm font-bold bg-brand-500 text-white shadow-md shadow-brand-500/20 border border-brand-500 transition-all";
        activeBtn.className = "px-5 py-1.5 rounded-full text-sm font-bold bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all";
    }
    
    loadStaffs(searchInput.value.toLowerCase());
}

// Load Staffs from DB
async function loadStaffs(query = '') {
    try {
        const collectionName = currentFilter === 'active' ? "staff" : "past_staff";
        const querySnapshot = await db.collection(collectionName).get();
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
                            <button onclick="viewStaffProfile('${staffMember.staff_id}')" class="text-sm font-semibold text-brand-600 hover:text-brand-800 text-left transition-colors">${staffMember.full_name}</button>
                            
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
                    <div class="flex justify-end gap-1 opacity-100 transition-opacity">
                        <button onclick="openPeriodsModal('${staffMember.staff_id}', '${staffMember.full_name.replace(/'/g, "\\'")}')" class="text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 p-2 rounded-xl transition-all" title="Manage Weekly Periods">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                        <button onclick="openAttendanceModal('${staffMember.staff_id}', '${staffMember.full_name.replace(/'/g, "\\'")}')" class="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-xl transition-all" title="Manage Attendance">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </button>
                        <button onclick="openDocsModal('${staffMember.staff_id}', '${staffMember.full_name.replace(/'/g, "\\'")}')" class="text-brand-500 hover:text-brand-700 hover:bg-brand-50 p-2 rounded-xl transition-all" title="Manage Documents">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                        </button>
                        <button onclick="openSalaryModal('${staffMember.staff_id}', '${staffMember.full_name.replace(/'/g, "\\'")}')" class="text-green-500 hover:text-green-700 hover:bg-green-50 p-2 rounded-xl transition-all" title="Manage Salaries">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                        <button onclick="openEditModal('${staffMember.staff_id}')" class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all" title="Edit Staff">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button onclick="promptDelete('${staffMember.staff_id}', '${staffMember.full_name.replace(/'/g, "\\'")}')" class="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all" title="Remove Staff">
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
    deleteModal.style.display = 'flex';
    deleteModal.style.zIndex = '9999';
};

window.closeDeleteModal = function() {
    deleteModal.style.display = 'none';
    currentDeleteId = null;
}

document.getElementById('cancelBtn').addEventListener('click', closeDeleteModal);
document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
    if (currentDeleteId) {
        const collectionName = currentFilter === 'active' ? "staff" : "past_staff";
        // Fetch staff data before deletion for potential undo
        const staffToRestore = (await db.collection(collectionName).doc(currentDeleteId.toString()).get()).data();
        
        await db.collection(collectionName).doc(currentDeleteId.toString()).delete();
        
        showNotification('Staff record removed successfully.', 'success', async () => {
             // Undo Delete Action
             if(staffToRestore) {
                 await db.collection(collectionName).doc(staffToRestore.staff_id.toString()).set(staffToRestore);
                 showNotification('Staff restored.', 'success');
                 loadStaffs(searchInput.value.toLowerCase());
             }
        });
        
        closeDeleteModal();
        loadStaffs(searchInput.value.toLowerCase());
    }
});

// Generic Confirm Flow
let pendingConfirmCallback = null;

window.openGenericConfirmModal = function(title, message, onConfirm) {
    const titleEl = document.getElementById('genericConfirmTitle');
    const msgEl = document.getElementById('genericConfirmMessage');
    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;
    
    pendingConfirmCallback = onConfirm;
    
    const modal = document.getElementById('genericConfirmModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.zIndex = '10000';
    }
};

window.closeGenericConfirmModal = function() {
    const modal = document.getElementById('genericConfirmModal');
    if (modal) {
        modal.style.display = 'none';
    }
    pendingConfirmCallback = null;
};

const genericConfirmActionBtn = document.getElementById('genericConfirmActionBtn');
if (genericConfirmActionBtn) {
    genericConfirmActionBtn.addEventListener('click', async () => {
        if (pendingConfirmCallback) {
            await pendingConfirmCallback();
            closeGenericConfirmModal();
        }
    });
}

// Edit Flow
window.openEditModal = async function(id) {
    const collectionName = currentFilter === 'active' ? "staff" : "past_staff";
    const staffMember = (await db.collection(collectionName).doc(id.toString()).get()).data();
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
        
        editModal.style.display = 'flex';
        editModal.style.zIndex = '9999';
    }
};

window.closeEditModal = function() {
    editModal.style.display = 'none';
    editForm.reset();
}

// Left Flow
let currentLeftId = null;
const leftModal = document.getElementById('leftModal');

window.openLeftModal = async function() {
    if (!editAdmissionNo.value) return;
    currentLeftId = editAdmissionNo.value;
    const staffMember = (await db.collection("staff").doc(currentLeftId.toString()).get()).data();
    if(staffMember) {
        document.getElementById('leftStaffName').textContent = staffMember.full_name;
        leftModal.style.display = 'flex';
        leftModal.style.zIndex = '9999';
    }
};

window.closeLeftModal = function() {
    leftModal.style.display = 'none';
    currentLeftId = null;
    document.getElementById('leftDateInput').value = '';
    document.getElementById('leftReasonInput').value = '';
}

document.getElementById('confirmLeftBtn')?.addEventListener('click', async () => {
    const leftDate = document.getElementById('leftDateInput').value;
    const leftReason = document.getElementById('leftReasonInput').value.trim();

    if (!leftDate || !leftReason) {
        showNotification('Please provide both leave date and reason', 'error');
        return;
    }

    if (currentLeftId) {
        const staffToRestore = (await db.collection("staff").doc(currentLeftId.toString()).get()).data();
        
        staffToRestore.left_date = leftDate;
        staffToRestore.left_reason = leftReason;
        staffToRestore.status = 'inactive';

        await db.collection("past_staff").doc(currentLeftId.toString()).set(staffToRestore);
        await db.collection("staff").doc(currentLeftId.toString()).delete();
        
        showNotification('Staff marked as left.', 'success', async () => {
             if(staffToRestore) {
                 delete staffToRestore.left_date;
                 delete staffToRestore.left_reason;
                 delete staffToRestore.status;
                 await db.collection("staff").doc(staffToRestore.staff_id.toString()).set(staffToRestore);
                 await db.collection("past_staff").doc(currentLeftId.toString()).delete();
                 showNotification('Staff restored to active list.', 'success');
                 loadStaffs(searchInput.value.toLowerCase());
             }
        });
        
        closeLeftModal();
        closeEditModal();
        loadStaffs(searchInput.value.toLowerCase());
    }
});

editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const oldId = parseInt(oldStaffId.value);
    const newId = parseInt(editAdmissionNo.value);
    const collectionName = currentFilter === 'active' ? "staff" : "past_staff";
    const staffMember = (await db.collection(collectionName).doc(oldId.toString()).get()).data();
    
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
        await db.collection(collectionName).doc(oldId.toString()).delete();
    }
    await db.collection(collectionName).doc(newId.toString()).set(staffMember);
    showNotification('Staff updated successfully!', 'success');
    closeEditModal();
    loadStaffs(searchInput.value.toLowerCase());
});

// Profile Flow
window.viewStaffProfile = async function(id) {
    console.log("viewStaffProfile clicked for ID:", id);
    // alert("Viewing Staff Profile for ID: " + id);
    try {
        window.currentProfileId = id;
        const collectionName = currentFilter === 'active' ? "staff" : "past_staff";
        const docRef = db.collection(collectionName).doc(id.toString());
        console.log("Fetching staff data from Firestore collection:", collectionName, "ID:", id);
        const docSnap = await docRef.get();
        console.log("Firestore staff response received.");
        const staffMember = docSnap.data();
        
        if(!staffMember) {
            showNotification('Staff member not found!', 'error');
            return;
        }

        // OPEN MODAL FIRST
        console.log("Opening Staff Profile Modal (Simple Mode)...");
        if (profileModal) {
            profileModal.style.display = 'flex';
            profileModal.style.zIndex = '9999';
        }

        if (profileName) profileName.textContent = staffMember.full_name;
        // Check if profileStaffId exists before setting it
        const profileStaffIdEl = document.getElementById('profileStaffId');
        if (profileStaffIdEl) profileStaffIdEl.textContent = staffMember.staff_id;
        
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

    const leftInfo = document.getElementById('profileLeftInfo');
    if (leftInfo) {
        if (staffMember.left_date || staffMember.left_reason) {
            const dateEl = document.getElementById('profileLeftDate');
            const reasonEl = document.getElementById('profileLeftReason');
            if (dateEl) dateEl.textContent = staffMember.left_date || '-';
            if (reasonEl) reasonEl.textContent = staffMember.left_reason || '-';
            leftInfo.classList.remove('hidden');
            leftInfo.classList.add('grid');
        } else {
            leftInfo.classList.add('hidden');
            leftInfo.classList.remove('grid');
        }
    }

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
                        ? `<a href="${(doc.file || '').replace('/upload/', '/upload/fl_attachment/')}" target="_blank" rel="noopener noreferrer" class="text-brand-600 font-semibold hover:underline">Download PDF</a>` 
                        : `<button onclick="window.openImageViewer('${(doc.file || '').replace(/'/g, "\\'")}')" class="text-brand-600 font-semibold hover:underline">View Image</button>`
                    }
                </td>
            `;
            profileDocsTbody.appendChild(tr);
        });
    }

    console.log("Staff basic rendering done.");
    
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

    // Render profile attendance records with date range filtering
    window.currentProfileStaffData = staffMember;
    if (profileAttendanceFrom && !profileAttendanceFrom.value && profileAttendanceTo && !profileAttendanceTo.value) {
        // default to empty (showing all)
    }
    renderProfileAttendance();

    // Render profile periods records with date range filtering
    renderProfilePeriods();

    } catch (error) {
        alert('Critical Error in viewStaffProfile: ' + error.message);
        console.error(error);
    }
}

window.closeProfileModal = function() {
    profileModal.style.display = 'none';
}

function calculateWorkMinutes(entryTime, exitTime) {
    if (!entryTime || !exitTime) return 0;
    const [entryH, entryM] = entryTime.split(':').map(Number);
    const [exitH, exitM] = exitTime.split(':').map(Number);
    if (isNaN(entryH) || isNaN(entryM) || isNaN(exitH) || isNaN(exitM)) return 0;
    
    let totalMinutes = (exitH * 60 + exitM) - (entryH * 60 + entryM);
    if (totalMinutes < 0) totalMinutes += 24 * 60; // Overnight
    return totalMinutes;
}

function formatWorkHours(totalMinutes) {
    if (!totalMinutes || totalMinutes <= 0) return '-';
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours === 0 && mins === 0) return '0h';
    if (mins === 0) return `${hours} hrs`;
    if (hours === 0) return `${mins} mins`;
    return `${hours}h ${mins}m`;
}

window.renderProfileAttendance = function() {
    const staffMember = window.currentProfileStaffData;
    if (!staffMember) return;
    
    const records = staffMember.attendance || [];
    const fromVal = profileAttendanceFrom ? profileAttendanceFrom.value : '';
    const toVal = profileAttendanceTo ? profileAttendanceTo.value : '';

    let filtered = records.filter(r => {
        if (!r.date) return false;
        if (fromVal && r.date < fromVal) return false;
        if (toVal && r.date > toVal) return false;
        return true;
    });

    filtered.sort((a,b) => new Date(b.date) - new Date(a.date));

    // Calculate total minutes worked
    let totalMinutesAll = 0;
    filtered.forEach(r => {
        totalMinutesAll += calculateWorkMinutes(r.entryTime, r.exitTime);
    });
    const totalHoursFormatted = formatWorkHours(totalMinutesAll);

    if (profileAttendanceBadge) {
        const hoursText = totalMinutesAll > 0 ? ` • ${totalHoursFormatted}` : '';
        if (fromVal || toVal) {
            profileAttendanceBadge.textContent = `${filtered.length} of ${records.length} Days${hoursText}`;
        } else {
            profileAttendanceBadge.textContent = `${records.length} Days${hoursText}`;
        }
    }

    const totalHoursEl = document.getElementById('profileTotalWorkHours');
    if (totalHoursEl) {
        totalHoursEl.textContent = totalMinutesAll > 0 ? totalHoursFormatted : '0h';
    }

    if (profileAttendanceTbody) profileAttendanceTbody.innerHTML = '';
    
    if (filtered.length === 0) {
        if (profileAttendanceTable && profileAttendanceTable.parentElement) {
            profileAttendanceTable.parentElement.classList.add('hidden');
        }
        if (noAttendanceMessage) {
            noAttendanceMessage.classList.remove('hidden');
            if (records.length > 0 && (fromVal || toVal)) {
                noAttendanceMessage.textContent = 'No attendance records found for the selected date range.';
            } else {
                noAttendanceMessage.textContent = 'No attendance records yet.';
            }
        }
    } else {
        if (profileAttendanceTable && profileAttendanceTable.parentElement) {
            profileAttendanceTable.parentElement.classList.remove('hidden');
        }
        if (noAttendanceMessage) noAttendanceMessage.classList.add('hidden');

        filtered.forEach(record => {
            const mins = calculateWorkMinutes(record.entryTime, record.exitTime);
            const hoursStr = formatWorkHours(mins);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="py-3 px-4 font-semibold text-gray-800">${record.date}</td>
                <td class="py-3 px-4 text-gray-600">${formatTimeAMPM(record.entryTime)}</td>
                <td class="py-3 px-4 text-gray-600">${formatTimeAMPM(record.exitTime)}</td>
                <td class="py-3 px-4 text-right font-semibold text-blue-600">${hoursStr}</td>
            `;
            profileAttendanceTbody.appendChild(tr);
        });
    }
};

window.setProfileAttendancePreset = function(preset) {
    if (!profileAttendanceFrom || !profileAttendanceTo) return;
    const now = new Date();
    
    if (preset === 'this_month') {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        profileAttendanceFrom.value = firstDay.toLocaleDateString('en-CA');
        profileAttendanceTo.value = lastDay.toLocaleDateString('en-CA');
    } else if (preset === 'last_month') {
        const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
        profileAttendanceFrom.value = firstDay.toLocaleDateString('en-CA');
        profileAttendanceTo.value = lastDay.toLocaleDateString('en-CA');
    } else if (preset === 'last_30_days') {
        const past = new Date();
        past.setDate(past.getDate() - 30);
        profileAttendanceFrom.value = past.toLocaleDateString('en-CA');
        profileAttendanceTo.value = now.toLocaleDateString('en-CA');
    } else if (preset === 'all') {
        profileAttendanceFrom.value = '';
        profileAttendanceTo.value = '';
    }
    renderProfileAttendance();
};

window.clearProfileAttendanceFilter = function() {
    if (profileAttendanceFrom) profileAttendanceFrom.value = '';
    if (profileAttendanceTo) profileAttendanceTo.value = '';
    renderProfileAttendance();
};

if (profileAttendanceFrom) profileAttendanceFrom.addEventListener('change', () => renderProfileAttendance());
if (profileAttendanceTo) profileAttendanceTo.addEventListener('change', () => renderProfileAttendance());

window.renderProfilePeriods = function() {
    const staffMember = window.currentProfileStaffData;
    if (!staffMember) return;

    const records = staffMember.periods || [];
    const fromVal = profilePeriodsFrom ? profilePeriodsFrom.value : '';
    const toVal = profilePeriodsTo ? profilePeriodsTo.value : '';

    let filtered = records.filter(r => {
        if (fromVal && (r.toDate || r.fromDate) < fromVal) return false;
        if (toVal && (r.fromDate || r.toDate) > toVal) return false;
        return true;
    });

    filtered.sort((a,b) => new Date(b.fromDate) - new Date(a.fromDate));

    // Calculate totals
    const totalAllocated = filtered.reduce((sum, r) => sum + (parseInt(r.allocated) || 0), 0);
    const totalConducted = filtered.reduce((sum, r) => sum + (parseInt(r.conducted) || 0), 0);
    const totalMissed = filtered.reduce((sum, r) => sum + (parseInt(r.missed) || 0), 0);
    const completionRate = totalAllocated > 0 ? Math.round((totalConducted / totalAllocated) * 100) : 0;

    if (profilePeriodsBadge) {
        const rateText = totalAllocated > 0 ? ` • ${completionRate}% Conducted` : '';
        if (fromVal || toVal) {
            profilePeriodsBadge.textContent = `${filtered.length} of ${records.length} Weeks${rateText}`;
        } else {
            profilePeriodsBadge.textContent = `${records.length} Weeks${rateText}`;
        }
    }

    if (profileTotalAllocated) profileTotalAllocated.textContent = totalAllocated;
    if (profileTotalConducted) profileTotalConducted.textContent = totalConducted;
    if (profileTotalMissed) profileTotalMissed.textContent = totalMissed;
    if (profileConductPercentage) profileConductPercentage.textContent = `${completionRate}% Completed`;

    if (profilePeriodsTbody) profilePeriodsTbody.innerHTML = '';

    if (filtered.length === 0) {
        if (profilePeriodsTable && profilePeriodsTable.parentElement) {
            profilePeriodsTable.parentElement.classList.add('hidden');
        }
        if (noPeriodsMessage) {
            noPeriodsMessage.classList.remove('hidden');
            if (records.length > 0 && (fromVal || toVal)) {
                noPeriodsMessage.textContent = 'No period records found for the selected date range.';
            } else {
                noPeriodsMessage.textContent = 'No weekly period records yet.';
            }
        }
    } else {
        if (profilePeriodsTable && profilePeriodsTable.parentElement) {
            profilePeriodsTable.parentElement.classList.remove('hidden');
        }
        if (noPeriodsMessage) noPeriodsMessage.classList.add('hidden');

        filtered.forEach(record => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="py-3 px-4 font-semibold text-gray-800">${record.fromDate} to ${record.toDate}</td>
                <td class="py-3 px-3 text-center text-gray-700 font-medium">${record.allocated}</td>
                <td class="py-3 px-3 text-center text-green-600 font-bold">${record.conducted}</td>
                <td class="py-3 px-3 text-center text-red-500 font-bold">${record.missed}</td>
                <td class="py-3 px-4 text-gray-500 text-xs">${record.reason ? record.reason : '-'}</td>
            `;
            profilePeriodsTbody.appendChild(tr);
        });
    }
};

window.setProfilePeriodsPreset = function(preset) {
    if (!profilePeriodsFrom || !profilePeriodsTo) return;
    const now = new Date();

    if (preset === 'this_month') {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        profilePeriodsFrom.value = firstDay.toLocaleDateString('en-CA');
        profilePeriodsTo.value = lastDay.toLocaleDateString('en-CA');
    } else if (preset === 'last_month') {
        const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
        profilePeriodsFrom.value = firstDay.toLocaleDateString('en-CA');
        profilePeriodsTo.value = lastDay.toLocaleDateString('en-CA');
    } else if (preset === 'this_year') {
        const firstDay = new Date(now.getFullYear(), 0, 1);
        const lastDay = new Date(now.getFullYear(), 11, 31);
        profilePeriodsFrom.value = firstDay.toLocaleDateString('en-CA');
        profilePeriodsTo.value = lastDay.toLocaleDateString('en-CA');
    } else if (preset === 'all') {
        profilePeriodsFrom.value = '';
        profilePeriodsTo.value = '';
    }
    renderProfilePeriods();
};

window.clearProfilePeriodsFilter = function() {
    if (profilePeriodsFrom) profilePeriodsFrom.value = '';
    if (profilePeriodsTo) profilePeriodsTo.value = '';
    renderProfilePeriods();
};

if (profilePeriodsFrom) profilePeriodsFrom.addEventListener('change', () => renderProfilePeriods());
if (profilePeriodsTo) profilePeriodsTo.addEventListener('change', () => renderProfilePeriods());


window.printAttendanceReport = function(staffMember, fromVal, toVal) {
    if (!staffMember) staffMember = window.currentProfileStaffData;
    if (!staffMember) {
        showNotification('No staff data to print.', 'error');
        return;
    }

    if (fromVal === undefined) fromVal = profileAttendanceFrom ? profileAttendanceFrom.value : '';
    if (toVal === undefined) toVal = profileAttendanceTo ? profileAttendanceTo.value : '';

    const records = staffMember.attendance || [];
    let filtered = records.filter(r => {
        if (!r.date) return false;
        if (fromVal && r.date < fromVal) return false;
        if (toVal && r.date > toVal) return false;
        return true;
    });

    // Sort ascending by date for a chronological attendance statement
    filtered.sort((a,b) => new Date(a.date) - new Date(b.date));

    let totalMinutes = 0;
    let rowsHTML = '';
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (filtered.length > 0) {
        filtered.forEach((r, idx) => {
            const mins = calculateWorkMinutes(r.entryTime, r.exitTime);
            totalMinutes += mins;
            const hoursStr = formatWorkHours(mins);
            const d = new Date(r.date + 'T00:00:00');
            const dayName = !isNaN(d) ? dayNames[d.getDay()] : '-';

            rowsHTML += `
                <tr>
                    <td style="padding: 7px 10px; border: 1px solid #cbd5e1; text-align: center; color: #64748b;">${idx + 1}</td>
                    <td style="padding: 7px 10px; border: 1px solid #cbd5e1; font-weight: 600;">${r.date}</td>
                    <td style="padding: 7px 10px; border: 1px solid #cbd5e1; color: #475569;">${dayName}</td>
                    <td style="padding: 7px 10px; border: 1px solid #cbd5e1; text-align: center;">${formatTimeAMPM(r.entryTime)}</td>
                    <td style="padding: 7px 10px; border: 1px solid #cbd5e1; text-align: center;">${formatTimeAMPM(r.exitTime)}</td>
                    <td style="padding: 7px 10px; border: 1px solid #cbd5e1; text-align: right; font-weight: 700; color: #1e40af;">${hoursStr}</td>
                </tr>
            `;
        });
    } else {
        rowsHTML = `<tr><td colspan="6" style="padding: 16px; text-align: center; color: #6b7280;">No attendance records found for this period.</td></tr>`;
    }

    const totalHoursStr = formatWorkHours(totalMinutes);
    const avgMinutes = filtered.length > 0 ? Math.round(totalMinutes / filtered.length) : 0;
    const avgHoursStr = formatWorkHours(avgMinutes);

    let dateRangeText = 'All Recorded Attendance';
    if (fromVal && toVal) {
        dateRangeText = `${fromVal} to ${toVal}`;
    } else if (fromVal) {
        dateRangeText = `From ${fromVal} onwards`;
    } else if (toVal) {
        dateRangeText = `Up to ${toVal}`;
    }

    const printWin = window.open('', '_blank');
    printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Attendance Report - ${staffMember.full_name}</title>
            <style>
                @page { size: A4 portrait; margin: 12mm 15mm; }
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    color: #1e293b;
                    margin: 0;
                    padding: 15px;
                    line-height: 1.4;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #4f46e5;
                    padding-bottom: 12px;
                    margin-bottom: 18px;
                }
                .college-name {
                    font-size: 22px;
                    font-weight: 800;
                    color: #312e81;
                    letter-spacing: 0.5px;
                }
                .report-title {
                    font-size: 15px;
                    font-weight: 600;
                    color: #4f46e5;
                    margin-top: 4px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .info-card {
                    display: grid;
                    grid-template-columns: 3fr 2fr;
                    gap: 15px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 12px 16px;
                    margin-bottom: 18px;
                    font-size: 13px;
                }
                .info-row { margin-bottom: 4px; }
                .info-row strong { color: #475569; display: inline-block; width: 105px; }
                .stats-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    margin-bottom: 20px;
                }
                .stat-box {
                    background: #f0fdf4;
                    border: 1px solid #bbf7d0;
                    border-radius: 8px;
                    padding: 10px 14px;
                    text-align: center;
                }
                .stat-box:nth-child(2) {
                    background: #eff6ff;
                    border-color: #bfdbfe;
                }
                .stat-box:nth-child(3) {
                    background: #faf5ff;
                    border-color: #e9d5ff;
                }
                .stat-title {
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #64748b;
                }
                .stat-val {
                    font-size: 18px;
                    font-weight: 800;
                    color: #0f172a;
                    margin-top: 2px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 12px;
                    margin-bottom: 35px;
                }
                th {
                    background-color: #f1f5f9;
                    color: #334155;
                    font-weight: 700;
                    padding: 8px 10px;
                    border: 1px solid #cbd5e1;
                    text-transform: uppercase;
                    font-size: 11px;
                }
                tr:nth-child(even) { background-color: #f8fafc; }
                .signatures {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 50px;
                    padding: 0 40px;
                }
                .sig-box {
                    text-align: center;
                    border-top: 1px dashed #64748b;
                    padding-top: 8px;
                    width: 170px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #475569;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 10px;
                    color: #94a3b8;
                    border-top: 1px solid #e2e8f0;
                    padding-top: 8px;
                }
                @media print {
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="college-name">ZAINABIYYA LADIES COLLEGE</div>
                <div class="report-title">Staff Attendance Statement</div>
            </div>

            <div class="info-card">
                <div>
                    <div class="info-row"><strong>Staff Name:</strong> ${staffMember.full_name}</div>
                    <div class="info-row"><strong>Staff ID:</strong> #${staffMember.staff_id}</div>
                    <div class="info-row"><strong>Designation:</strong> ${staffMember.grade || '-'}${staffMember.emp_type ? ` (${staffMember.emp_type})` : ''}</div>
                </div>
                <div>
                    <div class="info-row"><strong>Contact:</strong> ${staffMember.parent_contact || '-'}</div>
                    <div class="info-row"><strong>Period:</strong> ${dateRangeText}</div>
                    <div class="info-row"><strong>Generated On:</strong> ${new Date().toLocaleDateString()}</div>
                </div>
            </div>

            <div class="stats-container">
                <div class="stat-box">
                    <div class="stat-title">Days Present</div>
                    <div class="stat-val" style="color:#15803d;">${filtered.length} Days</div>
                </div>
                <div class="stat-box">
                    <div class="stat-title">Total Work Hours</div>
                    <div class="stat-val" style="color:#1d4ed8;">${totalHoursStr}</div>
                </div>
                <div class="stat-box">
                    <div class="stat-title">Average Hours / Day</div>
                    <div class="stat-val" style="color:#7e22ce;">${avgHoursStr}</div>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th style="width: 35px; text-align: center;">#</th>
                        <th>Date</th>
                        <th>Day</th>
                        <th style="text-align: center;">Entry Time</th>
                        <th style="text-align: center;">Exit Time</th>
                        <th style="text-align: right;">Work Hours</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHTML}
                </tbody>
                <tfoot>
                    <tr style="background: #e2e8f0; font-weight: bold;">
                        <td colspan="5" style="padding: 8px 10px; text-align: right; border: 1px solid #cbd5e1;">TOTAL WORKED HOURS:</td>
                        <td style="padding: 8px 10px; text-align: right; border: 1px solid #cbd5e1; color: #1e40af;">${totalHoursStr}</td>
                    </tr>
                </tfoot>
            </table>

            <div class="signatures">
                <div class="sig-box">Staff Signature</div>
                <div class="sig-box">Authorized Signature</div>
            </div>

            <div class="footer">
                Report generated via Zainabiyya System on ${new Date().toLocaleString()}
            </div>

            <script>
                window.onload = function() {
                    window.print();
                };
            </script>
        </body>
        </html>
    `);
    printWin.document.close();
};

window.printAttendanceReportFromModal = function() {
    printAttendanceReport(
        window.currentManageAttendanceStaff,
        manageAttendanceFrom ? manageAttendanceFrom.value : '',
        manageAttendanceTo ? manageAttendanceTo.value : ''
    );
};

window.printPeriodsReport = function(staffMember, fromVal, toVal) {
    if (!staffMember) staffMember = window.currentProfileStaffData;
    if (!staffMember) {
        showNotification('No staff data to print.', 'error');
        return;
    }

    if (fromVal === undefined) fromVal = profilePeriodsFrom ? profilePeriodsFrom.value : '';
    if (toVal === undefined) toVal = profilePeriodsTo ? profilePeriodsTo.value : '';

    const records = staffMember.periods || [];
    let filtered = records.filter(r => {
        if (fromVal && (r.toDate || r.fromDate) < fromVal) return false;
        if (toVal && (r.fromDate || r.toDate) > toVal) return false;
        return true;
    });

    // Chronological order for report
    filtered.sort((a,b) => new Date(a.fromDate) - new Date(b.fromDate));

    const totalAllocated = filtered.reduce((sum, r) => sum + (parseInt(r.allocated) || 0), 0);
    const totalConducted = filtered.reduce((sum, r) => sum + (parseInt(r.conducted) || 0), 0);
    const totalMissed = filtered.reduce((sum, r) => sum + (parseInt(r.missed) || 0), 0);
    const completionRate = totalAllocated > 0 ? Math.round((totalConducted / totalAllocated) * 100) : 0;

    let rowsHTML = '';
    if (filtered.length > 0) {
        filtered.forEach((r, idx) => {
            const alloc = parseInt(r.allocated) || 0;
            const cond = parseInt(r.conducted) || 0;
            const miss = parseInt(r.missed) || 0;
            const pct = alloc > 0 ? Math.round((cond / alloc) * 100) : 0;

            rowsHTML += `
                <tr>
                    <td style="padding: 7px 10px; border: 1px solid #cbd5e1; text-align: center; color: #64748b;">${idx + 1}</td>
                    <td style="padding: 7px 10px; border: 1px solid #cbd5e1; font-weight: 600;">${r.fromDate} &nbsp;to&nbsp; ${r.toDate}</td>
                    <td style="padding: 7px 10px; border: 1px solid #cbd5e1; text-align: center; font-weight: 600;">${alloc}</td>
                    <td style="padding: 7px 10px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #15803d;">${cond}</td>
                    <td style="padding: 7px 10px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #b91c1c;">${miss}</td>
                    <td style="padding: 7px 10px; border: 1px solid #cbd5e1; text-align: center; font-weight: 600; color: #4338ca;">${pct}%</td>
                    <td style="padding: 7px 10px; border: 1px solid #cbd5e1; color: #475569; font-size: 11px;">${r.reason || '-'}</td>
                </tr>
            `;
        });
    } else {
        rowsHTML = `<tr><td colspan="7" style="padding: 16px; text-align: center; color: #6b7280;">No period records found for this date range.</td></tr>`;
    }

    let dateRangeText = 'All Recorded Periods';
    if (fromVal && toVal) {
        dateRangeText = `${fromVal} to ${toVal}`;
    } else if (fromVal) {
        dateRangeText = `From ${fromVal} onwards`;
    } else if (toVal) {
        dateRangeText = `Up to ${toVal}`;
    }

    const printWin = window.open('', '_blank');
    printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Weekly Periods Report - ${staffMember.full_name}</title>
            <style>
                @page { size: A4 portrait; margin: 12mm 15mm; }
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    color: #1e293b;
                    margin: 0;
                    padding: 15px;
                    line-height: 1.4;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #4f46e5;
                    padding-bottom: 12px;
                    margin-bottom: 18px;
                }
                .college-name {
                    font-size: 22px;
                    font-weight: 800;
                    color: #312e81;
                    letter-spacing: 0.5px;
                }
                .report-title {
                    font-size: 15px;
                    font-weight: 600;
                    color: #4f46e5;
                    margin-top: 4px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .info-card {
                    display: grid;
                    grid-template-columns: 3fr 2fr;
                    gap: 15px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 12px 16px;
                    margin-bottom: 18px;
                    font-size: 13px;
                }
                .info-row { margin-bottom: 4px; }
                .info-row strong { color: #475569; display: inline-block; width: 105px; }
                .stats-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .stat-box {
                    background: #f8fafc;
                    border: 1px solid #cbd5e1;
                    border-radius: 8px;
                    padding: 10px 12px;
                    text-align: center;
                }
                .stat-box.alloc { background: #f8fafc; border-color: #cbd5e1; }
                .stat-box.cond { background: #f0fdf4; border-color: #bbf7d0; }
                .stat-box.miss { background: #fef2f2; border-color: #fecaca; }
                .stat-box.rate { background: #eef2ff; border-color: #c7d2fe; }
                .stat-title {
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #64748b;
                }
                .stat-val {
                    font-size: 18px;
                    font-weight: 800;
                    color: #0f172a;
                    margin-top: 2px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 12px;
                    margin-bottom: 35px;
                }
                th {
                    background-color: #f1f5f9;
                    color: #334155;
                    font-weight: 700;
                    padding: 8px 10px;
                    border: 1px solid #cbd5e1;
                    text-transform: uppercase;
                    font-size: 11px;
                }
                tr:nth-child(even) { background-color: #f8fafc; }
                .signatures {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 50px;
                    padding: 0 40px;
                }
                .sig-box {
                    text-align: center;
                    border-top: 1px dashed #64748b;
                    padding-top: 8px;
                    width: 170px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #475569;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 10px;
                    color: #94a3b8;
                    border-top: 1px solid #e2e8f0;
                    padding-top: 8px;
                }
                @media print {
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="college-name">ZAINABIYYA LADIES COLLEGE</div>
                <div class="report-title">Weekly Teaching Periods Statement</div>
            </div>

            <div class="info-card">
                <div>
                    <div class="info-row"><strong>Staff Name:</strong> ${staffMember.full_name}</div>
                    <div class="info-row"><strong>Staff ID:</strong> #${staffMember.staff_id}</div>
                    <div class="info-row"><strong>Designation:</strong> ${staffMember.grade || '-'}${staffMember.emp_type ? ` (${staffMember.emp_type})` : ''}</div>
                </div>
                <div>
                    <div class="info-row"><strong>Contact:</strong> ${staffMember.parent_contact || '-'}</div>
                    <div class="info-row"><strong>Period:</strong> ${dateRangeText}</div>
                    <div class="info-row"><strong>Generated On:</strong> ${new Date().toLocaleDateString()}</div>
                </div>
            </div>

            <div class="stats-container">
                <div class="stat-box alloc">
                    <div class="stat-title">Allocated</div>
                    <div class="stat-val" style="color:#334155;">${totalAllocated}</div>
                </div>
                <div class="stat-box cond">
                    <div class="stat-title">Conducted</div>
                    <div class="stat-val" style="color:#15803d;">${totalConducted}</div>
                </div>
                <div class="stat-box miss">
                    <div class="stat-title">Missed</div>
                    <div class="stat-val" style="color:#b91c1c;">${totalMissed}</div>
                </div>
                <div class="stat-box rate">
                    <div class="stat-title">Completion</div>
                    <div class="stat-val" style="color:#4338ca;">${completionRate}%</div>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th style="width: 30px; text-align: center;">#</th>
                        <th>Date Range</th>
                        <th style="text-align: center; width: 65px;">Allocated</th>
                        <th style="text-align: center; width: 70px;">Conducted</th>
                        <th style="text-align: center; width: 60px;">Missed</th>
                        <th style="text-align: center; width: 75px;">Completed</th>
                        <th>Reason / Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHTML}
                </tbody>
                <tfoot>
                    <tr style="background: #e2e8f0; font-weight: bold;">
                        <td colspan="2" style="padding: 8px 10px; text-align: right; border: 1px solid #cbd5e1;">TOTALS:</td>
                        <td style="padding: 8px 10px; text-align: center; border: 1px solid #cbd5e1; font-weight: 700;">${totalAllocated}</td>
                        <td style="padding: 8px 10px; text-align: center; border: 1px solid #cbd5e1; font-weight: 700; color: #15803d;">${totalConducted}</td>
                        <td style="padding: 8px 10px; text-align: center; border: 1px solid #cbd5e1; font-weight: 700; color: #b91c1c;">${totalMissed}</td>
                        <td style="padding: 8px 10px; text-align: center; border: 1px solid #cbd5e1; font-weight: 700; color: #4338ca;">${completionRate}%</td>
                        <td style="padding: 8px 10px; border: 1px solid #cbd5e1;"></td>
                    </tr>
                </tfoot>
            </table>

            <div class="signatures">
                <div class="sig-box">Staff Signature</div>
                <div class="sig-box">Principal / Authorized Signature</div>
            </div>

            <div class="footer">
                Report generated via Zainabiyya System on ${new Date().toLocaleString()}
            </div>

            <script>
                window.onload = function() {
                    window.print();
                };
            </script>
        </body>
        </html>
    `);
    printWin.document.close();
};

window.printPeriodsReportFromModal = function() {
    printPeriodsReport(
        window.currentManagePeriodsStaff,
        managePeriodsFrom ? managePeriodsFrom.value : '',
        managePeriodsTo ? managePeriodsTo.value : ''
    );
};

window.printStaffProfile = async function() {
    if (!window.currentProfileId) return;
    
    const collectionName = currentFilter === 'active' ? "staff" : "past_staff";
    const staffMember = (await db.collection(collectionName).doc(window.currentProfileId.toString()).get()).data();
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

    let attendanceHTML = '';
    const attRecords = staffMember.attendance || [];
    const pFrom = profileAttendanceFrom ? profileAttendanceFrom.value : '';
    const pTo = profileAttendanceTo ? profileAttendanceTo.value : '';
    let filteredAtt = attRecords.filter(r => {
        if (!r.date) return false;
        if (pFrom && r.date < pFrom) return false;
        if (pTo && r.date > pTo) return false;
        return true;
    }).sort((a,b) => new Date(b.date) - new Date(a.date));

    let printTotalMinutes = 0;
    if (filteredAtt.length > 0) {
        filteredAtt.forEach(a => {
            const m = calculateWorkMinutes(a.entryTime, a.exitTime);
            printTotalMinutes += m;
            attendanceHTML += `
                <tr>
                    <td style="padding:8px; border:1px solid #e5e7eb;">${a.date}</td>
                    <td style="padding:8px; border:1px solid #e5e7eb;">${formatTimeAMPM(a.entryTime)}</td>
                    <td style="padding:8px; border:1px solid #e5e7eb;">${formatTimeAMPM(a.exitTime)}</td>
                    <td style="padding:8px; border:1px solid #e5e7eb; text-align:right; font-weight:bold;">${formatWorkHours(m)}</td>
                </tr>
            `;
        });
        attendanceHTML += `
            <tr style="background:#f9fafb; font-weight:bold;">
                <td colspan="3" style="padding:8px; border:1px solid #e5e7eb; text-align:right;">Total Work Hours:</td>
                <td style="padding:8px; border:1px solid #e5e7eb; text-align:right; color:#2563eb;">${formatWorkHours(printTotalMinutes)}</td>
            </tr>
        `;
    } else {
        attendanceHTML = '<tr><td colspan="4" style="padding:8px; text-align:center; color:#6b7280;">No attendance records found.</td></tr>';
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

            <div class="section-title">Attendance History ${pFrom || pTo ? `(${pFrom || 'Start'} to ${pTo || 'End'})` : ''}</div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Entry Time</th>
                        <th>Exit Time</th>
                        <th style="text-align:right;">Work Hours</th>
                    </tr>
                </thead>
                <tbody>
                    ${attendanceHTML}
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
window.openSalaryModal = function(id, name) {
    console.log("openSalaryModal clicked for ID:", id);
    if (salaryStaffName) salaryStaffName.textContent = name;
    if (addSalaryStaffId) addSalaryStaffId.value = id;
    loadSalaries(id);
    if (salaryModal) {
        salaryModal.style.display = 'flex';
        salaryModal.style.zIndex = '9999';
    }
};

async function loadSalaries(id) {
    const staff = (await db.collection("staff").doc(id.toString()).get()).data();
    if(staff) renderSalaries(staff);
}

window.closeSalaryModal = function() {
    salaryModal.style.display = 'none';
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

window.deleteSalary = function(staffId, salaryId) {
    openGenericConfirmModal("Delete Salary", "Are you sure you want to delete this salary record?", async () => {
        const staffMember = (await db.collection("staff").doc(staffId.toString()).get()).data();
        if(staffMember && staffMember.salaries) {
            staffMember.salaries = staffMember.salaries.filter(s => s.id !== salaryId);
            await db.collection("staff").doc(staffMember.staff_id.toString()).set(staffMember);
            renderSalaries(staffMember);
        }
    });
};

// Docs Flow
// Attendance Flow
window.openAttendanceModal = function(id, name) {
    console.log("openAttendanceModal clicked for ID:", id);
    if (attendanceStaffName) attendanceStaffName.textContent = name;
    if (addAttendanceStaffId) addAttendanceStaffId.value = id;
    if (manageAttendanceFrom) manageAttendanceFrom.value = '';
    if (manageAttendanceTo) manageAttendanceTo.value = '';
    loadAttendance(id);
    if (attendanceModal) {
        attendanceModal.style.display = 'flex';
        attendanceModal.style.zIndex = '9999';
    }
};

async function loadAttendance(id) {
    let docSnap = await db.collection("staff").doc(id.toString()).get();
    if (!docSnap.exists) {
        docSnap = await db.collection("past_staff").doc(id.toString()).get();
    }
    const staff = docSnap.data();
    if(staff) renderAttendance(staff);
}

window.closeAttendanceModal = function() {
    attendanceModal.style.display = 'none';
    addAttendanceForm.reset();
}

function formatTimeAMPM(time24) {
    if(!time24) return '-';
    let [h, m] = time24.split(':');
    let hours = parseInt(h);
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    return `${hours}:${m} ${ampm}`;
}

window.renderAttendance = function(staffMember) {
    if (!staffMember) staffMember = window.currentManageAttendanceStaff;
    if (!staffMember) return;
    window.currentManageAttendanceStaff = staffMember;

    attendanceTbody.innerHTML = '';
    const records = staffMember.attendance || [];

    if (records.length === 0) {
        attendanceTbody.innerHTML = '<tr><td colspan="4" class="py-4 text-center text-gray-500">No attendance records yet.</td></tr>';
        if (manageAttendanceBadge) manageAttendanceBadge.textContent = '0';
        return;
    }
    
    // Ensure every record has a unique id
    let needsUpdate = false;
    records.forEach((r, idx) => {
        if (r.id === undefined || r.id === null) {
            r.id = Date.now() + idx;
            needsUpdate = true;
        }
    });
    if (needsUpdate) {
        const coll = currentFilter === 'active' ? "staff" : "past_staff";
        db.collection(coll).doc(staffMember.staff_id.toString()).set(staffMember).catch(console.error);
    }

    const fromVal = manageAttendanceFrom ? manageAttendanceFrom.value : '';
    const toVal = manageAttendanceTo ? manageAttendanceTo.value : '';

    let filtered = records.filter(r => {
        if (!r.date) return false;
        if (fromVal && r.date < fromVal) return false;
        if (toVal && r.date > toVal) return false;
        return true;
    });

    if (manageAttendanceBadge) {
        if (fromVal || toVal) {
            manageAttendanceBadge.textContent = `${filtered.length} of ${records.length}`;
        } else {
            manageAttendanceBadge.textContent = `${records.length}`;
        }
    }

    const sortedAttendance = [...filtered].sort((a,b) => new Date(b.date) - new Date(a.date));

    if (sortedAttendance.length === 0) {
        attendanceTbody.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-gray-500">No attendance records found for date range.</td></tr>';
        return;
    }

    sortedAttendance.forEach(record => {
        const mins = calculateWorkMinutes(record.entryTime, record.exitTime);
        const hoursStr = formatWorkHours(mins);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="py-3 px-4 font-semibold text-gray-800">${record.date}</td>
            <td class="py-3 px-4 text-gray-600">${formatTimeAMPM(record.entryTime)}</td>
            <td class="py-3 px-4 text-gray-600">${formatTimeAMPM(record.exitTime)}</td>
            <td class="py-3 px-4 text-center font-medium text-blue-600">${hoursStr}</td>
            <td class="py-3 px-4 text-right">
                <button onclick="deleteAttendance(${staffMember.staff_id}, ${record.id})" class="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </td>
        `;
        attendanceTbody.appendChild(tr);
    });
};

window.clearManageAttendanceFilter = function() {
    if (manageAttendanceFrom) manageAttendanceFrom.value = '';
    if (manageAttendanceTo) manageAttendanceTo.value = '';
    renderAttendance();
};

if (manageAttendanceFrom) manageAttendanceFrom.addEventListener('change', () => renderAttendance());
if (manageAttendanceTo) manageAttendanceTo.addEventListener('change', () => renderAttendance());

addAttendanceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(addAttendanceStaffId.value);
    let collectionName = "staff";
    let docRef = db.collection("staff").doc(id.toString());
    let docSnap = await docRef.get();
    if (!docSnap.exists) {
        collectionName = "past_staff";
        docRef = db.collection("past_staff").doc(id.toString());
        docSnap = await docRef.get();
    }
    const staffMember = docSnap.data();
    
    if(!staffMember.attendance) staffMember.attendance = [];
    staffMember.attendance.push({
        id: Date.now(),
        date: newAttendanceDate.value,
        entryTime: newAttendanceEntryTime.value,
        exitTime: newAttendanceExitTime.value
    });
    
    await db.collection(collectionName).doc(staffMember.staff_id.toString()).set(staffMember);
    addAttendanceForm.reset();
    newAttendanceDate.valueAsDate = new Date();
    renderAttendance(staffMember);

    if (window.currentProfileId && window.currentProfileId.toString() === id.toString() && profileModal && profileModal.style.display !== 'none') {
        viewStaffProfile(id);
    }

    showNotification('Attendance added successfully!', 'success');
});

window.deleteAttendance = function(staffId, recordId) {
    openGenericConfirmModal("Delete Attendance", "Are you sure you want to delete this record?", async () => {
        let collectionName = "staff";
        let docRef = db.collection("staff").doc(staffId.toString());
        let docSnap = await docRef.get();
        if (!docSnap.exists) {
            collectionName = "past_staff";
            docRef = db.collection("past_staff").doc(staffId.toString());
            docSnap = await docRef.get();
        }
        const staffMember = docSnap.data();
        if(staffMember && staffMember.attendance) {
            staffMember.attendance = staffMember.attendance.filter(r => {
                if (r.id !== undefined && r.id !== null) {
                    return r.id != recordId;
                }
                return r.date !== recordId;
            });
            await db.collection(collectionName).doc(staffMember.staff_id.toString()).set(staffMember);
            renderAttendance(staffMember);

            if (window.currentProfileId && window.currentProfileId.toString() === staffId.toString() && profileModal && profileModal.style.display !== 'none') {
                viewStaffProfile(staffId);
            }

            showNotification('Attendance record deleted!', 'success');
        }
    });
};

// Periods Flow
window.openPeriodsModal = function(id, name) {
    if (periodsStaffName) periodsStaffName.textContent = name;
    if (addPeriodsStaffId) addPeriodsStaffId.value = id;
    if (managePeriodsFrom) managePeriodsFrom.value = '';
    if (managePeriodsTo) managePeriodsTo.value = '';
    loadPeriods(id);
    if (periodsModal) {
        periodsModal.style.display = 'flex';
        periodsModal.style.zIndex = '9999';
    }
};

async function loadPeriods(id) {
    let docSnap = await db.collection("staff").doc(id.toString()).get();
    if (!docSnap.exists) {
        docSnap = await db.collection("past_staff").doc(id.toString()).get();
    }
    const staff = docSnap.data();
    if(staff) renderPeriods(staff);
}

window.closePeriodsModal = function() {
    periodsModal.style.display = 'none';
    addPeriodsForm.reset();
    newPeriodReasonContainer.classList.add('hidden');
    newPeriodReason.removeAttribute('required');
}

window.renderPeriods = function(staffMember) {
    if (!staffMember) staffMember = window.currentManagePeriodsStaff;
    if (!staffMember) return;
    window.currentManagePeriodsStaff = staffMember;

    periodsTbody.innerHTML = '';
    const records = staffMember.periods || [];

    if (records.length === 0) {
        periodsTbody.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-gray-500">No period records yet.</td></tr>';
        if (managePeriodsBadge) managePeriodsBadge.textContent = '0';
        return;
    }

    const fromVal = managePeriodsFrom ? managePeriodsFrom.value : '';
    const toVal = managePeriodsTo ? managePeriodsTo.value : '';

    let filtered = records.filter(r => {
        if (fromVal && (r.toDate || r.fromDate) < fromVal) return false;
        if (toVal && (r.fromDate || r.toDate) > toVal) return false;
        return true;
    });

    if (managePeriodsBadge) {
        if (fromVal || toVal) {
            managePeriodsBadge.textContent = `${filtered.length} of ${records.length}`;
        } else {
            managePeriodsBadge.textContent = `${records.length}`;
        }
    }

    if (filtered.length === 0) {
        periodsTbody.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-gray-500">No period records found for date range.</td></tr>';
        return;
    }
    
    const sortedPeriods = [...filtered].sort((a,b) => new Date(b.fromDate) - new Date(a.fromDate));

    sortedPeriods.forEach(record => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="py-3 px-4 font-semibold text-gray-800">${record.fromDate} to ${record.toDate}</td>
            <td class="py-3 px-2 text-center text-gray-600">${record.allocated}</td>
            <td class="py-3 px-2 text-center text-green-600 font-semibold">${record.conducted}</td>
            <td class="py-3 px-2 text-center text-red-500 font-bold" title="${record.reason || ''}">${record.missed}</td>
            <td class="py-3 px-4 text-right">
                <button onclick="deletePeriod(${staffMember.staff_id}, ${record.id})" class="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </td>
        `;
        periodsTbody.appendChild(tr);
    });
};

window.clearManagePeriodsFilter = function() {
    if (managePeriodsFrom) managePeriodsFrom.value = '';
    if (managePeriodsTo) managePeriodsTo.value = '';
    renderPeriods();
};

if (managePeriodsFrom) managePeriodsFrom.addEventListener('change', () => renderPeriods());
if (managePeriodsTo) managePeriodsTo.addEventListener('change', () => renderPeriods());

function updateMissedPeriods() {
    const allocated = parseInt(newPeriodAllocated.value) || 0;
    const conducted = parseInt(newPeriodConducted.value) || 0;
    let missed = allocated - conducted;
    if (missed < 0) missed = 0;
    newPeriodMissed.value = missed;
    
    if (missed > 0) {
        newPeriodReasonContainer.classList.remove('hidden');
        newPeriodReason.setAttribute('required', 'required');
    } else {
        newPeriodReasonContainer.classList.add('hidden');
        newPeriodReason.removeAttribute('required');
        newPeriodReason.value = '';
    }
}

if (newPeriodAllocated) newPeriodAllocated.addEventListener('input', updateMissedPeriods);
if (newPeriodConducted) newPeriodConducted.addEventListener('input', updateMissedPeriods);

addPeriodsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(addPeriodsStaffId.value);
    let collectionName = "staff";
    let docRef = db.collection("staff").doc(id.toString());
    let docSnap = await docRef.get();
    if (!docSnap.exists) {
        collectionName = "past_staff";
        docRef = db.collection("past_staff").doc(id.toString());
        docSnap = await docRef.get();
    }
    const staffMember = docSnap.data();
    
    if(!staffMember.periods) staffMember.periods = [];
    staffMember.periods.push({
        id: Date.now(),
        fromDate: newPeriodFromDate.value,
        toDate: newPeriodToDate.value,
        allocated: parseInt(newPeriodAllocated.value),
        conducted: parseInt(newPeriodConducted.value),
        missed: parseInt(newPeriodMissed.value),
        reason: newPeriodReason.value.trim()
    });
    
    await db.collection(collectionName).doc(staffMember.staff_id.toString()).set(staffMember);
    addPeriodsForm.reset();
    newPeriodReasonContainer.classList.add('hidden');
    newPeriodReason.removeAttribute('required');
    newPeriodFromDate.valueAsDate = new Date();
    newPeriodToDate.valueAsDate = new Date();
    renderPeriods(staffMember);

    if (window.currentProfileId && window.currentProfileId.toString() === id.toString() && profileModal && profileModal.style.display !== 'none') {
        viewStaffProfile(id);
    }

    showNotification('Weekly periods added successfully!', 'success');
});

window.deletePeriod = function(staffId, recordId) {
    openGenericConfirmModal("Delete Periods Record", "Are you sure you want to delete this record?", async () => {
        let collectionName = "staff";
        let docRef = db.collection("staff").doc(staffId.toString());
        let docSnap = await docRef.get();
        if (!docSnap.exists) {
            collectionName = "past_staff";
            docRef = db.collection("past_staff").doc(staffId.toString());
            docSnap = await docRef.get();
        }
        const staffMember = docSnap.data();
        if(staffMember && staffMember.periods) {
            staffMember.periods = staffMember.periods.filter(r => r.id !== recordId);
            await db.collection(collectionName).doc(staffMember.staff_id.toString()).set(staffMember);
            renderPeriods(staffMember);

            if (window.currentProfileId && window.currentProfileId.toString() === staffId.toString() && profileModal && profileModal.style.display !== 'none') {
                viewStaffProfile(staffId);
            }

            showNotification('Periods record deleted!', 'success');
        }
    });
};

// Docs Flow
window.openDocsModal = function(id, name) {
    console.log("openDocsModal (staff) clicked for ID:", id);
    if (docStaffName) docStaffName.textContent = name;
    if (addDocStaffId) addDocStaffId.value = id;
    loadDocs(id);
    if (docsModal) {
        docsModal.style.display = 'flex';
        docsModal.style.zIndex = '9999';
    }
};

async function loadDocs(id) {
    const student = (await db.collection("staff").doc(id.toString()).get()).data();
    if(student) renderDocs(student);
}

window.closeDocsModal = function() {
    docsModal.style.display = 'none';
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
                        ? `<a href="${(doc.file || '').replace('/upload/', '/upload/fl_attachment/')}" target="_blank" rel="noopener noreferrer" class="text-brand-400 hover:text-brand-600 p-1.5 hover:bg-brand-50 rounded-lg transition-colors" title="Download PDF">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                           </a>` 
                        : `<button onclick="window.openImageViewer('${(doc.file || '').replace(/'/g, "\\'")}')" class="text-brand-400 hover:text-brand-600 p-1.5 hover:bg-brand-50 rounded-lg transition-colors" title="View Image">
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

window.deleteDoc = function(staffId, docId) {
    openGenericConfirmModal("Delete Document", "Are you sure you want to delete this document?", async () => {
        const staffMember = (await db.collection("staff").doc(staffId.toString()).get()).data();
        if(staffMember && staffMember.docs) {
            staffMember.docs = staffMember.docs.filter(d => d.id !== docId);
            await db.collection("staff").doc(staffMember.staff_id.toString()).set(staffMember);
            renderDocs(staffMember);
            loadStaffs(searchInput.value.toLowerCase());
            showNotification('Document deleted successfully!', 'success');
        }
    });
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
