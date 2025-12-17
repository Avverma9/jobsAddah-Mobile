import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SECTOR_CATEGORIES, JOBS_DATA, THEME_COLORS } from '../data/jobsData';
import SectorSwitcher from '../components/SectorSwitcher';
import FeaturedJobCard from '../components/FeaturedJobCard';
import JobCard from '../components/JobCard';
import JobDetailModal from '../components/JobDetailModal';

const SAVED_JOBS_KEY = '@jobsaddah_saved_jobs';

const JobsHome = () => {
  const insets = useSafeAreaInsets();
  const [currentSector, setCurrentSector] = useState('govt');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [refreshing, setRefreshing] = useState(false);

  const theme = THEME_COLORS[currentSector];

  // Load saved jobs from storage
  useEffect(() => {
    loadSavedJobs();
  }, []);

  // Reset category when sector changes
  useEffect(() => {
    setActiveCategory('all');
  }, [currentSector]);

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
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Filter jobs by sector, category, and search
  const getFilteredJobs = () => {
    let filtered = JOBS_DATA.filter((job) => job.sector === currentSector);

    if (activeCategory !== 'all') {
      filtered = filtered.filter((job) => job.subCategory === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.org.toLowerCase().includes(query) ||
          job.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  const filteredJobs = getFilteredJobs();
  const featuredJobs = filteredJobs.slice(0, 3);
  const categories = SECTOR_CATEGORIES[currentSector];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View
        className="bg-white px-6 pb-2 border-b border-gray-100"
        style={{ paddingTop: insets.top + 10 }}
      >
        {/* Logo & Bell */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center gap-3">
            <View
              className="w-10 h-10 rounded-full items-center justify-center border border-gray-100"
              style={{ backgroundColor: theme.primaryLight }}
            >
              <Text className="text-xl font-bold" style={{ color: theme.primary }}>
                JA
              </Text>
            </View>
            <View>
              <Text className="text-xl font-bold text-gray-900 tracking-tight">
                Jobs<Text style={{ color: theme.primary }}>Addah</Text>
              </Text>
              <Text className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                {currentSector === 'govt' ? 'Sarkari Naukri Portal' : 'Private Careers Hub'}
              </Text>
            </View>
          </View>

          <TouchableOpacity className="p-2 rounded-full relative" activeOpacity={0.7}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#4b5563" />
            <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </TouchableOpacity>
        </View>

        {/* Sector Switcher */}
        <SectorSwitcher currentSector={currentSector} onSectorChange={setCurrentSector} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />
        }
      >
        {/* Search Bar */}
        <View className="px-6 py-4">
          <View
            className="relative bg-white flex-row items-center rounded-xl border border-gray-200"
            style={{
              shadowColor: theme.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color="#9ca3af"
              style={{ marginLeft: 16 }}
            />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={
                currentSector === 'govt'
                  ? 'Search Railway, SSC, Bank...'
                  : 'Search Python, Sales, Design...'
              }
              placeholderTextColor="#9ca3af"
              className="flex-1 py-3 px-3 text-sm text-gray-700"
            />
            <TouchableOpacity className="p-2 mr-1" activeOpacity={0.7}>
              <MaterialCommunityIcons name="filter-variant" size={18} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View className="px-6 pb-2">
          <Text className="text-sm font-bold text-gray-800 mb-2">
            Browse {currentSector === 'govt' ? 'Departments' : 'Roles'}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCategory(cat.id)}
                activeOpacity={0.8}
                className="mr-2 px-4 py-2 rounded-full border"
                style={{
                  backgroundColor: activeCategory === cat.id ? theme.primary : '#fff',
                  borderColor: activeCategory === cat.id ? theme.primary : '#e5e7eb',
                }}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{
                    color: activeCategory === cat.id ? '#fff' : '#4b5563',
                  }}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Section */}
        <View className="py-4">
          <View className="flex-row justify-between items-end mb-3 px-6">
            <Text className="text-lg font-bold text-gray-900">
              Featured <Text style={{ color: theme.primary }}>Opportunities</Text>
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-xs font-medium" style={{ color: theme.primary }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {featuredJobs.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 24, paddingRight: 8 }}
            >
              {featuredJobs.map((job) => (
                <FeaturedJobCard
                  key={job.id}
                  job={job}
                  onPress={() => setSelectedJob(job)}
                />
              ))}
            </ScrollView>
          ) : (
            <View className="mx-6 py-8 bg-white rounded-2xl border border-dashed border-gray-300 items-center justify-center">
              <Text className="text-gray-400 text-sm">No featured jobs in this category</Text>
            </View>
          )}
        </View>

        {/* Latest Updates */}
        <View className="px-6 pt-4 pb-32 bg-white rounded-t-[32px] min-h-[400px]">
          <View className="flex-row justify-between items-center mb-4 pt-2">
            <View>
              <Text className="text-lg font-bold text-gray-900">Latest Updates</Text>
              <Text className="text-xs text-gray-400">Fresh jobs added today</Text>
            </View>
            <TouchableOpacity
              className="bg-gray-50 p-2 rounded-lg"
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="tune" size={18} color="#4b5563" />
            </TouchableOpacity>
          </View>

          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onPress={() => setSelectedJob(job)} />
            ))
          ) : (
            <View className="items-center justify-center py-12">
              <View className="bg-gray-50 p-4 rounded-full mb-3">
                <MaterialCommunityIcons name="magnify" size={32} color="#9ca3af" />
              </View>
              <Text className="text-gray-400">No jobs found in {activeCategory}.</Text>
              <TouchableOpacity onPress={() => setActiveCategory('all')} activeOpacity={0.7}>
                <Text className="mt-2 text-xs font-bold" style={{ color: theme.primary }}>
                  Clear Filters
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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

export default JobsHome;
