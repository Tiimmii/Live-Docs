'use client';
import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { createDocument } from '@/lib/actions/rooms.action';
import { useRouter } from 'next/navigation';

const AddDocumentBtn = ({userId, name, email}: AddDocumentBtnProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const addDocumentHandler = async()=>{
    try {
      setLoading(true)
      const room = await createDocument({userId, name, email});
      setLoading(false)
      if(room) router.push(`/documents/${room.id}`)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Button type='submit' onClick={addDocumentHandler} className='gradient-blue flex gap-1 shadow-md' disabled={loading}>
      <Image
        src={'/assets/icons/add.svg'}
        alt='add'
        width={24}
        height={24}
      />
      {loading? <p className='hidden sm:block'>Creating your document ...</p>: <p className='hidden sm:block'>Start a blank document</p>}
    </Button>
  )
}

export default AddDocumentBtn
