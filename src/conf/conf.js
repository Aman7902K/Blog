const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwritePid : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDid : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCid : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBid : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf