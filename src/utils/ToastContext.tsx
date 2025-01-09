import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface ToastContextValue {
  setToast: (title: string, description: string) => void;
  showToast: () => void;
}

const ToastContext = createContext<ToastContextValue>({
  setToast: () => {},
  showToast: () => {},
});

const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const setToast = (newTitle: string, newDescription: string) => {
    setTitle(newTitle);
    setDescription(newDescription);
  };

  const showToast = () => {
    setIsVisible(true);
  };

  return (
    <ToastContext.Provider value={{ setToast, showToast }}>
      {children}

      {/* Example Toast Component */}
      <ToastContainer position="bottom-end">
          <Toast show={isVisible} onClose={() => setIsVisible(false)} animation autohide>
            <Toast.Header>
              {title}
            </Toast.Header>
            <Toast.Body>
              {description}
            </Toast.Body>
          </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  return useContext(ToastContext);
};

export { ToastProvider, useToast };
