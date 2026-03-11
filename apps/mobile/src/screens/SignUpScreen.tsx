import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { isValidEmail } from '@twynd/shared/utils';
import { AUTH_PROVIDERS } from '@twynd/shared/constants';

interface SignUpScreenProps {
  onComplete?: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onComplete }) => {
  const { signUp } = useUser();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const handleEmailSignUp = async () => {
    if (!email.trim() || !isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, AUTH_PROVIDERS.EMAIL);
      onComplete?.();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to create account. Please try again.';
      Alert.alert('Sign Up Error', errorMsg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: string) => {
    setLoading(true);
    setSelectedProvider(provider);
    try {
      // Mock social auth - in real app, integrate OAuth
      const mockEmail = `${provider}user${Date.now()}@twynd.app`;
      await signUp(mockEmail, provider);
      onComplete?.();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : `Failed to sign up with ${provider}`;
      Alert.alert('Sign Up Error', errorMsg);
      console.error(error);
    } finally {
      setLoading(false);
      setSelectedProvider(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.title}>Welcome to Twynd</Text>
        <Text style={styles.subtitle}>Connect with your partner</Text>

        {/* Email Signup */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sign Up with Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={!loading}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
              (!email || loading) && styles.buttonDisabled,
            ]}
            onPress={handleEmailSignUp}
            disabled={!email || loading}
          >
            {loading && selectedProvider === null ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Continue with Email</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Signup */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sign Up with Social</Text>

          {/* Google Button */}
          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={() => handleSocialSignUp(AUTH_PROVIDERS.GOOGLE)}
            disabled={loading}
          >
            {loading && selectedProvider === AUTH_PROVIDERS.GOOGLE ? (
              <ActivityIndicator color="#1F2937" />
            ) : (
              <>
                <Text style={styles.socialButtonIcon}>🔍</Text>
                <Text style={styles.socialButtonText}>Google</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Facebook Button */}
          <TouchableOpacity
            style={[styles.socialButton, styles.facebookButton]}
            onPress={() => handleSocialSignUp(AUTH_PROVIDERS.FACEBOOK)}
            disabled={loading}
          >
            {loading && selectedProvider === AUTH_PROVIDERS.FACEBOOK ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.socialButtonIcon}>f</Text>
                <Text style={styles.socialButtonText}>Facebook</Text>
              </>
            )}
          </TouchableOpacity>

          {/* TikTok Button */}
          <TouchableOpacity
            style={[styles.socialButton, styles.tiktokButton]}
            onPress={() => handleSocialSignUp(AUTH_PROVIDERS.TIKTOK)}
            disabled={loading}
          >
            {loading && selectedProvider === AUTH_PROVIDERS.TIKTOK ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.socialButtonIcon}>🎵</Text>
                <Text style={styles.socialButtonText}>TikTok</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <Text style={styles.terms}>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#999',
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
  },
  socialButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  tiktokButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  terms: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 24,
  },
});
