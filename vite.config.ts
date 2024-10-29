import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const branch = process.env.VITE_BRANCH;

export default defineConfig({
  base: branch === "dev" ? "/Meetups-FE/" : "/",
  plugins: [react()],
});
