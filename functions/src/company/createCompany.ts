import {
  CallableRequest,
  HttpsError,
  onCall,
} from "firebase-functions/v2/https";
import {getFirestore, FieldValue} from "firebase-admin/firestore";

type CreateCompanyDTO = {
  businessName: string;
  businessId: string;
  state: string;
  logoUrl: string;
};

export const createCompany = onCall(
  async ({auth, data}: CallableRequest<CreateCompanyDTO>) => {
    const db = getFirestore();
    const {serverTimestamp} = FieldValue;

    // check authentication
    if (auth == null) {
      throw new HttpsError("unauthenticated", "You need to be authenticated");
    }

    const uid = auth.uid;
    const {businessName, businessId, state, logoUrl} = data;
    const companyRef = db.collection("companies");

    // check if the user has at least one company
    // For free plan we can only have one company
    const querySnapshot = await companyRef.where("ownerId", "==", uid).get();
    if (!querySnapshot.empty) {
      throw new HttpsError(
        "already-exists",
        "The user already have one company",
      );
    }

    const companyDoc = await companyRef.add({
      ownerId: uid,
      users: [uid],
      businessName,
      businessId,
      state,
      logoUrl,
      createdAt: serverTimestamp(),
    });

    const userDataRef = db.collection("userData").doc(uid);

    await userDataRef.set(
      {
        defaultCompany: companyDoc.id,
      },
      {merge: true},
    );

    return {companyId: companyDoc.id};
  },
);
