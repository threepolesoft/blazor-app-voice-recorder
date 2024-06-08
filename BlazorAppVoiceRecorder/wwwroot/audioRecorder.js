let mediaRecorder;
let audioChunks = [];

async function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Browser does not support audio recording.");
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.start();
}

function stopRecording() {
    return new Promise((resolve, reject) => {
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            audioChunks = [];
            resolve(URL.createObjectURL(audioBlob));
        };

        mediaRecorder.stop();
    });
}
