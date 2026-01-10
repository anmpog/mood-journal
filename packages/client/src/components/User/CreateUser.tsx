import useCreateUser, { CreateUserInput } from '@/mutations/useCreateUser'
import { Form, FormikProvider, useFormik } from 'formik'
import TextField from '../form/TextField'
import { Button } from '../ui/button'

const defaultCreateUserValues: CreateUserInput = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

export default function CreateUser() {
  const { mutate: createUser } = useCreateUser()

  const createUserForm = useFormik({
    initialValues: defaultCreateUserValues,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2))
      try {
        await createUser({ ...values })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        } else {
          throw new Error('There was an error creating a user.')
        }
      }
    },
  })

  return (
    <FormikProvider value={createUserForm}>
      <h1>Create User</h1>
      <Form className='flex flex-col '>
        <TextField
          type='text'
          name='firstName'
          label='First Name:'
          placeholder='First Name'
        />
        <TextField
          type='text'
          name='lastName'
          label='Last Name:'
          placeholder='Last Name'
        />
        <TextField
          type='email'
          name='email'
          label='Email:'
          placeholder='example@domain.xyz'
        />
        <TextField
          type='password'
          name='password'
          label='Password:'
          placeholder='Password'
        />
        <Button type='submit' variant={'default'}>
          Create User
        </Button>
      </Form>
    </FormikProvider>
  )
}
