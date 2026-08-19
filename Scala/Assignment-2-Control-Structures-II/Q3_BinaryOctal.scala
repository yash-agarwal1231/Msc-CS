import scala.io.StdIn

object Q3_BinaryOctal {

  def convertToBinary(n: Int): String = {
    return n.toBinaryString
  }

  def convertToOctal(n: Int): String = {
    return n.toOctalString
  }

  def main(args: Array[String]): Unit = {

    print("Enter an integer: ")
    val n = StdIn.readInt()

    val binary = convertToBinary(n)
    val octal = convertToOctal(n)

    println("Binary = " + binary)
    println("Octal = " + octal)
  }
}
