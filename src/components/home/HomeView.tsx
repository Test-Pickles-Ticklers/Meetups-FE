import { useState } from 'react';
import { Button } from '../ui/Button';
import Register from '../auth/Register';

const HomeView = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClickToRegister = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <p>HomeView</p>
      <Button onClick={handleClickToRegister} bg="primary">
        Registrera dig
      </Button>
      <Register
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        showTriggerButton={false}
      />
    </>
  );
};

export default HomeView;
