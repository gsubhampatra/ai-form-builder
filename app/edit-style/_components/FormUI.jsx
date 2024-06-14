import { Input } from "@/components/ui/input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import FieldEdit from "./FieldEdit";

const FormUI = ({ JsonForm, onFieldUpdate, borderdesign, onDeleteField, selectedTheme }) => {


  console.log(JsonForm);
  return (
    <div className={`p-5 border  rounded-lg md:w-[600px]` + borderdesign} data-theme={selectedTheme} >
      <h2 className="text-2xl font-bold text-center ">
        {JsonForm?.formTitle}
      </h2>
      <h2 className="text-lg text-center ">
        {JsonForm?.formHeading}
      </h2>
      { JsonForm && JsonForm?.fields?.map((field, i) => (
        <div key={i} className="flex items-center gap-2" >
          <div className="w-full">
            {field?.fieldType == "select" ? (
              <>
                <label className="text-sm ">{field?.label} </label>
                <Select>
                  <SelectTrigger className="w-full bg-transparent">
                    <SelectValue placeholder={field?.placeholder} />
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
            ) : field?.fieldType == "radio" ? (
              <>
                <label className="text-sm ">{field?.label} </label>

                <RadioGroup>
                  {field?.options.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 ">
                      <RadioGroupItem
                        value={item?.label || item}
                        id={item?.label || item}
                      />
                      <Label htmlFor={item?.label || item}>
                        {item?.label || item}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </>
            ) : field?.fieldType == "checkbox" ? (
              <>
                <div className="my-3">
                  <label className="text-sm ">
                    {field.label}{" "}
                  </label>
                  {field?.option ? (
                    field?.options?.map((item, index) => (
                      <div className="flex items-center gap-2 ">
                        <Checkbox />
                        <h2>{item?.label}</h2>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2">
                      <Checkbox />
                      <h2>{field.label}</h2>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="my-3">
                  <label className="text-sm ">
                    {field?.label}{" "}
                  </label>
                  <Input
                    type={field.fieldType}
                    placeholder={field.placeholder}
                    name={field.fieldName}
                    className="bg-transparent"
                  />
                </div>
              </>
            )}
          </div>
          <FieldEdit key={i} onUpdate={(value) => onFieldUpdate(value, i)} onDeleteField={() => onDeleteField(i)} defaultValue={field} />
        </div>
      ))}
      <button className="btn btn-primary" >Submit</button>
    </div>
  );
};

export default FormUI;
