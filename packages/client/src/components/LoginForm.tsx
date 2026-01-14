import { useAuth } from '@/auth/useAuth'
import { LoginUserInput } from '@/mutations/useLoginUser'
import { useNavigate } from '@tanstack/react-router'
import { Form, FormikProvider, useFormik } from 'formik'
import { useEffect } from 'react'
import TextField from './form/TextField'
import { Button } from './ui/button'
import { Card, CardAction, CardContent, CardTitle } from './ui/card'

const defaultLoginFormValues: LoginUserInput = {
  email: '',
  password: '',
}

export const LoginForm = () => {
  const auth = useAuth()
  const navigate = useNavigate({ from: '/login' })

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate({ to: '/profile' })
    }
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
    <Card className='mx-auto w-full max-w-2xl'>
      <CardTitle className='text-center'>Login To Mood Journal</CardTitle>
      <FormikProvider value={loginForm}>
        <CardContent>
          <Form className='flex flex-col gap-6'>
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
            <CardAction className='w-full'>
              <Button type='submit' variant='default' className='w-full'>
                Login
              </Button>
            </CardAction>
          </Form>
        </CardContent>
      </FormikProvider>
    </Card>
  )
}
