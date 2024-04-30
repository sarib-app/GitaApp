import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';


const createUserRecord = async (uid, packageTaken) => {
    const purchaseDate = new Date(); 

  let ExpDate = new Date(purchaseDate);

  if (packageTaken === 'monthly') {
    ExpDate.setDate(ExpDate.getDate() + 30); 
  } else if (packageTaken === 'annual') {
    ExpDate.setFullYear(ExpDate.getFullYear() + 1); 
  } else {
    throw new Error("Invalid packageTaken value. It must be 'monthly' or 'annual'.");
  }

  try {
    await setDoc(doc(db, 'users', uid), {
      pacakgeTaken: packageTaken,
      subscriptionDate: purchaseDate,
      ExpDate: ExpDate
    }, { merge: true });

    console.log(`User record for UID: ${uid} updated/created successfully.`);
    return "success"
  } catch (error) {
    console.error("Error updating/creating user record: ", error);
    return "error"
  }
};

export { createUserRecord };
