import { Alert } from "react-native";
import { auth } from "../../config/firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const updatePasswordd = async (currentPassword, newPassword) => {
  try {
    // Get the currently authenticated user
    const user = auth.currentUser;

    // Create a credential with the user's email and current password
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    // Re-authenticate the user with the credential
    await reauthenticateWithCredential(user, credential);

    // Update the user's password
    await updatePassword(user, newPassword);

    // Password updated successfully
    console.log('Password updated successfully');
    Alert.alert("Success", "Password Updated Successfully");
    return true;
  } catch (error) {
    // Handle error
    console.error('Error updating password:', error.message);
    Alert.alert("Error", error.message);
    return false;
  }
};

export default updatePasswordd;
