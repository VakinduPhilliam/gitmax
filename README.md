
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

<br/>

## Installation:

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

