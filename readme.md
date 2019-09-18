# React-Native PowerBi embedded via webview demo

This is a demo and PoC for embedding PowerBi report into React-Native application via webview.

Adapted from [react-native-powerbi](https://github.com/wbroek/react-native-powerbi) package

## Pre-requirements:

Setup:

- PowerBi Pro account, Azure subscription, Azure Active Directory tenant ([links](https://docs.microsoft.com/en-us/power-bi/developer/embed-sample-for-customers#prerequisites))
- create a new workspace, create a report (can use sample data provided by PowerBi)
- create a Phone layout via PowerBi
- get your [reportId](https://docs.microsoft.com/en-us/power-bi/developer/embed-sample-for-customers#report-id)
- get your embedUrl (PowerBi->open report->File->Embed)
- generate an accessToken (see below)


## The step by step test reproduce

- create a new AAD
- switch to newly created AAD:
    - add a user admin@ (keep your initial password, later you will be asked to change it)
        - open admin@ details
        - goto Directory role -> set as Global administrator 
    - goto App Registrations
        - click + New registration
        - goto App's Api permissions-> add Power Bi Service -> Delegated permissions 
            -> Set permissions: 
                - Capacity read & read/write all
                - Content create
                - Dashboard read & read/write all
                - Dataset read & read/write all
                - Group read & read/write all
                - Report read & read/write all
                - Workspace read & read/write all
        - at App's overview copy AppId
        - go to App's Authentication. Default client Type -> Treat app as a public client -> set to "Yes" 
- goto app.powerbi.com login with admin@.... user (with inital password, you will be asked to make a new password)
	- click add new workspace, choose Try Pro for free
	- create a new workspace
 	- at the welcome page to the workspace click "Samples" link, select any dataset
	- at workspace left menu switch to the available report 
	- copy workspaceId, reportId
	- at report area click File->Embed and cope the embedUrl
	- at report area click Edit report -> Mobile layout, make the mobile layout, switch back to Web layout, Save report
- put all prepared IDs into config.json and powerbi_config.json
- run token generator
- set the token into config.json
- run the App (run-android|run-ios)	


## Run in dev environment


```bash
npm install
```

update **./powerbi_config.json** with proper values for 
```
"accessToken": "",
"embedUrl": "",
"reportId": ""
```

run it (have your android emulator running)
```bash
../node_modules/.bin/react-native run-android
```

for iOS have your iOS emulator running and run
```bash
../node_modules/.bin/react-native run-ios
```


## Token generation

The code at **tokenGen** folder is taken from this [repo](https://github.com/microsoft/PowerBI-Developer-Samples/tree/master/API%20Samples%20-%20NodeJS) with slight changes in order to use in this demo

set proper variables into **./tokenGen/config.json** file:

```
"appId" : "",
"workspaceId" : "",
"reportId" : "",
"username" : "",
"password" : ""
```

- appId ([link](https://docs.microsoft.com/en-us/power-bi/developer/embed-sample-for-customers#application-id))
- workspaceId ([link](https://docs.microsoft.com/en-us/power-bi/developer/embed-sample-for-customers#workspace-id))
- reportId ([link](https://docs.microsoft.com/en-us/power-bi/developer/embed-sample-for-customers#report-id))
- username and password to your Power BI master account

```bash
cd ./tokenGen
npm intall
node run.js
```


## Usage 

```javascript
<PowerBIEmbed
  accessToken="H4sIAAAAAAAEACVW...NH8v_8HNiWyTi4LAAA="
  embedUrl="https://app.powerbi.com/reportEmbed?reportId=bac25fa7-XXXX-XXXX-XXXX-606d165c3b43&groupId=be8908da-XXXX-XXXX-XXXX-163f52476cdd"
  id="bac25fa7-XXXX-XXXX-XXXX-606d165c3b43"
/>
```

#### Language

You can also pass the language the report must use

```javascript
<PowerBIEmbed
  accessToken="H4sIAAAAAAAEACVW...NH8v_8HNiWyTi4LAAA="
  embedUrl="https://app.powerbi.com/reportEmbed?reportId=bac25fa7-XXXX-XXXX-XXXX-606d165c3b43&groupId=be8908da-XXXX-XXXX-XXXX-163f52476cdd"
  id="bac25fa7-XXXX-XXXX-XXXX-606d165c3b43"
  language="en"
/>
```

#### Embed configuration

You can pass your own configuration object from the [PowerBI JS library](https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details)

```javascript
const embedConfig = {
      type: 'report',
      tokenType: 1,
      accessToken: "H4sIAAAAAAAEACVW...NH8v_8HNiWyTi4LAAA=",
      embedUrl: "https://app.powerbi.com/reportEmbed?reportId=bac25fa7-XXXX-XXXX-XXXX-606d165c3b43&groupId=be8908da-XXXX-XXXX-XXXX-163f52476cdd",
      id: "bac25fa7-XXXX-XXXX-XXXX-606d165c3b43",
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: true,
      },
    }

    <PowerBIEmbed
      embedConfiguration={embedConfig}
    />
```

## Resources

- Azure PowerBi embedded [official docs](https://docs.microsoft.com/en-us/azure/power-bi-embedded/) 
- For more details as to PowerBi JS SDK see [here](https://github.com/microsoft/PowerBI-JavaScript/wiki)
- JavaScript Embed Sample (Playground) [here](https://microsoft.github.io/PowerBI-JavaScript/demo/)
