import scala.io.StdIn

object Q4_Palindrome {
  def main(args: Array[String]): Unit = {

    print("Enter a string: ")
    val str = StdIn.readLine()

    val reverse = str.reverse

    str match {
      case s if s == reverse =>
        println("Palindrome")
      case _ =>
        println("Not a Palindrome")
    }
  }
}
