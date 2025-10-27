// Authentication State
let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];

// DOM Elements
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const registerPage = document.getElementById('register-page');
const loginPage = document.getElementById('login-page');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const showLoginLink = document.getElementById('show-login');
const showRegisterLink = document.getElementById('show-register');
const logoutBtn = document.getElementById('logout-btn');
const userName = document.getElementById('user-name');

// Chat Elements
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const newChatBtn = document.getElementById('new-chat-btn');

// Search Elements
const googleInput = document.getElementById('google-input');
const googleSearchBtn = document.getElementById('google-search-btn');
const googleResults = document.getElementById('google-results');
const youtubeInput = document.getElementById('youtube-input');
const youtubeSearchBtn = document.getElementById('youtube-search-btn');
const youtubeResults = document.getElementById('youtube-results');

// Browser Elements (NEW!)
const browserInput = document.getElementById('browser-input');
const browserGoBtn = document.getElementById('browser-go-btn');
const browserBackBtn = document.getElementById('browser-back-btn');
const browserForwardBtn = document.getElementById('browser-forward-btn');
const browserRefreshBtn = document.getElementById('browser-refresh-btn');
const browserIframe = document.getElementById('browser-iframe');
const browserResults = document.getElementById('browser-results');

// Navigation
const navBtns = document.querySelectorAll('.nav-btn');
const chatInterface = document.getElementById('chat-interface');
const googleSearch = document.getElementById('google-search');
const youtubeSearch = document.getElementById('youtube-search');
const browserTab = document.getElementById('browser-tab');

// Registration
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const errorElement = document.getElementById('password-error');
    
    if (password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match!';
        return;
    }
    
    if (users.find(u => u.email === email)) {
        errorElement.textContent = 'Email already registered!';
        return;
    }
    
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    errorElement.textContent = '';
    
    alert('Registration successful! Please login.');
    registerPage.classList.remove('active');
    loginPage.classList.add('active');
    registerForm.reset();
});

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorElement = document.getElementById('login-error');
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        userName.textContent = user.username;
        errorElement.textContent = '';
        loginForm.reset();
    } else {
        errorElement.textContent = 'Invalid email or password!';
    }
});

// Toggle Auth Pages
showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerPage.classList.remove('active');
    loginPage.classList.add('active');
});

showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginPage.classList.remove('active');
    registerPage.classList.add('active');
});

// Logout
logoutBtn.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
    authContainer.classList.remove('hidden');
    appContainer.classList.add('hidden');
    loginPage.classList.remove('active');
    registerPage.classList.add('active');
});

// Chat Functionality
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message) {
        // Remove welcome message
        const welcomeMsg = chatMessages.querySelector('.welcome-message');
        if (welcomeMsg) welcomeMsg.remove();
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const responses = [
                'I\'m a demo ChatGPT clone. This is a simulated response!',
                'That\'s an interesting question! In a real implementation, I would use an API.',
                'Thank you for your message. This is a frontend-only demo.',
                'Great question! A full implementation would connect to OpenAI\'s API.',
                'I understand. This demo showcases the UI and basic functionality.'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'bot');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

newChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = '<div class="welcome-message"><h1>How can I help you today?</h1></div>';
});

// Google Search
googleSearchBtn.addEventListener('click', performGoogleSearch);
googleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performGoogleSearch();
});

function performGoogleSearch() {
    const query = googleInput.value.trim();
    
    if (query) {
        googleResults.innerHTML = '<div class="search-result-item"><h3>Search Results for: ' + query + '</h3><p>To enable real Google search, integrate with Google Custom Search API.</p><a href="https://www.google.com/search?q=' + encodeURIComponent(query) + '" target="_blank">Search on Google →</a></div>';
        
        // Simulate results
        for (let i = 1; i <= 5; i++) {
            googleResults.innerHTML += `
                <div class="search-result-item">
                    <h3>Result ${i}: ${query}</h3>
                    <p>This is a placeholder result. In a production app, real search results would appear here using Google Custom Search API.</p>
                    <a href="#">https://example${i}.com/${query.toLowerCase()}</a>
                </div>
            `;
        }
    }
}

// YouTube Search
youtubeSearchBtn.addEventListener('click', performYouTubeSearch);
youtubeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performYouTubeSearch();
});

function performYouTubeSearch() {
    const query = youtubeInput.value.trim();
    
    if (query) {
        youtubeResults.innerHTML = '<div class="search-result-item"><h3>YouTube Search: ' + query + '</h3><p>To enable real YouTube search, integrate with YouTube Data API.</p><a href="https://www.youtube.com/results?search_query=' + encodeURIComponent(query) + '" target="_blank">Search on YouTube →</a></div>';
        
        // Simulate video results
        for (let i = 1; i <= 5; i++) {
            youtubeResults.innerHTML += `
                <div class="search-result-item">
                    <h3>📹 Video ${i}: ${query}</h3>
                    <p>This is a placeholder for YouTube videos. Integrate YouTube Data API for real results.</p>
                    <a href="#">https://youtube.com/watch?v=demo${i}</a>
                    <p style="color: #888; font-size: 14px; margin-top: 10px;">Views: ${Math.floor(Math.random() * 1000000)} • Uploaded: ${Math.floor(Math.random() * 30)} days ago</p>
                </div>
            `;
        }
    }
}

// Universal Browser Functionality (NEW!)
browserGoBtn.addEventListener('click', loadBrowserPage);
browserInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') loadBrowserPage();
});

function loadBrowserPage() {
    const input = browserInput.value.trim();
    
    if (input) {
        let url;
        
        // Smart URL detection: if starts with http/https/www, treat as URL
        if (input.startsWith('http://') || input.startsWith('https://') || input.startsWith('www.')) {
            url = input.startsWith('www.') ? 'https://' + input : input;
        } else {
            // Otherwise, treat as Google search
            url = 'https://www.google.com/search?q=' + encodeURIComponent(input);
        }
        
        // Load URL in iframe
        browserIframe.src = url;
        browserIframe.style.display = 'block';
        browserResults.style.display = 'block';
    }
}

browserBackBtn.addEventListener('click', () => {
    if (browserIframe.contentWindow) {
        browserIframe.contentWindow.history.back();
    }
});

browserForwardBtn.addEventListener('click', () => {
    if (browserIframe.contentWindow) {
        browserIframe.contentWindow.history.forward();
    }
});

browserRefreshBtn.addEventListener('click', () => {
    if (browserIframe.src) {
        browserIframe.src = browserIframe.src;
    }
});

// Navigation
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const view = btn.dataset.view;
        
        chatInterface.classList.remove('active-view');
        googleSearch.classList.remove('active-view');
        youtubeSearch.classList.remove('active-view');
        browserTab.classList.remove('active-view');
        
        if (view === 'chat') {
            chatInterface.classList.add('active-view');
        } else if (view === 'google') {
            googleSearch.classList.add('active-view');
        } else if (view === 'youtube') {
            youtubeSearch.classList.add('active-view');
        } else if (view === 'browser') {
            browserTab.classList.add('active-view');
        }
    });
});

// Check if user is already logged in
const savedUser = localStorage.getItem('currentUser');
if (savedUser) {
    currentUser = JSON.parse(savedUser);
    authContainer.classList.add('hidden');
    appContainer.classList.remove('hidden');
    userName.textContent = currentUser.username;
}
