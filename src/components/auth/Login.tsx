import Modal from '../common/modal/Modal';
import { Input } from '@chakra-ui/react';

interface LoginProps {
  onCancel: () => void;
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
      <Input
        type="text"
        placeholder="Emailaddress"
        variant="outline"
        mb={2}
      ></Input>
      <Input
        type="text"
        placeholder="Lösenord"
        variant="outline"
        mb={2}
      ></Input>
    </Modal>
  );
};

export default Login;
