import scala.io.StdIn

object Q5_ArithmeticMatch {
  def main(args: Array[String]): Unit = {

    print("Enter first number: ")
    val a = StdIn.readInt()

    print("Enter second number: ")
    val b = StdIn.readInt()

    print("Enter operator (+, -, *, /): ")
    val operator = StdIn.readChar()

    val result = operator match {

      case '+' => a + b
      case '-' => a - b
      case '*' => a * b
      case '/' => a / b
      case _   => 0
    }

    println("Result = " + result)
  }
}
