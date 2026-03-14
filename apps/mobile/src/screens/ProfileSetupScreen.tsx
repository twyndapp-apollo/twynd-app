import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Switch,
  Modal,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { saveMyProfile } from '../services/localProfile';
import { isValidNickname, calculateAge, getZodiacSign } from '@twynd/shared/utils';
import { VALIDATION_RULES, AVATAR_OPTIONS, LANGUAGES, COUNTRIES } from '@twynd/shared/constants';

interface ProfileSetupScreenProps {
  onComplete?: () => void;
}

export const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({ onComplete }) => {
  const { updateProfile, user } = useUser();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(user?.avatar || null);
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [birthDate, setBirthDate] = useState<Date | null>(user?.birthDate ? new Date(user.birthDate) : null);
  const [language, setLanguage] = useState(user?.language || 'English');
  const [country, setCountry] = useState(user?.country || '');
  const [description, setDescription] = useState(user?.description || '');
  const [showAgeControl, setShowAgeControl] = useState(user?.showAge || true);
  const [showZodiacControl, setShowZodiacControl] = useState(user?.showZodiac || true);
  const [showBirthdayControl, setShowBirthdayControl] = useState(user?.showBirthday || false);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMonth, setPickerMonth] = useState(new Date().getMonth());
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear() - 25);

  const handleComplete = async () => {
    if (!selectedAvatar) {
      Alert.alert('Required', 'Please select an avatar');
      return;
    }

    if (!isValidNickname(nickname)) {
      Alert.alert(
        'Invalid Nickname',
        `Nickname must be between ${VALIDATION_RULES.NICKNAME_MIN_LENGTH} and ${VALIDATION_RULES.NICKNAME_MAX_LENGTH} characters`
      );
      return;
    }

    if (birthDate && !isValidBirthDate(birthDate)) {
      Alert.alert('Invalid Date', 'Please select a valid birth date');
      return;
    }

    setLoading(true);
    try {
      let age: number | undefined;
      let zodiacSign: string | undefined;

      if (birthDate) {
        age = calculateAge(birthDate);
        zodiacSign = getZodiacSign(birthDate);
      }

      // Only avatar + nickname are stored on the server
      await updateProfile({
        avatar: selectedAvatar!,
        nickname: nickname.trim(),
      });

      // Personal data stays on-device only
      await saveMyProfile({
        birthDate: birthDate?.toISOString(),
        age,
        zodiacSign,
        language,
        country: country || undefined,
        description: description.trim() || undefined,
        showAge: showAgeControl,
        showZodiac: showZodiacControl,
        showBirthday: showBirthdayControl,
      });

      Alert.alert('Success', 'Profile set up complete!', [
        {
          text: 'OK',
          onPress: onComplete,
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (day: number) => {
    const date = new Date(pickerYear, pickerMonth, day);
    if (isValidBirthDate(date)) {
      setBirthDate(date);
      setShowDatePicker(false);
    } else {
      Alert.alert('Invalid Date', 'Please select a valid birth date (age 13-120)');
    }
  };

  const isValidBirthDate = (date: Date): boolean => {
    const now = new Date();
    if (date > now) return false;
    const age = calculateAge(date);
    return age >= 13 && age <= 120;
  };

  const age = birthDate ? calculateAge(birthDate) : null;
  const zodiac = birthDate ? getZodiacSign(birthDate) : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>Tell us a bit more about yourself</Text>

        {/* Required Section */}
        <View style={styles.requiredSection}>
          <Text style={styles.requiredLabel}>Required</Text>

          {/* Avatar Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Avatar *</Text>
            <View style={styles.avatarGrid}>
              {AVATAR_OPTIONS.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  style={[
                    styles.avatarButton,
                    selectedAvatar === emoji && styles.avatarButtonSelected,
                  ]}
                  onPress={() => setSelectedAvatar(emoji)}
                >
                  <Text style={styles.avatarEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Nickname Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nickname *</Text>
            <TextInput
              style={styles.input}
              placeholder="Your nickname"
              placeholderTextColor="#999"
              value={nickname}
              onChangeText={setNickname}
              maxLength={VALIDATION_RULES.NICKNAME_MAX_LENGTH}
              editable={!loading}
            />
            <Text style={styles.charCount}>
              {nickname.length}/{VALIDATION_RULES.NICKNAME_MAX_LENGTH}
            </Text>
          </View>
        </View>

        {/* Optional Section */}
        <View style={styles.optionalSection}>
          <Text style={styles.optionalLabel}>Optional</Text>

          {/* Birth Date */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Birth Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.inputText, { color: birthDate ? '#000' : '#999' }]}>
                {birthDate
                  ? birthDate.toLocaleDateString()
                  : 'Select your birth date'}
              </Text>
            </TouchableOpacity>
            {birthDate && (
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>Age: {age}</Text>
                <Text style={styles.infoText}>Zodiac: {zodiac}</Text>
              </View>
            )}
          </View>

          {/* Privacy Controls for Birth Date */}
          {birthDate && (
            <View style={styles.privacySection}>
              <View style={styles.privacyItem}>
                <Text style={styles.privacyLabel}>Show age</Text>
                <Switch
                  value={showAgeControl}
                  onValueChange={setShowAgeControl}
                />
              </View>
              <View style={styles.privacyItem}>
                <Text style={styles.privacyLabel}>Show zodiac</Text>
                <Switch
                  value={showZodiacControl}
                  onValueChange={setShowZodiacControl}
                />
              </View>
              <View style={styles.privacyItem}>
                <Text style={styles.privacyLabel}>Show birthday</Text>
                <Switch
                  value={showBirthdayControl}
                  onValueChange={setShowBirthdayControl}
                />
              </View>
            </View>
          )}

          {/* Language */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Language</Text>
            <View style={styles.pickerContainer}>
              {LANGUAGES.map((lang) => (
                <TouchableOpacity
                  key={lang}
                  style={[
                    styles.pickerButton,
                    language === lang && styles.pickerButtonSelected,
                  ]}
                  onPress={() => setLanguage(lang)}
                >
                  <Text
                    style={[
                      styles.pickerButtonText,
                      language === lang && styles.pickerButtonTextSelected,
                    ]}
                  >
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Country */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Country</Text>
            <View style={styles.pickerContainer}>
              {COUNTRIES.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.pickerButton,
                    country === c && styles.pickerButtonSelected,
                  ]}
                  onPress={() => setCountry(c)}
                >
                  <Text
                    style={[
                      styles.pickerButtonText,
                      country === c && styles.pickerButtonTextSelected,
                    ]}
                  >
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About You</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Tell your partner about yourself..."
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
              maxLength={VALIDATION_RULES.DESCRIPTION_MAX_LENGTH}
              multiline
              numberOfLines={4}
              editable={!loading}
            />
            <Text style={styles.charCount}>
              {description.length}/{VALIDATION_RULES.DESCRIPTION_MAX_LENGTH}
            </Text>
          </View>


        </View>

        {/* Complete Button */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.primaryButton,
            (!selectedAvatar || !isValidNickname(nickname) || loading) &&
              styles.buttonDisabled,
          ]}
          onPress={handleComplete}
          disabled={
            !selectedAvatar || !isValidNickname(nickname) || loading
          }
        >
          <Text style={styles.buttonText}>
            {loading ? 'Saving...' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.datePickerContainer}>
          <View style={styles.datePickerContent}>
            <View style={styles.datePickerHeader}>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={styles.datePickerCancel}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.datePickerTitle}>Birth Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={styles.datePickerDone}>Done</Text>
              </TouchableOpacity>
            </View>

            {/* Month Selection */}
            <View style={styles.datePickerSection}>
              <Text style={styles.datePickerLabel}>Month</Text>
              <View style={styles.datePickerRow}>
                <TouchableOpacity
                  onPress={() =>
                    setPickerMonth((m) => (m === 0 ? 11 : m - 1))
                  }
                  style={styles.datePickerArrow}
                >
                  <Text style={styles.datePickerArrowText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.datePickerValue}>
                  {new Date(pickerYear, pickerMonth).toLocaleDateString('en-US', {
                    month: 'long',
                  })}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setPickerMonth((m) => (m === 11 ? 0 : m + 1))
                  }
                  style={styles.datePickerArrow}
                >
                  <Text style={styles.datePickerArrowText}>→</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Year Selection */}
            <View style={styles.datePickerSection}>
              <Text style={styles.datePickerLabel}>Year</Text>
              <View style={styles.datePickerRow}>
                <TouchableOpacity
                  onPress={() => setPickerYear((y) => y + 1)}
                  style={styles.datePickerArrow}
                >
                  <Text style={styles.datePickerArrowText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.datePickerValue}>{pickerYear}</Text>
                <TouchableOpacity
                  onPress={() => setPickerYear((y) => y - 1)}
                  style={styles.datePickerArrow}
                >
                  <Text style={styles.datePickerArrowText}>→</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Day Selection */}
            <View style={styles.datePickerSection}>
              <Text style={styles.datePickerLabel}>Day</Text>
              <View style={styles.dateGrid}>
                {Array.from({ length: 31 }).map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.dateButton}
                    onPress={() => handleDateChange(i + 1)}
                  >
                    <Text style={styles.dateButtonText}>{i + 1}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  requiredSection: {
    marginBottom: 32,
  },
  requiredLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  optionalSection: {
    marginBottom: 32,
  },
  optionalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  avatarButton: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#e8f4ff',
  },
  avatarEmoji: {
    fontSize: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  inputText: {
    fontSize: 16,
  },
  descriptionInput: {
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
    textAlign: 'right',
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pickerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  pickerButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  pickerButtonText: {
    fontSize: 14,
    color: '#333',
  },
  pickerButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  privacySection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  privacyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  privacyLabel: {
    fontSize: 14,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
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
  datePickerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  datePickerContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  datePickerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  datePickerCancel: {
    fontSize: 14,
    color: '#999',
  },
  datePickerDone: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  datePickerSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  datePickerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  datePickerArrow: {
    padding: 8,
  },
  datePickerArrowText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  datePickerValue: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 80,
    textAlign: 'center',
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 8,
  },
  dateButton: {
    width: '22%',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  dateButtonText: {
    fontSize: 14,
    color: '#333',
  },
});
