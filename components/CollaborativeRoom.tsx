"use client"
import React, { useEffect, useRef, useState } from 'react'
import {
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loaders from './Loaders';
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import ActiveCollaborators from './ActiveCollaborators';
import { Input } from './ui/input';
import Image from 'next/image';
import { updateDocument } from '@/lib/actions/rooms.action';
import ShareModal from './ShareModal';

//set up live blocks authentication follow the live blocks docs

const CollaborativeRoom = ({roomId, roomMetadata, users, currentUserType}: CollaborativeRoomProps) => {
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [documentTitle, setdocumentTitle] = useState(roomMetadata.title)

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const updateTitleHandler = async (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            setLoading(true);
            try {
                if(documentTitle !== roomMetadata.title){
                    const updatedDocument = await updateDocument(roomId, documentTitle);
                    if(updatedDocument){
                        setEditing(false);
                    }
                }
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        }
    }
    useEffect(()=>{
        const handleClickOutside = (e: MouseEvent)=>{
            if(containerRef.current && !containerRef.current.contains(e.target as Node)){
                setEditing(false);
                updateDocument(roomId, documentTitle);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [roomId, documentTitle])
    useEffect(()=>{
        if(editing && inputRef.current){
            inputRef.current.focus()
        }
    }, [editing])
    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<Loaders />}>
                <div className='collaborative-room'>
                    <Header>
                        <div ref={containerRef} className='flex w-fit items-center justify-center gap-2'>
                            {editing && !loading ? (
                                <Input
                                type='text'
                                value={documentTitle}
                                placeholder='Enter Document TItle'
                                onChange={(e)=>setdocumentTitle(e.target.value)}
                                ref={inputRef}
                                onKeyDown={updateTitleHandler}
                                disabled={!editing}
                                className='document-title-input' 
                                />
                            ): (
                                <><p className='document-title'>{documentTitle}</p></>
                            )}
                            {currentUserType ==='editor' || currentUserType === 'creator' && !editing &&(
                                <Image
                                    src={'/assets/icons/edit.svg'}
                                    alt='edit'
                                    width={24}
                                    height={24}
                                    onClick={()=> setEditing(true)}
                                    className='pointer'
                                />
                            )}
                            {currentUserType ==='viewer' && !editing &&(
                                <p className='view-only-tag'>View only</p>
                            )}
                            {loading && <p className='text-sm text-gray-400'>saving...</p>}
                        </div>
                        <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>

                            <ShareModal roomId={roomId} collaborators={users} creatorId={roomMetadata.creatorId} currentUserType={currentUserType}/>
                            <ActiveCollaborators/>
                        </div>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </Header>
                    <Editor roomId={roomId} currentUserType={currentUserType}/>
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default CollaborativeRoom
