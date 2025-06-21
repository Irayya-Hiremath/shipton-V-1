import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert, Modal, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, Upload, ChevronDown, Truck, Bike, Car, Check, X } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import CustomButton from '@/components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import RNModal from 'react-native-modal';

const cities = [
  'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'
];

const vehicleTypes = [
  { id: '2w', name: '2W', icon: Bike },
  { id: 'truck', name: 'Truck', icon: Truck },
  { id: 'car', name: 'Car', icon: Car },
];

const vehicleBodyTypes = {
  '2w': [
    { id: 'scooter', name: 'Scooter' },
    { id: 'bike', name: 'Bike' },
  ],
  truck: [
    { id: '7-feet', name: '7 feet (0.75 Ton)' },
    { id: '8-feet', name: '8 feet (1.25 Ton)' },
    { id: '9-feet', name: '9 Feet (1.7 Ton)' },
    { id: '10-feet', name: '10 Feet(2.5 tonne)' },
    { id: '14-feet', name: '14 feet (3.5 Ton)' },
    { id: '17-feet', name: '17 Feet(4.5 tonne)' },
  ],
  car: [
    { id: 'sedan', name: 'Sedan' },
    { id: 'hatchback', name: 'Hatchback' },
    { id: 'suv', name: 'SUV' },
  ],
};

