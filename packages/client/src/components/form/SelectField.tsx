import { useField } from 'formik'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface SelectFieldProps {
  name: string
  label: string
  placeholderText: string
  optionsArr: {
    value: string | number
    label: string
  }[]
}

const SelectField = ({
  name,
  label,
  placeholderText,
  optionsArr,
}: SelectFieldProps) => {
  const [field, _, helpers] = useField(name)
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Select
        name={name}
        value={field.value}
        onValueChange={(value) => helpers.setValue(value)}
      >
        <SelectTrigger id={name}>
          <SelectValue placeholder={placeholderText} />
        </SelectTrigger>
        <SelectContent>
          {optionsArr.map(({ value, label }, index) => (
            <SelectItem value={value.toString()} key={index}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}

export default SelectField
