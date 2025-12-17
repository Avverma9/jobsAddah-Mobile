import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage({ navigation }) {
  const { signIn } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const autofill = () => {
    setFullName('Aditi Sharma');
    setEmail('aditi.sharma@jobsaddah.com');
    setPhone('9876543210');
    setPassword('jobs2025');
    setError('');
  };

  const handleSubmit = () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError('Please fill in every field to continue.');
      return;
    }
    if (!acceptTerms) {
      setError('Please accept the terms first.');
      return;
    }

    setLoading(true);
    setError('');
    setTimeout(async () => {
      await signIn('jobsaddah-demo-token', email.trim().toLowerCase());
      navigation.replace('MainTabs');
    }, 500);
  };

  return (
    <LinearGradient colors={['#0f172a', '#312e81']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.heroCard}>
              <View style={styles.heroBadge}>
                <MaterialCommunityIcons name="account-plus" color="#fff" size={26} />
              </View>
              <Text style={styles.heroTitle}>Join JobsAddah</Text>
              <Text style={styles.heroSubtitle}>
                Create one login for all govt & private job alerts, bookmarks, and saved preferences.
              </Text>
            </View>

            <View style={styles.formCard}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>Create your profile</Text>
                <TouchableOpacity onPress={autofill} activeOpacity={0.7}>
                  <Text style={styles.autofill}>Fill sample data</Text>
                </TouchableOpacity>
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="account-outline" size={20} color="#94a3b8" />
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Full name"
                  placeholderTextColor="#94a3b8"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="email-outline" size={20} color="#94a3b8" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email address"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="phone-outline" size={20} color="#94a3b8" />
                <TextInput
                  value={phone}
                  onChangeText={(value) => setPhone(value.replace(/[^0-9]/g, ''))}
                  placeholder="Mobile number"
                  placeholderTextColor="#94a3b8"
                  keyboardType="phone-pad"
                  maxLength={10}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="lock-outline" size={20} color="#94a3b8" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create password"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry
                  style={styles.input}
                />
              </View>

              <TouchableOpacity
                style={styles.termsRow}
                onPress={() => setAcceptTerms((prev) => !prev)}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name={acceptTerms ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={20}
                  color={acceptTerms ? '#38bdf8' : '#94a3b8'}
                />
                <Text style={styles.termsText}>I agree to the Terms & Privacy Policy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.primaryButton, loading && { opacity: 0.6 }]}
                onPress={handleSubmit}
                activeOpacity={0.85}
                disabled={loading}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? 'Setting things up…' : 'Create account'}
                </Text>
              </TouchableOpacity>

              <View style={styles.loginRow}>
                <Text style={styles.mutedText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.linkText}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  gradient: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    gap: 20,
  },
  heroCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  heroBadge: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#4c1d95',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
  heroSubtitle: {
    color: '#cbd5f5',
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  autofill: {
    color: '#4c1d95',
    fontWeight: '600',
    fontSize: 13,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 14,
    backgroundColor: '#f8fafc',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: '#0f172a',
    fontSize: 15,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  termsText: {
    color: '#475569',
    fontSize: 13,
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#4c1d95',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 18,
  },
  mutedText: {
    color: '#94a3b8',
    fontSize: 13,
  },
  linkText: {
    color: '#4338ca',
    fontWeight: '700',
    fontSize: 13,
  },
  errorText: {
    color: '#dc2626',
    marginBottom: 8,
    fontSize: 13,
  },
});
