import puppeteer from 'puppeteer';

export default async function pdf(data, res) {
    function getCurrentDate(date) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    try {
        const browser = await puppeteer.launch({
            headless: 'new'
        });
        const page = await browser.newPage();

        let htmlContent = `
<html>
<head>
    <title>Tutoring Protocol</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            padding: 20px;
        }
        .content {
            max-width: 800px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        h1 {
            font-size: 24px;
            color: #007bff;
            background-color: #f0f8ff;
            padding: 10px;
            margin-top: 20px;
        }
        .explanation {
            margin-bottom: 40px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #007bff;
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f0f8ff;
            color: #007bff;
        }
        .footer {
            text-align: center;
            margin-top: 60px;
            font-style: italic;
            border-top: 1px solid #f0f8ff;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="content">
    <div class="header">
        <h1>Tutoring Protocol</h1>
    </div>
    <div class="explanation">
        <p><strong>Protocol Overview:</strong> This document serves as a comprehensive summary of the tutoring session, providing key information about the session theme, student, date, and tutor.</p>
    </div>
    <table>
        <tr>
            <th>Specific Theme</th>
            <td>${data.theme}</td>
        </tr>
        <tr>
            <th>Participant</th>
            <td>${data.student}</td>
        </tr>
        <tr>
            <th>Date</th>
            <td>${getCurrentDate(data.date)}</td>
        </tr>
        <tr>
            <th>Tutor</th>
            <td>${data.tutor}</td>
        </tr>
    </table>
    <div class="footer">
        <p>
            We appreciate your commitment and dedication to education. Your role as a tutor is essential to the growth and success of our students. Thank you for making a difference!<span style="font-size: 8px;">🖤</span>
        </p>
    </div>
</div>
</body>
</html>
`;

        // Set the HTML content of the page
        await page.setContent(htmlContent);

        // Generate the PDF with background and images
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

        // Close the browser
        await browser.close();

        // Set the response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=data.pdf');

        // Send the PDF as a response
        res.send(pdfBuffer);
    } catch (e) {
        console.log(e);
        res.status(500).send('Error generating the PDF');
    }
}
