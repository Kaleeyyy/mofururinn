// ==========================================
// 1. LOGIKA UNTUK SIGN IN (LOGIN)
// ==========================================
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const alertBox = document.getElementById('alertBox');

    alertBox.style.display = 'block';
    alertBox.style.color = '#d4af7a'; 
    alertBox.innerText = 'Sedang memeriksa data...';

    const dataLogin = {
        username: usernameInput,
        password: passwordInput
    };

    // Coba hubungkan ke REST API Online Guru
    fetch('https://herisusanta.my.id/javalogin/api/login.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataLogin)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success' || data.message === 'Login berhasil') {
            aksiLoginSukses(usernameInput, alertBox);
        } else {
            alertBox.style.color = 'red';
            alertBox.innerText = data.message || 'Username atau Password salah!';
        }
    })
    .catch(error => {
        console.warn('Server online error/CORS blokir. Cek akun lokal...', error);
        
        // Cek apakah akun sesuai dengan bawaan atau hasil register lokal tadi
        const localRegUser = sessionStorage.getItem('localUser');
        const localRegPass = sessionStorage.getItem('localPass');

        if (usernameInput === 'heri' && passwordInput === '123') {
            aksiLoginSukses(usernameInput, alertBox);
        } else if (usernameInput === 'admin' && passwordInput === '123') {
            aksiLoginSukses(usernameInput, alertBox);
        } else if (usernameInput === localRegUser && passwordInput === localRegPass && localRegUser !== null) {
            // Lolos login pakai akun yang baru didaftarkan secara lokal
            aksiLoginSukses(usernameInput, alertBox);
        } else {
            alertBox.style.color = 'red';
            alertBox.innerText = 'Username atau Password salah! (Mode Offline)';
        }
    });
});

// Fungsi pembantu jika login berhasil
function aksiLoginSukses(username, alertBox) {
    alertBox.style.color = 'green';
    alertBox.innerText = 'Login Berhasil! Mengalihkan...';
    
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);

    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);
}


// ==========================================
// 2. LOGIKA UNTUK SIGN UP (REGISTER)
// ==========================================
// Pastikan tag <form> untuk register di HTML kamu punya id="registerForm"
const regForm = document.getElementById('registerForm');
if (regForm) {
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Cari input khusus di dalam form register (ganti ID-nya jika di HTML berbeda)
        const regUsername = document.getElementById('regUsername') ? document.getElementById('regUsername').value : document.getElementById('username').value;
        const regPassword = document.getElementById('regPassword') ? document.getElementById('regPassword').value : document.getElementById('password').value;
        const regAlertBox = document.getElementById('regAlertBox') || document.getElementById('alertBox');

        regAlertBox.style.display = 'block';
        regAlertBox.style.color = '#d4af7a';
        regAlertBox.innerText = 'Sedang mendaftarkan akun...';

        const dataRegister = {
            username: regUsername,
            password: regPassword
        };

        fetch('https://herisusanta.my.id/javalogin/api/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataRegister)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success' || data.message === 'Registrasi berhasil' || data.message === 'User berhasil didaftarkan') {
                regAlertBox.style.color = 'green';
                regAlertBox.innerText = 'Registrasi Berhasil! Silahkan pindah ke menu Sign In.';
            } else {
                regAlertBox.style.color = 'red';
                regAlertBox.innerText = data.message || 'Gagal mendaftar. Username sudah ada!';
            }
        })
        .catch(error => {
            console.warn('Server register error/CORS. Mendaftar secara lokal...', error);
            
            // Mode Cadangan: Simpan akun di memori browser supaya langsung bisa dipakai login
            sessionStorage.setItem('localUser', regUsername);
            sessionStorage.setItem('localPass', regPassword);

            regAlertBox.style.color = 'green';
            regAlertBox.innerText = 'Registrasi Berhasil (Mode Offline)! Silahkan Sign In pakai akun ini.';
        });
    });
}