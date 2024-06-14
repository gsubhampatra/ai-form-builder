"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Loader2, MessageSquareShare, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormUI from "../_components/FormUI";
import { toast } from "sonner";
import Controller from "../_components/Controller";
import Link from "next/link";

const EditForm = ({ params }) => {
  const { user } = useUser();
  const [JsonForm, setJsonForm] = useState();
  const [updatetrigger, setUpdatetrigger] = useState()
  const [record, setRecord] = useState()
  const [loading, setLoading] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState("light")
  const [selectedBackground, setSelectedBackground] = useState("white")
  const [selectStyle, setSelectStyle] = useState({})


  const router = useRouter();

  const getFormData = async () => {
    setLoading(true)
    const result = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params?.formid),
          eq(JsonForms.createdBy, user?.primaryEmailAddress.emailAddress)
        )
      );

    // console.log(JSON.parse(result[0].jsonform));
    setRecord(result[0])
    setSelectedTheme(result[0].theme)
    setSelectedBackground(result[0].background)
    setSelectStyle(result[0].style)
    setJsonForm(JSON.parse(result[0].jsonform));
    setLoading(false)
  };

  useEffect(() => {

    if (updatetrigger) {
      setJsonForm(JsonForm)
      updateJsonFormInDB()
    }

  }, [updatetrigger])



  const onFieldUpdate = (value, i) => {

    JsonForm.fields[i].label = value.label
    JsonForm.fields[i].placeholder = value.placeholder
    console.log(JsonForm.fields[i]);
    setUpdatetrigger(Date.now())
  }

  const onDeleteField = (deleteIndex) => {
    const result = JsonForm.fields.filter((item, index) => index != deleteIndex)
    console.log(result);
    JsonForm.fields = result
    setUpdatetrigger(Date.now())

  }

  const updateJsonFormInDB = async () => {

    try {
      setLoading(true)
      const result = await db.update(JsonForms)
        .set({
          jsonform: JsonForm
        }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))
      console.log(result);
      setLoading(false)
      toast("Updated!!!")

    } catch (error) {
      console.log(error);
    }
  }


  const saveChanges = async () => {

    try {
      setLoading(true)
      const result = await db.update(JsonForms)
        .set({
          theme: selectedTheme,
          background: selectedBackground,
          style: selectStyle
        }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))
      console.log(result);
      setLoading(false)
      toast("Updated!!!")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    user && getFormData();
  }, [user]);



  return (
    <>
      <div className="p-8">
        <div>

          <h2
            onClick={() => router.back()}
            className="flex items-center gap-2 my-5 transition-all cursor-pointer hover:font-bold"
          >
            <ArrowLeft /> Back
          </h2>
          <div className="flex justify-end gap-3 my-4">
            <Link href={'/aiform/' + record?.id} target="_blank" >
              <button className="border-2 shadow-lg shadow-sky-200 btn-outline btn btn-info" > <SquareArrowOutUpRight /> Live preview</button>
            </Link>
            <button onClick={ () => {
              if (navigator.share) {
                navigator.share({
                  url: window.location.pathname
                }).then(() => {
                  toast('Thanks for sharing!');
                }).catch(err => {
                  console.log(err);
                });
              } else {
                toast("Browser doesn't support this API !");
              }
            }} className="border-2 shadow-lg shadow-green-200 btn-outline btn btn-success " > <MessageSquareShare /> Share</button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="border rounded-lg shadow-md">
            <Controller setSelectedTheme={(value) => {
              setSelectedTheme(value)

            }
            } selectedBackground={(value) => {
              setSelectedBackground(value)

            }}
              saveChanges={saveChanges}
              setSelectStyle={(value) => setSelectStyle(value)}
            />
          </div>
          <div className="flex items-center justify-center p-5 border rounded-lg md:col-span-2 "
            style={{ backgroundImage: selectedBackground }}
          >
            {
              loading ? <><Loader2 className="animate-spin" /></> :
                <FormUI borderdesign={selectStyle} selectedTheme={selectedTheme} onFieldUpdate={onFieldUpdate} onDeleteField={onDeleteField} JsonForm={JsonForm} />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default EditForm;
