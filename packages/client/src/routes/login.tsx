import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import type { LoginUserInput } from '@/mutations/useLoginUser'
import { useAuth } from '@/auth/useAuth'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const auth = useAuth()
  const navigate = useNavigate({ from: '/login' })

  const [formState, setFormState] = useState<LoginUserInput>({
    email: '',
    password: '',
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name as keyof typeof formState
    if (name in formState) {
      setFormState({
        ...formState,
        [name]: event.target.value,
      })
    }
  }

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await auth.login({ ...formState })

      if (response) {
        navigate({ to: `/profile` })
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        throw new Error('There was an error logging in.')
      }
    }
  }

  return (
    <form
      onSubmit={onFormSubmit}
      className='flex flex-col w-1/2 mx-auto border-1 py-6 px-4 gap-3'
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
      <Button type='submit' variant='default'>
        Login
      </Button>
    </form>
  )
}
