## Git Standards

git branch -a
  - shows all of the branches available on your computer, what are available on remote, and what branch you are currently working on

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