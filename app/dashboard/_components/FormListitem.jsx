import { Edit, Share, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const FormListitem = ({ form, deleteForm }) => {

  const data = JSON.parse(form.jsonform)
  return (
    <div className='relative  overflow-hidden rounded-xl border border-gray-800 p-[1px] backdrop-blur-3xl'>
      <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
      <div className='inline-flex items-center justify-center w-full h-full px-3 py-1 text-sm font-medium rounded-xl bg-gray-950 text-gray-50 backdrop-blur-3xl' >
        <div className='flex flex-col p-4' >

          <h2 className='text-lg font-bold line-clamp-1' >{data?.formTitle} </h2>
          <p className='text-sm' >{data?.formHeading} </p>
          <div className='flex items-center mt-4 space-x-2 justify-evenly' >

            <button className='flex items-center justify-center gap-2 btn btn-outline hover:btn-success btn-sm' onClick={() => navigator.share({
              url: `/aiform/${form.id}`,
              text:"Hii"
            })} > <Share /> Share  </button>

            <Link href={`/edit-style/${form.id}`} className='flex items-center justify-center gap-2 btn btn-outline btn-sm hover:btn-info' > <Edit /> Edit  </Link>


            <AlertDialog>
              <AlertDialogTrigger>
                <button className='flex items-center justify-center gap-2 btn btn-outline btn-sm hover:btn-error '
                > <Trash /> Delete  </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteForm(form.id)
                  } >Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

    </div>)
}

export default FormListitem