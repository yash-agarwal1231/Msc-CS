import scala.io.StdIn

object Q3_ArrayMaxMin {
  def main(args: Array[String]): Unit = {

    print("Enter number of elements: ")
    val n = StdIn.readInt()

    val arr = new Array[Int](n)

    for (i <- 0 until n) {

      print("Enter element " + (i + 1) + ": ")
      arr(i) = StdIn.readInt()
    }

    println("Array: " + arr.mkString(" "))

    println("Maximum = " + arr.max)
    println("Minimum = " + arr.min)
  }
}
