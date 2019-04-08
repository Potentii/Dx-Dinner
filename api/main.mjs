import path        from 'path'
import express     from 'express'
import cors        from 'cors'
import body_parser from 'body-parser'
import dotenv      from 'dotenv'
import endpoints   from './endpoints'
import webserver   from './webserver'



// *Initializing the server config:
const app = express();


// *loading the environment variables:
loadEnv();


// *Setting up express plugins:
app.use(cors());
app.use(body_parser.json());


// *Setting up the API endpoints:
endpoints(app);
webserver(app);


// *Starting up the server:
app.listen(process.env.PORT || process.env.API_PORT, err => {
	if(err)
		console.error(err);
	else
		console.log(`Dx Dinner API started @ http://localhost:${process.env.PORT || process.env.API_PORT}/`);
});



function loadEnv(){
	// *Getting the '.env' file name, depending on the current environment settings:
	const env_file_name = (process.env.NODE_ENV && process.env.NODE_ENV.includes('development'))
		? '.env.development'
		: '.env';
	// *Building the '.env' file path:
	const env_file_path = path.join(process.cwd(), env_file_name);
	// *Loading the '.env' file into the process env:
	dotenv.config({ path: env_file_path });

	// *Throwing if the file could not be loaded properly:
	if(process.env.ENV_LOADED !== 'YES')
		throw new Error(`Cannot start server: missing configuration file at "${env_file_path}"`)
}