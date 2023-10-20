import { useContext } from 'react'
import NotificationContext from 'components/app/contexts/NotificationContext'

const useNotification = () => useContext(NotificationContext)

export default useNotification
