document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah halaman reload otomatis saat tombol diklik

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const alertBox = document.getElementById('alertBox');

    // Tampilkan status sedang memproses login
    alertBox.style.display = 'block';
    alertBox.style.color = '#d4af7a'; // Warna krem-emas sesuai tema CSS kamu
    alertBox.innerText = 'Sedang memeriksa data...';

    // Data yang akan dikirim ke API Guru dalam format JSON sesuai LKPD
    const dataLogin = {
        username: usernameInput,
        password: passwordInput
    };

    // Menghubungkan ke REST API online sesuai petunjuk LKPD sekolah
    fetch('https://herisusanta.my.id/javalogin/api/login.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataLogin)
    })
    .then(response => response.json())
    .then(data => {
        // Cek apakah respon dari server sukses
        if (data.status === 'success' || data.message === 'Login berhasil') {
            alertBox.style.color = 'green';
            alertBox.innerText = 'Login Berhasil! Mengalihkan...';
            
            // Simpan data login ke sessionStorage agar halaman toko tahu kamu sudah masuk
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', usernameInput);

            // Redirect kembali ke halaman utama toko (keluar folder login dengan ../) setelah 1 detik
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
        } else {
            // Jika akun salah atau tidak terdaftar di server guru
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