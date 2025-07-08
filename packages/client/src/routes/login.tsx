import { createFileRoute } from '@tanstack/react-router'
import { useState, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import useLoginUserMutation from '@/components/User/hooks/useLoginUser'
import type { LoginUserInput } from '@/components/User/hooks/useLoginUser'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const initialFormState = {
    email: '',
    password: '',
  }
  const [formState, setFormState] = useState<LoginUserInput>(initialFormState)

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name as keyof typeof formState
    if (name in formState) {
      setFormState({
        ...formState,
        [name]: event.target.value,
      })
    }
  }

  const { mutate: loginUserMutation } = useLoginUserMutation()

  const handleFormReset = (): void => {
    setFormState(initialFormState)
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        loginUserMutation(
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
      <label htmlFor='email'>Email:</label>
      <input
        type='email'
        name='email'
        id='email'
        value={formState['email']}
        onChange={handleChange}
        required
      />
      <label htmlFor='password'>Password:</label>
      <input
        type='password'
        name='password'
        id='password'
        value={formState['password']}
        onChange={handleChange}
        required
      />
      <Button type='submit' variant={'default'}>
        Login
      </Button>
    </form>
  )
}
