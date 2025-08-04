import useDeleteUser from '@/mutations/useDeleteUser'
import { Button } from '../ui/button'

interface DeleteUserProps {
  userId: number | undefined
}

export function DeleteUser({ userId }: DeleteUserProps) {
  const { mutate } = useDeleteUser()

  if (!userId) {
    throw new Error('Delete user called without a valid argument.')
  }

  return (
    <Button
      variant='destructive'
      onClick={() => {
        mutate({ id: userId })
      }}
    >
      Delete User
    </Button>
  )
}
