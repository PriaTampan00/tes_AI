function validateNama() {
    var nama = document.getElementById("nama").value;
    var properNama = nama.replace(/\b\w/g, function(l) { return l.toUpperCase(); }).replace(/[^a-zA-Z\s]/g, '');
    if (nama !== properNama) {
        document.getElementById("namaError").textContent = "Hanya menggunakan a-z dan spasi";
        document.getElementById("namaError").style.display = "block";
        return false;
    } else {
        document.getElementById("namaError").style.display = "none";
        document.getElementById("nama").value = properNama;
        return true;
    }
}

function validateUsername() {
    var username = document.getElementById("username").value;
    var regex = /^[a-z0-9]{3,20}$/;
    if (!regex.test(username)) {
        document.getElementById("usernameError").textContent = "Username hanya boleh berisi huruf kecil a-z dan 0-9, panjang 3-20 huruf";
        document.getElementById("usernameError").style.display = "block";
        return false;
    } else {
        document.getElementById("usernameError").style.display = "none";
        return true;
    }
}

function validatePassword() {
    var password = document.getElementById("password").value;
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    if (!regex.test(password)) {
        document.getElementById("passwordError").textContent = "Password harus mengandung minimal satu karakter lowercase, satu uppercase, satu angka, dan satu karakter spesial. Panjang 6-20 huruf.";
        document.getElementById("passwordError").style.display = "block";
        return false;
    } else {
        document.getElementById("passwordError").style.display = "none";
        return true;
    }
}

function validateWhatsapp() {
    var whatsapp = document.getElementById("whatsapp").value;
    if (whatsapp.startsWith("0")) {
        whatsapp = "62" + whatsapp.substring(1);
    }
    if (whatsapp.length < 11 || whatsapp.length > 14 || !/^\d+$/.test(whatsapp)) {
        document.getElementById("whatsappError").textContent = "Nomor WhatsApp harus diawali dengan kode negara (62) dan panjang antara 11-14 huruf.";
        document.getElementById("whatsappError").style.display = "block";
        return false;
    } else {
        document.getElementById("whatsappError").style.display = "none";
        document.getElementById("whatsapp").value = whatsapp;
        return true;
    }
}

function validateImage() {
    var message = document.getElementById('message');
    var submitBtn = document.getElementById('submitButton');
    return message.style.color === 'green';
}

function validateForm() {
    var isNamaValid = validateNama();
    var isUsernameValid = validateUsername();
    var isPasswordValid = validatePassword();
    var isWhatsappValid = validateWhatsapp();
    var isImageValid = validateImage();

    var isFormValid = isNamaValid && isUsernameValid && isPasswordValid && isWhatsappValid && isImageValid;

    document.getElementById("submitButton").disabled = !isFormValid;

    return isFormValid;
}

document.getElementById("nama").oninput = validateForm;
document.getElementById("username").oninput = validateForm;
document.getElementById("password").oninput = validateForm;
document.getElementById("whatsapp").oninput = validateForm;