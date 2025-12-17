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

const JobCard = ({ job, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl mb-3"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      {/* Icon */}
      <View
        className="w-14 h-14 rounded-2xl items-center justify-center"
        style={{ backgroundColor: job.bgLight }}
      >
        <DynamicIcon
          name={job.iconName}
          family={job.iconFamily}
          size={26}
          color={job.color}
        />
      </View>

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row justify-between items-start mb-1">
          <Text
            className="font-bold text-gray-900 text-sm flex-1 mr-2"
            numberOfLines={1}
          >
            {job.title}
          </Text>
          <View className="bg-gray-50 px-2 py-0.5 rounded-full">
            <Text className="text-[10px] text-gray-400">{job.posted}</Text>
          </View>
        </View>

        <Text className="text-xs text-gray-500 mb-2" numberOfLines={1}>
          {job.org}
        </Text>

        {/* Tags */}
        <View className="flex-row flex-wrap gap-2">
          {job.tags.slice(0, 2).map((tag, idx) => (
            <View
              key={idx}
              className="px-2 py-0.5 bg-gray-50 rounded-md border border-gray-100"
            >
              <Text className="text-[10px] text-gray-500 font-medium">{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;
