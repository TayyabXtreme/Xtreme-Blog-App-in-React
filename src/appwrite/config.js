import conf from '../conf.js';

import { Client,ID,Databases,Storage,Query } from 'appwrite';

export class Service{

    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
        

    }

    //create reade update delete getone and getall methods from database appwrite

    async creatPost({title,slug,content,featuredImage,status,userId}){

        try {
         return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );

            

        
        } catch (error) {
           
            console.log("Appwrite service :: create post error",error);
        }

    }

    async updatePost(slug,{title,content,featuredImage,status,userId,documentId}){

        try {
            return await this.databases.updateDocument(
                   conf.appwriteDatabaseId,
                   conf.appwriteCollectionId,
                   slug,
                   {
                       title,
                       slug,
                       content,
                       featuredImage,
                       status,
                       userId
                   }
               );
   
               
   
           
           } catch (error) {
              
               console.log("Appwrite service :: create post error",error);
           }
   

    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );

            return true;


        } catch (error) {
            console.log("Appwrite service :: delete post error",error);
            return false;
        }
    }


    async getPost(slug){
        try {

            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            
        } catch (error) {
            console.log("Appwrite service :: get post error",error);
            return false;
        }
    }


    async getPosts(queries = [Query.equal("status","active")]){


        try {

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );
            
        } catch (error) {

            console.log("Appwrite service :: get posts error",error);
            
        }

    }


    //create  delete getone and getall methods from storage appwrite


    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,

            );
        } catch (error) {
            console.log("Appwrite service :: upload file error",error);
            return false;
        }
    }


    async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            );

            return true;

        } catch (error) {
            console.log("Appwrite service :: delete file error",error);
            return false;
        }
    }
    

    getFilePreview(fileId){

        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );

    } 



}

const service=new Service();

export default service;