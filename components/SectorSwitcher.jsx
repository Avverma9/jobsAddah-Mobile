import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME_COLORS } from '../data/jobsData';

const SectorSwitcher = ({ currentSector, onSectorChange }) => {
  const isGovt = currentSector === 'govt';
  const theme = THEME_COLORS[currentSector];

  return (
    <View className="relative flex-row bg-gray-100 p-1 rounded-2xl mb-2">
      {/* Sliding Background Pill */}
      <Animated.View
        className="absolute top-1 bottom-1 bg-white rounded-xl"
        style={{
          width: '48%',
          // Avoid using percentage for left on React Native (Android doesn't support % for position)
          // Slide the pill by toggling left/right numeric values instead
          left: isGovt ? 4 : undefined,
          right: isGovt ? undefined : 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }}
      />

      {/* Govt Jobs Button */}
      <TouchableOpacity
        onPress={() => onSectorChange('govt')}
        activeOpacity={0.8}
        className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl z-10"
      >
        <MaterialCommunityIcons
          name="bank"
          size={18}
          color={isGovt ? THEME_COLORS.govt.text : '#6b7280'}
        />
        <Text
          className="text-sm font-bold"
          style={{ color: isGovt ? THEME_COLORS.govt.text : '#6b7280' }}
        >
          Govt Jobs
        </Text>
      </TouchableOpacity>

      {/* Private Jobs Button */}
      <TouchableOpacity
        onPress={() => onSectorChange('private')}
        activeOpacity={0.8}
        className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl z-10"
      >
        <MaterialCommunityIcons
          name="briefcase"
          size={18}
          color={!isGovt ? THEME_COLORS.private.text : '#6b7280'}
        />
        <Text
          className="text-sm font-bold"
          style={{ color: !isGovt ? THEME_COLORS.private.text : '#6b7280' }}
        >
          Private Jobs
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectorSwitcher;
