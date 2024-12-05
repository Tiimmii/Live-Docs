import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header>
         <div className='flex w-fit items-center justify-center gap-2'>
            <p className='document-title'>New Document</p>
         </div>
         <SignedOut>
            <SignInButton/>
         </SignedOut>
         <SignedIn>
            <UserButton/>
         </SignedIn>
        </Header>  
      <Editor/>
    </div>
  )
}

export default page
