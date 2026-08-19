import scala.io.StdIn

object Q3_ReverseEveryWord {
  def main(args: Array[String]): Unit = {

    print("Enter a string: ")
    val str = StdIn.readLine()

    val words = str.split(" ")

    val result = words.map(_.reverse).mkString(" ")

    println("Result = " + result)
  }
}
