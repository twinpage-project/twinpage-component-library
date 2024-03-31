import { useState } from 'react'
import {
  HiOutlineSquare2Stack as Copy,
  HiCheck as Check,
} from 'react-icons/hi2'
import '../../styles/globals.css'

interface Props {
  text: string
  show: boolean
}

// A simple copybutton that copies given string _text_ to the clipboard.
const CopyButton: React.FC<Props> = ({ text, show }) => {
  const [isCopied, setIsCopied] = useState(false)
  const visible = show || isCopied

  const copyToClipboard = () => {
    if (!text) {
      return
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 3000)
      })
      .catch((e) => {
        console.error('Error copying to clipboard: ', e)
      })
  }

  return (
    <button
      title={isCopied ? 'Copied!' : 'Copy to clipboard'}
      className={`clickable-icon border-2 ${
        isCopied ? 'border-emerald-800' : 'hover:border-slate-400'
      } ${visible ? 'inline-block' : 'hidden'}`}
      onClick={copyToClipboard}
    >
      {isCopied ? <Check size={18} color='green' /> : <Copy size={18} />}
    </button>
  )
}

export default CopyButton
