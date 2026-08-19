import scala.io.StdIn

object Q1_StringRotations {
  def main(args: Array[String]): Unit = {

    print("Enter first string: ")
    val str1 = StdIn.readLine()

    print("Enter second string: ")
    val str2 = StdIn.readLine()

    if (str1.length == str2.length && (str1 + str1).contains(str2)) {
      println("The strings are rotations of each other")
    } else {
      println("The strings are not rotations of each other")
    }
  }
}
