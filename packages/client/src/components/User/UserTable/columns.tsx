import type { ColumnDef } from '@tanstack/react-table'
import { type CreateUserOutput } from '../hooks/useCreateUser'
import { DeleteUser } from '../DeleteUser'

export const columns: ColumnDef<CreateUserOutput>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'firstName', header: 'First Name' },
  { accessorKey: 'lastName', header: 'Last Name' },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const userId = row.original.id
      return <DeleteUser userId={userId} />
    },
  },
]
