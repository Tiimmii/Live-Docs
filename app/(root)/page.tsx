
import AddDocumentBtn from '@/components/AddDocumentBtn'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { getDocuments } from '@/lib/actions/rooms.action'
import { metadata } from '../layout'
import Link from 'next/link'
import { dateConverter } from '@/lib/utils'
import {  DeleteModal } from '@/components/DeleteModal'
import Notifications from '@/components/Notifications'

//make sure to install shadn and add button component
//npm i jsm-editor
//npx jsm-editor add editor

const page = async () => {
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('sign-in');

  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress)

  return (
    <main className='home-container'>
      <Header className='sticky left-0 top-0'>
        <div className='flex items-center gap-2 lg:gap-4'>
          <Notifications />
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </div>
      </Header>
      {roomDocuments.data.length>0?(
        <div className='document-list-container'>
          <div className='document-list-title'>
            <h3 className='text-28-semibold'>All documents</h3>
            <AddDocumentBtn userId={clerkUser.id} name={`${clerkUser.firstName} ${clerkUser.lastName}`} email={clerkUser.emailAddresses[0].emailAddress}/>
          </div>
          <ul className='document-ul'>
            {roomDocuments.data.map(({ id, metadata, createdAt }: any)=>(
              <li key={id} className='document-list-item'>
                <Link href={`/documents/${id}`} className='flex flex-1 items-center gap-4'>
                  <div className='hidden rounded-md bg-dark-500 p-2 sm:block'>
                    <Image
                      src={"/assets/icons/document.svg"}
                      alt='file'
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className='space-y-1'>
                    <p className='line-clamp-1 text-lg'>{metadata.title}</p>
                    {clerkUser.id === metadata.creatorId? (
                      <p className='text-sm font-light text-blue-100'>Created by you about {dateConverter(createdAt)}</p>
                    ): (
                      <p className='text-sm font-light text-blue-100'>Created by {metadata.name} about {dateConverter(createdAt)}</p>
                    )}
                  </div>
                </Link>
                {clerkUser.id === metadata.creatorId && <DeleteModal roomId={id}/>}
              </li>
            ))}
          </ul>
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
          <AddDocumentBtn userId={clerkUser.id} name={`${clerkUser.firstName} ${clerkUser.lastName}`} email={clerkUser.emailAddresses[0].emailAddress}/>
        </div>
        )}
    </main>
  )
}

export default page
