import scala.io.StdIn.readInt

object PerfectNumbers {
  def main(args: Array[String]): Unit = {

    for (i <- 1 to 5) {

      print(s"Enter number $i: ")
      val n = scala.io.StdIn.readInt()

      var sum = 0

      for (j <- 1 until n) {
        if (n % j == 0) {
          sum += j
        }
      }

      if (sum == n) {
        println(n + " is a Perfect Number")
      } else {
        println(n + " is not a Perfect Number")
      }
    }
  }
}
