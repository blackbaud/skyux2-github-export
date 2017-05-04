### Using the SKY UX 2 export utility

## Prerequisites
  - [Node.js version 6+](https://nodejs.org/en/) (Do not use version 7) -- You can check what nodejs version you have installed by running`node -v` from the command line.
  - NPM version 3+ -- NPM is the default JavaScript package manager for Node.js. As of Node.js version 0.6.3, it is bundled and installed automatically with the environment. 
  - [Git](https://git-scm.com/) -- To confirm that you have Git in place, run `git version` from the command line.

## Exporting SKY UX 2 issues
  - Open your terminal and change your current directory to the location where you want to download the export utility. 
  - Run `git clone https://github.com/blackbaud/skyux2-github-export` in your terminal. This will clone the export repository in your terminal's current directory.
  - Run `npm install`.
  - Run `npm run start`.
  - See the `skyux2issues.csv` file has been created in the current directory.