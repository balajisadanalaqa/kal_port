import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { fixDocumentUrls } from "../services/firestoreService";

/**
 * Utility to fix all URLs in a collection
 * Use this if you have many documents with incorrect URLs
 */
export const fixAllUrlsInCollection = async (collectionName, urlFields) => {
  try {
    console.log(`Starting to fix URLs in collection: ${collectionName}`);
    
    // Get all documents in the collection
    const querySnapshot = await getDocs(collection(db, collectionName));
    let fixedCount = 0;
    let errorCount = 0;
    
    // Process each document
    for (const docSnap of querySnapshot.docs) {
      try {
        console.log(`Processing document: ${docSnap.id}`);
        const result = await fixDocumentUrls(collectionName, docSnap.id, urlFields);
        if (result.success) {
          fixedCount++;
          console.log(`✓ Fixed URLs for document: ${docSnap.id}`);
        } else {
          errorCount++;
          console.error(`✗ Error fixing URLs for document ${docSnap.id}:`, result.error);
        }
      } catch (docError) {
        errorCount++;
        console.error(`✗ Error processing document ${docSnap.id}:`, docError);
      }
    }
    
    console.log(`\nSummary:`);
    console.log(`Documents processed: ${querySnapshot.size}`);
    console.log(`Successfully fixed: ${fixedCount}`);
    console.log(`Errors: ${errorCount}`);
    
    return { success: true, fixedCount, errorCount };
  } catch (error) {
    console.error("Error fixing URLs in collection:", error);
    return { success: false, error: error.message };
  }
};

// Example usage:
// fixAllUrlsInCollection('patients', ['photo', 'beforeAfterImages']);