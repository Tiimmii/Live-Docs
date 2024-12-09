'use server';
import {nanoid} from 'nanoid'
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { parseStringify } from '../utils';

//npm install nanoid for id generator
export const createDocument = async({userId, email}:CreateDocumentParams)=>{
    const roomId = nanoid();

    const metadata = {
        creatorId: userId,
        email,
        title: 'untitled'
    }

    const usersAccesses: RoomAccesses = {
        [email]: ['room:write']
    }

    try{
        const room = await liveblocks.createRoom(roomId, {
            metadata,
            usersAccesses,
            defaultAccesses: ['room:write']
          });

        revalidatePath('/')
;
        return parseStringify(room);
    }
    catch(error){
        console.log('error happened while creating room.', error)
    }
}