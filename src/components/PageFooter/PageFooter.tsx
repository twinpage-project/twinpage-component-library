
import Image from 'next/image'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'

const year = new Date().getFullYear()

const PageFooter: React.FC = () => {
  return (
    <footer className='bg-light-footer dark:bg-dark-footer'>
      <div className='mx-auto max-w-screen-xl space-y-16 px-4 py-16 sm:px-6'>
        <div className='grid gap-8 md:grid-cols-4'>
          {/* Part on the left; logo etc */}
          <div className='md:col-span-2'>
            <div className='w-[180px]'>
              <Image
                src='/icons/twinlogo2.png'
                priority
                className='dark:brightness-50 w-full h-auto'
                alt='Twinbase logo'
                width='0'
                height='0'
                sizes='100vw'
              />
            </div>
          </div>
          {/* Part on the right; links etc */}
          <div className='md:ml-20'>
            <p className='font-medium text-gray-900 dark:text-neutral-400'>
              About
            </p>
            <ul className='mt-6 space-y-4 text-sm'>
              <li>
                <a
                  href='https://twinbase.ai/#our-project'
                  rel='noreferrer'
                  target='_blank'
                  className='text-gray-700 transition hover:opacity-75 dark:text-gray-200'
                >
                  Project
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className='font-medium text-gray-900 dark:text-neutral-400'>
              Contact
            </p>
            <ul className='mt-6 space-y-4 text-sm'>
              <li className='flex gap-4'>
                <a
                  href='mailto:juuso.autiosalo@aalto.fi'
                  rel='noreferrer'
                  target='_blank'
                  className='text-gray-700 transition hover:opacity-75 dark:text-gray-200'
                >
                  <MdOutlineEmail size={26} />
                </a>
                <a
                  href='https://www.linkedin.com/company/twinbase/'
                  rel='noreferrer'
                  target='_blank'
                  className='text-gray-700 transition hover:opacity-75 dark:text-gray-200'
                >
                  <FaLinkedin size={26} />
                </a>
                <a
                  href='#'
                  rel='noreferrer'
                  target='_blank'
                  className='text-gray-700 transition hover:opacity-75 dark:text-gray-200'
                >
                  <FaGithub size={26} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <p className='text-sm text-gray-500 dark:text-neutral-400 w-full md:text-center'>
          &copy; {year} Twinbase.
        </p>
      </div>
    </footer>
  )
}

export default PageFooter
