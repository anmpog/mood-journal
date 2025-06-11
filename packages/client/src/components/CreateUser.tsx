import type { inferRouterInputs } from '@trpc/server'
import { trpc } from '../utils/trpc'
import { useState, type ChangeEvent } from 'react'
import type { AppRouter } from 'trpc-server/src/router'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

type CreateUserInput = inferRouterInputs<AppRouter>['user']['createUser']

export default function CreateUser() {
  const queryClient = useQueryClient()
  const getAllUsersQueryKey = trpc.user.getAllUsers.queryKey()

  const initialFormState: CreateUserInput = {
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

  const handleFormReset = (): void => {
    setFormState(initialFormState)
  }

  const createUserMutationOptions = trpc.user.createUser.mutationOptions({
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: getAllUsersQueryKey })
      handleFormReset()
    },
  })
  const createUserMutation = useMutation(createUserMutationOptions)

  return (
    <div className='outline-1 outline-red-500'>
      <h1>Create User</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          createUserMutation.mutate({
            ...formState,
          })
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
        <button type='submit'>Create User</button>
      </form>
    </div>
  )
}
