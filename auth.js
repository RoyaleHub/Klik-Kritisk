const supabaseUrl = 'https://qmlyeckuoxkanzbgprea.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtbHllY2t1b3hrYW56YmdwcmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NDgwOTQsImV4cCI6MjA2MjAyNDA5NH0.9ePTu4mIxFueIwCnpoh5Te7oU2jaoeIkCBGhXZIZimI'; // Replace with your Supabase anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://kritiskklik.byethost8.com' // Replace with your actual website URL
        }
    });
    if (error) {
        alert('Login failed: ' + error.message);
    }
}

async function logout() {
    await supabase.auth.signOut();
    location.reload();
}

async function checkAuth() {
    // Handle the URL fragment after redirect
    const hash = window.location.hash;
    if (hash) {
        const { error } = await supabase.auth.exchangeCodeForSession(hash);
        if (error) {
            console.error('Error exchanging code for session:', error.message);
        } else {
            console.log('Session successfully established.');
        }
        // Clear the URL fragment to clean up
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Check if the user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        updateAuthSection(session.user.email); // Update UI with user email
    } else {
        resetAuthSection(); // Reset UI to show login state
    }
}

function updateAuthSection(email) {
    const authSection = document.getElementById('auth-section');
    authSection.innerHTML = `
        <span style="margin-right:10px; font-size:14px; color:white;">Logged in as: ${email}</span>
        <a href="#" onclick="logout()" class="button" style="padding:5px 15px; background:#FF4D4D; color:white; border:none; border-radius:5px; cursor:pointer; font-size:14px;">Log Ud</a>
    `;
}

function resetAuthSection() {
    const authSection = document.getElementById('auth-section');
    authSection.innerHTML = `
        <a href="#" onclick="loginWithGoogle()" class="button primary" style="padding:5px 15px; background:#007BFF; color:white; border:none; border-radius:5px; cursor:pointer; font-size:14px;">Log Ind</a>
    `;
}

document.addEventListener('DOMContentLoaded', checkAuth);
