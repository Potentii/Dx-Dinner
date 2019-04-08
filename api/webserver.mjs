import path from 'path'
import express from 'express'



export default function(router){
	const web_output_path = path.join(process.cwd(), '' + process.env.APP_PATH);
	const web_output_index_path = path.join(web_output_path, './index.html');

	router.use(express.static(web_output_path));
	router.get('*', (req, res) => res.sendFile(web_output_index_path));
}