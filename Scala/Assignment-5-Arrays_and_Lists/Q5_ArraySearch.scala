import scala.io.StdIn

object Q5_ArraySearch {
  def main(args: Array[String]): Unit = {

    val arr = Array(10, 20, 30, 40, 50)

    print("Enter element to search: ")
    val target = StdIn.readInt()

    val index = arr.indexOf(target)

    if (index != -1) {
      println("Element found at index: " + index)
    } else {
      println("Element not found")
    }
  }
}
