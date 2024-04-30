import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';


const getUserSubscriptionData = async (uid) => {
  const userDocRef = doc(db, 'users', uid);

  try {
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      console.log('User subscription data:', docSnap.data());
      return docSnap.data();
    } else {
      // User data does not exist
      console.log('No user subscription data found!');
      return null;
    }
  } catch (error) {
    console.error("Error fetching user subscription data: ", error);
    // throw error;
    return null
  }
};

export { getUserSubscriptionData };
