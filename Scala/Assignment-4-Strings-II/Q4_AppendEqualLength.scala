import scala.io.StdIn

object Q4_AppendEqualLength {
  def main(args: Array[String]): Unit = {

    print("Enter first string: ")
    val str1 = StdIn.readLine()

    print("Enter second string: ")
    val str2 = StdIn.readLine()

    var s1 = str1
    var s2 = str2

    if (s1.length > s2.length) {
      s1 = s1.substring(s1.length - s2.length)
    } else if (s2.length > s1.length) {
      s2 = s2.substring(s2.length - s1.length)
    }

    val result = s1 + s2

    println("Result = " + result)
  }
}
