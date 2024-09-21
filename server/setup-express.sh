npm init -y
npm i express cors dotenv
npm i @types/express @types/cors nodemon ts-node tsc-alias tsconfig-paths typescript -D
mkdir src

touch src/server.ts
touch nodemon.json
touch tsconfig.json
touch .env
touch .gitignore

cat <<EOL >> nodemon.json
{
    "watch": [
        "src"
    ],
    "ext": "ts",
    "exec": "ts-node src/server.ts",
    "ignore": [
        "src/**/*.spec.ts"
    ]
}
EOL

cat <<EOL >> .gitignore
node_modules/
dist/

.env

package-lock.json
EOL

cat <<EOL >> src/server.ts
import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
EOL

cat <<EOL >> tsconfig.json
{
	"compilerOptions": {
		"target": "es2022",
		"module": "commonjs",
		"outDir": "./dist",
		"rootDir": "./src",
		"baseUrl": ".",
		"strict": true,
		"esModuleInterop": true,
		"skipLibCheck": true,
		"forceConsistentCasingInFileNames": true,
		"paths": {
			"@/*": ["./src/*"]
		}
	},
	"include": ["src/**/*"]
}
EOL

sed -i '/"scripts": {/a \  "dev": "nodemon",' package.json
