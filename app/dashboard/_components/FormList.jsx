"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import FormListitem from './FormListitem'
import { toast } from 'sonner'

const FormList = () => {

    const [formList, setFormList] = useState([])
    const { user } = useUser()

    const getFormList = async () => {
        try {
            const result = await db.select().from(JsonForms)
                .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(JsonForms.id))
            console.log(result);
            setFormList(result)
        } catch (error) {
            toast("Error occured")
        }
    }

    const deleteForm = async (Id) => {
        try {
            const result = await db.delete(JsonForms)
                .where(and(eq(JsonForms.id, Id), eq(JsonForms.createdBy, user.primaryEmailAddress.emailAddress)))

            console.log(result);
            const fl = formList.filter((rm) => Id != rm.id)
            setFormList(fl)
        } catch (error) {
            toast("Error occured")
        }
    }

    useEffect(() => {
        user && getFormList()
    }, [user])


    return (
        <div className='grid grid-cols-3 gap-4' >
            {formList && formList.map((form, i) => (
                <div key={i} >
                    <FormListitem form={form} deleteForm={deleteForm} />
                </div>
            ))}
        </div>
    )
}

export default FormList