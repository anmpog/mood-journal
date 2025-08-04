import type { CreateUserInput } from '@/mutations/useCreateUser'
import useCreateUser from '@/mutations/useCreateUser'
import { useState, type ChangeEvent } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function CreateUser() {
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  const [formState, setFormState] = useState<CreateUserInput>(initialFormState)

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name as keyof typeof formState
    if (name in formState) {
      setFormState({
        ...formState,
        [name]: event.target.value,
      })
    }
  }

  const { mutate: createUserMutation } = useCreateUser()

  const handleFormReset = (): void => {
    setFormState(initialFormState)
  }

  return (
    <div className='outline-1 outline-red-500'>
      <h1>Create User</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          createUserMutation(
            {
              ...formState,
            },
            {
              onSuccess: handleFormReset,
            }
          )
        }}
        className='flex flex-col '
      >
        <label htmlFor='firstName'>First Name:</label>
        <Input
          type='text'
          name='firstName'
          id='firstName'
          value={formState['firstName']}
          onChange={handleChange}
          required
        />
        <label htmlFor='lastName'>Last Name:</label>
        <Input
          type='text'
          name='lastName'
          id='lastName'
          value={formState['lastName']}
          onChange={handleChange}
          required
        />
        <label htmlFor='email'>Email:</label>
        <Input
          type='email'
          name='email'
          id='email'
          value={formState['email']}
          onChange={handleChange}
          required
        />
        <label htmlFor='password'>Password:</label>
        <Input
          type='password'
          name='password'
          id='password'
          value={formState['password']}
          onChange={handleChange}
          required
        />
        <Button type='submit' variant={'default'}>
          Create User
        </Button>
      </form>
    </div>
  )
}
