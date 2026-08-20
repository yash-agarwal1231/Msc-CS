import scala.io.StdIn

object Q4_SeparateEvenOdd {
  def main(args: Array[String]): Unit = {

    print("Enter number of elements: ")
    val n = StdIn.readInt()

    val arr = new Array[Int](n)

    for (i <- 0 until n) {

      print("Enter element " + (i + 1) + ": ")
      arr(i) = StdIn.readInt()
    }

    val even = arr.filter(_ % 2 == 0).toList
    val odd = arr.filter(_ % 2 != 0).toList

    println("Even numbers: " + even)
    println("Odd numbers: " + odd)
  }
}
