document.getElementById('foto').addEventListener('change', async function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const imgElement = document.getElementById('image');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const message = document.getElementById('message');
    const submitBtn = document.getElementById('submitButton');
    
    message.textContent = "";
    submitBtn.disabled = true;

    const fileSize = file.size;
    if (fileSize < 50 * 1024 || fileSize > 500 * 1024) {
        message.textContent = "⚠️ Ukuran file harus antara 50KB - 500KB";
        validateForm();
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        imgElement.src = e.target.result;
        imgElement.style.display = 'block';
    };
    reader.readAsDataURL(file);
    
    imgElement.onload = async function() {
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.drawImage(imgElement, 0, 0);
        
        const model = await blazeface.load();
        const predictions = await model.estimateFaces(imgElement, false);
        
        if (predictions.length > 0) {
            predictions.forEach(prediction => {
                const [x, y, width, height] = prediction.topLeft.concat(prediction.bottomRight);
                const confidence = (prediction.probability[0] * 100).toFixed(2);
                
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 3;
                ctx.strokeRect(x, y, width - x, height - y);
                ctx.fillStyle = 'red';
                ctx.font = '16px Arial';
                ctx.fillText(`Confidence: ${confidence}%`, x, y - 5);

                if (confidence > 80) {
                    message.style.color = 'green';
                    message.textContent = "✔️ Wajah terdeteksi dengan baik!";
                } else {
                    message.style.color = 'red';
                    message.textContent = "⚠️ Kualitas foto wajah kurang baik, silakan gunakan foto lain";
                }
            });
        } else {
            message.textContent = "Muka tidak terdeteksi, silahkan pakai gambar JPG lainnya!";
        }
        validateForm();
    };
});