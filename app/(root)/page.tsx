
import AddDocumentBtn from '@/components/AddDocumentBtn'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { SignedIn } from '@clerk/clerk-react'
import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'

//make sure to install shadn and add button component
//npm i jsm-editor
//npx jsm-editor add editor

const page = async () => {
  const documents = []
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('sign-in') 

  return (
    <main className='home-container'>
      <Header className='sticky left-0 top-0'>
        <div className='flex items-center gap-2 lg:gap-4'>
          Notification
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </div>
      </Header>
      {documents.length>0?(
        <div>

        </div>
        ):(
        <div className='document-list-empty'>
          <Image
            src={'/assets/icons/doc.svg'}
            alt='document'
            width={40}
            height={40}
            className='mx-auto'
          />
          <AddDocumentBtn userId={clerkUser.id} email={clerkUser.emailAddresses[0].emailAddress}/>
        </div>
        )}
    </main>
  )
}

export default page
