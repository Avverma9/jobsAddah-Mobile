import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Linking,
  Dimensions,
} from 'react-native';
import { Platform } from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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

const JobDetailModal = ({ visible, job, onClose, isSaved, onToggleSave }) => {
  const insets = useSafeAreaInsets();

  if (!job) return null;

  const handleApply = () => {
    // You can customize this URL or action
    Linking.openURL('https://jobsaddah.com/apply/' + job.id).catch(() => {});
  };

  const handleShare = async () => {
    // Optional: implement share functionality
    try {
      const { Share } = require('react-native');
      await Share.share({
        message: `Check out this job: ${job.title} at ${job.org}`,
        title: job.title,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      // presentationStyle is iOS-only; avoid passing a string on Android
      presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : undefined}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-100">
          <TouchableOpacity
            onPress={onClose}
            className="p-2 -ml-2 rounded-full"
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#374151" />
          </TouchableOpacity>

          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => onToggleSave?.(job.id)}
              className="p-2 rounded-full"
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={isSaved ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={isSaved ? job.color : '#374151'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleShare}
              className="p-2 rounded-full"
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="share-variant" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Job Icon & Title */}
          <View className="items-center py-6">
            <View
              className="w-20 h-20 rounded-2xl items-center justify-center mb-4"
              style={{
                backgroundColor: job.color,
                shadowColor: job.color,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <DynamicIcon
                name={job.iconName}
                family={job.iconFamily}
                size={40}
                color="#fff"
              />
            </View>

            <Text className="text-2xl font-bold text-gray-900 text-center mb-1">
              {job.title}
            </Text>
            <Text className="text-gray-500 font-medium">{job.org}</Text>
          </View>

          {/* Stats Row */}
          <View className="flex-row justify-between mb-8 px-2">
            <View className="items-center flex-1">
              <Text className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Salary
              </Text>
              <Text className="font-bold text-gray-900">{job.salary}</Text>
            </View>

            <View className="w-px bg-gray-100" />

            <View className="items-center flex-1">
              <Text className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Type
              </Text>
              <Text className="font-bold text-gray-900 capitalize">
                {job.subCategory}
              </Text>
            </View>

            <View className="w-px bg-gray-100" />

            <View className="items-center flex-1">
              <Text className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Location
              </Text>
              <Text className="font-bold text-gray-900">
                {job.location.split(',')[0]}
              </Text>
            </View>
          </View>

          {/* Tags */}
          <View className="mb-6">
            <Text className="font-bold text-gray-900 text-lg mb-3">Requirements</Text>
            <View className="flex-row flex-wrap gap-2">
              {job.tags.map((tag, idx) => (
                <View
                  key={idx}
                  className="px-3 py-1 rounded-lg"
                  style={{ backgroundColor: job.bgLight }}
                >
                  <Text
                    className="text-xs font-semibold"
                    style={{ color: job.color }}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="font-bold text-gray-900 text-lg mb-2">Description</Text>
            <Text className="text-gray-600 leading-6 text-sm">
              {job.description}
              {'\n\n'}
              Interested candidates should apply before the deadline. Please ensure you
              meet all eligibility criteria before submitting your application.
            </Text>
          </View>

          {/* Deadline Alert */}
          <View className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex-row items-start gap-3">
            <MaterialCommunityIcons
              name="shield-alert"
              size={20}
              color="#ea580c"
              style={{ marginTop: 2 }}
            />
            <View className="flex-1">
              <Text className="text-sm font-bold text-orange-800">Deadline</Text>
              <Text className="text-xs text-orange-700">
                Applications close on {job.deadline}. Apply soon!
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer - Apply Button */}
        <View
          className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100"
          style={{ paddingBottom: insets.bottom + 16 }}
        >
          <TouchableOpacity
            onPress={handleApply}
            activeOpacity={0.9}
            className="flex-row items-center justify-center py-4 rounded-xl"
            style={{
              backgroundColor: job.color,
              shadowColor: job.color,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Text className="text-white font-bold text-base mr-2">Apply Now</Text>
            <MaterialCommunityIcons name="open-in-new" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default JobDetailModal;
