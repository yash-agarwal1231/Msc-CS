import scala.io.StdIn

object Q6_ReplaceSpacesWithHyphen {
  def main(args: Array[String]): Unit = {

    print("Enter a string: ")
    val str = StdIn.readLine()

    val result = str.replace(' ', '-')

    println("Result = " + result)
  }
}
