//Import all required modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const { resolve } = require('path'); // Import path finder
const spawn = require("child_process").spawn; // Spawn a process
const analyzerRoute = resolve('./routes/analyzer.py'); // Locate python app
const fetch = require('node-fetch'); // Data fetch feature
const {writeData, readData} = require('./helpers/save')

const port = 8080; // define application port

// Initialize express app
const app = express();

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// Application Route Endpoints
// Route for loading the front page.
app.get('/', async (req, res) => {

    // Read data from project configurations        
    let logRead = readData('/docs/', 'log.json');

    // Parse configuration data to JSON                    
    var projectData = JSON.parse(logRead);

    // Fetch pull-requests and issues from project API
    let response = await fetch(`${projectData.project_url}/pullrequests`, { // Fetch bitbucket project repository pull requests
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${projectData.apikey}`,
        'Accept': 'application/json'
    }
    });

    let jsonBody = await response.text(); // fetched data in raw form

    var objectBody = JSON.parse(jsonBody); // fetched data in object form

    // Check if bitbucket project is valid       
    if(response.status==200){
        
        // Store new project data            
        var saveProjectData=[]

        // Fetch API Data
        var apiData = objectBody.values;

        var objectData ={} //objectData

        apiData.forEach((value)=>{
            let timestamp = new Date(value.created_on)
            let created_date=timestamp.toLocaleDateString("en","m/d/yyy");

            /******************************************************************

            let params = {
                "title":`${value.title}`
              }        

            var analyzeIssue = await analyzeData();

            async function analyzeData (){
                // Launch python app
                const pythonProcess = spawn('py',[`${analyzerRoute}`]);
        
                // Pass data to app
                pythonProcess.stdin.write(JSON.stringify(params) + '\n');
                
                return new Promise((resolve,reject)=>{
                    // Receive messages from python app
                    pythonProcess.stdout.on("data", (data) =>{
                        // Convert Python Dictionary/JSON to JavaScript Object
                        resolve(data.toString());
                    });
                      
                    // Read errors from python app
                    pythonProcess.stderr.on("data", (data) =>{
                        reject(data.toString());
                    });
                });
            }
        
            // Results from data analysis
            console.log(JSON.parse(analyzeIssue))

            *************************************************************/
                        
            if(objectData[created_date]){
                objectData[created_date]+=1;
            } else {
                objectData[created_date]=1
            }
        });

        for(var prop in objectData){
            if(objectData[prop]>0){
        
                // Create a Unit of Data for the graph
                // Result data
                var result = {     
                    results: {pullrequests:objectData[prop]},
                }; 
                
                // Project issue timestamp
                var log = { 
                    logs:{    
                        link: `${projectData.project_url}/pullrequests`,
                        timestamp: prop, // Timestamp of project issue creation
                    }
                }; 
        
                var dataUnit = {...log, ...result};
                
                saveProjectData.push(dataUnit)
            }
        }
                
        writeData('/public/data/', 'data.json', saveProjectData);

    }

    // Read data from storage       
    let dataRead = readData('/public/data/', 'data.json');

    // Parse data to JSON                    
    var issuesData = JSON.parse(dataRead);

    res.render('index.ejs', {
        title: "",
        message: '',
        issues: issuesData,
        project_url: projectData.project_url,
        apikey: projectData.apikey,
        author: projectData.author,
    });
}); 

// Route for fetching graph data.
app.get("/graph", (req, res) => {

    // Function to retrieve data for storage
    fs.readFile(__dirname + '/public/data/' + 'data.json', 'utf8', (err, data) => {
        res.status(200).json(JSON.parse(data));
    });

});

// Route for loading the about page.
app.get('/about', async (req, res) => {

    res.render('about.ejs', {
        title: "",
        message: '',
    });
}); 

// Route for adding a new project.
app.get('/add', async (req, res) => {

    res.render('add.ejs', {
        title: "",
        message: '',
    });
}); 

// Route for processing new project data.
app.post('/addproject', async (req, res) => {

    // Capture post requests
    const {name, url, apikey} = req.body;

    // Verify project details
    let response = await fetch(`${url}/pullrequests`, { // Fetch bitbucket project repository pull requests
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apikey}`,
        'Accept': 'application/json'
    }
    });

    //let jsonBody = await response.text(); // fetched data in raw form

    //let objectBody = JSON.parse(jsonBody); // fetched data in object form

    //console.log(objectBody.values.length); // Print number of pull requests

    // Check if bitbucket project is valid       
    if(response.status==200){
        
        // Store new data            
        let new_project = {project_url:url, apikey:apikey, author:name};

        writeData('/docs/', 'log.json', new_project);

        // Project credentials are valid
        res.status(200).json({"success": 1})

    } else {

        // Project credentials are invalid
        res.status(200).json({"success": 0})

    }

}); 

// set the app to listen on the port
app.listen(port, () => {
    console.log(`App started successfully. Open your browser and go to: http://localhost:8080/`);
});

