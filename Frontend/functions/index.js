/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

exports.updateOrderStatus = functions.https.onRequest(async (req, res) => {
  const { orderId, newStatus } = req.body;

  try {
    const orderRef = db.collection("orders").doc(orderId);
    await orderRef.update({
      deliver_status: newStatus,
    });
    res.status(200).send(`Order ${orderId} status updated to ${newStatus}`);
  } catch (error) {
    console.error("Error updating order status: ", error);
    res.status(500).send("Error updating order status.");
  }
});
