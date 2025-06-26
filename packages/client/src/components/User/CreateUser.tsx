import { useState, type ChangeEvent } from 'react'
import { type CreateUserInput } from './hooks/useCreateUser'
import useCreateUserMutation from './hooks/useCreateUser'
import { Button } from '../ui/button'

export default function CreateUser() {
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
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

  const { mutate: createUserMutation } = useCreateUserMutation()

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
        className='flex flex-col'
      >
        <label htmlFor='firstName'>First Name:</label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          value={formState['firstName']}
          onChange={handleChange}
          required
        />
        <label htmlFor='lastName'>Last Name:</label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          value={formState['lastName']}
          onChange={handleChange}
          required
        />
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          name='email'
          id='email'
          value={formState['email']}
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
