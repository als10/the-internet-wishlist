import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Alert, { AlertType } from '../components/base/Alert';

interface NotificationType {
  title?: string;
  message?: string;
  type?: AlertType;
  delay?: number;
}

interface NotificationContextType {
  setError(message: string): void;
  setWarning(message: string): void;
  setInfo(message: string): void;
  setSuccess(message: string): void;
}

const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType,
);

export function NotificationProvider({ children }: PropsWithChildren) {
  const [notification, setNotification] = useState<NotificationType>({});

  const DEFAULT_NOTIFICATION_DELAY = 5000;

  useEffect(() => {
    if (notification.message) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setTimeout(() => {
        setNotification({});
      }, notification.delay ?? DEFAULT_NOTIFICATION_DELAY);
    }
  }, [notification]);

  const notificationContext: NotificationContextType = useMemo(
    () => ({
      setError(message: string) {
        setNotification({
          title: 'Error',
          message,
          type: AlertType.ERROR,
        });
      },
      setWarning(message: string) {
        setNotification({
          title: 'Warning',
          message,
          type: AlertType.WARNING,
        });
      },
      setSuccess(message: string) {
        setNotification({
          title: 'Success',
          message,
          type: AlertType.SUCCESS,
        });
      },
      setInfo(message: string) {
        setNotification({
          message,
          type: AlertType.INFO,
        });
      },
    }),
    [],
  );

  return (
    <NotificationContext.Provider value={notificationContext}>
      {notification.message && (
        <Alert
          {...notification}
          dismiss={() => setNotification({})}
          message={notification.message}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
}

export default function useNotification() {
  return useContext(NotificationContext);
}
