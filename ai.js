async function detectFace(image) {
    const model = await blazeface.load();
    const predictions = await model.estimateFaces(image, false);
    return predictions;
}

async function analyzeEmotions(face) {
    // Mock emotion analysis - this part requires more complex implementation
    return { emotion: 'Happy', confidence: 0.95 };
}

document.getElementById('imageUpload').addEventListener('change', async (event) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        image.src = reader.result;
        image.onload = async () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            const faces = await detectFace(image);
            if (faces.length > 0) {
                for (let i = 0; i < faces.length; i++) {
                    const start = faces[i].topLeft;
                    const end = faces[i].bottomRight;
                    const size = [end[0] - start[0], end[1] - start[1]];

                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(start[0], start[1], size[0], size[1]);

                    const emotionData = await analyzeEmotions(faces[i]);
                    ctx.fillStyle = 'red';
                    ctx.font = '18px Arial';
                    ctx.fillText(`${emotionData.emotion} (${(emotionData.confidence * 100).toFixed(2)}%)`, start[0], start[1] - 10);
                }
                document.getElementById('status').innerText = 'Gambar terdeteksi!';
            } else {
                document.getElementById('status').innerText = 'Gambar buram. Silahkan ambil gambar lain';
            }
            validateForm(); // Validate form after face detection
        };
    };
    reader.readAsDataURL(file);
});