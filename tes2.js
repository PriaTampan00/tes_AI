let capturedImage = null;

function validateImage(input) {
    let file = input.files[0];
    if (file.type !== "image/jpeg") {
        alert("Hanya file JPG yang diperbolehkan.");
        input.value = '';
        return;
    }

    detectFace(file);
}

function captureImage() {
    const video = document.getElementById('camera');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    capturedImage = new Image();
    capturedImage.src = canvas.toDataURL('image/jpeg');
    capturedImage.onload = async () => {
        const blob = await (await fetch(capturedImage.src)).blob();
        detectFace(blob);
    };
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
            document.getElementById('faceRecognitionMessage').innerText = '';
            if (capturedImage) {
                const similarityScore = calculateSimilarity(predictions);
                document.getElementById('similarityScore').innerText = `Persentase Kemiripan Wajah: ${similarityScore}%`;
            }
        } else {
            document.getElementById('registerButton').disabled = true;
            document.getElementById('faceRecognitionMessage').innerText = 'Muka tidak terdeteksi, silahkan pakai gambar JPG lainnya!';
        }
    };
}

function calculateSimilarity(predictions) {
    // Dummy similarity score calculation for demonstration purposes
    // In a real application, use a more sophisticated method to calculate similarity
    return Math.floor(Math.random() * 100);
}

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        const video = document.getElementById('camera');
        video.srcObject = stream;
    })
    .catch(err => {
        console.error('Error accessing camera: ', err);
    });

document.getElementById('faceRecognitionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Form berhasil disubmit!");
});
