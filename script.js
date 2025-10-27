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
// Paste-to-Play Elements (Featured section)
const ytPasteInput = document.getElementById('yt-paste-input');
const ytPastePlay = document.getElementById('yt-paste-play');
const ytDynamicCard = document.getElementById('yt-dynamic-card');
const ytDynamicIframe = document.getElementById('yt-dynamic-iframe');
const ytDynamicTitle = document.getElementById('yt-dynamic-title');
const ytDynamicPlay = document.getElementById('yt-dynamic-play');
const ytDynamicPause = document.getElementById('yt-dynamic-pause');
// Browser Elements
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
    if (password !== confirmPassword) { errorElement.textContent = 'Passwords do not match!'; return; }
    if (users.find(u => u.email === email)) { errorElement.textContent = 'Email already registered!'; return; }
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
showLoginLink.addEventListener('click', (e) => { e.preventDefault(); registerPage.classList.remove('active'); loginPage.classList.add('active'); });
showRegisterLink.addEventListener('click', (e) => { e.preventDefault(); loginPage.classList.remove('active'); registerPage.classList.add('active'); });

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
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        const welcomeMsg = chatMessages.querySelector('.welcome-message');
        if (welcomeMsg) welcomeMsg.remove();
        addMessage(message, 'user');
        chatInput.value = '';
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
newChatBtn.addEventListener('click', () => { chatMessages.innerHTML = '<div class="welcome-message">How can I help you today?</div>'; });

// Google Search
if (googleSearchBtn) {
  googleSearchBtn.addEventListener('click', performGoogleSearch);
  googleInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') performGoogleSearch(); });
}
function performGoogleSearch() {
  const query = googleInput.value.trim();
  if (query) {
    googleResults.innerHTML = '<div class="search-result-item">Search Results for: ' + query + ' To enable real Google search, integrate with Google Custom Search API. <a target="_blank" href="https://www.google.com/search?q=' + encodeURIComponent(query) + '">Search on Google →</a></div>';
    for (let i = 1; i <= 5; i++) {
      googleResults.innerHTML += `
        <div class="search-result-item">
          Result ${i}: ${query}
          This is a placeholder result. In a production app, real search results would appear here using Google Custom Search API.
          <a href="#">https://example${i}.com/${query.toLowerCase()}</a>
        </div>
      `;
    }
  }
}

// Helper: Extract YouTube Video ID from many URL formats
function extractYouTubeId(input) {
  try {
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input; // already ID
    const url = new URL(input);
    const host = url.hostname.replace('www.', '');
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const vid = url.searchParams.get('v');
      if (vid) return vid;
      const shortsMatch = url.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
      if (shortsMatch) return shortsMatch[1];
      const embedMatch = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch) return embedMatch[1];
    }
    if (host === 'youtu.be') {
      const pathMatch = url.pathname.match(/\/([a-zA-Z0-9_-]{11})/);
      if (pathMatch) return pathMatch[1];
    }
  } catch {}
  return null;
}

// Featured section: Paste-to-Play logic
function playPastedVideoInFeatured() {
  const value = ytPasteInput.value.trim();
  const id = extractYouTubeId(value);
  if (!id) {
    ytPasteInput.classList.add('ring-2', 'ring-rose-500');
    setTimeout(() => ytPasteInput.classList.remove('ring-2', 'ring-rose-500'), 1200);
    return;
  }
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&controls=1&rel=0&enablejsapi=1`;
  ytDynamicIframe.src = src;
  ytDynamicCard.classList.remove('hidden');
  ytDynamicTitle.textContent = 'Custom Video • ' + id;
}
if (ytPastePlay && ytPasteInput) {
  ytPastePlay.addEventListener('click', playPastedVideoInFeatured);
  ytPasteInput.addEventListener('paste', () => setTimeout(playPastedVideoInFeatured, 0));
  ytPasteInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') playPastedVideoInFeatured(); });
}

// Play/Pause controls helper for any YouTube iframe with JS API enabled
function postMessageToPlayer(iframe, command) {
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args: [] }), '*');
}
if (ytDynamicPlay) ytDynamicPlay.addEventListener('click', () => postMessageToPlayer(ytDynamicIframe, 'playVideo'));
if (ytDynamicPause) ytDynamicPause.addEventListener('click', () => postMessageToPlayer(ytDynamicIframe, 'pauseVideo'));

// Support existing featured cards' Play/Pause buttons
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.yt-toggle');
  if (!btn) return;
  const idx = parseInt(btn.getAttribute('data-vid'), 10);
  const action = btn.getAttribute('data-action') || 'play';
  const frames = document.querySelectorAll('section iframe');
  const frame = frames[idx - 1];
  if (!frame) return;
  if (action === 'pause') {
    postMessageToPlayer(frame, 'pauseVideo');
  } else {
    const url = new URL(frame.src);
    url.searchParams.set('autoplay', '1');
    url.searchParams.set('mute', '0');
    url.searchParams.set('enablejsapi', '1');
    frame.src = url.toString();
  }
});

// YouTube tab: paste-to-play in inline player
(function enhanceYouTubeTabPasteToPlay(){
  const container = document.getElementById('youtube-video-container');
  const inlineIframe = document.getElementById('youtube-iframe');
  const closeBtn = document.getElementById('close-video-btn');
  if (!youtubeInput || !container || !inlineIframe) return;

  function playInYouTubeTab(fromValue){
    const id = extractYouTubeId(fromValue.trim());
    if (!id) return false;
    inlineIframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&controls=1&rel=0&enablejsapi=1`;
    container.classList.remove('hidden');
    return true;
  }

  youtubeInput.addEventListener('paste', () => setTimeout(() => playInYouTubeTab(youtubeInput.value), 0));
  youtubeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (playInYouTubeTab(youtubeInput.value)) e.preventDefault();
    }
  });
  if (closeBtn) closeBtn.addEventListener('click', () => {
    inlineIframe.src = '';
    container.classList.add('hidden');
  });
})();

// Universal Browser Functionality
if (browserGoBtn) {
  browserGoBtn.addEventListener('click', loadBrowserPage);
  browserInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') loadBrowserPage(); });
}
function loadBrowserPage() {
    const input = browserInput.value.trim();
    if (input) {
        let url;
        if (input.startsWith('http://') || input.startsWith('https://') || input.startsWith('www.')) {
            url = input.startsWith('www.') ? 'https://' + input : input;
        } else {
            url = 'https://www.google.com/search?q=' + encodeURIComponent(input);
        }
        browserIframe.src = url;
        browserIframe.style.display = 'block';
        if (browserResults) browserResults.style.display = 'block';
    }
}

browserBackBtn?.addEventListener('click', () => { if (browserIframe.contentWindow) browserIframe.contentWindow.history.back(); });
browserForwardBtn?.addEventListener('click', () => { if (browserIframe.contentWindow) browserIframe.contentWindow.history.forward(); });
browserRefreshBtn?.addEventListener('click', () => { if (browserIframe.src) browserIframe.src = browserIframe.src; });

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
        if (view === 'chat') chatInterface.classList.add('active-view');
        else if (view === 'google') googleSearch.classList.add('active-view');
        else if (view === 'youtube') youtubeSearch.classList.add('active-view');
        else if (view === 'browser') browserTab.classList.add('active-view');
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
