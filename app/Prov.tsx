"use client";
import React, { ReactNode } from 'react'
import {
    LiveblocksProvider,
    ClientSideSuspense,
  } from "@liveblocks/react/suspense";
import Loaders from '@/components/Loaders';
import { getClerkUsers } from '@/lib/actions/user.actions';

const Provider = ({children}: {children: ReactNode}) => {
  return (
    <LiveblocksProvider 
    authEndpoint={'/api/liveblocks-auth'}
    resolveUsers={async({ userIds })=>{
        const users = await getClerkUsers({userIds});
        return users;
    }}
    >
      <ClientSideSuspense fallback={<Loaders/>}>
        {children}
      </ClientSideSuspense>
  </LiveblocksProvider>
  )
}

export default Provider
