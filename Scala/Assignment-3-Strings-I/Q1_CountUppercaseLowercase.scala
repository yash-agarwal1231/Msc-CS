import scala.io.StdIn

object Q1_CountUppercaseLowercase {
  def main(args: Array[String]): Unit = {

    print("Enter a string: ")
    val str = StdIn.readLine()

    var count = 0

    for (ch <- str) {
      if (ch.isUpper) {
        count += 1
      }
    }

    println("Number of uppercase letters = " + count)
    println("Lowercase string = " + str.toLowerCase)
  }
}
