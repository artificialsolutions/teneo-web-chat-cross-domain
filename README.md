# Teneo Web Chat cross-domain example
This repository contains example scripts that can be used to support cross-domain browsing for Teneo Web Chat. This means users can start a conversation with a bot on website hosted on domain A, move to a website hosted on domain B and continue the conversation with the bot.

This repository focuses on developers and requires a basic knowledge of web technologies and JavaScript. If you have any questions, don't hesitate to add a new topic on the [Teneo Developers Forum](https://community.teneo.ai/c/developement/teneo-webchat/12).

## Prerequisites
* This setup requires Teneo Web Chat 3.0.1 or higher. You can download the latest version here: [https://github.com/artificialsolutions/teneo-web-chat/releases](https://github.com/artificialsolutions/teneo-web-chat/releases).
* To embed Teneo Web Chat in your site, you will need to be able to upload files to your websites and add code (including an iFrame) into the html of your sites.
* You will need a dedicated domain to host Teneo Web Chat. The Teneo Web Chat hosted on this domain will be loaded in an iFrame on your sites.

## How it works
To support cross-domain browsing, a page that contains the Teneo Web Chat UI is loaded in an iFrame. This iFrame is embedded in your various websites (with different domains).

![Teneo Web Chat loaded in iFrame](host_child.png)

To transfer information from the websites to Teneo Web Chat and vice versa, the JavaScript [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) API is used. For example, when the user clicks the launch button (which is part of the page shown inside the iFrame), a postMessage is sent from the page inside the iFrame to the parent to inform the parent that the iFrame size should be updated.

## Contents of this repository
This repository contains a 'host' and a 'child' folder.

### Host folder
The 'host' folder contains example code that needs to be added to the webpages on which Teneo Web Chat should be shown (the webpages at Domain A and Domain B in the image above). The following files are included in the folder:

#### index.html
Example page that demonstrates how the iFrame should be added to pages that should display Teneo Web Chat. The page also contains example buttons to demonstrate how to trigger events inside the iFrame from the host page. 

Note that you should change the url of the iframe `src` to the url of the pages in the child folder (see below).

#### twc-host-styles.css 
Contains styles to properly change the style and size of the iFrame, depending on whether the chat window is maximized or miminized.

#### twc-host-scripts.js
Script that receives postMessages from Teneo Web Chat when the chat window is maximized/minimized. Also contains code to demonstrate how postMessage can be send to the child page to tell it to maximize/minimize the chat window. This code can be extended depending on requirements.

### Child folder
The 'child' folder contains the Teneo Web Chat UI and should be hosted on a domain that can be loaded inside the iFrame (the page at Domain X in the image above). 

Please note: you will need to add `teneo-web-chat.js` to the 'child' folder manually. You can download the latest version here: [https://github.com/artificialsolutions/teneo-web-chat/releases](https://github.com/artificialsolutions/teneo-web-chat/releases).

The following files are included in the folder:

#### index.html
Webpage that embeds the Teneo Web Chat UI. Note that you should update the `teneoEngineUrl` in the embed code to match the url of your Teneo Engine.

#### twc-child-styles.css
Some styles used by Teneo Web Chat are to ensure a proper layout when Teneo Web Chat is loaded in an iFrame.

#### twc-child-scripts.js
Contains the code to send postMessages to the parent page when the chat window is maximized/minimized. Also contains example code to handle postMessages received by the parent. This code can be extended depending on requirements.

#### remember-window-state.js
Example extension to remember the chat window state (maximized/minimized) accross domains.
