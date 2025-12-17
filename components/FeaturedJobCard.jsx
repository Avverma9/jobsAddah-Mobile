import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Dynamic Icon Component
const DynamicIcon = ({ name, family, size = 24, color = '#000' }) => {
  switch (family) {
    case 'Ionicons':
      return <Ionicons name={name} size={size} color={color} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={name} size={size} color={color} />;
    case 'MaterialCommunityIcons':
    default:
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
  }
};

const FeaturedJobCard = ({ job, onPress }) => {
  const sectorLabel = job.sector === 'govt' ? 'GOVT' : 'PRIVATE';
  
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="w-[260px] p-5 rounded-2xl bg-white border border-gray-100 mr-4 overflow-hidden"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      {/* Decorative Background Blob */}
      <View
        className="absolute -top-4 -right-4 w-24 h-24 rounded-bl-full opacity-50"
        style={{ backgroundColor: job.bgLight }}
      />

      {/* Header Row */}
      <View className="flex-row justify-between items-start mb-4 z-10">
        <View
          className="w-12 h-12 rounded-xl items-center justify-center"
          style={{ backgroundColor: job.bgLight }}
        >
          <DynamicIcon
            name={job.iconName}
            family={job.iconFamily}
            size={24}
            color={job.color}
          />
        </View>

        <View
          className="px-2 py-1 rounded-md border"
          style={{
            backgroundColor: job.bgLight,
            borderColor: job.color,
          }}
        >
          <Text
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: job.color }}
          >
            {sectorLabel}
          </Text>
        </View>
      </View>

      {/* Title & Org */}
      <Text className="font-bold text-gray-900 text-lg mb-1" numberOfLines={1}>
        {job.title}
      </Text>
      <Text className="text-sm text-gray-500 mb-4" numberOfLines={1}>
        {job.org}
      </Text>

      {/* Location & Salary */}
      <View className="flex-row items-center gap-3">
        <View className="flex-row items-center gap-1 bg-gray-50 px-2 py-1 rounded">
          <MaterialCommunityIcons name="map-marker" size={12} color="#6b7280" />
          <Text className="text-xs text-gray-500 font-medium">
            {job.location.split(',')[0]}
          </Text>
        </View>

        <View
          className="flex-row items-center gap-1 px-2 py-1 rounded"
          style={{ backgroundColor: job.bgLight }}
        >
          <MaterialCommunityIcons name="currency-inr" size={12} color={job.color} />
          <Text className="text-xs font-medium" style={{ color: job.color }}>
            {job.salary}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedJobCard;
