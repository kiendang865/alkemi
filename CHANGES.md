# Versions

## 0.4.0

###### _April 20th 2020_

### Features

- Sidebar now collapsable to create more screen real-estate
- History and Liquidate pages / API got revamped
- Web3 Connect Integrations now working for the following wallet providers:

  - MetaMask
  - Portis
  - Coinbase ( Mobile Only )
  - Trust ( Mobile Only )
  - Fortmatic
  - Squarelink

* Fixed alignment/spacing of appbar, content, sidebar
* Updated render one appbar for all router
* Fixed dashboard/lending table alignment
* Updated lending Component Active Lending Reserves table alignment
* Updated Markets Page
* Fixed registerServiceWorker
* Update README add Contributing Guidelines
* Added feature toggle side bar
* Updated imports across app to use absolute path
* Fixed theme import error
* Updated sidebar styling
* Fixed app bar
* Updated MUI Theme palette
* Removed unnecessary color imports
* Fixed bad color secondary.dark
* Updated revamp of history page using MUI
* Removed unnecessary theme settings
* Updated to history page, add link to etherscan
* Fixed table cell alignments on history page
* Fixed Selected Icon highlighting
* Added Custom Material SVG icons for sidebar items
* Fixed Squarelink
* Fixed css import for build
* Added menu icon to toggle side bar
* Fixed sidebar item styling
* Fixed add side bar divider
* Updated theme into a themes folder which related styling files. Updated theme js to reflect changes. Made layout edits to lending page and broke down components into cards and grid structure. Other minor styling issues corrected.
* Fixed values to values instead of strings with 2 place decimal formatting.
* Updated Changelog

---

## 0.3.0

###### _April 13th 2020_

### Features

- Fixed memory leak
- Added Dashboard Component, improved routing
- Updated sidebar app with proper code splitting
- Added Dashboard material-ui layout base components
- Added load Dynamic Headings based on page location
- Added Supply and Withdraw Modals to ActiveLendingTable Component
- Updated use of custom Material UI theme
- Updated css in js styling, fixing layout for dashboard
- Added onBoard.js for web3 wallet connects
- Updated Dashboard Component
- Updated Lending Component
- Updated Borrow Component
- Updated Borrow Info Cards
- Updated Dashboard Info Cards
- Added layout and style improvements to Supply Modal
- Updated styling and layout fixes dashboard page
- Added Portis, Fortmatic, Squarelink web3 providers to connect wallet
- Fixed connect button styling on AppBar
- Added Dashboard icons
- Updated History and Liquidation Pages
- Updated Button on lending and borrowing pages, adding colored asset icon variants to pages, some more uniform spacing added across grid.
- Updated Sidebar wallet balances
- Fixed USDC icon on markets page
- Added Liquidation page
- Fixed sidebar active menu link
- Adding French Language Definitions
- Updated styling to table, grid titles. Spacing between info grids, add asset button edits, sub heading table font edits.

---

## 0.2.0

###### _April 6th 2020_

### Features

- Edits to styling, lending page layout and connect wallet functionality
- Added Web3 connectivity
- Refactored out functions from markets page to utils.js
- Added to market page layout and styling
- Added styling and layout for markets page
- Fix flexbox to adjust to different screen sizes
- Fix Sorting on Markets Page

#### Components/Containers

- [Liquidate] Implement _Liquidate_ component
- [History] Implement _History_ component
- [Markets] Implement _Markets_ component

---

## 0.1.0

###### _March 21st 2020_

### Features

#### Components/Containers

- [ListItem1] Implement _ListItem1_ component
- [AppBar] Implement _AppBar_ component
- [Sidebar] Implement _Sidebar_ component
- [Layout] Implement _Layout_ component
- [NoWhere] Implement _NoWhere_ component
- [Home] Implement _Home_ component

#### Redux

##### Reducer

- [sidebar] Implement UI reducer for sidebar

##### Enhancer

- [DevTools] Include redux DevTools enhancer

#### Utils

- [registerServiceWorker] Implement service worker for progressive Web App

#### Constants

- [routes] Define routes
- [theme] Define Material-Ui theme

### Chore

- [Dockerfile] Add production docker configuration with multi-stage build
- [nginx] Production docker image use nginx server
- [docker-compose.yml] Implement dev environment script
- [bitbucket-pipelines.yml] CI/CD script
- [.eslintrc] Linting configuration file

### Doc

- [CONTRIBUTING.md] Add contributing guidelines
- [CHANGES.md] Add changelog
- [README.md] Add readme with badges
