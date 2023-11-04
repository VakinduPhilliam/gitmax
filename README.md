
# Git Max:

Git Max is an AI powered web app that uses Machine Learning to determine the most relevant Bitbucket project pull-requests that require the software developer's  urgent attention while filtering out less important pull-requests. 

Individually reviewing a large software project's pull requests, issues and active alerts can be hectic for any software developer. 

Git Max uses a pretrained Machine Learning model that is fine-tuned to identify genuine in-progress Bitbucket project pull requests, while filtering out less important pull-requests, profanity and abuse. 

Git Max uses Intel Extension for Scikit-Learn and Pandas to build a Machine Learning Profanity Detection Model that also filters out less important pull-requests. 

We build and deploy an application to the Openshift cluster from source code using git access and the s2i technology is used as Builder image.

The app runs on Redhat's Openshift Application platform, then plots a graph to notify the developer about the most critical project pull-requests that are worth the developer's time. 

For example 'README.md' documentation updates are ignored by the model, because they aren't critical updates.

<br/>

_Git Max Interface:_

![Gitmax of Work Interface 1](/docs/ui1.png)

</br>

![Gitmax of Work Interface 2](/docs/ui2.png)

</br>

![Gitmax of Work Interface 3](/docs/ui3.png)

</br>

![Gitmax of Work Interface 4](/docs/ui4.png)

</br>

![Gitmax of Work Interface 5](/docs/system_design.png)


</br>

## Machine Learning Technologies Used:

- Python3 - programming language used for Machine Learning.

- Pandas - is used for data cleaning and analysis.

- Intel Extension for Scikit-learn (SKlearn) - is used for Machine Learning and Statistical Modeling.

- Pip8 or greater - is used for managing python dependency installations.

- Docker - Used to build Image.

<br/>

## Installation on Desktop PC:

Install the following applications on your PC before running the web app.

- [Node.JS](https://nodejs.org/en/download/current/)

</br>

### Download or Clone app from Github:

Go to https://github.com/VakinduPhilliam/gitmax and download or clone the app.

</br>

### Install NPM dependencies:

Open the unzipped folder in your favorite code editor and install the app's npm dependency modules. 

_npm install_

</br>

Then install python dependencies (Make sure to have pip8 or greater installed).

</br>

_npm run pyinstall_

</br>

### Running the App:

To run the app, execute the command below in the Command terminal. 

_node index.js_

</br>

You should see a message like, "Server running on port: 8080" in your command terminal if the app is running successfully.

Open your browser and visit, http://localhost:8080/ to view the app.
(You must be online for the app to fetch the Bitbucket API.)

</br>

## Deploying the App on RedHat Openshift:

- First, create an OpenShift sandbox account (https://developers.redhat.com/developer-sandbox), create a 'cluster', then create a 'project'.

- In ‘Developer Mode’, Click '+ Add' to view options for building and deploying your app.

- Choose ‘git access’ to build your application. Enter this Git repository (or repo) in the URL field: https://github.com/VakinduPhilliam/gitmax.git

- OpenShift will copy the repo to an internal storage location, inspect it, and attempt to discern the 'import strategy' to build it. 
By default Openshift will choose to use the 'Dockerfile' that is found in the Git repo to build the application image.

- Leave the default build name chosen by Openshift as project name. 

- Scroll further, you’ll see the 'Resources' and 'Advanced Options' Section.

- Under 'Resources' ensure the 'Deployment' option is selected.

- Under 'Advanced Options' ensure the 'Create a route to the application URL' option is checked. As it notes near the option, this ensures that a 'Public URL' is created for our newly created application.

- Once the options are confirmed, click the 'Create' button at the bottom of the page.

- Once you select the 'Create' button, you will be navigated back to 'Topology view' page where you will see that our application now exists.
  
- Open the project source code in an IDE, go to the ‘views’ folder and find the ‘index.ejs’ file, replace the URL in the line of code `$.getJSON('URL.com/graph')` with the Public URL to your Openshift app’s Demo.

- Finally visit the app's ‘Public URL’ found on top of the app’s topology.

</br>

## LIVE DEMOS:

Visit the above URLs to see working demos.

NOTE: First create an OpenShift account, then LOGIN before you visit the SANDBOX DEMO URL.

LIVE OPENSHIFT SANDBOX DEPLOYMENT DEMO URL: https://gitmax-git-vakinduphilliam-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/

LIVE WEB APP: https://gitmax.myeulome.com