export default function VehicleDetails() {
  const router = useRouter();
  const { theme } = useTheme();
  const [vehicleNumber, setVehicleNumber] = useState('KA51D1944');
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [selectedVehicleType, setSelectedVehicleType] = useState('2w');
  const [selectedBodyType, setSelectedBodyType] = useState('scooter');
  const [rcUploaded, setRcUploaded] = useState(false);
  const [rcImage, setRcImage] = useState(null);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showBodyTypeModal, setShowBodyTypeModal] = useState(false);
  const [showVehicleTypeModal, setShowVehicleTypeModal] = useState(false);

  const styles = createStyles(theme);

  const handleUploadRC = async () => {
    Alert.alert(
      'Upload Vehicle RC',
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
                setRcUploaded(true);
                setRcImage(result.assets[0].uri);
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
                setRcUploaded(true);
                setRcImage(result.assets[0].uri);
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

  const handleCancelRC = () => {
    Alert.alert(
      'Remove RC',
      'Are you sure you want to remove the uploaded RC?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setRcUploaded(false);
            setRcImage(null);
          }
        },
      ]
    );
  };

  const handleContinue = () => {
    // if (!vehicleNumber.trim()) {
    //   Alert.alert('Error', 'Please enter vehicle number');
    //   return;
    // }

    // if (!rcUploaded) {
    //   Alert.alert('Error', 'Please upload Vehicle RC');
    //   return;
    // }

    router.push('/driver-details');
  };

  const handleBack = () => {
    router.back();
  };

  const isFormValid = vehicleNumber.trim() && rcUploaded;
  const getVehicleTypeIcon = (typeId) => {
    const type = vehicleTypes.find(t => t.id === typeId);
    return type ? type.icon : Truck;
  };

  const VehicleTypeIcon = getVehicleTypeIcon(selectedVehicleType);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <View style={styles.iconContainer}>
              <ArrowLeft size={24} color={theme.colors.text} />
            </View>
          </TouchableOpacity>

          <Text style={styles.title}>Vehicle Details</Text>

          <View style={styles.stepIndicator}>
            <View style={[styles.step, styles.completedStep]}>
              <View style={styles.iconContainer}>
                <Check size={16} color={theme.colors.white} />
              </View>
            </View>
            <View style={[styles.stepLine, styles.completedStepLine]} />
            <View style={[styles.step, styles.activeStep]}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <View style={[styles.stepLine, styles.inactiveStepLine]} />
            <View style={[styles.step, styles.inactiveStep]}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
          </View>

          <View style={styles.stepLabels}>
            <Text style={[styles.stepLabel, styles.completedStepLabel]}>Owner</Text>
            <Text style={[styles.stepLabel, styles.activeStepLabel]}>Vehicle</Text>
            <Text style={[styles.stepLabel, styles.inactiveStepLabel]}>Driver</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.content}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Vehicle Number <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={vehicleNumber}
              onChangeText={setVehicleNumber}
              placeholder="Enter vehicle number"
              placeholderTextColor={theme.colors.textSecondary}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.uploadContainer}>
            <View style={styles.uploadCard}>
              <Text style={styles.uploadTitle}>Vehicle RC</Text>
              {rcUploaded ? (
                <View style={styles.uploadedContainer}>
                  <View style={styles.uploadedImageContainer}>
                    <Image
                      source={{ uri: rcImage }}
                      style={styles.uploadedImage}
                      resizeMode="cover"
                    />
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={handleCancelRC}
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
                  onPress={handleUploadRC}
                >
                  <View style={styles.uploadButtonContent}>
                    <View style={styles.iconContainer}>
                      <Upload size={16} color={theme.colors.primary} />
                    </View>
                    <Text style={styles.uploadButtonText}>Upload</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select the city of operation</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => { setShowCityModal(true); }}
            >
              <Text style={styles.dropdownText}>{selectedCity}</Text>
              <View style={styles.iconContainer}>
                <ChevronDown size={20} color={theme.colors.textSecondary} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select Vehicle Type</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => { setShowVehicleTypeModal(true); }}
            >
              <Text style={styles.dropdownText}>{vehicleTypes.find(t => t.id === selectedVehicleType)?.name}</Text>
              <View style={styles.iconContainer}>
                <ChevronDown size={20} color={theme.colors.textSecondary} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {selectedVehicleType === '2w' ? 'Select the vehicle body type' : 'Select Vehicle Body Details'}
            </Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => { setShowBodyTypeModal(true); }}
            >
              <Text style={styles.dropdownText}>
                {vehicleBodyTypes[selectedVehicleType]?.find(t => t.id === selectedBodyType)?.name || 'Select Vehicle Body Details'}
              </Text>
              <View style={styles.iconContainer}>
                <ChevronDown size={20} color={theme.colors.textSecondary} />
              </View>
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Continue"
            onPress={handleContinue}
            // disabled={!isFormValid}
            style={styles.continueButton}
          />
        </Animated.View>
      </ScrollView>

      {/* City Selection Modal */}
      <RNModal
        isVisible={showCityModal}
        onBackdropPress={() => setShowCityModal(false)}
        onBackButtonPress={() => setShowCityModal(false)}
        style={styles.bottomModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
      >
        <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select City</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowCityModal(false)}
            >
              <Text style={styles.modalClose}>Done</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={cities}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.modalItem, { backgroundColor: theme.colors.background }]}
                onPress={() => {
                  setSelectedCity(item);
                  setShowCityModal(false);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.modalItemText}>{item}</Text>
                {selectedCity === item && (
                  <View style={styles.checkmarkContainer}>
                    <Check size={20} color={theme.colors.primary} />
                  </View>
                )}
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            windowSize={5}
            removeClippedSubviews={true}
          />
        </View>
      </RNModal>

      {/* Vehicle Type Selection Modal */}
      <RNModal
        isVisible={showVehicleTypeModal}
        onBackdropPress={() => setShowVehicleTypeModal(false)}
        onBackButtonPress={() => setShowVehicleTypeModal(false)}
        style={styles.bottomModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
      >
        <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Vehicle Type</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowVehicleTypeModal(false)}
            >
              <Text style={styles.modalClose}>Done</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={vehicleTypes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setSelectedVehicleType(item.id);
                  setSelectedBodyType(vehicleBodyTypes[item.id]?.[0]?.id || '');
                  setShowVehicleTypeModal(false);
                }}
              >
                <Text style={styles.modalItemText}>{item.name}</Text>
                {selectedVehicleType === item.id && (
                  <View style={styles.checkmarkContainer}>
                    <Check size={20} color={theme.colors.primary} />
                  </View>
                )}
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </RNModal>

      {/* Body Type Selection Modal */}
      <RNModal
        isVisible={showBodyTypeModal}
        onBackdropPress={() => setShowBodyTypeModal(false)}
        onBackButtonPress={() => setShowBodyTypeModal(false)}
        style={styles.bottomModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
      >
        <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Vehicle Body Type</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowBodyTypeModal(false)}
            >
              <Text style={styles.modalClose}>Done</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={vehicleBodyTypes[selectedVehicleType] || []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setSelectedBodyType(item.id);
                  setShowBodyTypeModal(false);
                }}
              >
                <Text style={styles.modalItemText}>{item.name}</Text>
                {selectedBodyType === item.id && (
                  <View style={styles.checkmarkContainer}>
                    <Check size={20} color={theme.colors.primary} />
                  </View>
                )}
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </RNModal>
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
    marginBottom: 24,
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
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  uploadContainer: {
    marginBottom: 24,
  },
  uploadCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  uploadTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  uploadButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
  },
  vehicleTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  vehicleTypeText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    marginLeft: 12,
  },
  continueButton: {
    marginTop: 20,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
  },
  modalCloseButton: {
    padding: 8,
  },
  modalClose: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
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
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    marginLeft: 4,
  },
}); 