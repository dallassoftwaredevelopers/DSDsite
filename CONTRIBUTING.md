# Steps to contribute.

_NEVER COMMIT TO MAIN. NEVER COMMIT TO MAIN._ It should always be on your own branch and that branch name should match the issue.
Ensure that you are addressing the correct issue. Each issue will be listed as something like a chore, fix, bug, etc. Your commit message MUST start with one of these tags that correspond with your issue.
Followed by your commit message and your commit message must end with the branch name, example (WEB-1)

An example commit message would look like this:

chore: create contributing guidelines (WEB-8)

Commit messages should not be written in an action or present tense. It also should not mention tasks unrelated to the issue "Creating Contributing Guidlines and will work on next task" is not what we would want to see as a commit message.

After a pull request is approved, the branch should be deleted once merged.

## First Time Contribution Guide

1. Fork the DSDsite repository

   1. From the home page of the DSDsite repo, click the _Fork_ button. This will redirect you to a new page
   2. Click _Create Fork_ in the bottom right. I like to change the name from "DSDsite" to "DSDsite-fork" to avoid any confusion about which repo I'm in
   3. Once the forked repo is created, you will be redirected to the new repo![parent_repo](https://github.com/David-Ogden-III/DSDsite-Fork/assets/71677972/98725291-a209-4c52-a077-e220d192849a)

2. Clone the forked repo to a local repository

   1. From your newly created repository (the forked version), click on the green _Code_ button
   2. From the HTTPS tab of the opened Code button, copy the URL

   ![Code_button_open](https://github.com/David-Ogden-III/DSDsite-Fork/assets/71677972/46c03816-b793-4574-9706-c80656e195f7)

   3. Open a Bash terminal in the location where you want to store the project. In this example, I’m copying straight to my desktop
   4. In your Bash terminal, run the command git clone https://github.com/YOUR-USERNAME/DSDsite-Fork.git
   5. If successful, you will now have a copy of the project on your local machine
      ![bash_clone_cmd](https://github.com/David-Ogden-III/DSDsite-Fork/assets/71677972/551d3ea0-5448-45c7-ab33-2dddbc0247e3)

3. Install dependencies

   1. From a text editor, open a Bash terminal in the project's root folder. In the example, the root folder is "DSDsite-Fork"
   2. In the Bash terminal, run the command npm install. This will install all the dependencies from the package.json file![npm_install](https://github.com/David-Ogden-III/DSDsite-Fork/assets/71677972/cdad748f-4569-4a04-8dc6-e40c8fae5cac)

   3. Run the command npm run dev. Once you see the green check in the terminal, navigate to localhost:3000. Ensure the page compiles correctly before moving on. It may take a moment for the page to load![run_dev](https://github.com/David-Ogden-III/DSDsite-Fork/assets/71677972/a2421871-1a3f-41d1-b056-dc2736baa994)

4. Select an issue to resolve

   1. From the home page of the DSDsite repository navigate to the issues tab
   2. Click on the issue you would like to resolve
   3. Read the instructions carefully and plan your resolution
   4. Leave a comment to tell others that you’re getting started on the issue. This will prevent multiple people from needlessly working on the issue and promote collaboration

5. Create a new branch

   1. From a text editor, open a Bash terminal in the project's root folder. Ensure the main git branch is currently selected
   2. In the Bash terminal, run the command git branch BRANCH-NAME to create the working branch. Replace BRANCH-NAME with a name that matches the issue
   3. Run the command git checkout BRANCH-NAME to switch to the new branch
   4. Ensure you are in the newly created branch, _NOT_ the main branch![new_branch](https://github.com/David-Ogden-III/DSDsite-Fork/assets/71677972/fbe4c6bd-fd66-4c74-915a-26452aa98041)

6. Make updates to the codebase and save the changes

   1. Ensure that only code related to the issue is changed
   2. From the Bash terminal, run the command npm run dev and navigate to localhost:3000
   3. Make changes to the code and view the changes in the browser
   4. When the issue has been resolved and there is nothing left to do, run the command npx prettier . –write. This may reformat files that were not altered, don’t de alarmed
   5. Run the command git add . to add all changed files to staging
   6. Run the command git commit -m “YOUR-MESSAGE”. The commit message _MUST_ start with a tag (chore, fix, bug, etc.) that corresponds with your issue, followed by your commit message. Your commit message must end with the branch name, for example (WEB-1). An example commit message would look like this: chore: create contributing guidelines (WEB-8). Commit messages should not be written in an action or present tense. It also should not mention tasks unrelated to the issue "Creating Contributing Guidelines and will work on next task" is not what we would want to see as a commit message
   7. Run the command git push –set-upstream origin BRANCH-NAME to create the upstream branch on Github and push the local changes to it. Use the same name as the local branch

7. Create a pull request

   1. Head back to the new forked repo on Github
   2. Find the banner that says your branch is ahead of the DSDsite:main. Click _Contribute_ then _Open a pull request_![branch_ahead_of_main2](https://github.com/David-Ogden-III/DSDsite-Fork/assets/71677972/4cb45655-b501-4e2c-8c1b-9ff44560705b)

   3. Make the title of the pull request match the issue
   4. In the description, say what work has been done, provide a screenshot of the working update, or some other useful information
   5. Click Create Pull Request
   6. Verify tests have passed

CONGRATULATIONS! You have successfully contributed to the Dallas Software Developers website! Now just wait and see if your pull request is approved.

## When your Pull Request is merged

That's Great, your work is well appreciated! If you would like to keep contributing, you should update your fork and update your local repository.

## When your branch goes out of date

This often happens and is mostly encountered after a pull request opened by another individual is merged to the `main` branch and you may sometimes run into merge conflicts. Here are steps to follow if this happens:

> You may choose to merge them the main branch on GitHub to your working branch which may be faster, but these steps are encouraged for a more linear-looking git history

### Update your Fork

1. Syncronize your Fork by going to your forked repository and ensure that you are on the main branch. You will see a message like "This branch is 1 commit ahead of, 9 commits behind dallassoftwaredevelopers/DSDsite:main."
2. Click **Sync fork** and click **Update branch** on the prompt that appears.
   > ![image](https://github.com/climaxmba/DSDsite/assets/106796090/d72ef411-c707-4d70-8c45-48e607450c04)

### Update your local repository

1. Open a terminal in the directory of your local repository and run git checkout main to ensure you are on the main branch.
2. Run this command to update your local repository, you can read more about git pull at [https://git-scm.com/docs/git-pull](https://git-scm.com/docs/git-pull).

```bash
git pull --rebase
```

3. Now checkout your working branch with `git checkout [branch_name]` and run:

```bash
git rebase main
```

4. You may run into a merge conflict. If you do, [here's how to resolve them](https://www.freecodecamp.org/news/resolve-merge-conflicts-in-git-a-practical-guide/), you have to do that before preceeding.

### Force-push your changes

Run `git push --force` to update your remote branch and eventually, your pull request.
