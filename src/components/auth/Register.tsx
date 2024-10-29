import { Input } from '@chakra-ui/react';

import Modal from '../common/modal/Modal';
import { useState } from 'react';

interface RegisterProps {
  onCancel: () => void;
  isOpen: boolean;
  showTriggerButton: boolean;
}

const Register = (props: RegisterProps) => {
  const { onCancel, isOpen, showTriggerButton } = props;

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Lösenorden matchar inte dumhövve!');
      return;
    }
    console.log(formData);
  };

  return (
    <Modal
      title="Registrera nytt konto"
      onCancel={onCancel}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      showTriggerButton={showTriggerButton}
    >
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Användarnamn"
          variant="outline"
          mb={2}
        />
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Lösenord"
          variant="outline"
          mb={2}
        />
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Repetera Lösenord"
          variant="outline"
          mb={2}
        />
      </form>
    </Modal>
  );
};

export default Register;
