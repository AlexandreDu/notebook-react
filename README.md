
#	To execute the package published on NPM:  
npx notebook-javascript serve --port[port]
and follow the instructions.

https://www.npmjs.com/package/notebook-react

# For development purposes
In the root's project: npm run start \
It runs lerna run start --parallel to run npm start of the 3 packages of this mono repository.


#	Project structure
Mono repository with 3 packages managed by lerna, and built with ESBuild:
![notebook-javascript-structure](https://user-images.githubusercontent.com/29450511/206386678-0142de25-13e1-4c00-9f6c-59f9e0af257e.jpg)

1)cli : 
Main dependencies:\
	-commander

2)@notebook-react/local-api\ 
Main dependencies:\
	-Express\
@notebook-react/local-api serves the local-client index.js file (use of http-proxy-middleware for serving in development mode)

Routes:\
get /cells: for sending the data from the file to the front-end (redux store)\
post /cells: for writing the data from the redux store to the file


3)@notebook-react/local-client:\
Main dependencies:\
	-React\
	-Redux & redux thunk\
	-Typescript\
	-tailwind\
	-Monaco editor\
	-EsBuild to transpilled and bundle the coder writted by the user (Esbuild running on client-side thanks to WebAssembly)\
	-localForage: data caching for module imported by the user in the notebook-react editor (indexDB)

Components hierarchy structure:

![image](https://user-images.githubusercontent.com/29450511/206390454-c3413c26-298f-47f3-8b2c-d8582a26cf8f.png)

		
	
#	About this project
I have realized this project following the udemy's course of Stephen Grider "React and Typescript: Build a Portfolio Project" in order to strengthen my knowledges in react + typescript.

