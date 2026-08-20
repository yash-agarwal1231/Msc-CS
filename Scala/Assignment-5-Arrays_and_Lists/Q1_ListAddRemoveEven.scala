object Q1_ListAddRemoveEven {
  def main(args: Array[String]): Unit = {

    var list = List(10, 15, 20, 25, 30)

    println("Original List: " + list)

    // Add three elements
    list = list :+ 35
    list = list :+ 40
    list = list :+ 45

    println("After adding 3 elements: " + list)

    // Remove all even numbers
    list = list.filter(_ % 2 != 0)

    println("After removing even numbers: " + list)
  }
}
