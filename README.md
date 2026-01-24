# Dr. Kalyani Sadanala - Physiotherapist Portfolio

A modern, responsive portfolio website for Dr. Kalyani Sadanala, PT (Senior Physiotherapist), featuring a glassmorphism UI design with dark/light theme support and an admin dashboard for content management.

## 🚀 Features

- **Glassmorphism Design**: Beautiful glass-like UI elements with backdrop blur effects
- **Dark/Light Theme**: Automatic theme switching with local storage persistence
- **Responsive Layout**: Mobile-first design that works on all device sizes
- **Interactive Animations**: AOS (Animate On Scroll) animations for enhanced user experience
- **Admin Dashboard**: Secure admin panel for managing portfolio content
- **Patient Case Studies**: Detailed patient case management with image/video galleries
- **Educational Content**: Experience and education section showcasing professional background
- **Review System**: Patient testimonials with rating display
- **Modern Tech Stack**: Built with React, Vite, Tailwind CSS, and more

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 6
- **Styling**: Tailwind CSS 4, Custom CSS with CSS Variables
- **Routing**: React Router DOM
- **Animations**: AOS (Animate On Scroll)
- **Icons**: React Icons
- **State Management**: React Context API
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Build Tool**: Vite
- **Deployment**: Netlify

## 📋 Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── admin/             # Admin panel components
│   ├── assets/            # Images and media files
│   ├── components/        # Reusable UI components
│   ├── context/           # React Context providers
│   ├── data/              # Content data files
│   ├── services/          # Firebase/Firestore services
│   └── styles.css         # Global styles
├── package.json
└── vite.config.js
```

## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kal_port
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎨 Design Elements

- **Glassmorphism Cards**: Frosted glass effect elements throughout the UI
- **Neon Glows**: Subtle glowing effects for important UI elements
- **Gradient Textures**: Custom gradients for backgrounds and buttons
- **Smooth Animations**: CSS transitions and keyframe animations
- **Custom Scrollbars**: Styled scrollbars for better UX
- **Typography**: Poppins (headings) and Inter (body) fonts from Google Fonts

## 📊 Content Management

The portfolio includes an admin panel with the following management features:

- **Summary Management**: Edit professional summary and bio
- **Education Management**: Update educational background
- **Experience Management**: Modify work experience details
- **Reviews Management**: Manage patient testimonials
- **Patient Management**: Add/edit patient case studies with before/after images

## 🗄️ Firestore Integration

The portfolio uses Firebase Firestore for dynamic content management:

- **Real-time Database**: Instant updates across all clients
- **Patient Records**: Secure storage of patient information and case studies
- **Admin Authentication**: Protected access to content management
- **File Storage**: Integration with Firebase Storage for images and documents
- **Offline Support**: Works even with poor network connectivity

### Collections Structure

- `patients`: Patient records and case studies
- `reviews`: Patient testimonials and ratings
- `education`: Educational background information
- `experience`: Work experience details
- `about`: Professional summary and bio information

### Service Layer

The `src/services/firestoreService.js` file provides a complete API for Firestore operations:

- `addPatient()`, `getPatients()`, `updatePatient()`, `deletePatient()`
- Generic functions for any collection: `addDocument()`, `getDocuments()`, etc.
- Error handling and success/failure responses
- Query capabilities with field-based filtering

## 📱 Responsive Features

- **Mobile Navigation**: Specialized mobile navbar with glassmorphism effect
- **Touch Support**: Optimized for touch interactions
- **Flexible Layouts**: Adapts to all screen sizes
- **Performance Optimized**: Fast loading times on all devices

## 🎭 Theme System

The theme system provides:

- **Automatic Detection**: Respects user's system theme preference
- **Local Storage**: Remembers theme selection between sessions
- **Smooth Transitions**: CSS transitions for theme changes
- **Accessibility**: Proper contrast ratios in both themes

## 🚀 Deployment

The project is configured for deployment on Netlify:

- Netlify configuration in `netlify.toml`
- Asset optimization for faster loading
- Custom domains support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dr. Kalyani Sadanala, PT**
Senior Physiotherapist

## 📞 Contact

- LinkedIn: [Dr. Kalyani Sadanala](https://linkedin.com/in/priyachelli)
- Instagram: [@drpriyachelli](https://instagram.com/drpriyachelli)
- Email: priya.chelli@email.com
