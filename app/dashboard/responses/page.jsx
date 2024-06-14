'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { desc, eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { JsonForms, UserResponses } from '@/configs/schema'
import * as XLSX from 'xlsx'
import { Download } from 'lucide-react'
const ResponsesPage = () => {

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
            console.log(error);
            toast("Error occured")
        }
    }

    useEffect(() => {
        user && getFormList()
    }, [user])

    return (
        <div className="p-10 text-white">
            <h2 className="flex items-center justify-between text-2xl font-bold">
                <p className="text-primary">Responses</p>
            </h2>
            <div className='grid grid-cols-3 gap-4' >
                {formList && formList.map((form, i) =>
                    <ResponseCard id={i} data={form} />
                )
                }
            </div>

        </div>)
}


const ResponseCard = ({ data }) => {
    const form = JSON.parse(data.jsonform)
  

    const ExportData = async () => {
        try {
            let jsonData = []
            const result = await db.select().from(UserResponses)
                .where(eq(UserResponses.formRef, data.id))
            console.log(result);
            if (result) {
                result.forEach((item) => {
                    const jsonItem = JSON.parse(item.jsonResponse)
                    jsonData.push(jsonItem)
                })
                ExportToExcel(jsonData)
            }
        } catch (error) {
            toast(error.message)
            console.log(error);
        }
    }

    const ExportToExcel = (jsonData) => {
        const worksheet = XLSX.utils.json_to_sheet(jsonData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1")

        XLSX.writeFile(workbook, `${form?.formTitle}Responses.xlsx`)
    }

    return (
        <div className='relative  overflow-hidden rounded-xl border border-gray-800 p-[1px] backdrop-blur-3xl'>
            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
            <div className='inline-flex items-center justify-center w-full h-full px-3 py-1 text-sm font-medium rounded-xl bg-gray-950 text-gray-50 backdrop-blur-3xl' >
                <div className='flex flex-col p-4' >

                    <h2 className='text-lg font-bold line-clamp-1' >{form?.formTitle} </h2>
                    <p className='text-sm' >{form?.formHeading} </p>
                    <div className='flex items-center justify-end mt-4 space-x-2' >
                        <button className='btn btn-outline btn-sm' onClick={ExportData} > <Download/> Expotrt </button>

                    </div>
                </div>
            </div>

        </div>
    )
}




export default ResponsesPage