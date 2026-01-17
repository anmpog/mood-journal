import { useField } from 'formik'
import { Field, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

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
    <Field orientation={'responsive'}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={field.value}
        onChange={(event) => helpers.setValue(event.target.value)}
      />
    </Field>
  )
}

export default TextField
