# A simple JavaScript Project

This project is built to showcase the ability to properly test pages built with some plain old html javascript and css

# Setup

This project contains 2 parts, the website that contains the Actual calculator and the files necessary for rendering of it, and also the automatic tests mainly in the file `test_calculator.js`

## The website
This is built to go right inside of an Apache website's folder. For example, on my machine, it is located at `/var/www/simple_js_calculator`

As a result you also need to make sure you modify your virtual hosts, and hosts file accordingly.

simply visit your browser to actually test the website by hand.

## The Automatic Tests

- [Install Nodejs](https://nodejs.org/en/)
- [Install phantomjs](https://phantomjs.org/download.html)
- Next run `sudo npm install -g casperjs` to install casperjs globally on your computer
- finally you should be to run tests with `casperjs test test_calculator.js`

