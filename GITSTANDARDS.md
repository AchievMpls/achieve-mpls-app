## Git Standards

git branch -a
  - shows all of the branches available on your computer, what are available on remote, and what branch you are currently working on

git branch <branch>
    - creates branch

git checkout <branch>
  - checks out the branch that you want to work on.

git add -p
  - adds your files to the possible commit, and reviews the changes before adding

git commit -m"Text"
  - commits the changes that have been added

git stash
  - stashes the changes you have made since the previous commit and allows you to change branches

git stash apply
  - when you have switched to the branch you want to be on, you apply the material you have saved with git stash

Naming for Branches

feature_<featurename>_<initials>

Merging:

git push <featurebranch>


 :: start new feature ::
git checkout develop
git pull origin develop
git checkout -b feature_<featurename>_<initials>
git branch   // to make sure you are on your new feature branch
// type new code to create feature

:: when you're done with this feature ::
git status
git add .
git commit -m’<what_action> to <what_location>’
git push origin feature_<featurename>_<initials> // this will create feature branch on repo

:: merge ::
// while still on feature branch
git pull origin develop    // pull any changes from develop to be current with develop on repo
git merge --no-ff develop   // merge develop into your feature-task1 branch$
// resolve conflicts, if any this may require git add & git commit

:: pull request ::
it is a request for your code to be pulled in to the develop branch
test for bugs
approve

:: push to develop ::
// once changes have been approved…
git checkout develop  // switch back to develop and merge changes
git merge --no-ff feature-task1  //
git push -u origin develop // push local changes to repo
git branch -d feature-task1 // delete old branches
