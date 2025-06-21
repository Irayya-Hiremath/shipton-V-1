import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, Upload, X, Check } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import CustomButton from '@/components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';

const documents = [
  { id: 'aadhar', name: 'Aadhar Card', icon: Upload },
  { id: 'pan', name: 'PAN Card', icon: Upload },
  { id: 'license', name: 'Driving License', icon: Upload },
  { id: 'selfie', name: 'Selfie', icon: Upload },
];

export default function DriverDetails() {
  const router = useRouter();
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [docImages, setDocImages] = useState({});

  const styles = createStyles(theme);

  const handleUpload = async (docId) => {
    Alert.alert(
      `Upload ${documents.find(d => d.id === docId)?.name}`,
      'Choose upload method',
      [
        { 
          text: 'Camera', 
          onPress: async () => {
            try {
              const { status } = await ImagePicker.requestCameraPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert('Permission Required', 'Camera permission is required to take photos');
                return;
              }

              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                base64: false,
                exif: false,
              });
              
              if (!result.canceled && result.assets && result.assets[0]) {
                setUploadedDocs(prev => ({ ...prev, [docId]: true }));
                setDocImages(prev => ({ ...prev, [docId]: result.assets[0].uri }));
              }
            } catch (error) {
              console.error('Camera error:', error);
              Alert.alert('Error', 'Failed to capture image. Please try again.');
            }
          }
        },
        { 
          text: 'Gallery', 
          onPress: async () => {
            try {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert('Permission Required', 'Gallery permission is required to select photos');
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                base64: false,
                exif: false,
              });
              
              if (!result.canceled && result.assets && result.assets[0]) {
                setUploadedDocs(prev => ({ ...prev, [docId]: true }));
                setDocImages(prev => ({ ...prev, [docId]: result.assets[0].uri }));
              }
            } catch (error) {
              console.error('Gallery error:', error);
              Alert.alert('Error', 'Failed to select image. Please try again.');
            }
          }
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleCancel = (docId) => {
    Alert.alert(
      'Remove Document',
      'Are you sure you want to remove this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setUploadedDocs(prev => ({ ...prev, [docId]: false }));
            setDocImages(prev => ({ ...prev, [docId]: null }));
          }
        },
      ]
    );
  };

  const simulateUpload = (docId) => {
    // Simulating image upload - in real app, this would be the actual image data
    const mockImage = 'https://example.com/doc-image.jpg';
    setTimeout(() => {
      setUploadedDocs(prev => ({ ...prev, [docId]: true }));
      setDocImages(prev => ({ ...prev, [docId]: mockImage }));
      Alert.alert('Success', 'Document uploaded successfully!');
    }, 1000);
  };

  const handleContinue = () => {
    // if (!name.trim()) {
    //   Alert.alert('Error', 'Please enter driver name');
    //   return;
    // }
    
    // const allDocsUploaded = documents.every(doc => uploadedDocs[doc.id]);
    // if (!allDocsUploaded) {
    //   Alert.alert('Error', 'Please upload all required documents');
    //   return;
    // }

    router.push('/(tabs)');
  };

  const handleBack = () => {
    router.back();
  };

  const isFormValid = name.trim() && documents.every(doc => uploadedDocs[doc.id]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <View style={styles.iconContainer}>
              <ArrowLeft size={24} color={theme.colors.text} />
            </View>
          </TouchableOpacity>
          
          <Text style={styles.title}>Driver Details</Text>
          
          <View style={styles.stepIndicator}>
            <View style={[styles.step, styles.completedStep]}>
              <View style={styles.iconContainer}>
                <Check size={16} color={theme.colors.white} />
              </View>
            </View>
            <View style={[styles.stepLine, styles.completedStepLine]} />
            <View style={[styles.step, styles.completedStep]}>
              <View style={styles.iconContainer}>
                <Check size={16} color={theme.colors.white} />
              </View>
            </View>
            <View style={[styles.stepLine, styles.completedStepLine]} />
            <View style={[styles.step, styles.activeStep]}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
          </View>
          
          <View style={styles.stepLabels}>
            <Text style={[styles.stepLabel, styles.completedStepLabel]}>Owner</Text>
            <Text style={[styles.stepLabel, styles.completedStepLabel]}>Vehicle</Text>
            <Text style={[styles.stepLabel, styles.activeStepLabel]}>Driver</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.content}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Driver Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter driver's full name"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          <View style={styles.documentsSection}>
            <Text style={styles.sectionTitle}>
              Upload the following <Text style={styles.required}>*</Text>
            </Text>
            
            {documents.map((document) => {
              const DocumentIcon = document.icon;
              const isUploaded = uploadedDocs[document.id];
              const docImage = docImages[document.id];

              return (
                <View key={document.id} style={styles.documentCard}>
                  <Text style={styles.documentTitle}>{document.name}</Text>
                  {isUploaded ? (
                    <View style={styles.uploadedContainer}>
                      <View style={styles.uploadedImageContainer}>
                        <Image 
                          source={{ uri: docImage }} 
                          style={styles.uploadedImage}
                          resizeMode="cover"
                        />
                        <TouchableOpacity 
                          style={styles.deleteButton}
                          onPress={() => handleCancel(document.id)}
                        >
                          <X size={16} color={theme.colors.white} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.checkmarkContainer}>
                        <Check size={16} color={theme.colors.success} />
                        <Text style={styles.checkmarkText}>Uploaded</Text>
                      </View>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={() => handleUpload(document.id)}
                    >
                      <View style={styles.uploadButtonContent}>
                        <View style={styles.iconContainer}>
                          <DocumentIcon size={16} color={theme.colors.primary} />
                        </View>
                        <Text style={styles.uploadButtonText}>Upload</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>

          <CustomButton
            title="Complete Registration"
            onPress={handleContinue}
            // disabled={!isFormValid}
            style={styles.continueButton}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
    zIndex: 1,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  step: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: theme.colors.primary,
  },
  inactiveStep: {
    backgroundColor: theme.colors.border,
  },
  completedStep: {
    backgroundColor: theme.colors.success,
  },
  stepNumber: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.white,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: theme.colors.border,
    marginHorizontal: 8,
  },
  activeStepLine: {
    backgroundColor: theme.colors.primary,
  },
  inactiveStepLine: {
    backgroundColor: theme.colors.border,
  },
  completedStepLine: {
    backgroundColor: theme.colors.success,
  },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  stepLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },
  activeStepLabel: {
    color: theme.colors.primary,
  },
  inactiveStepLabel: {
    color: theme.colors.textSecondary,
  },
  completedStepLabel: {
    color: theme.colors.success,
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    marginBottom: 8,
  },
  required: {
    color: theme.colors.error,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
  },
  documentsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    marginBottom: 16,
  },
  documentCard: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  documentTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    marginBottom: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  uploadButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    marginLeft: 4,
  },
  uploadedContainer: {
    width: '100%',
  },
  uploadedImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    position: 'relative',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: theme.colors.error,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadedActions: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    backgroundColor: theme.colors.error + '20',
  },
  cancelButtonText: {
    color: theme.colors.error,
  },
  newUploadButton: {
    backgroundColor: theme.colors.secondary,
  },
  continueButton: {
    marginTop: 20,
  },
  checkmarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  checkmarkText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.success,
  },
});