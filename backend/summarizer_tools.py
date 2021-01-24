from urllib import request
from bs4 import BeautifulSoup
import nltk
import os

# nltk path configuration
root = os.path.dirname(os.path.abspath(__file__))
dl_dir = os.path.join(root, 'nltk_data')
os.chdir(dl_dir)
nltk.data.path.append(dl_dir)


def open_and_parse(url):
  # mimic user agent
  url = request.Request(url, headers={
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; "
            "rv:68.0) Gecko/20100101 Firefox/68.0"})
  
  # open URL to and parse HTML
  html_page = request.urlopen(url)
  soup = BeautifulSoup(html_page, 'html.parser')

  return soup


# build dictionary of fragment strings and count word occurrences
def count_word_occurrences(soup_object):
  sentences = []
  words = dict()  # stores each word and its number of occurrences

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
      
  return words, sentences


# rank sentences by word occurence counts
def rank_sentences(words, sentences):
  ranks = dict()  # stores indices of each sentence and its points

  for i in range(len(sentences)):
    ranks[i] = 0
    for word in words:
      if word in sentences[i].lower():
        ranks[i] += words[word]
  
  return ranks


# create summary given the soup object
def summarize(soup_object, num_sentences):
  if num_sentences == 0:
    return ''

  summary = []
  iterations = 0

  # get word occurrence dict and sentences array
  words, sentences = count_word_occurrences(soup_object)

  # get ranks dict of sentences by number of points
  ranks = rank_sentences(words, sentences)

  # article may have less than num_sentences
  if len(sentences) < num_sentences:
    num_sentences = len(sentences)
  
  # build summary by picking top-ranked sentences from sorted ranks
  for index, _ in sorted(ranks.items(), key=lambda x: x[1], reverse=True):
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


# get the article title given the soup object
def get_title(soup_object):
  title = ''

  for element in soup_object.title:
    title += element
  
  return title


# gets the article title and summary from the url
def get_title_and_summary(url, num_sentences):
  try:
    soup_object = open_and_parse(url + ' ')

    title = get_title(soup_object)
    summary = summarize(soup_object, num_sentences)
    
    return title, summary
  except Exception:
    return False


def test_func(msg):
  return msg + ' back!'