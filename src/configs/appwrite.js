const config = {
  appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteArticlesCollectionID: String(
    import.meta.env.VITE_APPWRITE_ARTICLES_COLLECTION_ID
  ),
  appwriteLikesCollectionID: String(
    import.meta.env.VITE_APPWRITE_LIKES_COLLECTION_ID
  ),
  appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
