import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';

export interface Application {
  id?: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  recruiterId: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: any;
  resumeUrl: string;
  coverLetter: string;
}

const COLLECTION = 'applications';

export const applicationsService = {
  async applyToJob(applicationData: Omit<Application, 'id' | 'appliedAt' | 'status'>, resumeFile: File) {
    try {
      // 1. Upload Resume to Storage
      const storageRef = ref(storage, `resumes/${applicationData.candidateId}/${Date.now()}_${resumeFile.name}`);
      const uploadResult = await uploadBytes(storageRef, resumeFile);
      const resumeUrl = await getDownloadURL(uploadResult.ref);

      // 2. Save Application to Firestore
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...applicationData,
        resumeUrl,
        status: 'pending',
        appliedAt: serverTimestamp()
      });

      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, COLLECTION);
    }
  },

  async getApplicationsByCandidate(candidateId: string) {
    try {
      const q = query(collection(db, COLLECTION), where('candidateId', '==', candidateId), orderBy('appliedAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION);
    }
  },

  async getApplicationsByRecruiter(recruiterId: string) {
    try {
      const q = query(collection(db, COLLECTION), where('recruiterId', '==', recruiterId), orderBy('appliedAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION);
    }
  }
};
