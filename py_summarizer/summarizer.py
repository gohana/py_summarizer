from py_summarizer.summarizer_tools import SummarizerTools


def main():
    print("Welcome to py_summarizer")

    while True:
        try:
            url = input("Input the URL of an article followed by a space, or "
                        "'x' to exit: ")
            if url == 'x':
                break
            print("Summarizing...")

            # open url
            soup_object = SummarizerTools.open_and_parse(url)

            # print title
            print("---------")
            title = soup_object.title
            for element in title:
                print(element)
            print("\n")

            # create and print summary
            sentences = SummarizerTools.summarize(soup_object)
            SummarizerTools.display(sentences)
            print("---------")
        except Exception:
            print()
            restart = input("Error in input. Restart? 'y' or 'n': ")
            if restart == 'y':
                continue
            break


if __name__ == '__main__':
    main()
