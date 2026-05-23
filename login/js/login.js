document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Biar halaman gak reload pas tombol dipencet

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const alertBox = document.getElementById('alertBox');

    // Tampilkan tulisan loading sementara
    alertBox.style.display = 'block';
    alertBox.style.color = '#d4af7a'; 
    alertBox.innerText = 'Sedang memeriksa data...';

    // Sesuai LKPD, ini contoh akun uji cobanya
    if (usernameInput === 'heri' && passwordInput === '123') {
        alertBox.style.color = 'green';
        alertBox.innerText = 'Login Berhasil! Mengalihkan...';
        
        // Simpan status login di browser
        sessionStorage.setItem('isLoggedIn', 'true');

        // Balik ke halaman utama luar setelah 1 detik
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);
    } else {
        // Kalau salah, muncul tulisan merah
        alertBox.style.color = 'red';
        alertBox.innerText = 'Username atau Password salah!';
    }
});