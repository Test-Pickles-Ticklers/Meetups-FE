import { Button } from '../../ui/Button';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from '../../ui/dialog';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  onCancel: () => void;
  onSubmit: () => void;
  openText: string;
}

const Modal = (props: ModalProps) => {
  const { children, title, onCancel, onSubmit, openText } = props;

  return (
    <DialogRoot closeOnInteractOutside motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        <Button bg="primary">{openText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter>
          <Button bg="success" variant="outline" onClick={onSubmit}>
            OK
          </Button>

          <Button bg="error" variant="outline" onClick={onCancel}>
            Avbryt
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default Modal;
