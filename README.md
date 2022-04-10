
### Built With

- [NodeJs](https://nodejs.org/en/)
- [axios](https://www.npmjs.com/package/axios)
- [googleapis](https://www.npmjs.com/package/googleapis)
- [wappalyzer](https://www.wappalyzer.com/)

### Installation 

1. Fork the project first

2. Clone this repo on your local machine
   ```sh
   git clone https://github.com/S-Swaroop/Zecko_Task.git
   ```
3. In the project directory, install the packages using

   ```sh
   npm install
   ```

4. Create a .env file in the root directory of the project

   ```sh
    WAPPALYZER_API_KEY = <your wappalyzer api key>

    GOOGLE_SHEETS_ID = <google sheet id>
   ```

5. run the script

   ```sh
   node index.js
   ```

### Enabling Goole Sheets API 

1. Login to [Google Developers Console](https://console.cloud.google.com/apis/dashboard).
2. On your dashboard, click on ‘My first Project’ (name can be different) located beside Google Cloud Platform.
3. A pop-up box will appear, on the top right-hand corner click ‘New Project’
4. Enter the name of the project of your choice. Leave the ‘Location’ field as it is. After entering the name click ‘Create’.
5. Once the project is created, click ‘My first Project’ and then select the new project you just created.
6.  After selecting the project, click on ‘ENABLE APIs & SERVICES’.
7.  Search for ‘Google sheets’ and select it. On the Google sheets page, click ‘Enable’.
8.  Once clicked on ‘Manage’, you will be redirected to your dashboard. Under ‘APIs & Services’ click on ‘Credentials’.
9.  On the credentials page, click ‘Create Credentials’, then click on ‘Service Account’ in the dropdown.
10. Enter the ‘Service name’, it can be anything you like. After entering the name click on ‘Create’.
11. Click on the email address, a page will appear on which we have to click on ‘Keys’. Under the ‘Keys’ column, click on ‘Add key’ and then select ‘Create new key’. After selecting ‘Create new key’, a pop-up box will appear. Select ‘JSON’ and click ‘Create’. A private key for your service account will be downloaded to your machine, move it to the root directory of the project.

*** Link to final spreadsheet (input in sheet1, output in sheet2) : [output](https://docs.google.com/spreadsheets/d/19QSTaqQrjXHbbahd1QpM_4h1emHfFYCW7pCYbFANvoQ/edit#gid=327161312)
