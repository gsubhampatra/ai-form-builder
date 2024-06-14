"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AichatSession } from "@/configs/AiModel";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const CreateForm = () => {
  const [userInput, setUserInput] = useState("");
  const [openDilog, setOpenDilog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const route = useRouter();

  const PROMPT =
    ", On the basis of description create JSON form  with formTitle, formHeading along with fieldName,fieldTitle,Placeholder, label ,fieldType ,required fields,you can use input types like radio button ,checkbox,select, don't use file  type insted use 'link' type in JSON format";
  const onCreateForm = async () => {
    setLoading(true);
    console.log(userInput);
    const result = await AichatSession.sendMessage(
      "Description: " + userInput + PROMPT
    );
    console.log(result.response.text());
    if (result.response.text()) {
      const resp = await db
        .insert(JsonForms)
        .values({
          jsonform: result.response.text(),
          createdBy: user.primaryEmailAddress.emailAddress,
          createdAt: moment().format("DD/MM/yyyy"),
        })
        .returning({ id: JsonForms.id });

      console.log("new form id", resp[0].id);
      if (resp[0].id) {
        route.push("/edit-style/" + resp[0].id);
      }
      setLoading(false);
    }
  };
  return (
    <div>
      <Dialog open={openDilog}>
        <button
          className="w-full px-12 py-3 text-sm font-medium text-white border border-blue-600 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-none hover:text-white hover:shadow-md hover:shadow-purple-600 sm:w-auto"
          onClick={() => setOpenDilog(true)}>+Create Form</button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Form</DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                placeholder="write a description"
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div className="flex justify-end gap-2 my-3">
                <Button
                  onClick={() => {
                    setOpenDilog(false);
                  }}
                  variant="destructive"
                >
                  Cancel
                </Button>
                <Button disabled={loading} onClick={() => onCreateForm()}>
                  {loading ? <Loader2 className="animate-spin" /> : "Create"}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
