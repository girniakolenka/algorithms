import java.util.HashMap;
import java.util.List;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.*;
import java.nio.charset.Charset;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        try {
            Charset charset = Charset.forName("ISO-8859-1");
            String fileName = "/Users/olenkagirniak/Development/Prometheus/algorithms/Week_4/data.txt";
            List<String> allLines = Files.readAllLines(Paths.get(fileName), charset);

            for (String line : allLines) {
                System.out.println("\"".concat(line).concat("\","));
            }

            radixSort(allLines, 3);


        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static List<String> radixSort(List<String> arr, Integer radix) {

        for(int i=radix; i>=0; i--) {

        }
        return arr;
    }
}
