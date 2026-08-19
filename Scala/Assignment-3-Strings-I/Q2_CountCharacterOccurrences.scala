import scala.io.StdIn

object Q2_CountCharacterOccurrences {
  def main(args: Array[String]): Unit = {

    print("Enter a string: ")
    val str = StdIn.readLine()

    print("Enter a character: ")
    val ch = StdIn.readChar()

    var count = 0

    for (c <- str) {
      if (c == ch) {
        count += 1
      }
    }

    println("Occurrences of '" + ch + "' = " + count)
  }
}
