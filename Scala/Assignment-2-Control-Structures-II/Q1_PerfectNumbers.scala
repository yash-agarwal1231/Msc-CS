import scala.util.Random

object Q1_PerfectNumbers {
  def main(args: Array[String]): Unit = {

    for (i <- 1 to 5) {

      val n = Random.nextInt(100) + 1
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
