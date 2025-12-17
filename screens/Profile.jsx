import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../store/slices/userSlice';
import { useAuth } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { JOBS_DATA } from '../data/jobsData';

const SAVED_JOBS_KEY = '@jobsaddah_saved_jobs';

const Profile = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const { signOut } = useAuth();
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    loadSavedCount();
  }, []);

  const loadSavedCount = async () => {
    try {
      const saved = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      if (saved) {
        setSavedCount(JSON.parse(saved).length);
      }
    } catch (error) {
      console.log('Error loading saved count:', error);
    }
  };

  const handleLogout = async () => {
    dispatch(clearUser());
    await signOut();
  };

  const userName = user?.name || 'Job Seeker';
  const userEmail = user?.email || 'Update your profile';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const menuItems = [
    { icon: 'file-document-outline', label: 'My Resume', screen: null },
    { icon: 'cog-outline', label: 'Preferences', screen: null },
    { icon: 'bell-outline', label: 'Notifications', screen: null },
    { icon: 'help-circle-outline', label: 'Help & Support', screen: null },
    { icon: 'information-outline', label: 'About', screen: null },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with gradient-like background */}
      <View
        className="bg-blue-600 px-6 pb-16 rounded-b-[40px]"
        style={{ paddingTop: insets.top + 16 }}
      >
        <View className="flex-row items-center gap-4">
          {/* Avatar */}
          <View className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/30 items-center justify-center">
            <Text className="text-xl font-bold text-white">{userInitials}</Text>
          </View>

          <View className="flex-1">
            <Text className="text-xl font-bold text-white">{userName}</Text>
            <Text className="text-white/80 text-sm">{userEmail}</Text>
          </View>

          {/* Edit Button */}
          <TouchableOpacity
            className="p-2 bg-white/20 rounded-full"
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Stats Card - positioned to overlap */}
        <View
          className="absolute -bottom-10 left-6 right-6 bg-white p-4 rounded-xl flex-row justify-between"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          <View className="flex-1 items-center">
            <Text className="text-lg font-bold text-gray-900">12</Text>
            <Text className="text-xs text-gray-500 uppercase tracking-wide">Applied</Text>
          </View>
          <View className="w-px bg-gray-200" />
          <View className="flex-1 items-center">
            <Text className="text-lg font-bold text-gray-900">{savedCount}</Text>
            <Text className="text-xs text-gray-500 uppercase tracking-wide">Saved</Text>
          </View>
          <View className="w-px bg-gray-200" />
          <View className="flex-1 items-center">
            <Text className="text-lg font-bold text-gray-900">3</Text>
            <Text className="text-xs text-gray-500 uppercase tracking-wide">Interview</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView
        className="flex-1 px-6 pt-16"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between p-4 bg-white rounded-xl mb-2"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.03,
              shadowRadius: 4,
              elevation: 1,
            }}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center gap-3">
              <View className="bg-gray-100 p-2 rounded-lg">
                <MaterialCommunityIcons name={item.icon} size={20} color="#4b5563" />
              </View>
              <Text className="font-medium text-gray-800">{item.label}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center gap-2 p-4 bg-red-50 rounded-xl mt-4 border border-red-100"
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="logout" size={20} color="#dc2626" />
          <Text className="font-bold text-red-600">Sign Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text className="text-center text-gray-400 text-xs mt-6">
          JobsAddah v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
};

export default Profile;
