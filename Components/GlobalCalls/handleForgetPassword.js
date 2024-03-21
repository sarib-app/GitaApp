import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Alert } from "react-native";
const handleForgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        Alert.alert("Check your email", "A link to reset your password has been sent to your email address.");
      })
      .catch((error) => {
        const errorMessage = error.message;
        // Handle Errors here.
        Alert.alert("Error", errorMessage);
      });
  };
export {handleForgotPassword}  