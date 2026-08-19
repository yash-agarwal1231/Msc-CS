import scala.io.StdIn

object Q6_Armstrong {

  def isArmstrong(n: Int): Boolean = {

    var number = n
    var sum = 0

    while (number > 0) {

      val digit = number % 10
      sum += digit * digit * digit
      number = number / 10
    }

    return sum == n
  }

  def main(args: Array[String]): Unit = {

    print("Enter an integer: ")
    val n = StdIn.readInt()

    if (isArmstrong(n)) {
      println(n + " is an Armstrong Number")
    } else {
      println(n + " is not an Armstrong Number")
    }
  }
}
