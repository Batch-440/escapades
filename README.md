# escapades
Find your next travel buddies.

## Tech Stack
- Ruby 3.1.2
- Rails 7.1.2
- Vite 5.0.0
- React 18.2.0

## Want to dev?

### Setup
```
cd escapades_backend
rails db:setup
bundle install
yarn install

cd escapades_frontend
yarn install
```

### Launching the dev server
Backend API: http://localhost:3000
```
cd escapades_backend
rails s
```

Frontend App: http://localhost:5173
```
cd escapades_frontend
yarn dev
```

### Contributing
- Take an unresolved ticket on [Jira](https://anthyou.atlassian.net/jira/software/projects/ES/boards/8)
- Create a branch starting by the ticket ID
- Code
- Push your branch to GitHub
- Create a Pull Request
- Pass the CI
- Request peers approval
- Merge your branch (squash and merge)

### Flaging your tests (backend)
Please flag your tests as following:
- js tests with the tag `:js`
- flaky tests with the tag `:flaky`
- quarantine tests with the tag `:quarantine`

### What should I enter as title and description for my PR?
```
Title: ($TICKET_NUMBER) $TICKET_TITLE
Description: A short sentence describing your changes + add the link to your Jira ticket.
```

## Any questions?
Please contact us at `tech@batch440.com`.
