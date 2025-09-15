import { db, storage } from './firebase';
import { 
  collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc, serverTimestamp, query, where
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface PropertyInput {
  name: string;
  description?: string;
  managerId: string;
  images?: File[] | any[];
}

export interface UnitInput {
  propertyId: string;
  unitNumber: string;
  rentAmount: number;
}

export const PropertyService = {
  async createProperty(data: PropertyInput) {
    const col = collection(db, 'properties');
    const res = await addDoc(col, {
      name: data.name,
      description: data.description || '',
      managerId: data.managerId,
      images: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: res.id, ...data };
  },

  async updateProperty(propertyId: string, updates: Partial<PropertyInput>) {
    const refDoc = doc(db, 'properties', propertyId);
    await updateDoc(refDoc, { ...updates, updatedAt: serverTimestamp() });
  },

  async deleteProperty(propertyId: string) {
    const refDoc = doc(db, 'properties', propertyId);
    await deleteDoc(refDoc);
  },

  async getProperties(managerId: string) {
    const col = collection(db, 'properties');
    const q = query(col, where('managerId', '==', managerId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  async getPropertyDetails(propertyId: string) {
    const refDoc = doc(db, 'properties', propertyId);
    const snap = await getDoc(refDoc);
    if (!snap.exists()) throw new Error('Property not found');
    return { id: snap.id, ...snap.data() };
  },

  async uploadPropertyImages(propertyId: string, images: any[]) {
    const urls: string[] = [];
    for (const file of images) {
      const fileName = `${propertyId}/${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const storageRef = ref(storage, `property-images/${fileName}`);
      const blob = (file as any).uri ? await (await fetch((file as any).uri)).blob() : (file as any);
      await uploadBytes(storageRef, blob as any);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }
    const refDoc = doc(db, 'properties', propertyId);
    await updateDoc(refDoc, { images: urls, updatedAt: serverTimestamp() });
    return urls;
  },
};

export const UnitService = {
  async createUnit(data: UnitInput) {
    const col = collection(db, 'properties', data.propertyId, 'units');
    const res = await addDoc(col, {
      unitNumber: data.unitNumber,
      rentAmount: data.rentAmount,
      tenantId: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: res.id, ...data };
  },

  async assignTenant(propertyId: string, unitId: string, tenantId: string) {
    const refDoc = doc(db, 'properties', propertyId, 'units', unitId);
    await updateDoc(refDoc, { tenantId, updatedAt: serverTimestamp() });
  },
};


