# SoulStation

Mobile application built with Expo Router and React Native, featuring a comprehensive wellness platform with mental health and physical support, health tracking, and personal moments capture.

The ChatBot API repository `(can’t be in the same repo due to compatibility with hosting).`:
https://github.com/Leonardosep13/SoulStation_Chatbot

You can try the online demo **(limited to 3 minutes per session)** here:
https://appetize.io/app/b_sguc3535on6dyuw7o6sfgvrt3
                     or
https://appetize.io/app/b_ilbwqbmgyuoqtjs4mt7vxph25q

Or download the APK `(signed with my own Google key — meaning no third-party signatures are involved. In other words, it’s a safe download)`:
https://drive.google.com/file/d/1GNNGIlNQIb4t4S-NEc-1v9L7BgEVt-Id/view?usp=sharing

Or you can run it local with **Expo go**:

## 🚀 Quick Start

### Prerequisites

This project requires **Yarn** package manager. You can use npm at your own risk, but Yarn is recommended for compatibility.

> **Note**: If you choose to use npm instead of Yarn, replace `yarn` commands with `npm` equivalents:
> - `yarn install` → `npm install`
> - `yarn dev` → `npm run dev`
> 
> ⚠️ **Warning**: Using npm may cause dependency conflicts or version mismatches.

### Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Pawis7/SoulStation.git
cd SoulStation
```

2. **Install dependencies:**
```bash
yarn install
```

3. **Start the development server:**
```bash
yarn dev
```

### Running the App

After running `yarn dev`, you'll see a QR code in your terminal.

#### Scan QR Code with Expo Go
1. **Install Expo Go** on your mobile device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Scan the QR code:**
   - **iOS**: Use the Camera app to scan the QR code
   - **Android**: Use the Expo Go app to scan the QR code

3. **The app will load** on your device automatically

#### Alternative Options
- Press **'w'** for web browser
- Press **'a'** for Android emulator (requires Android Studio)
- Press **'i'** for iOS simulator (requires Xcode - macOS only)

## 🏗️ Project Structure

```
SoulStation/
├── app/                          # Navigation structure (Expo Router)
│   ├── (main)/                   # Main route group
│   │   ├── (tabs)/              # Tab navigation
│   │   │   ├── index.jsx        # Home screen
│   │   │   ├── profile.jsx      # Profile screen
│   │   │   ├── notifications.jsx # Notifications screen
│   │   │   └── _layout.jsx      # Tab layout
│   │   ├── mental/              # Mental health module
│   │   │   ├── index.jsx        # Mental health hub
│   │   │   ├── chat-room.jsx    # 1-on-1 chat interface
│   │   │   ├── personal-chat.jsx # Personal journal
│   │   │   └── saved-chats.jsx  # Saved conversations
│   │   ├── health/              # Physical health module
│   │   │   └── physical.jsx     # Physical health dashboard
│   │   ├── moments/             # Moments capture module
│   │   │   └── index.jsx        # Moments feed
│   │   ├── chatBot/             # AI chat assistant
│   │   ├── games/               # Mental wellness games
│   │   └── _layout.jsx          # Main layout
│   ├── index.jsx                # Welcome screen
│   ├── login.jsx                # Login screen
│   ├── register.jsx             # Registration screen
│   └── _layout.jsx              # Root layout
├── src/                          # Modular source code
│   ├── constants/               # App constants
│   │   ├── theme.js            # Themes, colors, typography
│   │   ├── themes.js           # Planetary theme system
│   │   └── navigation.js       # Navigation configuration
│   ├── context/                 # React contexts
│   │   └── ThemeContext.jsx    # Theme management
│   ├── services/               # External services
│   │   └── api.js             # API client
│   └── utils/                  # General utilities
│       └── helpers.js         # Helper functions
├── components/                  # Reusable components
│   ├── ui/                     # UI components
│   └── screens/               # Screen-specific components
├── hooks/                      # Custom hooks
└── assets/                     # Static resources
    └── images/                # Images and icons
```

## 🌟 Features

### Mental Health Module
- **Personal Journal Chat**: Private space for thoughts and reflections
- **1-on-1 Professional Support**: Chat with licensed therapists and counselors
- **Daily Inspiration**: Motivational quotes for mental wellness
- **Saved Conversations**: Access to chat history and important conversations
- **Resource Center**: Mental health resources and crisis support information

### Physical Health Tracking
- **Vital Signs Monitoring**: Heart rate, blood oxygen, temperature, weight, blood pressure
- **Exercise Library**: Organized by muscle groups (Chest, Back, Legs, Arms, Core, Cardio)

### Moments Capture
- **Photo & Note Moments**: Capture life's beautiful moments
- **Advanced Filtering**: Filter by photos, notes, favorites, or mood
- **Grid & List Views**: Flexible viewing options

### AI Chat Assistant
- **Intelligent Conversations**: AI-powered chat for support and guidance
- **Chat History**: Persistent conversation storage

### Wellness Games
- **Mental Training**: Brain games for cognitive wellness
- **Sudoku**: Classic puzzle game for mental stimulation
- **Memory Games**: Enhance cognitive function through play

### Comprehensive Theme System
- **6 Planetary Themes**: Earth, Mars, Venus, Jupiter, Neptune, Saturn
- **Dynamic Color Schemes**: Each theme with carefully crafted color palettes
- **Consistent Design**: Unified UI/UX across all modules
- **Accessibility**: High contrast options and readable typography

## 🛠️ Available Scripts

```bash
# Start development server and scan QR code
yarn dev

# Alternative commands (if needed)
yarn start        # Same as yarn dev
yarn web         # Run on web browser directly
yarn android     # Run on Android (requires setup)
yarn ios         # Run on iOS (requires setup - macOS only)
```

## 📱 Supported Platforms FOR DEVELOPING

- ✅ **Android** (API level 21+)
- ✅ **iOS** (iOS 11.0+)
- ✅ **Web** (Modern browsers)

### Common Issues

**Metro bundler issues:**
```bash
yarn start --clear
# or
npx expo start --clear
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under a CC0 1.0 Universal — see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the [Expo documentation](https://docs.expo.dev/)
- Visit [React Native documentation](https://reactnative.dev/)

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Icons by [Lucide](https://lucide.dev/)
- Inspired by modern wellness applications
- Planetary theme concept for mental wellness

---

**Happy Coding! 🚀**
