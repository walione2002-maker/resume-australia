import { db } from './firebase';
import { collection, doc, setDoc, getDocs, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ResumeData } from '@/types';

export interface SavedResume {
  id: string;
  userId: string;
  title: string;
  resumeData: ResumeData;
  templateConfig: {
    templateId: string;
    customColor: string;
  };
  lastUpdated: any; // Firestore Timestamp
}

/**
 * Save a resume to Firestore
 */
export async function saveResumeToCloud(
  userId: string,
  resumeId: string,
  title: string,
  resumeData: ResumeData,
  templateConfig: { templateId: string; customColor: string }
) {
  if (!userId) throw new Error("User must be logged in to save.");
  
  const docRef = doc(db, 'users', userId, 'resumes', resumeId);
  
  await setDoc(docRef, {
    id: resumeId,
    userId,
    title,
    resumeData,
    templateConfig,
    lastUpdated: serverTimestamp()
  }, { merge: true });
  
  return resumeId;
}

/**
 * Fetch all resumes for a specific user
 */
export async function fetchUserResumes(userId: string): Promise<SavedResume[]> {
  if (!userId) return [];
  
  const resumesRef = collection(db, 'users', userId, 'resumes');
  const q = query(resumesRef, orderBy('lastUpdated', 'desc'));
  
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as SavedResume));
}

/**
 * Delete a specific resume
 */
export async function deleteResumeFromCloud(userId: string, resumeId: string) {
  if (!userId || !resumeId) return;
  const docRef = doc(db, 'users', userId, 'resumes', resumeId);
  await deleteDoc(docRef);
}
