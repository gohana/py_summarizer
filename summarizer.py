from summarizer_tools import open_and_parse, summarize


def get_title(soup_object):
  # extract article title
  title = ''

  for element in soup_object.title:
    title += element
  
  return title


def main():
  print("Welcome to Py Summarizer")

  while True:
    try:
      # get user input
      url = input("Enter the URL of an article (or 'x' to exit): ")
      if url == 'x':
        break

      num_sentences = input("Enter the number of sentences in your summary: ")
      num_sentences = int(num_sentences)
      
      print("Summarizing...")

      # open url
      soup_object = open_and_parse(url + ' ')

      # print title
      print("---------")
      print(get_title(soup_object), "\n")

      # create summary
      summary = summarize(soup_object, num_sentences)

      # print summary
      print(summary)
      print("---------")
    except Exception:
      print('Error in input')
      break


if __name__ == '__main__':
  main()
