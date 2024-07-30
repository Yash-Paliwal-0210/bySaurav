import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getApp } from "firebase/app";

const app = getApp();
const db = getFirestore(app);

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(orderRef);

    if (docSnap.exists()) {
      await updateDoc(orderRef, {
        deliver_status: newStatus,
      });
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } else {
      console.error(`Document with orderId ${orderId} does not exist.`);
    }
  } catch (error) {
    console.error("Error updating order status: ", error);
    throw error; // Ensure error is propagated for handling in the component
  }
};
