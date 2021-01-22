from urllib import request
from bs4 import BeautifulSoup
import nltk
nltk.download('punkt')


def open_and_parse(url):
  # mimic user agent
  url = request.Request(url, headers={
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; "
            "rv:68.0) Gecko/20100101 Firefox/68.0"})
  
  # open URL to and parse HTML
  html_page = request.urlopen(url)
  soup = BeautifulSoup(html_page, 'html.parser')

  return soup


def summarize(soup_object, num_sentences):
  sentences = []
  summary = []
  words = dict()  # stores each word and its number of occurrences
  ranks = dict()  # stores indices of each sentence and its points
  iterations = 0

  # build dictionary of fragment strings and count word occurrences
  for element in soup_object.findAll('p'):
    paragraph = str(''.join(element.findAll(text=True)))

    # iterate through each sentences in the paragraph
    for sentence in nltk.sent_tokenize(paragraph):
      sentences.append(sentence)

      word_list = sentence.lower().split(' ')
      word_list = filter(None, word_list)  # remove blank strings
      
      # count word occurrences
      for word in word_list:
        if word in words:
          words[word] += 1
        else:
          words[word] = 1

  # pick sentences with highest number of points
  for i in range(len(sentences)):
    ranks[i] = 0
    for word in words:
      if word in sentences[i].lower():
        ranks[i] += words[word]

  # article may have less sentences than num_sentences
  if len(sentences) < num_sentences:
    num_sentences = len(sentences)
  
  # build summary by picking top-ranked sentences from sorted ranks
  for index, value in sorted(ranks.items(), key=lambda x: x[1], reverse=True):
    summary.append(index)
    # don't exceed the number of sentences for the summary
    if iterations < num_sentences - 1:
      iterations += 1
    else:
      break

  # replace stored indices with sentence strings
  summary = sorted(summary)
  for i in range(len(summary)):
    summary[i] = sentences[summary[i]]
  
  return '\n\n'.join(summary)
