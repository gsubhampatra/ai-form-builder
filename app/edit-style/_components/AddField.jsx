import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddField = ({ onAddField }) => {
  const [newFieldType, setNewFieldType] = useState("");
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldPlaceholder, setNewFieldPlaceholder] = useState("");
  const [newFieldOptions, setNewFieldOptions] = useState("");

  const handleAddField = () => {
    const optionsArray = newFieldOptions.split(',').map(option => {
      return { label: option.trim(), value: option.trim() };
    });

    const newField = {
      fieldType: newFieldType,
      label: newFieldLabel,
      placeholder: newFieldPlaceholder,
      options: newFieldType !== "text" ? optionsArray : [],
    };
    onAddField(newField);
    setNewFieldType("");
    setNewFieldLabel("");
    setNewFieldPlaceholder("");
    setNewFieldOptions("");
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">Add new field:</label>
      <Select value={newFieldType} onValueChange={setNewFieldType}>
        <SelectTrigger className="w-full bg-transparent">
          <SelectValue placeholder="Select field type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="select">Select</SelectItem>
            <SelectItem value="radio">Radio</SelectItem>
            <SelectItem value="checkbox">Checkbox</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        type="text"
        value={newFieldLabel}
        onChange={(e) => setNewFieldLabel(e.target.value)}
        placeholder="Label"
      />
      <Input
        type="text"
        value={newFieldPlaceholder}
        onChange={(e) => setNewFieldPlaceholder(e.target.value)}
        placeholder="Placeholder"
      />
      {(newFieldType === "select" || newFieldType === "radio" || newFieldType === "checkbox") && (
        <Input
          type="text"
          value={newFieldOptions}
          onChange={(e) => setNewFieldOptions(e.target.value)}
          placeholder="Options (comma separated)"
        />
      )}
      <button className="btn btn-primary" onClick={handleAddField}>
        Add Field
      </button>
    </div>
  );
};

export default AddField;
