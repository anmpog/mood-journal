import { useAuth } from '@/auth/useAuth'
import { LoginUserInput } from '@/mutations/useLoginUser'
import { useNavigate } from '@tanstack/react-router'
import { Form, FormikProvider, useFormik } from 'formik'
import { useEffect } from 'react'
import TextField from './form/TextField'
import { Button } from './ui/button'

const defaultLoginFormValues: LoginUserInput = {
  email: '',
  password: '',
}

export const LoginForm = () => {
  const auth = useAuth()
  const navigate = useNavigate({ from: '/login' })

  useEffect(() => {
    navigate({ to: '/profile' })
  }, [auth.isAuthenticated, navigate])

  const loginForm = useFormik({
    initialValues: defaultLoginFormValues,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2))
      try {
        await auth.login({ ...loginForm.values })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        } else {
          throw new Error('There was an error logging in.')
        }
      }
    },
  })

  return (
    <FormikProvider value={loginForm}>
      <Form>
        <TextField
          type='email'
          name='email'
          placeholder='example@abc.xyz'
          label='Email Address'
        />
        <TextField
          type='password'
          name='password'
          placeholder='Password'
          label='Password'
        />
        <Button type='submit' variant='default'>
          Login
        </Button>
      </Form>
    </FormikProvider>
  )
}
