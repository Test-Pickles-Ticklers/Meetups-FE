import { Spinner, Text, VStack } from '@chakra-ui/react';

const PageLoader = () => {
  return (
    <VStack colorPalette="teal">
      <Spinner color="colorPalette.600" />
      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  );
};
export default PageLoader;
