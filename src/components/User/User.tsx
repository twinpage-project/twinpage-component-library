import { useEffect, useState, useRef } from 'react'
import { MdAccountCircle as UserIcon } from 'react-icons/md'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'

const User: React.FC = () => {
  const tableRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setOpen] = useState<boolean>()
  const { data: session, status } = useSession()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tableRef.current &&
        !tableRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [tableRef])

  const handleClick = () => {
    if (session) {
      setOpen(!isOpen)
    } else {
      signIn('keycloak', { callbackUrl: '/' })
    }
  }

  return (
    <div className='flex flex-col items-center relative' ref={tableRef}>
      {/* Profile menu when signed in and a signin button to do so */}
      <button
        className='flex items-center space-x-1 hover:opacity-80'
        onClick={handleClick}
      >
        {session ? (
          <UserIcon size={28} title='Account' />
        ) : (
          <div className='bg-neutral-800 dark:bg-neutral-200 font-mono text-sm text-white dark:text-black p-1 rounded-md'>
            Sign in.
          </div>
        )}
      </button>

      {/* User popup component */}
      {isOpen && (
        <ul className='nav-table'>
          <p className='font-mono opacity-30'>Account</p>
          <li className='nav-table-item ml-2'>
            <a href='/account'>Profile</a>
          </li>
          <hr className='mt-2' />
          <li
            className='nav-table-item'
            onClick={() =>
              fetch('/api/auth/logout', { method: 'GET' }).then(() =>
                signOut({ callbackUrl: '/' })
              )
            }
          >
            Sign out
          </li>
        </ul>
      )}
    </div>
  )
}

export default User
