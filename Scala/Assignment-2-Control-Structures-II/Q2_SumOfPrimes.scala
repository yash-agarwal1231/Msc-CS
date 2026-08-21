import scala.io.StdIn.readInt

object Q2_SumOfPrimes {
  def main(args: Array[String]): Unit = {

    var sum = 0

    for (n <- 2 to 100) {

      var isPrime = true

      for (i <- 2 until n) {
        if (n % i == 0) {
          isPrime = false
        }
      }

      if (isPrime) {
        sum += n
      }
    }

    println("Sum of prime numbers from 1 to 100 = " + sum)
  }
}
