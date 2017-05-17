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

feature-<featurename>-<initials>

## :: start new feature ::
1. git checkout develop
2. git pull origin develop
3. git checkout -b <feature>
4. git branch   // to make sure you are on your new feature branch
5. create feature

## :: once you're done with this feature ::
1. git status
2. git add .
3. git commit -m’<what_action> to <what_location>’
4. git push origin <feature>
        or
    git push --set-upstream origin <feature>

## :: merge ::
1. git branch to make sure you're on feature branch,
2. git pull origin develop    // pull any changes from develop to be current with develop on repo
3. git merge --no-ff develop   // merge develop into your <feature>
4. resolve conflicts, if any this may require git add & git commit
5. 'git push origin <feature>' or just 'git push' while on feature branch

## :: pull request ::
1. go to achieveMpls repository
2. click on pull request tab
3. click on new pull request button
4. select base as develop and compare <feature>
5. create pull request, have someone review and approve
6. once approved got back to repository and click to merge branch
7. delete feature branch

## :: push to develop :: ** not necessary if using a pull request **
1. git checkout develop  
2. git merge --no-ff <feature>
3. git push -u origin develop
4. git branch -d feature-task1 // delete old branches

Merging:

1. Commit feature (git add and git commit)
2. git checkout develop
3. git pull develop
4. git checkout <feature>
5. git merge --no-ff develop
6. Resolve Conflicts
7. git add
8. git commit
9. git push origin <feature>
10. Submit git pull request
