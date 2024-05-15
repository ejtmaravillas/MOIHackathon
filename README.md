# MOI Hackthon

## Problem Statement
To redesign the MOI UAE App so that more citizens apply for services via the app. In particular, the redesign should consider accessibility issues for **people of determination and senior citizens**. The redesign should also consider integrating **gamification** elements to enhance users’ experience on the platform. 

## Solution
Solutions implemented: 
1.	A **simplified user interface** is used so that understanding and navigation of the app is straightforward.
2.	People of determination or senior citizens can **authorise a trusted caregiver** to perform actions on their behalf. This is especially for useful for those who have difficulties reading and navigating phones in general. 
3.	**Introduction of a points system** with other related gamification mechanics (such as game status and rewards) to encourage specific behaviours. For example, points are used to encourage users to complete app tutorials and to apply for services on the app. 
4.	**Feedback channels** such as asking for feedback on the app as well as feedback via longer-form surveys are integrated into the app. Integrating these in the app allows MOI to better target surveys at specific groups of users (such as people of determination, senior citizens and/or their caregivers). These feedback channels allow users to co-create solutions for the app. This is used in conjunction with the points system to encourage feedback from users. 
5.	**Reporting channels** exist as a feedback channel for ‘offline’ issues. For instance, users can report misuse or absence of accessibility facilities in their physical environment. This too can be used in conjunction with the points system to encourage feedback from users. 
6.	Other ways to earn points such as games are integrated into the app to create a **sense of discovery and fun** into the app. 

## Approach
We visualised our ideas using Figma. This [prototype](https://www.figma.com/proto/hj5UAqNIwyWJgQ5gMgHk92/MOI?page-id=0%3A1&node-id=208-5409&viewport=-983%2C416%2C0.13&t=j0Z1ycdxIDhtfx4D-1&scaling=min-zoom&starting-point-node-id=208%3A5409) is the best visual representation of our ideas. 

At the same time, we created a working version of the app (code stored in this repository) using the ionic framework. Rather than completely mimic the design we envisioned on Figma, we prioritised basic functionality of the various icons. More time was also spent creating the function to report issues (complete with photo capture and geolocation capture) and creating a viable game. 

If given more time, we would have liked to explore other ideas:
1.	Ability to automatically detect accidents via the app. We’d come across [research](https://ieeexplore.ieee.org/document/8123430) into a system that can detect accidents using mobile phone technologies. Integrating this into the app would allow for real-time accident reporting.
2.	Integrating chatbots in the service journey so that the entire service journey is guided and interactive. 


## Getting Started

### Prerequisites
Make sure you have the following installed:

- Node.js (https://nodejs.org/en/download)
- npm (Node package manager, comes with Node.js)
- git (you can download the link from here https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Install ionic CLI globally

- run `npm install -g @ionic/cli@latest` in the terminal

### Clone the repository

- run `git clone https://github.com/ejtmaravillas/MOIHackathon`

### Install dependencies

Navigate into the project root directory (./MOIHackathon is the project root directory) and install the required dependencies:

```bash
cd ./MOIHackathon 
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

- Press `F12` to open Developer Tols.
- Click Toggle Device Emulation (`Ctrl` + `Shift` + `M`)
- On the top left corner is a drop-down menu (Dimensions) where you can choose which mobile device you want the pages to be displayed on.

## Misc
APK
- https://drive.google.com/file/d/1TUYwme-F3RtUtYxI-NMQ_jFsgJt6DYTl/view?usp=drive_link
