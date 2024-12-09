"use client"
import React, { useRef, useState } from 'react'
import {
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loaders from './Loaders';
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import ActiveCollaborators from './ActiveCollaborators';

//set up live blocks authentication follow the live blocks docs

const CollaborativeRoom = ({roomId, roomMetadata}: CollaborativeRoomProps) => {
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [documnetTitle, setdocumentTitle] = useState(roomMetadata.title)

    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<Loaders />}>
                <div className='collaborative-room'>
                    <Header>
                        <div className='flex w-fit items-center justify-center gap-2'>
                            <p className='document-title'>New Document</p>
                        </div>
                        <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
                            <ActiveCollaborators/>
                        </div>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </Header>
                    <Editor />
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default CollaborativeRoom
