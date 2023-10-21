import axios from 'axios';
import express from 'express';
import { google } from 'googleapis';
import dayjs from 'dayjs'
import dotenv from 'dotenv';

dotenv.config();
const calendar = google.calendar({
    version: "v3",
    auth: process.env.API_KEY,
});

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);
const scopes = ['https://www.googleapis.com/auth/calendar'];

// Inicializa las rutas relacionadas con el calendario
export function initializeCalendarRoutes(app) {
    app.get('/google', (req, res) => {
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        });
        res.redirect(url);
    });

    app.get('/google/redirect', async (req, res) => {
        const code = req.query.code;
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        res.send({
            msg: 'Has iniciado sesión exitosamente.',
        });
    });

    app.get('/schedule_event', async (req, res) => {
        console.log(oauth2Client.credentials.access_token);

        const startDateTime = dayjs().add(1, 'day').toISOString();
        const endDateTime = dayjs().add(1, 'day').add(1, 'hour').toISOString();

        const zoomMeetingLink = 'https://us02web.zoom.us/j/5288271245?pwd=TWtVQU5xZkNPdmF0c2I0MzhCUy9rdz09';

        const description = `
        <p>Tienes una sesión de tutoría con tutorName.</p>
        <p>Este es un recordatorio para tu próxima sesión de tutoría. Por favor, haz clic en el siguiente enlace para unirte a la reunión de Zoom:</p>
        <p><a href="${zoomMeetingLink}">Unirte a la reunión de Zoom</a></p>
        `;

        await calendar.events.insert({
            calendarId: 'primary',
            auth: oauth2Client,
            requestBody: {
                summary: 'Sesión de Tutoría - MICHA',
                description: description,
                start: {
                    dateTime: startDateTime,
                    timeZone: 'Europe/Berlin',
                },
                end: {
                    dateTime: endDateTime,
                    timeZone: 'Europe/Berlin',
                },
            },
        });

        res.send({
            msg: 'Hecho',
        });
    });
}
