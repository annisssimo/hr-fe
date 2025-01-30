## Prerequisites

1. [Install node version manager (nvm)](https://github.com/nvm-sh/nvm) 

## Development

```bash
# Install node version from .nvmrc
1. nvm install
# Use node version from .nvmrc
2. nvm use
# Copy environmental variables
3. cp .env.example .env
# Install dependencies
4. npm i
# Start local server
5. npm run start
```

## Branch management cheatsheet

```bash
1. Create new branch from main

2. Make a commit with any changes and provide a solid commit message

# When you need to add something to the commit use
3. git commit --amend --no-edit

# If you need to get fresh updates from the main branch
4. git pull --rebase origin main

# You can safely force push to your sidebranch (NOT TO THE MAIN)
5. git push -f -u origin HEAD
```

Each your pull request should not add more then one commit to the base branch. Exceptions are feature branches.