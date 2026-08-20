import scala.io.StdIn

object Q2_RemoveElementFromList {
  def main(args: Array[String]): Unit = {

    val list = List(10, 20, 30, 40, 50)

    println("Original List: " + list)

    // Remove by value
    print("Enter element to remove: ")
    val value = StdIn.readInt()

    val byValue = list.filterNot(_ == value)

    println("After removing by value: " + byValue)

    // Remove by index
    print("Enter index to remove: ")
    val index = StdIn.readInt()

    if (index >= 0 && index < byValue.length) {

      val byIndex = byValue.patch(index, Nil, 1)

      println("After removing by index: " + byIndex)

    } else {
      println("Invalid index")
    }
  }
}
