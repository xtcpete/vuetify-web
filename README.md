# Vue Portfolio Template

A modern, responsive portfolio website template built with Vue 3 and Vuetify 3. Perfect for researchers, developers, and professionals looking to showcase their work.

[Live Demo](https://xtcpete.com)

## 📋 To-Do List

- [ ] Add loading animations
- [ ] Improve accessibility features
- [ ] Add more customization options for colors and themes
- [ ] Add blog section template

## ✨ Features

- 🎯 Clean, professional design
- 📱 Fully responsive layout
- 🔄 Interactive skill cloud
- 📊 Publication showcase
- ⏳ Experience timeline
- 📊 Visitor count tracking
- 🌓 Light/Dark mode support

## 🚀 Getting Started

1. Fork the repository:

```bash
git fork https://github.com/xtcpete/vuetify-web.git
cd vuetify-web
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

## 📝 Customization Guide

### 1. Update Personal Information

Edit `src/data/main.js`:

```javascript
"Info": {
    "Contact": {
        "Email": "your.email@example.com",
    },
    "Highlight": "Your introduction here",
    "Links": {
        "Github": "your-github-url",
        "Instagram": "your-instagram-url",
        "LinkedIn": "your-linkedin-url"
    },
    "Name": "Your Name",
    "keySkills": "Skill1, Skill2, Skill3" // These will appear in the skill cloud
}
```

### 2. Add Your Experiences

In `src/data/main.js`, update the Experiences section:

```javascript
"Experiences": {
    "0": {
        "Company": "Company Name",
        "Date": "Start - End Date",
        "Location": "City, Country",
        "Skills": "Skill1, Skill2, Skill3",
        "Title": "Your Title",
        "Description": "Description of your role and achievements",
        "imgPath": "/company-logo.png", // Place images in public folder
        "id": "company-website-url" // Optional, for clickable links
    }
}
```

### 3. Showcase Your Projects

Add projects in `src/data/main.js`:

```javascript
"Projects": {
    "0": {
        "Demo": false, // Set true for featured projects, will apear on the top of the grid
        "Description": "Project description",
        "id": "project-url",
        "Skills": "Skill1, Skill2, Skill3",
        "Title": "Project Title"
    }
}
```

### 4. List Your Publications

Add publications in `src/data/main.js`:

```javascript
"Publications": {
    "0": {
        "Authors": "Author1; Author2",
        "Date": "2024",
        "Title": "Publication Title",
        "Abstract": "Publication abstract",
        "Journal": "Journal Name",
        "id": "publication-url",
        "Cover": "/publication-cover.png"
    }
}
```

### 5. Update Images

1. Place all images in the `public` folder
2. Recommended image formats: PNG or JPG
3. Update image paths in `main.js`
4. Recommended sizes:
   - Profile image: 400x400px
   - Project covers: 800x400px

### 6. Configure Visitor Counter

In `src/components/AppFooter.vue`, update the visitor counter URL:

```html
<a href="https://hits.seeyoufarm.com">
    <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=YOUR_WEBSITE_URL"/>
</a>
```

## 🛠️ Project Structure

```
src/
├── components/       # Vue components
├── data/             # Data files
│   ├── main.js       # Main content
│   └── details.js    # Additional details
├── pages/            # Page components
├── assets/           # Static assets
└── styles/           # Global styles
```

## 📱 Responsive Design

- Automatically adapts to different screen sizes
- Mobile-friendly navigation drawer
- Responsive grid layouts
- Adaptive skill cloud

## 🚀 Deployment

1. Deploy this website on github pages:

```bash
npm run deploy
```

## 📄 License

MIT License - Feel free to use this template for your portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

If you have any questions or need help customizing the template, please [open an issue](https://github.com/xtcpete/vuetify-web/issues).

---

If you find this template helpful, please give it a ⭐!
