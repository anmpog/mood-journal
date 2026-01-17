interface ProfileBadgeProps {
  userName: string
}
export const ProfileBadge = ({ userName }: ProfileBadgeProps) => {
  return (
    <div className='flex justify-end border border-gray-600 px-4 py-3'>
      <h1 className='text-lg'>User: {userName}</h1>
    </div>
  )
}
