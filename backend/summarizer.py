from summarizer_tools import get_title_and_summary


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
    
      # summarize
      print("Summarizing...")
      print("---------")
      
      title, summary = get_title_and_summary(url, num_sentences)
      
      print(title + '\n\n')
      print(summary)
      print("---------")
    except Exception:
      print('Error in input, exiting...')
      break


if __name__ == '__main__':
  main()
