import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Calendar from './calendar.jsx';
import reportWebVitals from './reportWebVitals';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient(
  "https://cuxnmnhrixlwvasltxpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eG5tbmhyaXhsd3Zhc2x0eHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MTg3MjAsImV4cCI6MjAxMzE5NDcyMH0.HuZAD0qIanTtFOUlIeeDU9O0mMppLfzSwzmKvhw6BDM" 
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <Calendar />
    </SessionContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
