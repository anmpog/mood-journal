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
      <ul className='flex items-center justify-center gap-3 py-4'>
        <li className='flex h-full items-center justify-center'>
          <Link
            to='/'
            activeProps={activeProps}
            className='flex h-full items-center justify-center'
          >
            Home
          </Link>
        </li>
        <li className='flex h-full items-center justify-center'>
          <Link
            to='/profile'
            activeProps={activeProps}
            disabled={!auth.isAuthenticated}
            className='flex h-full items-center justify-center'
          >
            Profile
          </Link>
        </li>
        <div className='flex gap-3 border-l-2 border-blue-600 px-4'>
          <li className='flex h-full items-center justify-center'>
            <Button asChild variant={'outline'}>
              <Link to='/login' activeProps={activeProps} className='button'>
                Login
              </Link>
            </Button>
          </li>
          <li className='flex h-full items-center justify-center'>
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
