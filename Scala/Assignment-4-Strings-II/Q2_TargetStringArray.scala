import scala.io.StdIn

object Q2_TargetStringArray {
  def main(args: Array[String]): Unit = {

    print("Enter number of strings: ")
    val n = StdIn.readInt()

    val arr = new Array[String](n)

    for (i <- 0 until n) {
      print("Enter string " + (i + 1) + ": ")
      arr(i) = StdIn.readLine()
    }

    print("Enter target string: ")
    val target = StdIn.readLine()

    println("Matching elements:")

    for (str <- arr) {
      if (str.contains(target)) {
        println(str)
      }
    }
  }
}
