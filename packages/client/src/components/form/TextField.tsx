import { useField } from 'formik'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface TextFieldProps {
  name: string
  id?: string
  label: string
  placeholder: string
  type: string
}

const TextField = ({
  name,
  label,
  placeholder,
  type = 'text',
}: TextFieldProps) => {
  const [field, _, helpers] = useField(name)

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={field.value}
        onChange={(event) => helpers.setValue(event.target.value)}
      />
    </>
  )
}

export default TextField
