document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah halaman reload otomatis

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

    // Menghubungkan ke REST API online Guru
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
            alertBox.style.color = 'green';
            alertBox.innerText = 'Login Berhasil! Mengalihkan...';
            
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', usernameInput);

            // PENTING: Pakai ../index.html karena browser harus keluar dari folder 'login' 
            // untuk bisa nemuin index.html utama kamu yang gak di folder itu.
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
        } else {
            alertBox.style.color = 'red';
            alertBox.innerText = data.message || 'Username atau Password salah!';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alertBox.style.color = 'red';
        alertBox.innerText = 'Gagal terhubung ke server login!';
    });
});