import { Button } from '../../ui/Button';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
  DialogActionTrigger,
} from '../../ui/dialog';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  onCancel: () => void;
  onSubmit: () => void;
  openText?: string;
  showTriggerButton?: boolean;
  isOpen?: boolean;
}

const Modal = (props: ModalProps) => {
  const {
    children,
    title,
    onCancel,
    onSubmit,
    openText,
    isOpen,
    showTriggerButton = true,
  } = props;

  return (
    <DialogRoot
      closeOnInteractOutside
      motionPreset="slide-in-bottom"
      open={isOpen}
      onOpenChange={(open) => !open && onCancel()}
    >
      {showTriggerButton && (
        <DialogTrigger>
          <Button bg="primary">{openText}</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter>
          <Button bg="success" variant="outline" onClick={onSubmit}>
            OK
          </Button>
          <DialogActionTrigger>
            <Button bg="error" variant="outline" onClick={onCancel}>
              Avbryt
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default Modal;
