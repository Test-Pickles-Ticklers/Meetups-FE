import Modal from '../common/modal/Modal';
import { Input } from '@chakra-ui/react';

interface LoginProps {
  onCancel: () => void;
  //   isOpen: boolean;
}

const Login = (props: LoginProps) => {
  const { onCancel } = props;

  const handleSubmit = () => {};

  return (
    <Modal
      title="Logga in"
      onCancel={onCancel}
      onSubmit={handleSubmit}
      openText="Logga in"
    >
      <Input placeholder="Användarnamn" variant="outline"></Input>
      <Input placeholder="Lösenord" variant="outline"></Input>
    </Modal>
  );
};

export default Login;
