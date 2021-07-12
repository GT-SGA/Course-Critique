This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm build`
Puts all of the necessary files to run in a prod environment into the build folder.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## API
host URL: "SOURCE_URL (masked for privacy)"

GET by course:

"/course"

produces json format

parameters:
- courseID (required): ID of the course e.g. 'ACCT 2101'

example URL: "SOURCE_URL/course?courseID=ACCT%202101"

GET by professor:

"/prof"

produces json format

parameters: 
- profID (required): the professor's GT username
- by (required): (should always be either 'term' or 'section') Indicator for whether the rows returned are to be aggregated by term or by section

example URL: "SOURCE_URL/prof?profID=mk185&by=section"

## Elasticsearch
We restrict our search to require an input of at least 3 characters.

### Testing URL

GET:   "SOURCE_URL (masked for privacy)"

***Parameter***

(required)  q = "ma"

### Exact URL 
 SOURCE_URL?q=ma

***Example Output List in JSON***

Professor:

1. Will return uniqueID: which is the gt username in string
2. type: "professor"
3. value: "Name"
4. score: "score" 
           

           
Query Time in Milliseconds

'queryms' = query time in milleseconds

Course: 

1. type: "course"
2. value: "class"
3. score: "score"

Empty Cases: Returns an empty List

Return Value:
{
    "queryms": 2,
    "searchresponse": [
        {
            "value": "Meliopoulos, A P",
            "type": "professor",
            "uniqueID": "am15",
            "score": 12.793029
        },
        {
            "value": "Melika, Ayda",
            "type": "professor",
            "uniqueID": "amelika3",
            "score": 12.340186
        },
        {
            "value": "Carlisle, Melissa Rose",
            "type": "professor",
            "uniqueID": "mcarlisle3",
            "score": 12.025841
        },
        {
            "value": "Mello, Michael",
            "type": "professor",
            "uniqueID": "mmello8",
            "score": 11.727096
        },
        {
            "value": "McDaniel, Melinda Hardy",
            "type": "professor",
            "uniqueID": "mmcdaniel43",
            "score": 11.192575
        },
        {
            "value": "Pilkington, Melissa",
            "type": "professor",
            "uniqueID": "mp222",
            "score": 11.1744375
        },
        {
            "value": "Kohnen, Melanie",
            "type": "professor",
            "uniqueID": "mkohnen3",
            "score": 11.158654
        },
        {
            "value": "Melgen, Sarah Emilia",
            "type": "professor",
            "uniqueID": "smelgen3",
            "score": 10.94849
        },
        {
            "value": "Moore, Melody Marie",
            "type": "professor",
            "uniqueID": "me8",
            "score": 10.727458
        },
        {
            "value": "Kemp, Melissa",
            "type": "professor",
            "uniqueID": "mkemp6",
            "score": 10.726722
        }
    ]
}


## License
This software is available under the the [MIT License](https://github.com/GT-SGA/Course-Critique/blob/main/LICENSE).
