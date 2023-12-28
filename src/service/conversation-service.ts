import {connectionFactory} from "../utils/database"
import {Conversation} from "../entities/conversation"
import { Timestamp } from "typeorm";
import {getRandomUUID} from "../utils/UUIDGeneration"

const mysql = require('mysql');


export async function fetchConversationDataCall(): Promise<any> {
    // initialize
   // await connectionFactory.initialize();
    var connection = mysql.createConnection({
        host: 'pe-awai.cluster-cng8u5rib7j2.us-east-1.rds.amazonaws.com',
        port: 3306,
        user: "admin",
        password: "Admin123",
        database: "awai",
        ssl: true //this does the trick
      });

      connection.connect();

    

    connection.query('show tables', function (error, results, fields) {
        if (error) {
            connection.destroy();
            throw error;
        } else {
            // connected!
            console.log(results);
           // callback(error, results);
            connection.end(function (err) { //callback(err, results); 
            });
        }
    });


   /* console.log("conn estbl");
    try{
    let allConversations = await connectionFactory.getRepository(Conversation).find();
    console.log("allConversations==" + JSON.stringify(allConversations));
    return allConversations
    }
    catch(errors){
        console.log("issue while fetching data");
        return "";
    }
    finally{
         // destroy the connection
    await connectionFactory.destroy()
    }*/
}

export async function insertConversationDataCall(login_id:number,conversation_name:string,conversation_type_id:number): Promise<any> {
    // initialize
    await connectionFactory.initialize();
    console.log("conn estbl");
    const convObj = new Conversation();
    convObj.conversation_id= getRandomUUID();
    convObj.login_id = login_id;
    convObj.conversation_name = conversation_name!=null ? conversation_name :"Default_Conversation";
    convObj.conversation_time = new Date();
    convObj.createdTimeStamp = new Date();
    try{
    await connectionFactory.getRepository(Conversation).save(convObj)
    console.log("Saved successfully");
        return true
    }
    catch(errors){
        console.log("issue while saving data");
        return false;
    }
    finally{
         // destroy the connection
    await connectionFactory.destroy()
    }
   
}

export async function updateConversationDataCall(id:number,conversation_id:number,login_id:number,conversation_name:string,conversation_type_id:number): Promise<any> {
    // initialize
    await connectionFactory.initialize();
    console.log("conn estbl");
    const convObj = new Conversation();
    convObj.id = id;
    convObj.conversation_id = conversation_id;
    convObj.login_id = login_id;
    convObj.conversation_name = conversation_name!=null ? conversation_name :"Default_Conversation";
    convObj.conversation_time = new Date();
    convObj.createdTimeStamp = new Date();
    try{
    await connectionFactory.getRepository(Conversation).save(convObj)
    console.log("Updated successfully");
        return true
    }
    catch(errors){
        console.log("Issue while updating data");
        return false;
    }
    finally{
         // destroy the connection
    await connectionFactory.destroy()
    }
   
}


export async function deleteConversationDataCall(conversation_id:number): Promise<any> {
  // initialize
  await connectionFactory.initialize();
  console.log("conn estbl");
  try{
  let conversationObj = await connectionFactory.getRepository(Conversation).findOneBy({
    conversation_id: conversation_id,
});
    await connectionFactory.getRepository(Conversation).remove(conversationObj);
  console.log("conversation Removed");
  return true;
  }
  catch(errors){
      console.log("issue while saving data");
      return false;
  }
  finally{
       // destroy the connection
  await connectionFactory.destroy()
  }
}

export async function fetchConversationSpecificDataCall(conversation_id:number): Promise<any> {

     // initialize
  await connectionFactory.initialize();
  console.log("conn estbl");
  try{
  let conversationObj = await connectionFactory.getRepository(Conversation).findOneBy({
    conversation_id: conversation_id,
});

  console.log("conversation Object"+conversationObj);
  return conversationObj;
  }
  catch(errors){
      console.log("issue while fetching data");
      return "";
  }
  finally{
       // destroy the connection
  await connectionFactory.destroy()
  }
}
