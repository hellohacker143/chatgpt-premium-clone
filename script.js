 ... url.toString();
  }
});

// ====== Auth, Registration, Login (unchanged minimal to keep app working) ======
registerForm?.addEventListener('submit', (e) => { e.preventDefault(); const username = document.getElementById('reg-username')?.value||''; const email = document.getElementById('reg-email')?.value||''; const password = document.getElementById('reg-password')?.value||''; const confirmPassword = document.getElementById('reg-confirm-password')?.value||''; const errorElement = document.getElementById('password-error'); if (password !== confirmPassword) { if(errorElement) errorElement.textContent = 'Passwords do not match!'; return; } if (users.find(u => u.email === email)) { if(errorElement) errorElement.textContent = 'Email already registered!'; return; } users.push({ username, email, password }); localStorage.setItem('users', JSON.stringify(users)); if(errorElement) errorElement.textContent = ''; alert('Registration successful! Please login.'); registerPage?.classList.remove('active'); loginPage?.classList.add('active'); registerForm.reset(); });
loginForm?.addEventListener('submit', (e) => { e.preventDefault(); const email = document.getElementById('login-email')?.value||''; const password = document.getElementById('login-password')?.value||''; const errorElement = document.getElementById('login-error'); const user = users.find(u => u.email === email && u.password === password); if (user) { currentUser = user; localStorage.setItem('currentUser', JSON.stringify(user)); authContainer?.classList.add('hidden'); appContainer?.classList.remove('hidden'); if(userName) userName.textContent = user.username; if(errorElement) errorElement.textContent = ''; loginForm.reset(); } else { if(errorElement) errorElement.textContent = 'Invalid email or password!'; }});
showLoginLink?.addEventListener('click', (e) => { e.preventDefault(); registerPage?.classList.remove('active'); loginPage?.classList.add('active'); });
showRegisterLink?.addEventListener('click', (e) => { e.preventDefault(); loginPage?.classList.remove('active'); registerPage?.classList.add('active'); });
logoutBtn?.addEventListener('click', () => { currentUser = null; localStorage.removeItem('currentUser'); authContainer?.classList.remove('hidden'); appContainer?.classList.add('hidden'); loginPage?.classList.remove('active'); registerPage?.classList.add('active'); });

// Navigation tabs minimal support
navBtns.forEach(btn => { btn.addEventListener('click', () => { navBtns.forEach(b => b.classList.remove('active')); btn.classList.add('active'); const view = btn.dataset.view; chatInterface?.classList.remove('active-view'); googleSearch?.classList.remove('active-view'); youtubeSearch?.classList.remove('active-view'); browserTab?.classList.remove('active-view'); if (view === 'chat') chatInterface?.classList.add('active-view'); else if (view === 'google') googleSearch?.classList.add('active-view'); else if (view === 'youtube') youtubeSearch?.classList.add('active-view'); else if (view === 'browser') browserTab?.classList.add('active-view'); }); });

// Simple browser mini
function loadBrowserPage() { const input = browserInput?.value?.trim(); if (input) { let url; if (input.startsWith('http://') || input.startsWith('https://') || input.startsWith('www.')) { url = input.startsWith('www.') ? 'https://' + input : input; } else { url = 'https://www.google.com/search?q=' + encodeURIComponent(input); } if (browserIframe) browserIframe.src = url; if (browserIframe) browserIframe.style.display = 'block'; if (browserResults) browserResults.style.display = 'block'; } }
browserGoBtn?.addEventListener('click', loadBrowserPage);
browserInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') loadBrowserPage(); });
browserBackBtn?.addEventListener('click', () => { if (browserIframe?.contentWindow) browserIframe.contentWindow.history.back(); });
browserForwardBtn?.addEventListener('click', () => { if (browserIframe?.contentWindow) browserIframe.contentWindow.history.forward(); });
browserRefreshBtn?.addEventListener('click', () => { if (browserIframe?.src) browserIframe.src = browserIframe.src; });

// Auto-login
const savedUser = localStorage.getItem('currentUser');
if (savedUser) { currentUser = JSON.parse(savedUser); authContainer?.classList.add('hidden'); appContainer?.classList.remove('hidden'); if(userName) userName.textContent = currentUser.username; }
