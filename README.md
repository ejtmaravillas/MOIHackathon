# MOI Hackthon

## Problem Statement

## Solution

## Getting Started

### Prerequisites
Make sure you have the following installed:

- Node.js (https://nodejs.org/en/download)
- npm (Node package manager, comes with Node.js)
- git (you can download the link from here https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Install ionic CLI globally

- run `npm install -g @ionic/cli@latest` in the terminal \

### Clone the repository

- run `git clone https://github.com/ejtmaravillas/MOIHackathon`

### Install Dependencies

Navigate into the project root directory and install the required dependencies:

```bash
cd ./MOIHackathon (./MOIHackathon is the project root directory)
npm install
```

### Run

- run `ionic serve` in the terminal from the project root

```bash
ionic serve
```
### Troubleshooting

- if you encounter an error after ionic serve, this is because of the package-lock.json.

```bash
[ERROR] Invalid project type: angular-standalone (project config:
        .\ionic.config.json).

        Project type must be one of: angular, ionic-angular, ionic1, custom,   
        react, vue

Bad project type: undefined
```

- To fix this, run 
```bash
npm install -g --force @ionic/cli
```

- After this, run
```bash
ionic serve
```
### Change the mobile view to your preference

- `press F12` to open developer tools.
- click Toggle device emulation (Ctrl + Shift + M)
- On the top left corner is a drop-down menu (Dimensions) where you can choose which mobile device you want the pages to be displayed.

