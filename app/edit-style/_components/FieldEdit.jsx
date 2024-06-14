import { Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const FieldEdit = ({ defaultValue, onUpdate,onDeleteField }) => {

  const [label, setLabel] = useState(defaultValue?.label)
  const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder)

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger>
          <Edit className="w-5 h-5" />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit Field</h2>
          <div>
            <label>Label name </label>
            <Input type="text" defaultValue={defaultValue.label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <label>placeholder name </label>
            <Input type="text" defaultValue={defaultValue.placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>
          <Button
            className="mt-3"
            onClick={() => onUpdate({ label: label, placeholder: placeholder })}
            size="sm" >Update</Button>
        </PopoverContent>
      </Popover>
      <AlertDialog>
        <AlertDialogTrigger>
      <Trash className="w-5 h-5 text-red-400" />

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
            <AlertDialogAction onClick={onDeleteField} >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};

export default FieldEdit;
