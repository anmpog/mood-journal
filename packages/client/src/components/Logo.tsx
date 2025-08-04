import { Link } from '@tanstack/react-router'

export default function Logo() {
  return (
    <Link to='/' className='flex py-4 gap-3 justify-center items-center'>
      MoodJournal
    </Link>
  )
}
