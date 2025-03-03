function autoProperCase(input) {
    let value = input.value.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    input.value = value.replace(/[^a-zA-Z\s]/g, '');
}

function validateWhatsapp(input) {
    let value = input.value.replace(/^0/, '62');
    input.value = value.replace(/[^0-9]/g, '');
    if (input.value.length < 11 || input.value.length > 14) {
        input.setCustomValidity("Nomor Whatsapp harus antara 11 sampai 14 angka.");
    } else {
        input.setCustomValidity("");
    }
}

function validateImage(input) {
    let file = input.files[0];
    if (file.type !== "image/jpeg") {
        alert("Hanya file JPG yang diperbolehkan.");
        input.value = '';
        return;
    }

    if (file.size < 50000 || file.size > 500000) {
        alert("Ukuran gambar harus antara 50 kB hingga 500 kB.");
        input.value = '';
        return;
    }

    detectFace(file);
}

async function detectFace(file) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
        const model = await faceDetection.load(faceDetection.SupportedModels.MediaPipeFaceDetector);
        const predictions = await model.estimateFaces({
            input: img
        });

        if (predictions.length > 0) {
            document.getElementById('registerButton').disabled = false;
            document.getElementById('faceDetectionMessage').innerText = '';
        } else {
            document.getElementById('registerButton').disabled = true;
            document.getElementById('faceDetectionMessage').innerText = 'Muka tidak terdeteksi, silahkan pakai gambar JPG lainnya!';
        }
    };
}

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Form berhasil disubmit!");
});
