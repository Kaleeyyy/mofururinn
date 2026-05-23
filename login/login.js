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
        console.warn('Server online error/CORS blokir. Beralih ke pengecekan lokal...', error);
        
        // JALUR CADANGAN: Jika server online gagal dihubungi, cek manual di sini
        if (usernameInput === 'heri' && passwordInput === '123') {
            aksiLoginSukses(usernameInput, alertBox);
        } else if (usernameInput === 'admin' && passwordInput === '123') {
            aksiLoginSukses(usernameInput, alertBox);
        } else {
            alertBox.style.color = 'red';
            alertBox.innerText = 'Username atau Password salah! (Mode Offline)';
        }
    });
});

// Fungsi pembantu jika login berhasil (biar tidak tulis ulang kodenya)
function aksiLoginSukses(username, alertBox) {
    alertBox.style.color = 'green';
    alertBox.innerText = 'Login Berhasil! Mengalihkan...';
    
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);

    // Keluar folder 'login' menuju index.html utama yang tidak di dalam folder
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);
}