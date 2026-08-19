import scala.io.StdIn

object Q3_RemoveCharacterAtPosition {
  def main(args: Array[String]): Unit = {

    print("Enter a string: ")
    val str = StdIn.readLine()

    print("Enter position to remove: ")
    val position = StdIn.readInt()

    if (position >= 0 && position < str.length) {
      val result = str.substring(0, position) +
                   str.substring(position + 1)

      println("String after removal = " + result)
    } else {
      println("Invalid position")
    }
  }
}
