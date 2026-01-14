import { Link } from '@tanstack/react-router'

export default function Logo() {
  return (
    <Link to='/' className='flex items-center justify-center gap-3 py-4'>
      MoodJournal
    </Link>
  )
}
