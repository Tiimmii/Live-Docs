"use client";
import React, { ReactNode } from 'react'
import {
    LiveblocksProvider,
    ClientSideSuspense,
  } from "@liveblocks/react/suspense";
import Loaders from '@/components/Loaders';

const Provider = ({children}: {children: ReactNode}) => {
  return (
    <LiveblocksProvider authEndpoint={'/api/liveblocks-auth'}>
      <ClientSideSuspense fallback={<Loaders/>}>
        {children}
      </ClientSideSuspense>
  </LiveblocksProvider>
  )
}

export default Provider
