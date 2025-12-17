import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { JOBS_DATA } from '../data/jobsData';
import JobCard from '../components/JobCard';
import JobDetailModal from '../components/JobDetailModal';

const SAVED_JOBS_KEY = '@jobsaddah_saved_jobs';

const SavedJobs = () => {
  const insets = useSafeAreaInsets();
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [selectedJob, setSelectedJob] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const loadSavedJobs = async () => {
    try {
      const saved = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      if (saved) {
        setSavedJobIds(new Set(JSON.parse(saved)));
      }
    } catch (error) {
      console.log('Error loading saved jobs:', error);
    }
  };

  const saveSavedJobs = async (jobs) => {
    try {
      await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify([...jobs]));
    } catch (error) {
      console.log('Error saving jobs:', error);
    }
  };

  const toggleSaveJob = useCallback((id) => {
    setSavedJobIds((prev) => {
      const newSaved = new Set(prev);
      if (newSaved.has(id)) {
        newSaved.delete(id);
      } else {
        newSaved.add(id);
      }
      saveSavedJobs(newSaved);
      return newSaved;
    });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadSavedJobs().finally(() => setRefreshing(false));
  }, []);

  const savedJobs = JOBS_DATA.filter((job) => savedJobIds.has(job.id));

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View
        className="bg-white px-6 pb-4 border-b border-gray-100"
        style={{ paddingTop: insets.top + 10 }}
      >
        <Text className="text-2xl font-bold text-gray-900">Saved Jobs</Text>
        <Text className="text-sm text-gray-500 mt-1">
          {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} bookmarked
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563eb" />
        }
      >
        {savedJobs.length > 0 ? (
          savedJobs.map((job) => (
            <View key={job.id} className="relative">
              <JobCard job={job} onPress={() => setSelectedJob(job)} />
              
              {/* Remove Button */}
              <TouchableOpacity
                onPress={() => toggleSaveJob(job.id)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="bookmark" size={20} color={job.color} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View className="items-center justify-center py-20">
            <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
              <MaterialCommunityIcons name="bookmark-outline" size={40} color="#9ca3af" />
            </View>
            <Text className="text-gray-500 text-base font-medium">No saved jobs yet</Text>
            <Text className="text-gray-400 text-sm mt-1 text-center px-8">
              Bookmark jobs to view them here and apply later
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Job Detail Modal */}
      <JobDetailModal
        visible={!!selectedJob}
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        isSaved={selectedJob ? savedJobIds.has(selectedJob.id) : false}
        onToggleSave={toggleSaveJob}
      />
    </View>
  );
};

export default SavedJobs;
