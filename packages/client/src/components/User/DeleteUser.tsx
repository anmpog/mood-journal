import useDeleteUser from './hooks/useDeleteUser'
import { Button } from '../ui/button'

interface DeleteUserProps {
  userId: number
}

export function DeleteUser({ userId }: DeleteUserProps) {
  const { mutate } = useDeleteUser()

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
