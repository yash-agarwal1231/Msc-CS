import scala.io.StdIn

object Q5_CountVowelsConsonants {
  def main(args: Array[String]): Unit = {

    print("Enter a string: ")
    val str = StdIn.readLine().toLowerCase

    var vowels = 0
    var consonants = 0

    for (ch <- str) {
      if ("aeiou".contains(ch)) {
        vowels += 1
      } else if (ch >= 'a' && ch <= 'z') {
        consonants += 1
      }
    }

    println("Vowels = " + vowels)
    println("Consonants = " + consonants)
  }
}
