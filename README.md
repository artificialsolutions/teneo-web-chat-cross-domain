# Teneo Web Chat cross-domain example
This repository contains example scripts that can be used to support cross-domain browsing for Teneo Web Chat. This means users can start a conversation with a bot on website hosted on domain A, move to a website hosted on domain B and continue the conversation with the bot.

This repository focuses on developers and requires a basic knowledge of web technologies and JavaScript. If you have any questions, don't hesitate to add a new topic on the [Teneo Developers Forum](https://community.teneo.ai/c/developement/teneo-webchat/12).

## Prerequisites and limitations
### Teneo Web Chat version
This requires Teneo Web Chat 3.1.0 or higher. You will need to add the latest version of `teneo-web-chat.js` to the 'child' folder manually. You can download the latest version here: [https://github.com/artificialsolutions/teneo-web-chat/releases](https://github.com/artificialsolutions/teneo-web-chat/releases).

### Browser support
Embedding Teneo Web Chat with support for cross-domain browsing is supported in all major browsers (Chrome, Firefox, Edge and IE11) except Safari when 'Prevent cross-site tracking' is enabled. It's also not supported in Chrome and Firefox on iOS. 

## How it works
To support cross-domain browsing, a page that contains the Teneo Web Chat UI is loaded in an iFrame. This iFrame is embedded your websites. This means that you need a place to host the page containing the Teneo Web Chat UI so you can load it into the iFrame(s).

![Teneo Web Chat loaded in iFrame](host_child.png)

To transfer information from the websites to Teneo Web Chat and vice versa, the JavaScript [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) API is used. For example, when the user clicks the launch button (which is part of the page shown inside the iFrame), a postMessage is sent from the page inside the iFrame to the parent to inform the parent that the iFrame size should be updated.

## Contents of this repository
This repository contains a 'host' and a 'child' folder.

### Host folder
The 'host' folder contains example code that needs to be added to the webpages on which Teneo Web Chat should be shown (the webpages in Domain A and Domain B in the image above).

#### index.html
Example page that demonstrates how the iFrame should be added to pages that should display Teneo Web Chat. The page also contains example buttons to demonstrate how to trigger events inside the iFrame from the host page.

#### twc-host-styles.css 
Contains styles to properly change the style and size of the iFrame, depending on whether the chat window is maximized or miminized.

#### twc-host-scripts.js
Script that receives postMessages from Teneo Web Chat when the chat window is maximized/minimized. Also contains code to demonstrate how postMessage can be send to the child page to tell it to maximize/minimize the chat window.

### Child folder
The 'child' folder contains the Teneo Web Chat UI and should be hosted on a domain that can be loaded inside the iFrame.

#### index.html
Webpage that embeds the Teneo Web Chat UI. Please note:

* You will need to add the latest version of Teneo Web Chat to the 'child' folder manually. You can find the latest version here: [https://github.com/artificialsolutions/teneo-web-chat/releases](https://github.com/artificialsolutions/teneo-web-chat/releases)
* You should update the 'teneoEngineUrl' in the embed code to match the url of your Teneo Engine.

#### twc-child-styles.css
Some styles used by Teneo Web Chat are to ensure a proper layout when Teneo Web Chat is loaded in an iFrame.

#### twc-child-scripts.js
Contains the code to send postMessages to the parent page when the chat window is maximized/minimized. Also contains example code to handle postMessages received by the parent. This code can be extended depending on requirements.

#### remember-window-state.js
Example extension to remember the chat window state (maximized/minimized) accross domains.
