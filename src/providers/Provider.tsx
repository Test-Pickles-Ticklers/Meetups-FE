// // import {
// //   ChakraProvider,
// //   createSystem,
// //   defineConfig,
// //   defaultConfig,
// // } from "@chakra-ui/react";

// const config = defineConfig({
//   theme: {
//     tokens: {
//       colors: {
//         light: { value: "#d6c9ff" },
//         primary: { value: "#8e6eff" },
//         dark: { value: "#4b1fb3" },
//         error: { value: "#ff1035" },
//         success: { value: "#28a745" },
//         customText: { value: "#333333" },
//       },
//       fonts: {
//         heading: { value: "'Poppins', sans-serif" },
//         body: { value: "'Roboto', sans-serif" },
//       },
//     },
//   },
// });

// const system = createSystem(defaultConfig, config);

// interface ProviderProps {
//   children: React.ReactNode;
// }

// const Provider: React.FC<ProviderProps> = ({ children }) => {
//   return <ChakraProvider value={system}>{children}</ChakraProvider>;
// };

// export default Provider;
