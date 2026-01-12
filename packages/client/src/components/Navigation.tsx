import { useAuth } from '@/auth/useAuth'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from './ui/button'

const activeProps = {
  style: {
    fontWeight: 'bold',
  },
}

export function Navigation() {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.logout()
    navigate({ to: '/login' })
  }
  return (
    <nav>
      <ul className='flex py-4 gap-3 justify-center items-center'>
        <li className='h-full flex justify-center items-center'>
          <Link
            to='/'
            activeProps={activeProps}
            className='h-full flex justify-center items-center'
          >
            Home
          </Link>
        </li>
        <li className='h-full flex justify-center items-center'>
          <Link
            to='/profile'
            activeProps={activeProps}
            disabled={!auth.isAuthenticated}
            className='h-full flex justify-center items-center'
          >
            Profile
          </Link>
        </li>
        <div className='border-l-2 border-blue-600 flex gap-3 px-4'>
          <li className='h-full flex justify-center items-center'>
            <Button asChild variant={'outline'}>
              <Link to='/login' activeProps={activeProps} className='button'>
                Login
              </Link>
            </Button>
          </li>
          <li className='h-full flex justify-center items-center'>
            <Button
              onClick={handleLogout}
              variant='destructive'
              disabled={!auth.isAuthenticated}
            >
              Logout
            </Button>
          </li>
        </div>
      </ul>
    </nav>
  )
}
