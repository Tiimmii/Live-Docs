"use client";
import React, { ReactNode } from 'react'
import {
    LiveblocksProvider,
    ClientSideSuspense,
  } from "@liveblocks/react/suspense";
import Loaders from '@/components/Loaders';
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.actions';
import { useUser } from '@clerk/nextjs';

const Provider = ({children}: {children: ReactNode}) => {
  const {user: clerkUser} = useUser(); //use useUser in place of currentUser for client components
  return (
    <LiveblocksProvider 
    authEndpoint={'/api/liveblocks-auth'}
    resolveUsers={async({ userIds })=>{
        const users = await getClerkUsers({userIds});
        return users;
    }}
    resolveMentionSuggestions={async({text, roomId})=>{
      const roomUsers = await getDocumentUsers({
        roomId,
        currentUser: clerkUser?.emailAddresses[0].emailAddress!,
        text,
      })

      return roomUsers
    }}
    >
      <ClientSideSuspense fallback={<Loaders/>}>
        {children}
      </ClientSideSuspense>
  </LiveblocksProvider>
  )
}

export default Provider
