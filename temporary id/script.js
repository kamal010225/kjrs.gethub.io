<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Temporary Labour Entry Pass</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
        }

        .card {
            width: 400px;
            padding: 20px;
            background: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center;
            border-radius: 10px;
        }

        .header {
            font-size: 20px;
            font-weight: bold;
            color: blue;
        }

        .sub-header {
            font-size: 16px;
            font-weight: bold;
            margin: 10px 0;
        }

        .photo-section {
            margin: 20px 0;
        }

        .photo {
            width: 100%;
            max-height: 200px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .form-section {
            margin-top: 20px;
        }

        .form-section label {
            display: block;
            margin: 10px 0 5px;
            font-size: 14px;
            text-align: left;
        }

        .form-section input, .form-section select, .form-section button {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
        }

        .form-section button {
            background-color: blue;
            color: white;
            cursor: pointer;
        }

        .form-section button:hover {
            background-color: darkblue;
        }

        .print-button {
            margin-top: 20px;
            background-color: green;
        }

        .print-button:hover {
            background-color: darkgreen;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">SKYLARK BUILDSPACE PVT LTD</div>
        <div class="sub-header">TEMPORARY ID CARD</div>

        <div class="photo-section">
            <video id="video" class="photo" autoplay></video>
            <button onclick="capturePhoto()">Capture Photo</button>
            <canvas id="canvas" class="photo" style="display:none;"></canvas>
        </div>

        <form class="form-section" id="idForm">
            <label for="contractorName">Contractor Name:</label>
            <input type="text" id="contractorName" placeholder="Enter contractor name" required>

            <label for="labourName">Labour Name:</label>
            <input type="text" id="labourName" placeholder="Enter labour name" required>

            <label for="fromDate">Card Validity (From):</label>
            <input type="date" id="fromDate" required>

            <label for="toDate">Card Validity (To):</label>
            <input type="date" id="toDate" required>

            <label for="authSign">Authorized Signatory:</label>
            <input type="text" id="authSign" placeholder="Enter authorized signatory" required>

            <button type="button" onclick="printCard()">Print ID Card</button>
        </form>
    </div>

    <script>
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        // Access webcam
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(err => {
                console.error("Error accessing the camera: ", err);
            });

        // Capture photo
        function capturePhoto() {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.style.display = 'block';
            video.style.display = 'none';
        }

        // Print ID Card
        function printCard() {
            const contractorName = document.getElementById('contractorName').value;
            const labourName = document.getElementById('labourName').value;
            const fromDate = document.getElementById('fromDate').value;
            const toDate = document.getElementById('toDate').value;
            const authSign = document.getElementById('authSign').value;

            if (!contractorName || !labourName || !fromDate || !toDate || !authSign) {
                alert('Please fill out all fields.');
                return;
            }

            const photoData = canvas.toDataURL('image/png');
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head>
                    <title>Print ID Card</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                        .header { font-size: 20px; font-weight: bold; color: blue; }
                        .sub-header { font-size: 16px; font-weight: bold; margin: 10px 0; }
                        .photo { width: 200px; height: auto; border: 1px solid #ccc; margin: 20px auto; }
                    </style>
                </head>
                <body>
                    <div class="header">SKYLARK BUILDSPACE PVT LTD</div>
                    <div class="sub-header">TEMPORARY ID CARD</div>
                    <img src="${photoData}" class="photo" alt="Photo">
                    <p>Contractor Name: ${contractorName}</p>
                    <p>Labour Name: ${labourName}</p>
                    <p>Card Validity: ${fromDate} to ${toDate}</p>
                    <p>Authorized Signatory: ${authSign}</p>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    </script>
</body>
</html>
