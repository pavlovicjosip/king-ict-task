name: CI/CD Pipeline

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

    steps:
    - name: Checkout koda
      uses: actions/checkout@v1

    - name: Instalacija Node.js
      uses: actions/setup-node@v1
      with:
        node-version: '14'

    - name: Instaliranje dependency-a
      run: npm install

    - name: Pokretanje tes
      run: npm test

    - name: Build application
      run: npm run build

    - name: Deploy to staging
      if: github.ref == 'refs/heads/main'
      run: |
	scp - r build
				
	
	
	/* user@staging-server:/var/www/html/

    - name: Deploy to production
      if: github.ref == 'refs/heads/main' && github.event_name == 'release'
      run: |
        # Komanda za deployment na produkcioni server
        scp -r build/* user@production-server:/var/www/html/