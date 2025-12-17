import './global.css';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './utils/navigation';
import { Provider } from 'react-redux';
import { store } from './store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ThemedStatusBar from './components/ThemedStatusBar';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

// Import screen components
import BootScreen from './screens/BootScreen';
import JobsHome from './screens/JobsHome';
import SavedJobs from './screens/SavedJobs';
import Browse from './screens/Browse';
import Profile from './screens/Profile';
import LoginPage from './screens/LoginRN';
import RegisterPage from './screens/Register';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import PrimaryTabBar from './components/PrimaryTabBar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={(props) => <PrimaryTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={JobsHome} />
      <Tab.Screen name="Saved" component={SavedJobs} />
      <Tab.Screen name="Browse" component={Browse} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowBoot(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          {showBoot ? <BootScreen /> : <ThemedApp />}
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

function ThemedApp() {
  const { theme } = useTheme();
  const { isSignedIn } = useAuth();
  
  // While reading storage, show loading screen
  if (isSignedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <NavigationContainer ref={navigationRef}>
          <ThemedStatusBar />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isSignedIn ? (
              <>
                <Stack.Screen name="MainTabs" component={TabNavigator} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Register" component={RegisterPage} />
                <Stack.Screen name="MainTabs" component={TabNavigator} />
              </>
            )}
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
