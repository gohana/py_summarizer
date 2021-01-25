# Py Summarizer

Creates a summary of an article given its URL.

## Try It Out

Deployed [here](https://pysummarizer.netlify.app/).

## How to Run (Locally)

In the `/backend` directory, run `python -m pip install -r requirements.txt`.

Then choose either:

### Command Line

In the `/backend` directory, run `python summarizer.py`.

### Web Application

First time set up:

1. In the `/backend` directory, run `python -m pip install -r requirements.txt`
2. In the `/frontend` directory, run `npm install`

Now you're ready:

1. In the `/backend` directory, run `export FLASK_APP=main.py; python -m flask run`
2. Concurrently, in the `/frontend` directory, run `npm start`

## Credit

[Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/) for parsing HTML files  
[NLTK](https://www.nltk.org/) for paragraph separation
