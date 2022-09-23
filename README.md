## **DigiQore Systems Ltd Interview - Full Stack Developer - Technical Test**

This repository contains my submission to the fullstack developer technical test for DigiQore Systems Ltd. A fullstack web scraper with frontend and backend will be built as part of this assignment.

### API structure

- The baseUrl is `/api/v1`.
- The relevant endpoint is `/data`.
- Making a GET request to the endpoint returns a payload of the following format (either after scraping if the database records don't exist or directly from the database if they do):

```
{
  "message": "Success",
  "data": [
    {
      "id": 1,
      "language": "1032/AF",
      "level": "20",
      "averageSourceStatements": 16,
      "createdAt": "2022-09-23T18:21:39.635Z",
      "updatedAt": "2022-09-23T18:21:39.635Z"
    },
    {
      "id": 2,
      "language": "1st Generation default",
      "level": "1",
      "averageSourceStatements": 320,
      "createdAt": "2022-09-23T18:21:39.635Z",
      "updatedAt": "2022-09-23T18:21:39.635Z"
    },
    ...
  ]
}
```

- In case of any errors, the API returns status code 500 in the following format:

```
{
  "message": <error message>
}
```

### Instructions for setting up

- Clone the repository
- Open a terminal
- Navigate to the root directory of the project
- Run the following command

```sh
cat ./server/.env.example > ./server/.env.development.local
```

- Paste the following into the `./server/.env.development.local` file (only keeping it here for demonstration purposes, in real world apps, the env files will not be part of the repository):

```
# PORT
PORT = 3000

# DATABASE
DB_HOST = postgres
DB_PORT = 5432
DB_USER = deku
DB_PASSWORD = digiqore@786
DB_DATABASE = digiqore_fullstack_scraper
DB_DIALECT = postgres

# TOKEN
SECRET_KEY = secretKey

# LOG
LOG_FORMAT = dev
LOG_DIR = ../logs

# CORS
ORIGIN = *
CREDENTIALS = true

# SELENIUM
SELENIUM_HOST=selenium-hub
SELENIUM_CONTAINER_PORT=4444
SELENIUM_HOST_PORT=4444
```

- Run the following command:

```sh
docker compose --env-file ./server/.env.development.local -f ./docker-compose.dev.yml up
```

- Wait till the containers are built and you can see the following lines in the console:

```sh
selenium-firefox           | 18:21:02.241 INFO [LocalDistributor.newSession] - Session created by the Distributor. Id: 869c2683-b827-40cb-a85a-79104369ae70
selenium-firefox           |  Caps: Capabilities {acceptInsecureCerts: false, browserName: firefox, browserVersion: 104.0.1, moz:accessibilityChecks: false, moz:buildID: 20220829141339, moz:firefoxOptions: {args: [--width=640, --height=480, -headless]}, moz:geckodriverVersion: 0.31.0, moz:headless: true, moz:platformVersion: 5.15.0-47-generic, moz:processID: 157, moz:profile: /tmp/rust_mozprofileJ1g1ae, moz:shutdownTimeout: 60000, moz:useNonSpecCompliantPointerOrigin: false, moz:webdriverClick: true, moz:windowless: false, pageLoadStrategy: normal, platformName: LINUX, proxy: Proxy(), se:cdp: ws://192.168.48.3:4444/sess..., se:noVncPort: 7900, se:vnc: ws://192.168.48.3:4444/sess..., se:vncEnabled: true, se:vncLocalAddress: ws://192.168.48.3:7900, setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify}
selenium-hub               | 06:28:09.271 INFO [LocalDistributor.newSession] - Session created by the distributor. Id: 43b54256-8e32-40bd-9229-5e9dfa43bedf, Caps: Capabilities {acceptInsecureCerts: false, browserName: firefox, browserVersion: 104.0.1, moz:accessibilityChecks: false, moz:buildID: 20220829141339, moz:firefoxOptions: {args: [--width=640, --height=480, -headless]}, moz:geckodriverVersion: 0.31.0, moz:headless: true, moz:platformVersion: 5.15.0-47-generic, moz:processID: 166, moz:profile: /tmp/rust_mozprofile7faRJt, moz:shutdownTimeout: 60000, moz:useNonSpecCompliantPointerOrigin: false, moz:webdriverClick: true, moz:windowless: false, pageLoadStrategy: normal, platformName: LINUX, proxy: {}, se:cdp: ws://172.25.0.4:4444/sessio..., se:noVncPort: 7900, se:vnc: ws://172.25.0.4:4444/sessio..., se:vncEnabled: true, se:vncLocalAddress: ws://172.25.0.4:7900, setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify}
```

- Navigate to `http://localhost:3002/`

### Caveats:

- The `selenium-firefox` service keeps crashing after running for some time due to unknown reasons, could not figure out the solution to it. In that case, you have to rerun the `docker compose` command mentioned above.
- Deployment of the API could not be done due to the fact that Selenium takes up a lot of memory, and free tiers of deployment services won't meet the RAM requirements.

### Screenshots

![Screenshot of the frontend app](https://user-images.githubusercontent.com/37664921/192034655-7b17a23d-9fdf-47cb-b963-d18b8e9caa94.png)
