import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // Using '.' instead of process.cwd() avoids type errors if node types are missing
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      // This is CRITICAL. It replaces `process.env.API_KEY` in your code 
      // with the actual value from the Vercel environment variable during the build.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      
      // Polyfill process for other libraries if needed
      'process.env': JSON.stringify({}),
    },
  };
});