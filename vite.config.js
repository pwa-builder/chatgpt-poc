import { defineConfig } from 'vite'

export default defineConfig({
root: 'src/ui',
  build: {
	outDir: '../../dist/ui',
	rollupOptions: {
		input: {
			// main: 'src/ui/ui.ts',
			index: 'src/ui/index.html'
		},
		// output: {
		// 	// index: 'index.html',
		// 	dir: 'dist/ui',
		// }
	},
	assetsDir: '',
	emptyOutDir: true,
	}
});