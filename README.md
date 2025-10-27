# ChatGPT Premium Clone 🤖✨

A premium, full-featured ChatGPT clone web application built entirely with vanilla HTML, CSS, and JavaScript. This project demonstrates modern web development practices with a beautiful, responsive UI and multiple integrated features.

## 🌟 Features

### Authentication System
- **User Registration** with password matching validation
- **Secure Login/Logout** functionality
- **Persistent Sessions** using localStorage
- **Form Validation** with error handling

### ChatGPT Interface
- **Premium-style Chat UI** inspired by OpenAI's ChatGPT
- **Real-time Message Display** with user and bot messages
- **Auto-scrolling Chat** for seamless conversation flow
- **Simulated Bot Responses** (ready for API integration)
- **New Chat** functionality to start fresh conversations
- **Chat History** sidebar (placeholder for future expansion)

### Integrated Search Features
- **Google Search Integration**
  - Working search input
  - Simulated search results
  - Direct links to Google search
  - Ready for Google Custom Search API

- **YouTube Search Integration**
  - YouTube search functionality
  - Simulated video results with metadata
  - Direct links to YouTube
  - Ready for YouTube Data API

### UI/UX
- **Modern, Clean Design** with gradient backgrounds
- **Responsive Layout** that works on desktop and mobile
- **Smooth Transitions** and hover effects
- **Bottom Navigation** for easy feature switching
- **Sidebar Navigation** with user profile
- **Dark Theme** for comfortable viewing

## 📁 Project Structure

```
chatgpt-premium-clone/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete styling
├── script.js           # All functionality
├── assets/             # Images, icons, and media
└── README.md           # Documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required!

### Installation

1. Clone this repository:
```bash
git clone https://github.com/hellohacker143/chatgpt-premium-clone.git
```

2. Navigate to the project directory:
```bash
cd chatgpt-premium-clone
```

3. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or simply drag and drop `index.html` into your browser!

## 💡 Usage

### First Time Setup
1. **Register** a new account with:
   - Username
   - Email
   - Password (must match confirmation)

2. **Login** with your credentials

3. Start chatting, searching, or exploring!

### Features Guide

**Chat Tab** 💬
- Type messages in the input field
- Press Enter or click Send
- View conversation history
- Start new chats anytime

**Google Search** 🔍
- Enter search queries
- View simulated results
- Click to search on actual Google

**YouTube Tab** ▶️
- Search for videos
- View placeholder results
- Click to search on actual YouTube

## 🎨 Customization

### Color Scheme
Edit the CSS variables in `styles.css`:
```css
/* Primary gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Dark theme colors */
--bg-dark: #343541;
--sidebar-dark: #202123;
```

### Bot Responses
Modify the response array in `script.js`:
```javascript
const responses = [
    'Your custom response 1',
    'Your custom response 2',
    // Add more...
];
```

## 🔧 API Integration (Future Enhancement)

### Connect to OpenAI API
```javascript
// In script.js, replace the simulated response with:
async function sendMessage() {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${YOUR_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: message}]
        })
    });
}
```

### Google Custom Search API
```javascript
// Add your API key and search engine ID
const API_KEY = 'your_google_api_key';
const SEARCH_ENGINE_ID = 'your_search_engine_id';
```

### YouTube Data API
```javascript
// Add your YouTube API key
const YOUTUBE_API_KEY = 'your_youtube_api_key';
```

## 📱 Responsive Design

- **Desktop**: Full sidebar + main content layout
- **Mobile**: Optimized with hidden sidebar and full-width content
- **Tablet**: Adaptive layout for medium screens

## 🛡️ Security Features

- Client-side password validation
- LocalStorage for session management
- No sensitive data exposure
- Ready for backend authentication

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time chat with WebSocket
- [ ] User profile management
- [ ] Chat export functionality
- [ ] Dark/Light theme toggle
- [ ] Voice input support
- [ ] File upload capability
- [ ] Multi-language support
- [ ] Chat categorization
- [ ] Advanced search filters

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**hellohacker143**
- GitHub: [@hellohacker143](https://github.com/hellohacker143)

## 🙏 Acknowledgments

- Inspired by OpenAI's ChatGPT interface
- Design patterns from modern web applications
- Community feedback and contributions

## 📞 Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/hellohacker143/chatgpt-premium-clone/issues)
- Start a [Discussion](https://github.com/hellohacker143/chatgpt-premium-clone/discussions)

---

⭐ **Star this repository** if you find it helpful!

**Built with ❤️ using pure HTML, CSS, and JavaScript**
