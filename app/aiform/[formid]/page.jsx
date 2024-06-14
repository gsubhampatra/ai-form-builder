"use client"
import { db } from '@/configs';
import { JsonForms, UserResponses } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useRef, useState } from 'react'

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { toast } from 'sonner';
import moment from 'moment/moment';



const LiveAiForm = ({ params }) => {

    const [record, setRecord] = useState()
    const [JsonForm, setJsonForm] = useState()

    useEffect(() => {
        params?.formid && getFormFields()
    }, [])

    const getFormFields = async () => {
        const result = await db.select().from(JsonForms).where(eq(JsonForms.id, Number(params?.formid)))
        console.log(result[0]);
        setRecord(result[0])
        setJsonForm(JSON.parse(result[0].jsonform))
    }

    const [formData, setFormData] = useState()

    const handelInputChage = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handelSelectChange = (name, value) => {
        setFormData({ ...formData, [name]: value })

    }

    const handelCheckboxChange = (fieldName, itemName, value) => {

        const list = formData?.[fieldName] ? formData?.[fieldName] : []

        if (value) {
            list.push({
                label: itemName,
                value: value
            })
            setFormData({ ...formData, [fieldName]: list })

        } else {
            const result = list.filter((item) => item.label != itemName)
            setFormData({ ...formData, [fieldName]: result })

        }

    }

    let formRef = useRef()

    const onFormSubmit = async (e) => {
        e.preventDefault()

        console.log(formData);
        const result = await db.insert(UserResponses).values(
            {
                jsonResponse: formData,
                createdAt: JSON.stringify(moment().format('DD/MM/yyyy')),
                formRef: record?.id
            }
        )
        if (result) {
            toast("Submited Successfully")
            formRef.reset()
        }
        else {
            toast("Error while saving your form")
        }
    }



    return (
        <>
            <div className={`flex flex-col justify-center items-center p-10`} style={{ backgroundImage: record?.background }}
            >
                <form ref={(e) => formRef = e} onSubmit={(e) => onFormSubmit(e)} className={`p-5 border  rounded-lg md:w-[600px] w-[300px]` + record?.style} data-theme={record?.theme} >
                    <h2 className="text-2xl font-bold text-center ">
                        {JsonForm?.formTitle}
                    </h2>
                    <h2 className="text-lg text-center ">
                        {JsonForm?.formHeading}
                    </h2>
                    {JsonForm?.fields?.map((field, i) => (
                        <div key={i} className="flex items-center gap-2" >
                            <div className="w-full">
                                {field.fieldType == "select" ? (
                                    <>
                                        <label className="text-sm ">{field.label} </label>
                                        <Select required={field?.required} onValueChange={(v) => handelSelectChange(field.fieldName, v)} >
                                            <SelectTrigger className="w-full bg-transparent">
                                                <SelectValue placeholder={field.placeholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {field?.options.map((option, idx) => (
                                                        <SelectItem key={i * idx} value={option}>{option}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </>
                                ) : field.fieldType == "radio" ? (
                                    <>
                                        <label className="text-sm ">{field?.label} </label>

                                        <RadioGroup required={field?.required} >
                                            {field?.options.map((item, index) => (
                                                <div key={index} className="flex items-center space-x-2 ">
                                                    <RadioGroupItem
                                                        value={item?.label || item}
                                                        id={item?.label || item}
                                                        onClick={() => handelSelectChange(field.fieldName, item.label)}
                                                    />
                                                    <Label htmlFor={item?.label || item}>
                                                        {item?.label || item}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </>
                                ) : field.fieldType == "checkbox" ? (
                                    <>
                                        <div className="my-3">
                                            <label className="text-sm ">
                                                {field.label}{" "}
                                            </label>
                                            {field?.option ? (
                                                field?.options?.map((item, index) => (
                                                    <div className="flex items-center gap-2 ">
                                                        <Checkbox onChackedChange={(v) => handelCheckboxChange(field?.fieldName, item?.label, v)} />
                                                        <h2>{item?.label}</h2>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Checkbox required={field?.required} />
                                                    <h2>{field.label}</h2>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="my-3">
                                            <label className="text-sm ">
                                                {field.label}{" "}
                                            </label>
                                            <Input
                                                type={field.fieldType}
                                                placeholder={field.placeholder}
                                                name={field.fieldName}
                                                className="bg-transparent"
                                                onChange={(e) => handelInputChage(e)}
                                                required={field?.required}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    <button type='submit' className="btn btn-primary" >Submit</button>
                </form>

                <Link href={"/"} className="mt-4 md:mt-0 md:fixed md:bottom-5 left-5 " >
                    <span className='relative  inline-block overflow-hidden rounded-full p-[3px]'>
                        <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                        <div className='inline-flex items-center justify-center w-full h-full px-3 py-1 text-sm font-medium rounded-full cursor-pointer md:text-lg bg-gray-950 text-gray-50 backdrop-blur-3xl'>
                            <Rocket className='mx-2' />  Build your own AI Form
                        </div>
                    </span>
                </Link>
            </div>

        </>

    );
}

export default LiveAiForm