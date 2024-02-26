import { Alert } from "react-native";
import { auth } from "../../config/firebase";
import { updateEmail } from "firebase/auth";
import { reauthenticateWithCredential } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
const updateEmaill = async (newEmail,oldPassword) => {
    const password=oldPassword
  try {
    // Get the currently authenticated user
    const user = auth.currentUser;
    
    // Update the user's email
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    await updateEmail(user,newEmail);
    
    // Email updated successfully
    console.log('Email updated successfully');
    Alert.alert("success","Email Updated Successfully") // Return true indicating success
  } catch (error) {
    // Handle error
    console.error('Error updating email:', error.message);
    Alert.alert("Error",error.message); // Throw error for handling elsewhere
  }
};

export default updateEmaill
