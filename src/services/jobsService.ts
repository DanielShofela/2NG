import { collection, query, where, getDocs, doc, getDoc, addDoc, serverTimestamp, orderBy, limit, startAfter, QueryConstraint } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';

export interface Job {
  id?: string;
  recruiterId: string;
  companyName: string;
  title: string;
  description: string;
  category: string;
  type: string;
  location: string;
  salary: string;
  status: 'active' | 'closed' | 'draft';
  createdAt?: any;
}

const COLLECTION = 'jobs';

export const jobsService = {
  async getJobs(filters: { category?: string; type?: string; location?: string }, pageSize: number = 10, lastDoc?: any) {
    try {
      const constraints: QueryConstraint[] = [
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      ];

      if (filters.category) constraints.push(where('category', '==', filters.category));
      if (filters.type) constraints.push(where('type', '==', filters.type));
      if (filters.location) constraints.push(where('location', '==', filters.location));
      if (lastDoc) constraints.push(startAfter(lastDoc));

      const q = query(collection(db, COLLECTION), ...constraints);
      const snapshot = await getDocs(q);
      
      return {
        jobs: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job)),
        lastDoc: snapshot.docs[snapshot.docs.length - 1]
      };
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION);
    }
  },

  async getJobById(id: string) {
    try {
      const docRef = doc(db, COLLECTION, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as Job;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${COLLECTION}/${id}`);
    }
  },

  async postJob(jobData: Omit<Job, 'id' | 'createdAt'>) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...jobData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, COLLECTION);
    }
  }
};
