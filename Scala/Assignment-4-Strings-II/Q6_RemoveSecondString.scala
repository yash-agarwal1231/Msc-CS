import scala.io.StdIn

object Q6_RemoveSecondString {
  def main(args: Array[String]): Unit = {

    print("Enter first string: ")
    val str1 = StdIn.readLine()

    print("Enter second string: ")
    val str2 = StdIn.readLine()

    val result = str1.replace(str2, "")

    println("Result = " + result)
  }
}
