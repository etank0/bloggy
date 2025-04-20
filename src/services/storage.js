import appwriteConfig from "../configs/appwrite";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class StorageService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(appwriteConfig.appwriteURL)
      .setProject(appwriteConfig.appwriteProjectID);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userEmail,
    userID,
    userName,
  }) {
    try {
      return await this.databases.createDocument(
        appwriteConfig.appwriteDatabaseID,
        appwriteConfig.appwriteArticlesCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
          userName,
          userEmail,
        }
      );
    } catch (error) {
      console.error("Appwrite Storage Service :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userName }) {
    try {
      return await this.databases.updateDocument(
        appwriteConfig.appwriteDatabaseID,
        appwriteConfig.appwriteArticlesCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userName,
        }
      );
    } catch (error) {
      console.error("Appwrite Storage Service :: updatePost :: error", error);
    }
  }

  async getPost(slug, userID) {
    try {
      const post = await this.databases.getDocument(
        appwriteConfig.appwriteDatabaseID,
        appwriteConfig.appwriteArticlesCollectionID,
        slug
      );

      if (userID) {
        const liked = await this.getLike({ postID: post.$id, userID });
        return { ...post, liked };
      } else {
        return post;
      }
    } catch (error) {
      console.error("Appwrite Storage Service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(userID, queries = [Query.equal("status", "active")]) {
    try {
      const posts = await this.databases.listDocuments(
        appwriteConfig.appwriteDatabaseID,
        appwriteConfig.appwriteArticlesCollectionID,
        queries
      );

      if (userID) {
        const postsWithLikes = await Promise.all(
          posts?.documents.map(async (post) => {
            const liked = await this.getLike({ postID: post.$id, userID });
            return { ...post, liked };
          })
        );
        return postsWithLikes;
      } else {
        return posts.documents;
      }
    } catch (error) {
      console.error("Appwrite Storage Service :: getPosts :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        appwriteConfig.appwriteDatabaseID,
        appwriteConfig.appwriteArticlesCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite Storage Service :: deletePost :: error", error);
      return false;
    }
  }

  async updateLikes(postID, increase) {
    try {
      const queries = [Query.equal("postID", postID)];

      const likesDocs = await this.databases.listDocuments(
        appwriteConfig.appwriteDatabaseID,
        appwriteConfig.appwriteLikesCollectionID,
        queries
      );

      const likesCount = likesDocs ? likesDocs.total : 0;

      const newLikesCount = likesCount + increase;

      await this.databases.updateDocument(
        appwriteConfig.appwriteDatabaseID,
        appwriteConfig.appwriteArticlesCollectionID,
        postID,
        {
          likes: newLikesCount >= 0 ? newLikesCount : 0,
        }
      );
      return true;
    } catch (error) {
      console.error("Appwrite Storage Service :: updateLikes :: error", error);
      return false;
    }
  }

  async getLike({ postID, userID }) {
    try {
      const queries = [
        Query.equal("postID", postID),
        Query.equal("userID", userID),
      ];

      const likesDocs = await this.databases.listDocuments(
        appwriteConfig.appwriteDatabaseID,
        appwriteConfig.appwriteLikesCollectionID,
        queries
      );

      await this.updateLikes(postID, 0);

      if (likesDocs?.total > 0) {
        return likesDocs;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Appwrite Storage Service :: getLike :: error", error);
      return false;
    }
  }

  async addLike({ postID, userID }) {
    try {
      const likedDocs = await this.getLike({ postID, userID });

      if (likedDocs && likedDocs.total > 0) {
        return true;
      }

      await this.databases.createDocument(
        appwriteConfig.appwriteDatabaseID,
        appwriteConfig.appwriteLikesCollectionID,
        ID.unique(),
        {
          userID,
          postID,
        }
      );
      await this.updateLikes(postID, 0);
      return true;
    } catch (error) {
      console.error("Appwrite Storage Service :: addLike :: error", error);
      return false;
    }
  }

  async removeLike({ postID, userID }) {
    try {
      const likedDocs = await this.getLike({ postID, userID });

      if (likedDocs && likedDocs.total === 0) {
        return true;
      }

      const slug = likedDocs?.documents[0]?.$id;

      if (slug) {
        await this.databases.deleteDocument(
          appwriteConfig.appwriteDatabaseID,
          appwriteConfig.appwriteLikesCollectionID,
          slug
        );
      }

      await this.updateLikes(postID, 0);
      return true;
    } catch (error) {
      console.error("Appwrite Storage Service :: removeLike :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        appwriteConfig.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite Storage Service :: uploadFile :: error", error);
    }
  }

  async deleteFile(fileID) {
    try {
      await this.bucket.deleteFile(appwriteConfig.appwriteBucketID, fileID);

      return true;
    } catch (error) {
      console.error("Appwrite Storage Service :: deleteFile :: error", error);

      return false;
    }
  }

  getFilePreview(fileID) {
    try {
      return this.bucket.getFilePreview(
        appwriteConfig.appwriteBucketID,
        fileID
      );
    } catch (error) {
      console.error(
        "Appwrite Storage Service :: getFilePreview :: error",
        error
      );
    }
  }
}

const storageService = new StorageService();

export default storageService;
