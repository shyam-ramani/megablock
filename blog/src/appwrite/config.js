import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredimage, status, userid }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
          userid

        }
      );
    } catch (error) {
      console.error("Appwrite Service :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredimage, status }) {
    return await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug,
      {
        title,
        content,
       featuredimage,
        status
      }
    )
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true

    } catch (error) {
      console.error("Appwrite Service :: deletePost :: error", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Appwrite Service :: getPost :: error", error);
      throw error;

    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );

    } catch (error) {
      console.error("Appwrite Service :: getPosts :: error", error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite Service :: uploadFile :: error", error);
      throw error;

    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.error("Appwrite Service :: deleteFile :: error", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.error("Appwrite Service :: getFilePreview :: error", error);
      throw error;
    }
  }
}

const appwriteService = new Service();
export default appwriteService;
