main: dev

node_modules: package.json
	npm i

.next: node_modules
	npm run build

dev: .next
	npm run dev