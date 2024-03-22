Steps to contribute.
NEVER COMMIT TO MAIN. NEVER COMMIT TO MAIN. It should always be on your own branch and that branch name should match the issue.
Ensure that you are addressing the correct issue. Each issue will be listed as something like a chore, fix, bug, etc. Your commit message MUST start with one of these tags that correspond with your issue.
Followed by your commit message and your commit message must end with the branch name, example (WEB-1)

An example commit message would look like this:

chore: create contributing guidelines (WEB-8)

Commit messages should not be written in an action or present tense. It also should not mention tasks unrelated to the issue "Creating Contributing Guidlines and will work on next task" is not what we would want to see as a commit message.

After a pull request is approved, the branch should be deleted once merged.

**First Time Contribution Guide**

1. Fork the DSDsite repository
   a. From the home page of the DSDsite repo, click the Fork button. This will redirect you to a new page.
   b. Click Create Fork in the bottom right. I like to change the name from "DSDsite" to "DSDsite-fork" to avoid any confusion about which repo I'm in.
   c. Once the fork repo is created, you will be redirected to the new repo.

2. Clone the forked repo to a local repository
   a. From your newly created repository (the forked version), click on the green Code button
   b. From the HTTPS tab of the opened Code button, copy the URL
   c. Open a Bash terminal in the location where you want to store the project. In this example, I’m copying straight to my desktop.
   d. In your Bash terminal, run the command “git clone https://github.com/YOUR-USERNAME/DSDsite-Fork.git”
   e. If successful, you will now have a copy of the project on your local machine

3. Install dependencies
   a. From a text editor, open a Bash terminal in the project's root folder. In the example, it will be named “DSDsite-Fork”
   b. In the Bash terminal, run the command “npm install”. This will install all the dependencies from the package.json file
   c. Run the command “npm run dev”. Once you see the green check in the terminal, navigate to “localhost:3000”. Ensure the page compiles correctly before moving on. It may take a moment for the page to load.

4. Select an issue to resolve
   a. From the home page of the DSDsite repository navigate to the issues tab.
   b. Click on the issue you would like to resolve
   c. Read the instructions carefully and plan your resolution
   d. Leave a comment to tell others that you’re getting started on the issue. This will prevent multiple people from needlessly working on the issue.

5. Create a new branch to make changes on
   a. From a text editor, open a Bash terminal in the project's root folder. Ensure the main git branch is selected.
   b. In the Bash terminal, run the command “git branch BRANCH-NAME” to create the working branch. Replace BRANCH-NAME with a name that matches the issue.
   c. Run the command “git checkout BRANCH-NAME” to switch to the new branch.
   d. Ensure you are in the newly created branch, NOT the main branch

6. Make updates to the codebase and save the changes
   a. Ensure that only code related to the issue is changed.
   b. From the Bash terminal, run the command “npm run dev” and navigate to localhost:3000.
   c. Make changes to the code and view the changes in the browser.
   d. When the issue has been resolved and there is nothing left to fix the issue, run the command “npx prettier . –write”. This may reformat files that were not altered, don’t de alarmed.
   e. Run the command “git add .” to add all changed files to staging.
   f. Run the command “git commit -m “YOUR-MESSAGE””. The commit message MUST start with a tag (chore, fix, bug, etc.) that corresponds with your issue. Followed by your commit message and your commit message must end with the branch name, for example (WEB-1). An example commit message would look like this: chore: create contributing guidelines (WEB-8). Commit messages should not be written in an action or present tense. It also should not mention tasks unrelated to the issue "Creating Contributing Guidelines and will work on next task" is not what we would want to see as a commit message.
   g. Run the command “git push –set-upstream origin BRANCH-NAME” to create a new branch on Github and push the local changes to it. Use the same name as the local branch.

7. Create a pull request
   a. Head back to the new forked repo on Github
   b. Find the banner that says your branch is ahead of the DSDsite:main. Click Contribute then Open a pull request
   c. Click Create Pull Request
   d. Make the title of the pull request match the issue
   e. In the description, say what work has been done, provide a screenshot of the working update, or some other useful information.
   f. Once the tests have passed and the title/description is satisfactory, click Create pull request

CONGRATULATIONS! You have successfully contributed to the Dallas Software Developers website! Now just wait and see if your pull request is approved.
