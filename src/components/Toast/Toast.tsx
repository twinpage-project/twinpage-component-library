import {
    MdClear as Close,
    MdOutlineDone as Success,
    MdOutlineWarning as Warn,
    MdOutlineError as Error,
  } from 'react-icons/md'
  
  export type NotificationType = 'success' | 'failure' | 'warning'
  interface ToastProps {
    message: string
    type: NotificationType
    onClose: () => void
  }
  
  export interface ToastType {
    id: number
    message: string
    type: NotificationType
  }
  
  /* A multipurpose notification component that gathers sent notifications in a _ToastList_ */
  
  const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const iconMap: Record<NotificationType, React.ReactElement> = {
      success: <Success size={24} />,
      failure: <Error size={24} />,
      warning: <Warn size={24} />,
    }
  
    const toastIcon = iconMap[type] || null
  
    return (
      <div className={`toast toast--${type}`} role='alert'>
        <div className='toast-message'>
          {toastIcon && (
            <div title={message} className='icon--thumb'>
              {toastIcon}
            </div>
          )}
          <p className='small-hidden'>{message}</p>
        </div>
        <button className='toast-close-btn' onClick={onClose}>
          <span className='icon'>
            <Close size={20} />
          </span>
        </button>
      </div>
    )
  }
  
  export default Toast
  
  interface ToastListProps {
    data: ToastType[]
    position: string
    removeToast: (id: number) => void
  }
  
  export const ToastList: React.FC<ToastListProps> = ({
    data,
    position,
    removeToast,
  }) => {
    return (
      data.length > 0 && (
        <div
          className={`toast-list toast-list--${position}`}
          aria-live='assertive'
        >
          {data.map((toast: ToastType) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      )
    )
  }