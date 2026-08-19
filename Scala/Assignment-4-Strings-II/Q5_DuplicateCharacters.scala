import scala.io.StdIn

object Q5_DuplicateCharacters {
  def main(args: Array[String]): Unit = {

    print("Enter a string: ")
    val str = StdIn.readLine()

    println("Duplicate characters and their counts:")

    for (ch <- str.distinct) {
      val count = str.count(_ == ch)

      if (count > 1) {
        println(ch + " = " + count)
      }
    }
  }
}
