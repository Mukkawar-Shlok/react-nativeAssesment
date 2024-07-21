This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

## Prerequisite for running this project
- Java (java 18.0.2.1 2022-08-18)
- Chocolaty (V2.2.2)
- NodeJs (v18.17.1)
- Android Studio
- Adb
- ANDROID_HOME - Environment variable that points to your Android SDK installation
- Android SDK
- React-Native (0.74.3)

**Note** First run ```bash npx react-native doctor``` after installing everything if you are missing something this command will run dignostic tell what are you missing and probably fix the issue!.
![image](https://github.com/user-attachments/assets/aeabd87e-9233-448d-b6a3-54631c16eb31)

## Installation.

- After getting green check from doctor run npm install, on mac os pod install. (This will download project dependencies).
- Now if you encounter issues with npm packages while installing please check nodeJs and Java versions.
- After Sucessfull installation run ```bash npx react-native start``` this will start metro bundler.
- metro bundler is issential for running react-native apps this will show something like this.
  ![image](https://github.com/user-attachments/assets/1a9a1558-3f29-4778-abac-9480ebc4a04f)
- Now press **a** for running on android.
  ![image](https://github.com/user-attachments/assets/f69f788e-3836-4ebe-b5cd-703775d80e0d)
- If you already have a simulator in android studio all good. If not set up one.
- I am running this project on api version 34 of the device.
- Now your app will start running on the device

- Now if you want to run the app on external device.
- Connect phone with pc with usb and turn on developer mode.
- Run ```bash adb devices``` this will show you connected devices.
- Then you can connect with that device ```bash adb connect ipAdressOfPhone:5555```.

##  Summary of Architectural Decisions
1. Application Structure

   1.1 Authentication Stack vs. Unauthorized Stack
   - Unauthorized Stack: Handles screens accessible without authentication, such as Login could be Signup, Privacy Policy, and Terms & Conditions.
   - Authenticated Stack: Handles screens accessible only after authentication, including user profile and list items.
   1.2 Bottom Tabs in Authenticated Stack
   - User List Items Tab: Displays user-related lists with two distinct views.
   - Profile Tab: Handles user profile display and updating.

2. Context Provider for Token Management

   2.1 Context Setup
   - App Provider: Wraps the entire app to manage authentication state via context.
   - Token Handling: Checks for a token in local storage to set context value. This ensures authenticated pages are accessible only when a valid token is present.
   2.2 Benefits
   - Centralized Token Management: Avoids repetitive access to local storage for token validation.
   - Efficient Authentication Flow: Simplifies authentication checks and management throughout the app.

3. Profile Component Structure
   3.1 Components
   - Profile Display Component: Shows user profile information.
   - Profile Update Component: Allows the user to update their profile information.
   3.2 Separation of Concerns
   - Modular Design: Separates profile viewing and updating responsibilities into distinct components for better maintainability.
  
4. List Items Component Structure
  4.1 Components
   - List View Components: Two separate components for displaying lists in different views.
   - Styling: Each component has its own styling to ensure visual consistency and separation of concerns.
  4.2 Benefits and Trade-offs
   - Efficiency: Allows for different implementations and optimizations for each list view.
   - DRY Principle Considerations: While separation improves maintainability, it might introduce code duplication.

## Troubleshooting
1. Clear Metro Bundler cache
```bash
npx react-native start --reset-cache
```
2. Clear npm  cache
```bash
npm cache clean --force
```
3.Clear Android cache
```bash
cd android && ./gradlew clean
```

## Additional Tools and Dependencies
- AsyncStorage for local storage capability.You can read docs of async storage [here](https://reactnative.dev/docs/asyncstorage).
- @react-navigation/bottom-tabs for bottom stack in react native. [docs](https://reactnavigation.org/docs/bottom-tab-navigator/).
- @react-native-dropdown-select-list for dropdown list inside scrollview. [npm package](https://www.npmjs.com/package/react-native-dropdown-select-list).
- @react-native-toast-message for showing toast messages.[npm package](https://www.npmjs.com/package/react-native-toast-message).
- @react-native-vector-icons for icons.[npm package](https://www.npmjs.com/package/react-native-vector-icons).
- validator for validating emails.[npm package](https://www.npmjs.com/package/validator).
