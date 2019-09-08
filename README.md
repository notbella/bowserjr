# BowserJr

`BowserJr` is a static analysis tool that automates the process of reviewing a Chrome extension for potential security issues. This tool is a rework of the tool [tarnish](https://github.com/mandatoryprogrammer/tarnish) that streamlines and expands the functionality.

## Usage

```
docker build -t bowserjr .
docker run --rm -it -v "$(pwd):/host" -w /host bowserjr extension output
```

The tool takes two command line arguments: `input` and `output`.

`input` can be any of the following:

* The Chrome extension's ID if pulling from the Chrome webstore
* The path to the .zip file containing the Chrome extension source code
* The path to the directory containing the Chrome extension source code

`output` is the desired path of the results of the tool.

## Docker

Coming soon! :)

## Features
Pulls any Chrome extension from a provided Chrome webstore link or path to a local .zip file or directory with source code.

* `manifest.json` viewer: simply displays a JSON-prettified version of the extension’s manifest.
* Detection of `web_accessible_resources`
* Potential Clickjacking Analysis: Detection of extension HTML pages with the `web_accessible_resources` directive set. These are potentially vulnerable to clickjacking depending on the purpose of the pages.
* Permission Warning(s) viewer: which shows a list of all the Chrome permission prompt warnings which will be displayed upon a user attempting to install the extension.
* Dangerous Function(s): shows the location of dangerous functions which could potentially be exploited by an attacker (e.g. functions such as innerHTML, chrome.tabs.executeScript).
* Entry Point(s): shows where the extension takes in user/external input. This is useful for understanding an extension’s surface area and looking for potential points to send maliciously-crafted data to the extension.
* Both the Dangerous Function(s) and Entry Point(s) scanners have the following for their generated alerts:
	* Relevant code snippet and line that caused the alert.
	* Description of the issue.
	* A “View File” button to view the full source file containing the code.
	* The path of the alerted file.
	* The full Chrome extension URI of the alerted file.
	* The type of file it is, such as a Background Page script, Content Script, Browser Action, etc.
	* If the vulnerable line is in a JavaScript file, the paths of all of the pages where it is included as well as these page’s type, and `web_accessible_resource` status.
* Content Security Policy (CSP) analyzer and bypass checker: This will point out weaknesses in your extension’s CSP and will also illuminate any potential ways to bypass your CSP due to whitelisted CDNs, etc.
* Known Vulnerable Libraries: This uses Retire.js to check for any usage of known-vulnerable JavaScript libraries.
* Download extension and formatted versions.
* Download the original extension.
* Download a beautified version of the extension (auto prettified HTML and JavaScript).
