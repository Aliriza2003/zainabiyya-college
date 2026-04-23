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
if (sessionStorage.getItem('isLoggedIn') !== 'true' || sessionStorage.getItem('loggedInModule') !== 'library') {
    window.location.replace('index.html');
}

window.addEventListener('pageshow', function(event) {
    if (event.persisted || sessionStorage.getItem('isLoggedIn') !== 'true' || sessionStorage.getItem('loggedInModule') !== 'library') {
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

const bookModal = document.getElementById('bookModal');
const form = document.getElementById('bookForm');

window.openBookModal = function() {
    bookModal.classList.remove('hidden');
    bookModal.classList.add('flex');
};

window.closeBookModal = function() {
    bookModal.classList.add('hidden');
    bookModal.classList.remove('flex');
    form.reset();
};
const bookIdInput = document.getElementById('bookId');
const photoInput = document.getElementById('photo');
const titleInput = document.getElementById('fullName');
const categoryInput = document.getElementById('grade');
const authorInput = document.getElementById('parentAuthor');
const countryInput = document.getElementById('country');
const admissionDateInput = document.getElementById('admissionDate');
const nicInput = document.getElementById('nic');
const addressInput = document.getElementById('address');
const dobInput = document.getElementById('dob');
const quantityInput = document.getElementById('quantity');
const bookNoteInput = document.getElementById('bookNote');
const bookList = document.getElementById('bookList');
const emptyState = document.getElementById('emptyState');
const bookCount = document.getElementById('bookCount');
const searchInput = document.getElementById('searchInput');
const notification = document.getElementById('notification');

let currentDeleteId = null;
const deleteModal = document.getElementById('deleteModal');
const deleteModalContent = document.getElementById('deleteModalContent');
const deleteBookName = document.getElementById('deleteBookName');

// Edit Elements
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editAdmissionNo = document.getElementById('editAdmissionNo');
const editFullName = document.getElementById('editFullName');
const editGrade = document.getElementById('editCategory');
const editContact = document.getElementById('editAuthor');
const editCountry = document.getElementById('editCountry');
const editAdmissionDate = document.getElementById('editAdmissionDate');
const editNic = document.getElementById('editNic');
const editAddress = document.getElementById('editPublisher');
const editDob = document.getElementById('editDob');
const editQuantity = document.getElementById('editQuantity');
const editPhoto = document.getElementById('editPhoto');
const editPhotoPreview = document.getElementById('editPhotoPreview');
const editNote = document.getElementById('editNote');



// Profile Elements
const profileModal = document.getElementById('profileModal');
const profilePhoto = document.getElementById('profilePhoto');
const profileAvatarFallback = document.getElementById('profileAvatarFallback');
const profileName = document.getElementById('profileName');
const profileGrade = document.getElementById('profileCategory');
const profileContact = document.getElementById('profileAuthor');
const profileAdmissionDate = document.getElementById('profileAdmissionDate');
const profileNic = document.getElementById('profileNic');
const profileAddress = document.getElementById('profilePublisher');
const profileDob = document.getElementById('profileDob');
const profileCountry = document.getElementById('profileCountry');
const profileNote = document.getElementById('profileNote');



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
    document.addEventListener('DOMContentLoaded', () => loadBooks());
} else {
    loadBooks();
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

    const book = {
        book_id: parseInt(bookIdInput.value),
        photo: photoBase64,
        title: titleInput.value.trim(),
        category: categoryInput.value.trim(),
        country: countryInput.value.trim(),
        author: authorInput.value.trim(),
        admission_date: admissionDateInput.value,
        nic: nicInput.value.trim(),
        address: addressInput.value.trim(),
        dob: dobInput.value,
        quantity: parseInt(quantityInput.value) || 1,
        note: bookNoteInput.value.trim()
    };

    try {
        const docRef = db.collection("books").doc(book.book_id.toString());
        const existingDoc = await docRef.get();
        if (existingDoc.exists) {
            showNotification(`Admission No "${book.book_id}" already exists!`, 'error');
            return;
        }
        await docRef.set(book);
        
        showNotification(`Book successfully registered!`, 'success');
        closeBookModal();
        loadBooks();
    } catch (error) {
        showNotification(`An error occurred: ${error.message}`, 'error');
    }
});

// Real-time search
searchInput.addEventListener('input', (e) => {
    loadBooks(e.target.value.toLowerCase());
});

// Load Books from DB
async function loadBooks(query = '') {
    try {
        const querySnapshot = await db.collection("books").get();
        let books = [];
        querySnapshot.forEach((doc) => {
            books.push(doc.data());
        });

        if (query) {
            books = books.filter(book => {
                return (
                    book.title.toLowerCase().includes(query) ||
                    book.category.toLowerCase().includes(query) ||
                    book.book_id.toString().includes(query) ||
                    (book.author && book.author.includes(query)) ||
                    (book.nic && book.nic.toLowerCase().includes(query))
                );
            });
        }
        
        books.sort((a,b) => b.book_id - a.book_id);

        renderBooks(books);
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

// Render Books to Table
function renderBooks(books) {
    bookList.innerHTML = '';
    bookCount.textContent = books.length;

    if (books.length === 0) {
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
    } else {
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');

        books.forEach(book => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50/80 group transition-colors';
            
            const avatarClass = getAvatarClass(book.title);
            const initials = getInitials(book.title) || '?';
            
            const avatarHTML = book.photo 
                ? `<img src="${book.photo}" class="w-10 h-10 rounded-full object-cover shadow-sm cursor-pointer hover:ring-2 hover:ring-brand-500 transition-all" alt="Avatar" onclick="if(this.src && !this.src.includes('placeholder')) window.openImageViewer(this.src)">`
                : `<div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${avatarClass}">${initials}</div>`;



            const noteHTML = '';

            tr.innerHTML = `
                <td class="py-4 px-5 text-sm font-bold text-gray-900 border-b border-gray-50">#${book.book_id}</td>
                <td class="py-4 px-5 border-b border-gray-50">
                    <div class="flex items-center gap-3">
                        ${avatarHTML}
                        <div>
                            <button onclick="viewBookProfile(${book.book_id})" class="text-sm font-semibold text-brand-600 hover:text-brand-800 text-left transition-colors">${book.title}</button>
                            
                        </div>
                    </div>
                </td>
                <td class="py-4 px-5 border-b border-gray-50">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                        ${book.category}
                    </span>
                </td>
                <td class="py-4 px-5 text-sm font-medium text-gray-600 border-b border-gray-50">
                    <div class="flex items-center gap-2">
                        ${book.author}
                    </div>
                </td>
                <td class="py-4 px-5 border-b border-gray-50">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        ${book.quantity || 1} Copies
                    </span>
                </td>
                <td class="py-4 px-5 text-right border-b border-gray-50">
                    <div class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                        <button onclick="openEditModal(${book.book_id})" class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all" title="Edit Book">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button onclick="promptDelete(${book.book_id}, '${book.title.replace(/'/g, "\\'")}')" class="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all" title="Remove Book">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </td>
            `;
            bookList.appendChild(tr);
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
    deleteBookName.textContent = name;
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
        // Fetch book data before deletion for potential undo
        const bookToRestore = (await db.collection("books").doc(currentDeleteId.toString()).get()).data();
        
        await db.collection("books").doc(currentDeleteId.toString()).delete();
        
        showNotification('Book record removed successfully.', 'success', async () => {
             // Undo Delete Action
             if(bookToRestore) {
                 await db.collection("books").doc(bookToRestore.book_id.toString()).set(bookToRestore);
                 showNotification('Book restored.', 'success');
                 loadBooks(searchInput.value.toLowerCase());
             }
        });
        
        closeDeleteModal();
        loadBooks(searchInput.value.toLowerCase());
    }
});

// Edit Flow
window.openEditModal = async function(id) {
    const book = (await db.collection("books").doc(id.toString()).get()).data();
    if(book) {
        oldBookId.value = book.book_id;
        editAdmissionNo.value = book.book_id;
        editFullName.value = book.title;
        editGrade.value = book.category;
        editContact.value = book.author;
        editCountry.value = book.country || '';
        editAdmissionDate.value = book.admission_date || '';
        editNic.value = book.nic || '';
        editAddress.value = book.address || book.city || '';
        editDob.value = book.dob || '';
        editQuantity.value = book.quantity || 1;
        editNote.value = book.note || '';
        editPhotoPreview.src = book.photo || '';
        editPhotoPreview.classList.toggle('hidden', !book.photo);
        
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
    const oldId = parseInt(oldBookId.value);
    const newId = parseInt(editAdmissionNo.value);
    const book = (await db.collection("books").doc(oldId.toString()).get()).data();
    
    book.book_id = newId;
    book.title = editFullName.value.trim();
    book.category = editGrade.value.trim();
    book.author = editContact.value.trim();
    book.country = editCountry.value.trim();
    book.admission_date = editAdmissionDate.value;
    book.nic = editNic.value.trim();
    book.address = editAddress.value.trim();
    book.dob = editDob.value;
    book.quantity = parseInt(editQuantity.value) || 1;
    book.note = editNote.value.trim();

    if (editPhoto.files.length > 0) {
        book.photo = await fileToBase64(editPhoto.files[0]);
    }

    if (oldId !== newId) {
        await db.collection("books").doc(oldId.toString()).delete();
    }
    await db.collection("books").doc(newId.toString()).set(book);
    showNotification('Book updated successfully!', 'success');
    closeEditModal();
    loadBooks(searchInput.value.toLowerCase());
});

// Profile Flow
window.viewBookProfile = async function(id) {
    window.currentProfileId = id;
    const book = (await db.collection("books").doc(id.toString()).get()).data();
    if(!book) return;

    profileName.textContent = book.title;
    profileBookId.textContent = book.book_id;
    profileGrade.textContent = book.category;
    profileContact.textContent = book.author;
    profileCountry.textContent = book.country || '-';
    profileAdmissionDate.textContent = book.admission_date || '-';
    profileNic.textContent = book.nic || '-';
    profileAddress.textContent = book.address || book.city || '-';
    let dobText = book.dob || '-';
    if(book.dob) {
        const birthDate = new Date(book.dob);
        if(!isNaN(birthDate)) {
            let age = new Date().getFullYear() - birthDate.getFullYear();
            const m = new Date().getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && new Date().getDate() < birthDate.getDate())) age--;
            if(age >= 0) dobText += ` (${age} Years)`;
        }
    }
    profileDob.textContent = dobText;
    profileNote.textContent = book.note || '-';

    if (book.photo) {
        profilePhoto.src = book.photo;
        profilePhoto.classList.remove('hidden');
        profileAvatarFallback.classList.add('hidden');
    } else {
        profilePhoto.classList.add('hidden');
        const names = book.title.split(' ');
        const initials = names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
        profileAvatarFallback.textContent = initials.toUpperCase();
        profileAvatarFallback.classList.remove('hidden');
    }

    profileModal.classList.remove('hidden');
    profileModal.classList.add('flex');
}

window.closeProfileModal = function() {
    profileModal.classList.add('hidden');
    profileModal.classList.remove('flex');
}



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

window.printBookProfile = async function() {
    if(!window.currentProfileId) return;
    const book = (await db.collection("books").doc(window.currentProfileId.toString()).get()).data();
    if(!book) return;

    const printWindow = window.open('', '_blank');
    
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Book Report - ${book.title}</title>
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
                <h2 style="font-size: 16px; color: #4b5563; font-weight: normal; margin: 0;">Book Profile Report</h2>
            </div>
            
            <div class="profile-grid">
                <div>
                    ${book.photo ? `<img src="${book.photo}" class="photo" />` : `<div class="photo" style="display:flex;align-items:center;justify-content:center;background:#f3f4f6;color:#9ca3af;">No Photo</div>`}
                </div>
                <div class="info-grid">
                    <div class="info-item"><strong>Book Title</strong>${book.title}</div>
                    <div class="info-item"><strong>Book ID</strong>${book.book_id}</div>
                    <div class="info-item"><strong>Category</strong>${book.category}</div>
                    <div class="info-item"><strong>Added Date</strong>${book.admission_date || '-'}</div>
                    <div class="info-item"><strong>ISBN No</strong>${book.nic || '-'}</div>
                    <div class="info-item"><strong>Author</strong>${book.author || '-'}</div>
                    <div class="info-item"><strong>Publisher</strong>${book.address || book.city || '-'}</div>
                    <div class="info-item"><strong>Published Date</strong>${book.dob || '-'}</div>
                    <div class="info-item"><strong>Quantity</strong>${book.quantity || 1}</div>
                </div>
            </div>

            <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #9ca3af;">
                <p>Generated by Library Management System on ${new Date().toLocaleDateString()}</p>
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
