'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { parseTwinJSON } from '../../utils'
import { MdSearch, MdClear, MdClear as Close } from 'react-icons/md'
import { LiaQuestionCircle as Help } from 'react-icons/lia'
//import DotsLoader from './DotsLoader'
import DotsLoader from '../DotsLoader'
import { ToastList } from '../Toast/Toast'
import { NotificationType } from '../Toast/Toast'
import { ToastType } from '../Toast/Toast'

interface Props {
  preset?: string // preset (and current) value that can be set and accessed elsewhere
}

/**
 * This component is used on the main page. It has a field which takes the url of a twin document, and when the url is inserted, it redirects to the
 * twinpage of a twin document.
 */

const RedirectInput: React.FC<Props> = ({ preset }) => {
  const [inputValue, setInputValue] = useState<string>(preset ? preset : '')
  const [toasts, setToasts] = useState<ToastType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isHelpVisible, setHelpVisible] = useState<boolean>(false)
  const router = useRouter()
  const helpRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setHelpVisible(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [helpRef])

  // functions for toasts handling
  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  const showToast = (message: string, type: NotificationType) => {
    const toast: ToastType = { id: Date.now(), message, type }
    if (toasts.length > 20) {
      setToasts((toasts) => toasts.slice(1))
    }
    setToasts((prevToasts) => prevToasts.concat(toast))
    setTimeout(() => {
      removeToast(toast.id)
    }, 10000)
  }

  // when the button is clicked the page is reditected to the twinpage of the user typed twin url
  const redirectToTwin = async (address: string) => {
    if (inputValue === '') {
      return
    }
    setLoading(true)
    if (address === 'test1') {
      // temp test
      showToast('Not authorized.', 'warning')
      setLoading(false)
      return
    }
    if (address === 'test2') {
      // temp test
      showToast('Success!', 'success')
      setLoading(false)
      return
    }
    try {
      await parseTwinJSON(address) // tests that the address is working before pushing to page
      router.push(`/twin/${encodeURIComponent(address)}`)
    } catch (e) {
      console.log('--Error fetching twin:', e)
      showToast('Failed to fetch', 'failure')
      setLoading(false)
    }
  }

  // first some test urls then the actual field into which the wanted twin url is typed.
  // the component redirects the page to the visualization of the wanted twin
  return (
    <div className='py-2 text-center block flex-col'>
      {/* Loader icon when loading = true */}
      {loading && <DotsLoader />}

      {/* Toasts (notifications) */}
      <ToastList data={toasts} position='top-left' removeToast={removeToast} />

      <div className='flex items-center mx-auto justify-center relative'>
        <div
          className='bg-light-basic dark:bg-dark-basic redirect-container z-20'
          id='redirect-input-container'
        >
          <input
            autoFocus
            maxLength={2083}
            type='text'
            className='ml-6 py-2 w-11/12 focus:outline-none bg-light-basic dark:bg-dark-basic text-gray-500 focus:text-black dark:focus:text-white'
            placeholder='DT search'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && redirectToTwin(inputValue)}
            id='redirect-input'
          />
          <button
            title='Clear'
            className={`${inputValue ? '' : 'hidden'}`}
            onClick={() => setInputValue('')}
          >
            <MdClear size={24} />
          </button>
          <button
            type='submit'
            title='Search'
            className={`${
              inputValue ? '' : 'opacity-50'
            } focus:outline-none focus:shadow-outline mx-3`}
            onClick={() => redirectToTwin(inputValue)}
          >
            <MdSearch size={24} />
          </button>
        </div>
        <div className='relative inline-block z-20'>
          <button
            title='Help'
            onClick={() => setHelpVisible(!isHelpVisible)}
            className='p-1 focus:outline-none'
          >
            <Help size={26} />
          </button>
          {isHelpVisible && (
            <div
              ref={helpRef}
              className='absolute top-full right-0 transform -translate-x-[-20px] -translate-y-[5px] bg-light-basic2 dark:bg-dark-basic2 p-2 rounded'
            >
              <p>
                This is the help content. dsf asd sadf d fadsfadsadsfdadsfds asd
                adsfadsf
              </p>
              <button
                className='toast-close-btn'
                onClick={() => setHelpVisible(false)}
              >
                <span className='icon'>
                  <Close size={20} />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RedirectInput
