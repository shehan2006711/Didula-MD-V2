

# Pair and Connect Your WhatsApp


<a href="https://prabath-md-pair-web-v2-slk.koyeb.app/pair"><img height= "35" title="Author" src="https://img.shields.io/badge/GET SESSION ID:-blue?style=for-the-badge&logo=render"></a>


# Deploy On Heroku 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new-app?template=https://github.com/itsme-didulabot/Didula-MD-V2)

# WORKFLOW CODE

```
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Start application
      run: npm start
```
