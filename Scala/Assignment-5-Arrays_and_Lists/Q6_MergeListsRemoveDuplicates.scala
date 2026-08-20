import scala.io.StdIn

object Q6_MergeListsRemoveDuplicates {
  def main(args: Array[String]): Unit = {

    val list1 = List(10, 20, 30)
    val list2 = List(30, 40, 50)

    println("List 1: " + list1)
    println("List 2: " + list2)

    // Merge two lists
    val merged = list1 ++ list2

    println("Merged List: " + merged)

    // Add a new element
    print("Enter new element: ")
    val element = StdIn.readInt()

    val result = (merged :+ element).distinct

    println("Final List: " + result)
  }
}
