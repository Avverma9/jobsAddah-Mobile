import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SECTOR_CATEGORIES, JOBS_DATA, THEME_COLORS } from '../data/jobsData';
import JobCard from '../components/JobCard';
import JobDetailModal from '../components/JobDetailModal';

const SAVED_JOBS_KEY = '@jobsaddah_saved_jobs';

const Browse = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [refreshing, setRefreshing] = useState(false);

  // Load saved jobs
  React.useEffect(() => {
    loadSavedJobs();
  }, []);

  const loadSavedJobs = async () => {
    try {
      const saved = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      if (saved) {
        setSavedJobs(new Set(JSON.parse(saved)));
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
    setSavedJobs((prev) => {
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
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  // Get all categories combined
  const allCategories = [
    { id: 'all', label: 'All Jobs' },
    ...SECTOR_CATEGORIES.govt.slice(1).map((c) => ({ ...c, sector: 'govt' })),
    ...SECTOR_CATEGORIES.private.slice(1).map((c) => ({ ...c, sector: 'private' })),
  ];

  // Filter jobs
  const getFilteredJobs = () => {
    let filtered = [...JOBS_DATA];

    // Filter by sector
    if (selectedSector !== 'all') {
      filtered = filtered.filter((job) => job.sector === selectedSector);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((job) => job.subCategory === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.org.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  const filteredJobs = getFilteredJobs();

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View
        className="bg-white px-6 pb-4 border-b border-gray-100"
        style={{ paddingTop: insets.top + 10 }}
      >
        <Text className="text-2xl font-bold text-gray-900 mb-4">Browse Jobs</Text>

        {/* Search Bar */}
        <View
          className="flex-row items-center bg-gray-50 rounded-xl border border-gray-200 px-4"
        >
          <MaterialCommunityIcons name="magnify" size={20} color="#9ca3af" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search jobs, companies, locations..."
            placeholderTextColor="#9ca3af"
            className="flex-1 py-3 px-3 text-sm text-gray-700"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Chips */}
      <View className="px-6 py-3 bg-white border-b border-gray-100">
        {/* Sector Filter */}
        <View className="flex-row gap-2 mb-3">
          {[
            { id: 'all', label: 'All' },
            { id: 'govt', label: 'Govt Jobs' },
            { id: 'private', label: 'Private Jobs' },
          ].map((sector) => (
            <TouchableOpacity
              key={sector.id}
              onPress={() => {
                setSelectedSector(sector.id);
                setSelectedCategory('all');
              }}
              activeOpacity={0.8}
              className="px-4 py-2 rounded-full border"
              style={{
                backgroundColor:
                  selectedSector === sector.id
                    ? sector.id === 'govt'
                      ? THEME_COLORS.govt.primary
                      : sector.id === 'private'
                      ? THEME_COLORS.private.primary
                      : '#374151'
                    : '#fff',
                borderColor:
                  selectedSector === sector.id
                    ? sector.id === 'govt'
                      ? THEME_COLORS.govt.primary
                      : sector.id === 'private'
                      ? THEME_COLORS.private.primary
                      : '#374151'
                    : '#e5e7eb',
              }}
            >
              <Text
                className="text-xs font-semibold"
                style={{
                  color: selectedSector === sector.id ? '#fff' : '#4b5563',
                }}
              >
                {sector.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Category Filter (only if sector is selected) */}
        {selectedSector !== 'all' && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SECTOR_CATEGORIES[selectedSector].map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.8}
                className="mr-2 px-3 py-1.5 rounded-full border"
                style={{
                  backgroundColor:
                    selectedCategory === cat.id
                      ? THEME_COLORS[selectedSector].primaryLight
                      : '#f9fafb',
                  borderColor:
                    selectedCategory === cat.id
                      ? THEME_COLORS[selectedSector].primary
                      : '#e5e7eb',
                }}
              >
                <Text
                  className="text-xs font-medium"
                  style={{
                    color:
                      selectedCategory === cat.id
                        ? THEME_COLORS[selectedSector].primary
                        : '#6b7280',
                  }}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Results */}
      <ScrollView
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563eb" />
        }
      >
        {/* Results Count */}
        <Text className="text-sm text-gray-500 mb-3">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
        </Text>

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onPress={() => setSelectedJob(job)} />
          ))
        ) : (
          <View className="items-center justify-center py-16">
            <View className="bg-gray-100 p-4 rounded-full mb-3">
              <MaterialCommunityIcons name="briefcase-search" size={40} color="#9ca3af" />
            </View>
            <Text className="text-gray-500 font-medium">No jobs found</Text>
            <Text className="text-gray-400 text-sm mt-1 text-center px-8">
              Try adjusting your filters or search query
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setSelectedSector('all');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 rounded-full"
              activeOpacity={0.8}
            >
              <Text className="text-white text-sm font-semibold">Clear All Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Job Detail Modal */}
      <JobDetailModal
        visible={!!selectedJob}
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        isSaved={selectedJob ? savedJobs.has(selectedJob.id) : false}
        onToggleSave={toggleSaveJob}
      />
    </View>
  );
};

export default Browse;
