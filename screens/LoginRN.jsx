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

const HIGHLIGHTS = [
  { label: 'Govt & Private roles', value: '1500+' },
  { label: 'Cities covered', value: '120' },
  { label: 'Daily alerts', value: '24/7' },
];

export default function LoginPage({ navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Enter both email and password to continue.');
      return;
    }

    setLoading(true);
    setError('');
    setTimeout(async () => {
      await signIn('jobsaddah-demo-token', email.trim().toLowerCase());
      navigation.replace('MainTabs');
    }, 450);
  };

  const autofill = () => {
    setEmail('candidate@jobsaddah.com');
    setPassword('jobs2025');
    setError('');
  };

  return (
    <LinearGradient colors={['#111827', '#1f2937', '#312e81']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.heroCard}>
              <View style={styles.brandBadge}>
                <Text style={styles.brandBadgeText}>JA</Text>
              </View>
              <Text style={styles.heroTitle}>JobsAddah</Text>
              <Text style={styles.heroSubtitle}>
                Unlock curated government & private jobs with one simple sign in.
              </Text>
              <View style={styles.highlightRow}>
                {HIGHLIGHTS.map((item) => (
                  <View key={item.label} style={styles.highlightPill}>
                    <Text style={styles.highlightValue}>{item.value}</Text>
                    <Text style={styles.highlightLabel}>{item.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.formCard}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>Welcome back</Text>
                <TouchableOpacity onPress={autofill} activeOpacity={0.7}>
                  <Text style={styles.autofill}>Use sample credentials</Text>
                </TouchableOpacity>
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="email-outline" size={20} color="#94a3b8" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email address"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="lock-outline" size={20} color="#94a3b8" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry
                  style={styles.input}
                />
              </View>

              <View style={styles.rowBetween}>
                <TouchableOpacity
                  onPress={() => setRememberMe((prev) => !prev)}
                  style={styles.rememberRow}
                  activeOpacity={0.8}
                >
                  <MaterialCommunityIcons
                    name={rememberMe ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    size={20}
                    color={rememberMe ? '#6366f1' : '#94a3b8'}
                  />
                  <Text style={styles.rememberText}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.linkText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, loading && { opacity: 0.6 }]}
                onPress={handleSubmit}
                activeOpacity={0.85}
                disabled={loading}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? 'Signing you in…' : 'Sign in to JobsAddah'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.googleButton} activeOpacity={0.85}>
                <MaterialCommunityIcons name="google" size={20} color="#1f2937" />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <View style={styles.signupRow}>
                <Text style={styles.mutedText}>New to JobsAddah?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.linkText}>Create account</Text>
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
  safeArea: { flex: 1 },
  scrollContent: {
    padding: 24,
    gap: 24,
  },
  heroCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  brandBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4c1d95',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  brandBadgeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  heroSubtitle: {
    color: '#cbd5f5',
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  highlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  highlightPill: {
    flex: 1,
    marginRight: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(15,23,42,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  highlightValue: {
    color: '#fcd34d',
    fontWeight: '700',
    fontSize: 16,
  },
  highlightLabel: {
    color: '#cbd5f5',
    fontSize: 11,
    marginTop: 2,
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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rememberText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '500',
  },
  linkText: {
    color: '#4338ca',
    fontWeight: '700',
    fontSize: 13,
  },
  primaryButton: {
    backgroundColor: '#4c1d95',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 18,
    paddingVertical: 14,
    marginBottom: 18,
    backgroundColor: '#f9fafb',
  },
  googleButtonText: {
    color: '#1f2937',
    fontWeight: '600',
    fontSize: 14,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  mutedText: {
    color: '#94a3b8',
    fontSize: 13,
  },
  errorText: {
    color: '#dc2626',
    marginBottom: 8,
    fontSize: 13,
  },
});
