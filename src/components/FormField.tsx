import { FieldApi, FieldComponent } from "@tanstack/react-form";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { roomOptions, rooms } from "../utils/rooms";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

interface FormFieldProps {
  name: string,
  label: string
  fieldCreator: FieldComponent<any, any>,
}

const inputMapping = {
  "meeting.name": "text",
  "meeting.type": "text",
  "meeting.room": "dropdown",
  "date": "date",
  "interval.start": "time",
  "interval.end": "time"
} as const;

type InputMapping = typeof inputMapping;
type InputKeys = keyof InputMapping;

export const FormField: React.FC<FormFieldProps> = ({name, label, fieldCreator}) => {
  const [option, setOption] = useState("Select a Room");

  return (
    <div className="d-flex flex-column gap-2">
      {fieldCreator({
        name: name,
        children: (fieldData: any) => {
          const handleSelect = (e: any, fieldHandler: any) => {
            setOption(e || "All Rooms");
            fieldData.handleChange(e);
          }
          return (
            <>
              <label htmlFor={fieldData.name} className="fw-bold fs-4">{label}<sup className="text-danger fs-6 ms-1">*</sup></label>
              { inputMapping[fieldData.name as InputKeys] !== "dropdown" ? (
                <input 
                  id={fieldData.name}
                  name={fieldData.name}
                  type={inputMapping[fieldData.name as InputKeys]}
                  value={fieldData.state.value || ""}
                  onBlur={fieldData.handleBlur}
                  onChange={(e) => {fieldData.handleChange(e.target.value)}}
                />) : (
                  <Dropdown
                    id={fieldData.name}
                    onSelect={handleSelect}
                  >
                    <Dropdown.Toggle variant="secondary" id={`${fieldData.name}-toggle`} className="w-100">
                      {option}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {rooms.map(r => (<Dropdown.Item key={r.replace(/\s/g, '')} eventKey={r}>{r}</Dropdown.Item>))}
                    </Dropdown.Menu>
                  </Dropdown>
                )
              }
              <FieldInfo field={fieldData} />
            </>
          ) 
      }})}
    </div>
  )
}