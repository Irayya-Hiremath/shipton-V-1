import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Upload, Check, CircleAlert as AlertCircle, FileText, Camera, User, RefreshCw } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import DocumentUploadCard from '@/components/DocumentUploadCard';

const documents = [
  {
    id: 'aadhaar',
    title: 'Owner Aadhaar Card',
    icon: FileText,
    status: 'pending', // pending, uploaded, verified, rejected
    description: 'Upload clear photo of your Aadhaar card',
  },
  {
    id: 'pan',
    title: 'Owner PAN Card',
    icon: FileText,
    status: 'uploaded',
    description: 'Upload clear photo of your PAN card',
  },
  {
    id: 'selfie',
    title: 'Owner Selfie',
    icon: User,
    status: 'verified',
    description: 'Take a clear selfie for verification',
  },
  {
    id: 'license',
    title: 'Driving License',
    icon: FileText,
    status: 'pending',
    description: 'Upload both sides of your driving license',
  },
  {
    id: 'rc',
    title: 'Vehicle RC',
    icon: FileText,
    status: 'pending',
    description: 'Upload vehicle registration certificate',
  },
  {
    id: 'insurance',
    title: 'Vehicle Insurance',
    icon: FileText,
    status: 'pending',
    description: 'Upload current vehicle insurance document',
  },
];

export default function DocumentsTab() {
  const { theme } = useTheme();
  const [uploadedDocs, setUploadedDocs] = useState({
    pan: true,
    selfie: true,
  });
  const [docImages, setDocImages] = useState({
    pan: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=400',
    selfie: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  });
  const [refreshing, setRefreshing] = useState(false);

  const styles = createStyles(theme);

  const handleUpload = (documentId, imageUri) => {
    setUploadedDocs(prev => ({ ...prev, [documentId]: true }));
    setDocImages(prev => ({ ...prev, [documentId]: imageUri }));
  };

  const handleRemove = (documentId) => {
    setUploadedDocs(prev => ({ ...prev, [documentId]: false }));
    setDocImages(prev => ({ ...prev, [documentId]: null }));
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const completedCount = Object.values(uploadedDocs).filter(Boolean).length;
  const progressPercentage = (completedCount / documents.length) * 100;

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return theme.colors.success;
      case 'uploaded':
        return theme.colors.warning;
      case 'rejected':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return Check;
      case 'uploaded':
        return AlertCircle;
      case 'rejected':
        return AlertCircle;
      default:
        return Upload;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'uploaded':
        return 'Under Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Upload Required';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.header}>
          <Text style={styles.title}>Document Upload</Text>
          <Text style={styles.subtitle}>
            Upload the following documents to complete your registration
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
          <Text style={styles.progressText}>{completedCount} of {documents.length} documents completed</Text>
        </Animated.View>

        <View style={styles.documentsContainer}>
          {documents.map((document, index) => {
            const isUploaded = uploadedDocs[document.id];
            const imageUri = docImages[document.id];

            return (
              <DocumentUploadCard
                key={document.id}
                document={{
                  id: document.id,
                  name: document.title,
                  description: document.description,
                }}
                isUploaded={isUploaded}
                imageUri={imageUri}
                onUpload={handleUpload}
                onRemove={handleRemove}
                delay={600 + index * 100}
              />
            );
          })}
        </View>

        <Animated.View entering={FadeInUp.delay(1200).duration(600)} style={styles.helpContainer}>
          <Text style={styles.helpTitle}>Need Help?</Text>
          <Text style={styles.helpText}>
            Make sure all documents are clear and readable. Contact support if you face any issues.
          </Text>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  documentsContainer: {
    marginBottom: 24,
  },
  helpContainer: {
    backgroundColor: theme.colors.secondary,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  supportButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  supportButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.white,
  },
});