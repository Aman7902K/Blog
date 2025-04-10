import { Client,Databases,Storage,Query, ID } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client  = new Client()
    databases
    bucket

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwritePid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost(slug,{title,content,img,status,userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDid,
                conf.appwriteCid,
                slug,
                {
                    title,
                    content,
                    img,
                    status,
                    userId
                }
            )
        }
        catch(err){
            console.log(err,"Error Occured");
        }
    }

    async updatePost(slug,{title,content,img,status,userId}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDid,
                conf.appwriteCid,
                slug,
                {
                    title,
                    content,
                    img,
                    status,
                    userId
                }
            )
        }
        catch(err){     
            console.log(err,"error occured");
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDid,
                conf.appwriteCid,
                slug
            )
            return true
        }
        catch(err){     
            console.log(err,"error occured");
            return false
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDid,
                conf.appwriteCid,
                slug
            )
        }
        catch(err){     
            console.log(err,"error occured");
            return false  
        }
    }
    async getAllPost(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDid,
                conf.appwriteCid,
                queries
            )
        }
        catch(err){     
            console.log(err,"error occured");
            return false  
        }
    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBid,
                ID.unique(),
                file
            )
        }
        catch(err){     
            console.log(err,"error occured");
            return false  
        }
    }

    async uploadFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBid,
                ID.unique(),
                fileId
            )
            return true
        }
        catch(err){     
            console.log(err,"error occured");
            return false  
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBid,
            fileId
        )
    }
}