
import { Toaster as Sonner } from "sonner"
import styles from './index.module.css'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className={styles.toaster}
      toastOptions={{
        style: {
          background: 'white',
          color: '#020817',
          border: '1px solid #e2e8f0',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
